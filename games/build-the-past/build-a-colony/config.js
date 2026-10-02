window.BUILD_PAST_CONFIG={
  "title": "Build a Colony",
  "brief": "Model the survival pressures and social choices that shaped early colonial settlements. This is a historical systems exercise, not a claim that colonization occurred on empty land or without consequences for Indigenous peoples.",
  "principle": "Settlement outcomes depended on geography, food systems, labor, governance, exchange, disease, conflict, and relationships with existing Indigenous communities.",
  "metrics": [
    "Food",
    "Stability",
    "Exchange"
  ],
  "steps": [
    {
      "category": "Site",
      "prompt": "Choose a settlement location.",
      "context": "Location affects water access, defense, farming, transportation, and exposure to disease.",
      "options": [
        {
          "name": "River Port",
          "desc": "Easy shipping and movement, but vulnerable low ground.",
          "effect": [
            0,
            -5,
            15
          ],
          "note": "A river port can strengthen exchange while creating environmental vulnerabilities."
        },
        {
          "name": "Fertile Interior",
          "desc": "Prioritize cultivable land and fresh water.",
          "effect": [
            15,
            5,
            -8
          ],
          "note": "Fertile land can improve food security but reduce immediate access to ocean trade."
        },
        {
          "name": "Defensible Ridge",
          "desc": "Prioritize visibility and protection.",
          "effect": [
            -5,
            15,
            -8
          ],
          "note": "Defensive terrain can increase security while complicating farming and transport."
        }
      ]
    },
    {
      "category": "Food System",
      "prompt": "How will the settlement feed itself?",
      "context": "Imported food can help temporarily, but local adaptation and diverse production often matter for long-term survival.",
      "options": [
        {
          "name": "Mixed Subsistence",
          "desc": "Combine crops, livestock, fishing, and foraging.",
          "effect": [
            15,
            8,
            0
          ],
          "note": "Diverse food sources can reduce dependence on any single harvest."
        },
        {
          "name": "Imported Staples",
          "desc": "Rely heavily on resupply from overseas.",
          "effect": [
            5,
            -10,
            10
          ],
          "note": "Resupply connects the settlement to overseas networks but creates dependency."
        },
        {
          "name": "Cash Crop First",
          "desc": "Prioritize an export crop early.",
          "effect": [
            0,
            -8,
            18
          ],
          "note": "Export production can expand trade while competing with local food needs."
        }
      ]
    },
    {
      "category": "Labor",
      "prompt": "How is work organized?",
      "context": "Historical colonies used many labor systems, including household labor, indenture, and coercive systems that produced deep inequality and violence.",
      "options": [
        {
          "name": "Household & Community Labor",
          "desc": "Distribute work across households and shared projects.",
          "effect": [
            8,
            12,
            -2
          ],
          "note": "Shared labor can support local resilience but may limit rapid export growth."
        },
        {
          "name": "Contract Labor",
          "desc": "Use time-limited labor contracts.",
          "effect": [
            8,
            0,
            8
          ],
          "note": "Contract labor can increase workforce size while creating disputes over terms and conditions."
        },
        {
          "name": "Coerced Labor System",
          "desc": "Rely on forced labor for production.",
          "effect": [
            15,
            -22,
            15
          ],
          "note": "Coerced labor could raise output for owners while creating severe violence, inequality, resistance, and long-term instability."
        }
      ]
    },
    {
      "category": "Governance",
      "prompt": "How will local decisions be made?",
      "context": "Colonial governments mixed company authority, appointed officials, assemblies, military power, and local practices.",
      "options": [
        {
          "name": "Company Authority",
          "desc": "Centralize decisions in a chartered company.",
          "effect": [
            0,
            0,
            12
          ],
          "note": "Company control can coordinate commercial goals but may distance decisions from settlers."
        },
        {
          "name": "Local Assembly",
          "desc": "Give property-holding settlers a formal local voice.",
          "effect": [
            0,
            12,
            2
          ],
          "note": "Assemblies can widen participation for some residents while still excluding many others."
        },
        {
          "name": "Military Command",
          "desc": "Centralize decisions under security leadership.",
          "effect": [
            -4,
            10,
            -4
          ],
          "note": "Military command can act quickly in crisis while narrowing participation."
        }
      ]
    },
    {
      "category": "Exchange",
      "prompt": "How will the settlement connect to surrounding economies?",
      "context": "Trade involved negotiation, dependency, competition, and unequal power; Indigenous trade networks long predated European settlement.",
      "options": [
        {
          "name": "Regional Exchange",
          "desc": "Build negotiated trade with nearby communities.",
          "effect": [
            8,
            5,
            12
          ],
          "note": "Regional exchange can provide knowledge and goods, but relationships require diplomacy and can become conflictual."
        },
        {
          "name": "Atlantic Export Network",
          "desc": "Focus on overseas markets.",
          "effect": [
            -2,
            -5,
            18
          ],
          "note": "Atlantic trade can generate revenue while increasing dependence on distant markets."
        },
        {
          "name": "Local Self-Sufficiency",
          "desc": "Reduce external dependence.",
          "effect": [
            12,
            8,
            -12
          ],
          "note": "Self-sufficiency can strengthen local resilience while limiting access to imported goods."
        }
      ]
    }
  ],
  "tests": [
    {
      "title": "Existing Communities",
      "q": "A settlement map labels surrounding land as 'unused.' What is the strongest historical response?",
      "options": [
        "Accept the label as proof no one used the land.",
        "Compare the map with Indigenous histories, archaeology, land use, and other records.",
        "Assume every European map was intentionally false."
      ],
      "answer": 1,
      "why": "Maps reflect the mapmaker's knowledge and claims; other evidence is needed to understand existing communities and land use."
    },
    {
      "title": "Bad Harvest",
      "q": "A harvest fails after two years of weak resupply. What does this reveal about the system?",
      "options": [
        "Food strategy and supply dependence interact.",
        "Governance never matters to survival.",
        "One failed harvest explains every colonial outcome."
      ],
      "answer": 0,
      "why": "Environmental conditions, food strategy, supply, labor, and policy can combine."
    },
    {
      "title": "Historical Judgment",
      "q": "What is the best way to evaluate a colonial settlement model?",
      "options": [
        "Use only the settlers' records.",
        "Include settler, Indigenous, environmental, economic, and archaeological evidence.",
        "Treat success in export revenue as the only measure."
      ],
      "answer": 1,
      "why": "Multiple perspectives and evidence types are needed to assess both survival and wider consequences."
    }
  ],
  "closing": "Your colony profile shows tradeoffs among food security, social stability, and exchange. Historical settlements were shaped by choices, but also by forces settlers did not control and by the rights and actions of people already living in the region.",
  "note": "Historical simulation for analysis; it does not endorse colonization or coercive labor.",
  "sources": []
};