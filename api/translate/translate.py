from typing import TypedDict, NotRequired
from itertools import groupby
from nltk.tokenize import sent_tokenize
import re


class Element(TypedDict):
    """
    A class describing the elements the extract API captures.
    """

    Bounds: NotRequired[list[float]]  # There are always 4.
    CharBounds: NotRequired[list[list[float]]]
    Page: NotRequired[int]
    Text: NotRequired[str]
    Path: NotRequired[str]


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


def element_name(path: str):
    if "P" in path:
        return "PARAGRAPH"
    if "Figure" in path:
        return "FIGURE"
    if "Table" in path:
        return "TABLE"
    return ""


def translate_extract_document(extract: ExtractOutput) -> str:
    """
    Translate the output of the Extract API to a string for ChatGPT to understand.
    """
    elements_with_pages = [
        el
        for el in extract["elements"]
        if "Page" in el and "Text" in el and "Path" in el
    ]
    sorted_elements = sorted(elements_with_pages, key=lambda x: x["Page"])
    grouped_elements = groupby(sorted_elements, key=lambda x: x["Page"])
    out: str = ""
    for page, elements in grouped_elements:
        out += f"PAGE {page}:\n"
        element_numbers = {"cur_paragraph": 1, "cur_figure": 1, "cur_table": 1, "cur_sentence": 1}
        element_name_map = {
            "PARAGRAPH": "cur_paragraph",
            "FIGURE": "cur_figure",
            "TABLE": "cur_table",
        }
        for _, element in enumerate(elements):
            name = element_name(element['Path'])
            if name == '':
                continue
            element_key = element_name_map[name]
            out += f"\t{name} {element_numbers[element_key]}:\n"
            element_numbers[element_key] += 1
            sentences = sent_tokenize(element['Text'])
            for sentence in sentences:
                out += f"\t\tSENTENCE {element_numbers['cur_sentence']}:\n\t\t\t{sentence}\n"
                element_numbers['cur_sentence'] += 1
            element_numbers['cur_sentence'] = 1
    return out
