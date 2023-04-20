import json
from os import path
from typing import TypedDict, Any
from typing_extensions import NotRequired
import numpy as np
from fuzzywuzzy import fuzz

from uuid import uuid4
from html.parser import HTMLParser
import datetime
import logging
import re

the_json = path.join(path.dirname(__file__), "api.json")
EXTRACT = {}
with open(the_json) as the_file:
    EXTRACT = json.load(the_file)

logger = logging.getLogger()


class TextParser(HTMLParser):
    """
    A class designed for extracting the text out of an HTML document.
    """

    def __init__(self):
        HTMLParser.__init__(self)
        self.text: str = ""

    def handle_starttag(self, _, __):
        self.text += " "

    def handle_data(self, data: str):
        self.text += data

    def get_text(self) -> str:
        return self.text


# Bound on changes in Y that correspond to minor variations in character width as
# opposed to differences in line breaks.
SMOOTH_BOUND = 3


class Element(TypedDict):
    """
    A class describing the elements the extract API captures.
    """

    Bounds: list[float]  # There are always 4.
    CharBounds: NotRequired[list[list[float]]]
    Page: int
    Text: NotRequired[str]
    Kids: NotRequired[list[Any]]  # Actually a list of Elements


class Page(TypedDict):
    """
    A class describing the shape of a page from the extract API.
    """

    height: float
    width: float
    page_number: int


class ExtractOutput(TypedDict):
    """
    A type describing the output of the extract API.
    """

    elements: list[Element]
    pages: list[Page]


class Match(TypedDict):
    """
    A matching group of things.
    """

    bounds: list[list[float]]
    page: int


class ExtractMap(TypedDict):
    """
    A highlight containing a matching character.
    """

    page_no: int
    quadpoints: list[float]


class Coordinates(TypedDict):
    """
    A wrapper for the four floats in the match class.
    """

    small_x: float
    big_x: float
    small_y: float
    big_y: float


def coordinates(bounds: list[float]) -> Coordinates:
    small_x = bounds[0]
    big_x = bounds[2]
    small_y = bounds[1]
    big_y = bounds[3]
    return {
        "small_x": small_x,
        "big_x": big_x,
        "small_y": small_y,
        "big_y": big_y,
    }


def to_quadpoints(coordinates: Coordinates) -> list[float]:
    small_x = coordinates["small_x"]
    small_y = coordinates["small_y"]
    big_x = coordinates["big_x"]
    big_y = coordinates["big_y"]
    return [small_x, big_y, big_x, big_y, small_x, small_y, big_x, small_y]


def convert_match_to_quadpoints(matches: list[Match]) -> list[float]:
    out: list[float] = []
    for match in matches:
        first, *rest = match["bounds"]
        cur_coordinates = coordinates(first)
        for new_coordinates in [coordinates(bounds) for bounds in rest]:
            y_change = abs(new_coordinates["small_y"] - cur_coordinates["small_y"])
            if y_change > SMOOTH_BOUND:
                out.extend(to_quadpoints(cur_coordinates))
                cur_coordinates = new_coordinates
            else:
                cur_coordinates["big_x"] = new_coordinates["big_x"]
                cur_coordinates["big_y"] = max(
                    cur_coordinates["big_y"], new_coordinates["big_y"]
                )
                cur_coordinates["small_y"] = max(
                    cur_coordinates["small_y"], new_coordinates["small_y"]
                )
        out.extend(to_quadpoints(cur_coordinates))
    return out


def group_by_page(match_list: list[Match]) -> list[list[Match]]:
    groups: dict[int, list[Match]] = {}
    for match in match_list:
        if match["page"] in groups:
            groups[match["page"]].append(match)
        else:
            groups[match["page"]] = [match]
    return [groups[page] for page in sorted(groups.keys())]


def convert_matches_to_extract_map(matches: list[list[Match]]) -> list[ExtractMap]:
    out: list[ExtractMap] = []
    for match_list in matches:
        grouped_match_list = group_by_page(match_list)
        for group in grouped_match_list:
            quadpoints = convert_match_to_quadpoints(group)
            page_no = group[0]["page"]
            out.append({"page_no": page_no, "quadpoints": quadpoints})
    return out


def is_textual_element(element: Element) -> bool:
    return "Text" in element and "CharBounds" in element


def pdf_to_text(pdf: ExtractOutput) -> str:
    """
    Read all of the text in the PDF as a string.
    """
    out = ""
    for element in pdf["elements"]:
        if "Text" in element:
            out += element["Text"]
        if "Kids" in element:
            extract_output: ExtractOutput = {
                "elements": element["Kids"],
                "pages": pdf["pages"],
            }
            out += pdf_to_text(extract_output)
    return out


def same_alpha_numeric(letter_one: str, letter_two: str) -> bool:
    if not letter_one.isalnum() and not letter_two.isalnum():
        return True
    return letter_one.lower() == letter_two.lower()


