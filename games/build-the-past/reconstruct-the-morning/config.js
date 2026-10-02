window.BUILD_PAST_CONFIG={
  "title": "Reconstruct the Morning",
  "brief": "Piece together a historical morning from partial records, conflicting testimony, locations, and timestamps.",
  "principle": "Microhistory works by assembling small pieces of evidence while keeping uncertainty visible.",
  "metrics": [
    "Chronology",
    "Corroboration",
    "Confidence"
  ],
  "steps": [
    {
      "category": "Time Anchor",
      "prompt": "Choose the strongest time anchor.",
      "context": "A reliable timestamp can organize the rest of the reconstruction.",
      "options": [
        {
          "name": "Clocked Official Record",
          "desc": "A log records an event at a specific time.",
          "effect": [
            18,
            10,
            8
          ],
          "note": "A contemporaneous timed log is a strong anchor if its clock and provenance are reliable."
        },
        {
          "name": "Later Memory",
          "desc": "A witness remembers 'around midmorning.'",
          "effect": [
            5,
            5,
            0
          ],
          "note": "Memory can help but usually offers less precision."
        },
        {
          "name": "Undated Photograph",
          "desc": "A photograph shows conditions but no confirmed time.",
          "effect": [
            0,
            5,
            2
          ],
          "note": "Visual evidence may require external dating."
        }
      ]
    },
    {
      "category": "Witness",
      "prompt": "How will you use witness testimony?",
      "context": "Witnesses can observe different parts of the same event and may disagree.",
      "options": [
        {
          "name": "Compare Independent Witnesses",
          "desc": "Look for points of agreement and disagreement.",
          "effect": [
            8,
            18,
            10
          ],
          "note": "Independent overlap can strengthen confidence while disagreements remain informative."
        },
        {
          "name": "Choose the Most Detailed Witness",
          "desc": "Assume detail equals accuracy.",
          "effect": [
            4,
            -5,
            -5
          ],
          "note": "Detail alone does not guarantee reliability."
        },
        {
          "name": "Average All Memories",
          "desc": "Blend conflicting accounts into one story.",
          "effect": [
            5,
            0,
            -5
          ],
          "note": "Averaging can erase meaningful disagreement."
        }
      ]
    },
    {
      "category": "Location",
      "prompt": "Use physical location evidence.",
      "context": "Distances and routes can test whether a proposed sequence is possible.",
      "options": [
        {
          "name": "Map Travel Times",
          "desc": "Check routes and plausible movement.",
          "effect": [
            12,
            10,
            8
          ],
          "note": "Spatial constraints can rule out impossible sequences."
        },
        {
          "name": "Ignore Distance",
          "desc": "Treat all locations as equally close.",
          "effect": [
            -8,
            -5,
            -10
          ],
          "note": "Geography can be crucial to chronology."
        },
        {
          "name": "Use One Landmark",
          "desc": "Anchor the story to one known place.",
          "effect": [
            5,
            5,
            2
          ],
          "note": "A landmark helps, but multiple locations provide stronger spatial reconstruction."
        }
      ]
    },
    {
      "category": "Physical Record",
      "prompt": "Add material evidence.",
      "context": "Receipts, logs, photographs, tools, or environmental traces can corroborate testimony.",
      "options": [
        {
          "name": "Cross-Check Material Record",
          "desc": "Compare objects or records with testimony.",
          "effect": [
            8,
            18,
            10
          ],
          "note": "Independent physical evidence can strengthen or challenge witness accounts."
        },
        {
          "name": "Use It as Decoration",
          "desc": "Mention the object without testing claims.",
          "effect": [
            0,
            0,
            -5
          ],
          "note": "Evidence matters only when connected to a question."
        },
        {
          "name": "Assume Objects Explain Motive",
          "desc": "Infer intention directly from an object.",
          "effect": [
            0,
            -5,
            -10
          ],
          "note": "Material evidence rarely reveals motive by itself."
        }
      ]
    },
    {
      "category": "Unknowns",
      "prompt": "How will you report what remains uncertain?",
      "context": "A reconstruction can be useful without pretending every minute is known.",
      "options": [
        {
          "name": "Mark Confidence Levels",
          "desc": "Separate confirmed, probable, and unknown elements.",
          "effect": [
            10,
            12,
            18
          ],
          "note": "Explicit confidence levels keep the reconstruction transparent."
        },
        {
          "name": "Fill Gaps Smoothly",
          "desc": "Invent the most convenient missing steps.",
          "effect": [
            8,
            -15,
            -20
          ],
          "note": "A coherent story is not evidence."
        },
        {
          "name": "Delete All Uncertain Events",
          "desc": "Keep only fully verified moments.",
          "effect": [
            5,
            5,
            5
          ],
          "note": "Excessive caution can remove useful probable relationships."
        }
      ]
    }
  ],
  "tests": [
    {
      "title": "Conflicting Witnesses",
      "q": "Two witnesses disagree by fifteen minutes. What should you do?",
      "options": [
        "Pick the witness you like.",
        "Compare vantage point, timing method, other records, and possible memory error.",
        "Average the times and call it certain."
      ],
      "answer": 1,
      "why": "Witness disagreement should be investigated rather than hidden."
    },
    {
      "title": "Impossible Route",
      "q": "A proposed sequence requires someone to cross town faster than available transport allowed. What follows?",
      "options": [
        "The sequence needs revision.",
        "Transportation never matters.",
        "The map must be wrong."
      ],
      "answer": 0,
      "why": "Spatial constraints can falsify a reconstruction."
    },
    {
      "title": "Final Report",
      "q": "What is the strongest way to present a partly uncertain reconstruction?",
      "options": [
        "Distinguish confirmed, probable, and unresolved elements.",
        "Write one smooth story without qualifiers.",
        "Exclude all evidence that conflicts."
      ],
      "answer": 0,
      "why": "Confidence labels preserve both usefulness and honesty."
    }
  ],
  "closing": "Your reconstruction profile shows how chronology, corroboration, and confidence work together. Microhistory becomes stronger when gaps and conflicts remain visible.",
  "note": "The goal is a transparent reconstruction, not a falsely complete story.",
  "sources": []
};