window.BUILD_PAST_CONFIG={
  "title": "Build a Constitution",
  "brief": "Explore how constitutional structures distribute authority, representation, constraints, and mechanisms for change. This game does not rank one political system as universally best.",
  "principle": "Constitutions make tradeoffs among representation, separated or concentrated powers, rights, federal-local relationships, accountability, and adaptability.",
  "metrics": [
    "Representation",
    "Constraint",
    "Adaptability"
  ],
  "steps": [
    {
      "category": "Legislature",
      "prompt": "Choose a lawmaking structure.",
      "context": "Legislative design affects representation, speed, regional voice, and checks within the lawmaking process.",
      "options": [
        {
          "name": "Single Chamber",
          "desc": "One elected legislative body.",
          "effect": [
            10,
            0,
            10
          ],
          "note": "A single chamber can simplify lawmaking while providing fewer internal legislative checks."
        },
        {
          "name": "Two Chambers",
          "desc": "Two bodies with different bases of representation.",
          "effect": [
            8,
            12,
            0
          ],
          "note": "Bicameralism can create an additional check while making legislation more complex."
        },
        {
          "name": "Mixed Selection",
          "desc": "Combine elected and differently selected members.",
          "effect": [
            3,
            10,
            2
          ],
          "note": "Mixed selection can represent different interests but may produce unequal democratic accountability."
        }
      ]
    },
    {
      "category": "Executive",
      "prompt": "How should executive authority be structured?",
      "context": "Executives can be single or collective, directly or indirectly selected, and more or less constrained by other institutions.",
      "options": [
        {
          "name": "Single Executive",
          "desc": "One chief executive with defined powers.",
          "effect": [
            2,
            5,
            5
          ],
          "note": "A single executive can clarify responsibility while raising questions about concentration of power."
        },
        {
          "name": "Executive Council",
          "desc": "Share authority across a small council.",
          "effect": [
            5,
            8,
            -2
          ],
          "note": "Collective authority can diffuse power while complicating responsibility."
        },
        {
          "name": "Legislative Executive",
          "desc": "Executive leadership depends directly on legislative confidence.",
          "effect": [
            8,
            3,
            8
          ],
          "note": "Linking executive and legislature can align policy direction while reducing separation between branches."
        }
      ]
    },
    {
      "category": "Judicial Review & Courts",
      "prompt": "How independent should courts be from elected branches?",
      "context": "Judicial design affects legal stability, rights enforcement, and democratic accountability.",
      "options": [
        {
          "name": "Independent Courts",
          "desc": "Long tenure and protected judicial authority.",
          "effect": [
            0,
            15,
            -5
          ],
          "note": "Independence can strengthen legal constraint while reducing direct electoral control."
        },
        {
          "name": "Regular Reappointment",
          "desc": "Judges serve renewable terms.",
          "effect": [
            5,
            5,
            8
          ],
          "note": "Renewal can increase accountability while exposing courts to political pressure."
        },
        {
          "name": "Legislative Final Say",
          "desc": "Give the legislature the dominant constitutional role.",
          "effect": [
            8,
            -5,
            10
          ],
          "note": "Legislative supremacy emphasizes elected authority while limiting judicial constraint."
        }
      ]
    },
    {
      "category": "National & Local Power",
      "prompt": "How should authority be divided geographically?",
      "context": "Federal, unitary, and confederal arrangements distribute authority differently between central and regional governments.",
      "options": [
        {
          "name": "Federal Division",
          "desc": "Share constitutionally protected powers between levels.",
          "effect": [
            8,
            10,
            2
          ],
          "note": "Federalism can protect regional authority while creating jurisdictional complexity."
        },
        {
          "name": "Strong Central Authority",
          "desc": "Concentrate most constitutional authority nationally.",
          "effect": [
            4,
            5,
            10
          ],
          "note": "Centralization can promote uniform policy while narrowing regional autonomy."
        },
        {
          "name": "Strong Regional Authority",
          "desc": "Reserve most power to constituent regions.",
          "effect": [
            8,
            2,
            -5
          ],
          "note": "Regional autonomy can increase local control while making collective action harder."
        }
      ]
    },
    {
      "category": "Amendment & Rights",
      "prompt": "How easy should formal constitutional change be?",
      "context": "Amendment rules balance stability against the ability to respond to new conditions; rights protections add another layer of constraint.",
      "options": [
        {
          "name": "High Amendment Threshold",
          "desc": "Require broad agreement for formal change.",
          "effect": [
            0,
            12,
            -12
          ],
          "note": "High thresholds support stability while making adaptation difficult."
        },
        {
          "name": "Moderate Threshold + Rights",
          "desc": "Require broad but attainable agreement and enumerate protected rights.",
          "effect": [
            5,
            10,
            5
          ],
          "note": "This combines a formal rights framework with a structured amendment process."
        },
        {
          "name": "Simple Legislative Amendment",
          "desc": "Allow ordinary legislative majorities to amend.",
          "effect": [
            8,
            -8,
            18
          ],
          "note": "Easy amendment increases adaptability while reducing constitutional entrenchment."
        }
      ]
    }
  ],
  "tests": [
    {
      "title": "Institutional Tradeoff",
      "q": "A constitutional rule makes policy change slower but creates another check on concentrated power. What is the neutral analytical conclusion?",
      "options": [
        "The rule is automatically good.",
        "The rule creates a tradeoff between speed and constraint that should be evaluated in context.",
        "The rule is automatically bad."
      ],
      "answer": 1,
      "why": "Constitutional design involves competing values and consequences, not a universal one-dimensional score."
    },
    {
      "title": "Historical Evidence",
      "q": "To understand how a constitution worked in practice, what should a historian examine?",
      "options": [
        "The constitutional text alone.",
        "Text, laws, court decisions, political practice, elections, institutions, and lived experience.",
        "Only statements by its framers."
      ],
      "answer": 1,
      "why": "Formal rules and actual practice can differ."
    },
    {
      "title": "Change Over Time",
      "q": "What does an amendment process tell us?",
      "options": [
        "How a constitution formally permits change; it does not by itself show how easy change is politically.",
        "Which current political side is correct.",
        "That constitutional meaning never changes outside amendments."
      ],
      "answer": 0,
      "why": "Formal procedures are one part of constitutional change and interpretation."
    }
  ],
  "closing": "Your framework reflects a particular balance among representation, institutional constraint, and adaptability. Different constitutional systems make different tradeoffs, and their effects depend on political culture, history, institutions, and implementation.",
  "note": "Neutral civic simulation: no structure here is presented as the universally correct political choice.",
  "sources": [
    {
      "label": "National Archives: U.S. Constitution",
      "url": "https://www.archives.gov/founding-docs/constitution"
    },
    {
      "label": "National Archives: Founding Documents",
      "url": "https://www.archives.gov/founding-docs"
    }
  ]
};