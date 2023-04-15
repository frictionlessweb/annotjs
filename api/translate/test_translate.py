from translate.translate import translate_extract_document, ExtractOutput


def test_simple_example():
    input: ExtractOutput = {
        "elements": [
            {"Page": 1, "Text": "Page 1 Paragraph 1. This is the second sentence.", "Path": "/P/1"},
            {"Page": 1, "Text": "Page 1 Paragraph 2", "Path": "/P/2"},
            {"Page": 1, "Text": "Page 1 Paragraph 3", "Path": "/P/3"},
            {"Page": 2, "Text": "Page 2 Paragraph 1", "Path": "/P/4"},
            {"Page": 2, "Text": "Page 2 Figure 1", "Path": "/Document/Figure"},
            {"Page": 2, "Text": "Page 2 Figure 2", "Path": "/Document/Figure[2]"},
            {"Page": 2, "Text": "Page 2 Table 1", "Path": "/Document/Table"},
            {"Page": 2, "Text": "Page 2 Table 2", "Path": "/Document/Table[2]"},
        ],
        "pages": [],
    }
    expected = "PAGE 1:\n\tPARAGRAPH 1:\n\t\tSENTENCE 1:\n\t\t\tPage 1 Paragraph 1.\n\t\tSENTENCE 2:\n\t\t\tThis is the second sentence.\n\tPARAGRAPH 2:\n\t\tSENTENCE 1:\n\t\t\tPage 1 Paragraph 2\n\tPARAGRAPH 3:\n\t\tSENTENCE 1:\n\t\t\tPage 1 Paragraph 3\nPAGE 2:\n\tPARAGRAPH 1:\n\t\tSENTENCE 1:\n\t\t\tPage 2 Paragraph 1\n\tFIGURE 1:\n\t\tSENTENCE 1:\n\t\t\tPage 2 Figure 1\n\tFIGURE 2:\n\t\tSENTENCE 1:\n\t\t\tPage 2 Figure 2\n\tTABLE 1:\n\t\tSENTENCE 1:\n\t\t\tPage 2 Table 1\n\tTABLE 2:\n\t\tSENTENCE 1:\n\t\t\tPage 2 Table 2\n"
    actual = translate_extract_document(input)
    assert actual == expected