def same_alpha_numeric_score(a: str, b: str):
    return 1 if same_alpha_numeric(a, b) else 0


def fuzzy_pdf_match(document: str, sentence: str) -> tuple[int, int]:
    """
    Fuzzy match the text in text with the text in pdf_text to get a list of the
    closest possible matches guaranteed to be in the Extract API JSON.
    """
    if sentence in document:
        idx = document.find(sentence)
        return document[idx : idx + len(sentence)]

    document_words = document.split(" ")
    num_words_sentence = len(sentence.split(" "))
    best_ratio = 0
    best_match = ""

    for i in range(len(document_words) - num_words_sentence + 1):
        current_phrase = " ".join(document_words[i : i + num_words_sentence])
        # current_phrase_extended = " ".join(document_words[max([0, i-4]): \
        #                                                   min([i+num_words_sentence+4, len(document_words)])])
        ratio = fuzz.ratio(current_phrase, sentence)
        if ratio == 100:
            best_match = current_phrase
            break
        if ratio > best_ratio:
            best_match = current_phrase
            best_ratio = ratio

    return best_match

    # alignments = pairwise2.align.localcs(  # type: ignore
    #     # document,
    #     best_match,
    #     sentence,
    #     same_alpha_numeric_score,
    #     -0.5,
    #     -0.1,
    # )
    # alignment = alignments[0]
    #
    # return best_match[alignment.start, alignment.end]


def align_string_and_bounds(
    text: str, char_bounds: list[list[float]]
) -> tuple[str, list[list[float]]]:
    """
    Try our best to force a string of text and the char bounds from the Extract API to line up.
    If such alignment is impossible, return None.
    """
    text = re.sub(r"\(<[^)]*>\)", "", text)
    if len(text) <= len(char_bounds):
        return (text, char_bounds)
    space: list[float] = []
    for i, char in enumerate(text):
        if i >= len(char_bounds):
            return (None, None)
        if char == " ":
            space = char_bounds[i]
            break
    if len(space) <= 0:
        return (None, None)
    for i, char in enumerate(text):
        if i >= len(char_bounds):
            char_bounds.append(space)
        if not char.isascii():
            char_bounds.insert(i, space)
    return (text, char_bounds)


class BoundsCollector:
    def __init__(self):
        self.current_match_index = 0
        self.current_match_string = ""
        self.current_bounds = []
        self.potential_match: list[Match] = []

    def __reset_current_match__(self):
        self.current_match_index = 0
        self.current_match_string = ""
        self.current_bounds: list[list[float]] = []
        self.potential_match: list[Match] = []

    def collect(self, text: str, elements: list[Element]) -> list[list[Match]]:
        out: list[list[Match]] = []
        for element in elements:
            if "Text" in element and "CharBounds" in element:
                current_string, char_bounds = align_string_and_bounds(
                    element["Text"], element["CharBounds"]
                )
                if current_string is None or char_bounds is None:
                    logger.warning(
                        "Could not match CharBounds array with "
                        + str(len(element["CharBounds"]))
                        + " elements against this string: "
                        + element["Text"]
                    )
                    continue

                for j, letter in enumerate(current_string):
                    current_matching_letter = text[self.current_match_index]
                    if same_alpha_numeric(letter, current_matching_letter):
                        # Our matching algorithm is successful.
                        self.current_match_string += current_matching_letter
                        self.current_match_index += 1
                        self.current_bounds.append(char_bounds[j])
                    else:
                        self.__reset_current_match__()
                    if len(self.current_match_string) == len(text):
                        # We have a complete match.
                        self.potential_match.append(
                            {"bounds": self.current_bounds, "page": element["Page"]}
                        )
                        out.append(self.potential_match)
                        self.__reset_current_match__()
            if len(self.current_bounds) > 0:
                self.potential_match.append(
                    {"bounds": self.current_bounds, "page": element["Page"]}
                )
                self.current_bounds = []
            if "Kids" in element:
                out.extend(self.collect(text, element["Kids"]))
        return out


def parse_text(text: str) -> str:
    """
    Parse text that may or may not be HTML into text which we can analyze
    more easily.
    """
    parser: TextParser = TextParser()
    parser.feed(text)
    result = parser.get_text()
    return result.strip()


def asciify(text: str) -> str:
    """
    Get an ASCII version of the incoming search text.
    """
    return "".join([char if char.isascii() else " " for char in text])


def collect_matching_bounds(text: str, pdf: ExtractOutput) -> list[list[Match]]:
    """
    Collect the extract API bounds that match the particular input text.
    """
    collector = BoundsCollector()
    out: list[list[Match]] = []
    document = asciify(pdf_to_text(pdf))
    search: str = asciify(parse_text(text))

    fuzzy_string = fuzzy_pdf_match(document, search)
    out.extend(collector.collect(fuzzy_string, pdf["elements"]))
    return out


