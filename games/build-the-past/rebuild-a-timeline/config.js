window.BUILD_PAST_CONFIG={
  "title": "Rebuild a Timeline",
  "brief": "Reconstruct a damaged historical sequence by choosing anchors, testing before-and-after relationships, and separating chronology from causation.",
  "principle": "Chronology is the skeleton of historical explanation, but dates alone do not prove why one event caused another.",
  "metrics": [
    "Chronology",
    "Evidence",
    "Causation"
  ],
  "steps": [
    {
      "category": "Anchor Event",
      "prompt": "Choose the strongest starting anchor.",
      "context": "Reliable fixed dates help organize uncertain evidence.",
      "options": [
        {
          "name": "Dated Official Record",
          "desc": "Start from a record with a verified date.",
          "effect": [
            18,
            12,
            0
          ],
          "note": "A securely dated record can anchor surrounding events."
        },
        {
          "name": "Later Memory",
          "desc": "Start from a memoir written decades later.",
          "effect": [
            5,
            4,
            2
          ],
          "note": "Memory can be valuable but should be checked against contemporary evidence."
        },
        {
          "name": "Undated Tradition",
          "desc": "Start from a story with uncertain date.",
          "effect": [
            0,
            2,
            3
          ],
          "note": "Traditions can preserve meaning while offering weaker chronological precision."
        }
      ]
    },
    {
      "category": "Before & After",
      "prompt": "How will you place the next event?",
      "context": "Relative chronology can come from references within documents, material layers, or known sequences.",
      "options": [
        {
          "name": "Internal Reference",
          "desc": "Use a document that mentions an earlier event.",
          "effect": [
            12,
            8,
            0
          ],
          "note": "Internal references can establish relative order."
        },
        {
          "name": "Visual Similarity",
          "desc": "Place events together because images look alike.",
          "effect": [
            2,
            0,
            0
          ],
          "note": "Appearance alone is weak chronological evidence."
        },
        {
          "name": "Multiple Date Clues",
          "desc": "Combine calendar, location, and sequence clues.",
          "effect": [
            15,
            15,
            0
          ],
          "note": "Independent clues strengthen chronological placement."
        }
      ]
    },
    {
      "category": "Corroboration",
      "prompt": "How will you test the order?",
      "context": "Independent sources can confirm or challenge a proposed sequence.",
      "options": [
        {
          "name": "Compare Independent Records",
          "desc": "Cross-check separate sources.",
          "effect": [
            10,
            18,
            3
          ],
          "note": "Agreement across independent evidence increases confidence."
        },
        {
          "name": "Repeat the Same Source",
          "desc": "Reread one source several times.",
          "effect": [
            2,
            2,
            0
          ],
          "note": "Close reading helps, but it is not independent corroboration."
        },
        {
          "name": "Use Later Summary",
          "desc": "Rely on a later textbook summary.",
          "effect": [
            5,
            5,
            2
          ],
          "note": "Summaries can orient research but should be traced back to evidence."
        }
      ]
    },
    {
      "category": "Uncertainty",
      "prompt": "How will you handle a disputed date?",
      "context": "Historical timelines often include approximate dates or competing interpretations.",
      "options": [
        {
          "name": "Mark as Approximate",
          "desc": "Show a date range and explain why.",
          "effect": [
            10,
            12,
            8
          ],
          "note": "Visible uncertainty is more honest than false precision."
        },
        {
          "name": "Pick One Date Silently",
          "desc": "Choose a single date without explanation.",
          "effect": [
            5,
            -10,
            -5
          ],
          "note": "False precision can hide genuine uncertainty."
        },
        {
          "name": "Remove the Event",
          "desc": "Exclude anything disputed.",
          "effect": [
            0,
            -5,
            -5
          ],
          "note": "Removing uncertainty can erase important historical debates."
        }
      ]
    },
    {
      "category": "Explanation",
      "prompt": "How will you connect sequence to causation?",
      "context": "Earlier events can create conditions for later ones, but sequence alone is not proof of cause.",
      "options": [
        {
          "name": "Test Mechanisms",
          "desc": "Ask how one event could influence another.",
          "effect": [
            5,
            10,
            18
          ],
          "note": "Causal explanation needs a plausible mechanism supported by evidence."
        },
        {
          "name": "Assume Earlier Means Cause",
          "desc": "Treat sequence as proof of causation.",
          "effect": [
            8,
            -5,
            -15
          ],
          "note": "Post hoc sequence is not enough to establish cause."
        },
        {
          "name": "List Dates Only",
          "desc": "Avoid causal questions entirely.",
          "effect": [
            12,
            0,
            -10
          ],
          "note": "A chronology can be accurate without explaining change."
        }
      ]
    }
  ],
  "tests": [
    {
      "title": "Conflicting Dates",
      "q": "Two credible sources give different dates for the same event. What should you do?",
      "options": [
        "Hide the disagreement.",
        "Document both, investigate provenance, and explain the uncertainty.",
        "Choose the date you prefer."
      ],
      "answer": 1,
      "why": "Disagreement is evidence to investigate, not something to conceal."
    },
    {
      "title": "Sequence vs. Cause",
      "q": "Event A happened before Event B. What can you conclude?",
      "options": [
        "A caused B.",
        "A may be relevant, but causation requires a supported mechanism and other evidence.",
        "B caused A."
      ],
      "answer": 1,
      "why": "Chronology is necessary for many causal claims but not sufficient."
    },
    {
      "title": "Best Timeline",
      "q": "What makes a timeline historically strong?",
      "options": [
        "Exact dates for everything, even when uncertain.",
        "Transparent sourcing, justified sequence, and visible uncertainty where needed.",
        "The fewest possible events."
      ],
      "answer": 1,
      "why": "Strong timelines show how placements are known and where knowledge remains uncertain."
    }
  ],
  "closing": "Your rebuilt timeline balances chronological precision with evidence and causal reasoning. A strong timeline is transparent about both order and uncertainty.",
  "note": "Historical chronology should display uncertainty rather than manufacture precision.",
  "sources": []
};