def text_to_annotation(text: str, pdf: ExtractOutput) -> list[dict]:
    matches = collect_matching_bounds(text, pdf)
    now = f"{datetime.datetime.now():%Y-%m-%dT%H:%M:%SZ}"
    return [
        {
            "@context": [
                "https://www.w3.org/ns/anno.jsonld",
                "https://comments.acrobat.com/ns/anno.jsonld",
            ],
            "id": str(uuid4()),
            "type": "Annotation",
            "motivation": "commenting",
            "bodyValue": "",
            "target": {
                "source": "1234",
                "selector": {
                    "node": {"index": el["page_no"]},
                    "quadPoints": el["quadpoints"],
                    "opacity": 1,
                    "subtype": "highlight",
                    "boundingBox": [
                        0,
                        0,
                        pdf["pages"][el["page_no"] - 1]["width"],
                        pdf["pages"][el["page_no"] - 1]["height"],
                    ],
                    "strokeColor": "#F8D147",
                    "type": "AdobeAnnoSelector",
                },
            },
            "creator": {"id": "Guest", "name": "Guest", "type": "Person"},
            "created": now,
            "modified": now,
        }
        for el in convert_matches_to_extract_map(matches)
    ]


def get_bounding_box_rect_from_quadpoints(quadpoints):
    quadpoints = [quadpoints[i : i + 2] for i in range(0, len(quadpoints), 2)]
    quadpoints = np.array(quadpoints)
    small_x = min(quadpoints[:, 0])
    big_y = max(quadpoints[:, 1])
    big_x = max(quadpoints[:, 0])
    small_y = min(quadpoints[:, 1])
    return [small_x, small_y, big_x, big_y]


def fill_one_annotation(uid, bodyvalue, target, creator):
    now = f"{datetime.datetime.now():%Y-%m-%dT%H:%M:%SZ}"

    annotation = {
        "@context": [
            "https://www.w3.org/ns/anno.jsonld",
            "https://comments.acrobat.com/ns/anno.jsonld",
        ],
        "id": str(uid),  # '0d07d124-ac85-43b3-a867-36930f502ac6',
        "type": "Annotation",
        "motivation": "commenting",
        "bodyValue": "",
        "text": bodyvalue,
        "target": target,
        "creator": creator,
        "created": now,
        "modified": now,
    }

    return annotation


def text_to_annotation(
    doc_json: ExtractOutput,
    search_text: list[str],
    document_id: str,
    category: str,
    query: str,
    sorting=True,
) -> list[dict]:
    annotations = []
    for _search_text in search_text:
        creator = {
            "category": category,
            "type": "Person",
            "name": query,
            "status": "none",
            "author": "algorithm",
        }

        quadpoints = []
        try:
            matches = collect_matching_bounds(_search_text, doc_json)
            quadpoints = convert_matches_to_extract_map(matches)
        except Exception as ex:
            logger.error(f"Unable to match text with PDF page location: {ex}")

        if len(quadpoints) == 0:
            target = {}
        else:
            page_no = quadpoints[0]["page_no"]
            qp = quadpoints[0]["quadpoints"]

            bounding_box = get_bounding_box_rect_from_quadpoints(qp)

            target = {
                "source": "id",
                "selector": {
                    "node": {"index": page_no},
                    "quadPoints": qp,
                    "opacity": 0.25,
                    "subtype": "highlight",
                    "boundingBox": bounding_box,
                    "strokeColor": "#faf68e",
                    "type": "AdobeAnnoSelector",
                },
            }

        annotations.append(
            fill_one_annotation(str(uuid4()), _search_text, target, creator)
        )

    def keys_exists(element, *keys):
        if not isinstance(element, dict):
            raise AttributeError("keys_exists() expects dict as first argument.")
        if len(keys) == 0:
            raise AttributeError(
                "keys_exists() expects at least two arguments, one given."
            )

        _element = element
        for key in keys:
            try:
                _element = _element[key]
            except KeyError:
                return False
        return True

    def sort_by_key(e):
        if keys_exists(e, "target", "selector", "boundingBox") and keys_exists(
            e, "target", "selector", "node", "index"
        ):
            return (
                e["target"]["selector"]["node"]["index"],
                e["target"]["selector"]["boundingBox"][0],
            )
        else:
            return (float("inf"), 0, 0)

    if annotations and sorting:
        return sorted(annotations, key=sort_by_key)

    return annotations


def attach_annotations_to_response(a_map: dict):
    a_map["annotations"] = []
    annotations = text_to_annotation(
        EXTRACT, a_map["answer"]["sources"], "document", "category", "source"
    )
    if len(annotations) > 0:
        a_map["annotations"] = annotations
    return a_map
