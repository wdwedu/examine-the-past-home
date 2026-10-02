window.BUILD_PAST_CONFIG={
  "title": "Build a Civilization",
  "brief": "Assemble interacting systems that can support a complex society while recognizing that civilizations developed in many different forms.",
  "principle": "Food production, water management, governance, specialization, exchange, belief, defense, and environment can reinforce—or strain—one another.",
  "metrics": [
    "Provision",
    "Coordination",
    "Exchange"
  ],
  "steps": [
    {
      "category": "Water & Settlement",
      "prompt": "How will communities organize around water?",
      "context": "Reliable water can support farming, transport, and dense settlement, but different environments require different solutions.",
      "options": [
        {
          "name": "River Valley",
          "desc": "Concentrate settlement near a major river.",
          "effect": [
            15,
            5,
            10
          ],
          "note": "Rivers can support irrigation and transport while also bringing flood risk."
        },
        {
          "name": "Rain-Fed Highlands",
          "desc": "Use smaller settlements adapted to seasonal rain.",
          "effect": [
            8,
            8,
            -3
          ],
          "note": "Rain-fed systems can spread risk but may support less concentrated infrastructure."
        },
        {
          "name": "Canal Network",
          "desc": "Invest heavily in engineered water control.",
          "effect": [
            14,
            14,
            3
          ],
          "note": "Irrigation can raise production while requiring labor coordination and maintenance."
        }
      ]
    },
    {
      "category": "Food Production",
      "prompt": "Choose a food strategy.",
      "context": "Surplus can support specialization, but monoculture can create vulnerability.",
      "options": [
        {
          "name": "Diverse Crops",
          "desc": "Grow several staple and secondary crops.",
          "effect": [
            15,
            5,
            0
          ],
          "note": "Diversity can reduce risk from a single crop failure."
        },
        {
          "name": "Staple Surplus",
          "desc": "Concentrate on a highly productive staple.",
          "effect": [
            18,
            8,
            -2
          ],
          "note": "Large surplus can support cities while increasing dependence on one crop system."
        },
        {
          "name": "Agro-Pastoral Mix",
          "desc": "Combine farming with herding.",
          "effect": [
            12,
            3,
            5
          ],
          "note": "Mixed production can spread risk and connect different ecological zones."
        }
      ]
    },
    {
      "category": "Governance",
      "prompt": "How are large projects coordinated?",
      "context": "Complex societies used many governing forms, from councils and city-states to monarchies and bureaucracies.",
      "options": [
        {
          "name": "Council Network",
          "desc": "Coordinate through local councils.",
          "effect": [
            0,
            10,
            4
          ],
          "note": "Local councils can preserve regional voice while making large projects slower to coordinate."
        },
        {
          "name": "Central Bureaucracy",
          "desc": "Use appointed officials and records.",
          "effect": [
            2,
            18,
            5
          ],
          "note": "Bureaucracy can coordinate taxes and projects while concentrating administrative power."
        },
        {
          "name": "City-State System",
          "desc": "Keep several competing urban centers.",
          "effect": [
            2,
            5,
            12
          ],
          "note": "Competition can encourage trade and innovation while also creating rivalry."
        }
      ]
    },
    {
      "category": "Specialization",
      "prompt": "How will specialized work develop?",
      "context": "Crafts, record keeping, military service, trade, and religious roles often depended on agricultural surplus.",
      "options": [
        {
          "name": "Guild & Workshop Districts",
          "desc": "Organize specialized crafts in urban centers.",
          "effect": [
            -2,
            8,
            15
          ],
          "note": "Specialization can improve production and exchange but depends on reliable food supply."
        },
        {
          "name": "Household Production",
          "desc": "Keep most craft work within households.",
          "effect": [
            5,
            4,
            -5
          ],
          "note": "Household production can be resilient while limiting scale."
        },
        {
          "name": "State Workshops",
          "desc": "Direct specialized production through institutions.",
          "effect": [
            -3,
            15,
            8
          ],
          "note": "Central workshops can mobilize resources but increase administrative demands."
        }
      ]
    },
    {
      "category": "Long-Distance Exchange",
      "prompt": "How much should the society depend on outside networks?",
      "context": "Trade can bring scarce materials and ideas while exposing societies to external disruption.",
      "options": [
        {
          "name": "Regional Markets",
          "desc": "Prioritize nearby exchange.",
          "effect": [
            5,
            5,
            10
          ],
          "note": "Regional markets balance access with shorter supply chains."
        },
        {
          "name": "Long-Distance Routes",
          "desc": "Invest in caravans, ports, or sea trade.",
          "effect": [
            -2,
            3,
            20
          ],
          "note": "Long-distance trade expands access and wealth while increasing exposure to distant shocks."
        },
        {
          "name": "Limited External Trade",
          "desc": "Prioritize internal production.",
          "effect": [
            8,
            5,
            -12
          ],
          "note": "Lower dependence can reduce external risk but limits access to scarce materials."
        }
      ]
    }
  ],
  "tests": [
    {
      "title": "Drought",
      "q": "A multi-year drought reduces harvests. Which response best reflects systems thinking?",
      "options": [
        "Look only at rulers' decisions.",
        "Examine water systems, food diversity, storage, trade, and social responses together.",
        "Assume drought produces the same result in every society."
      ],
      "answer": 1,
      "why": "Environmental stress interacts with institutions and resources."
    },
    {
      "title": "New Trade Route",
      "q": "A new route brings metal, ideas, and merchants. What should a historian investigate?",
      "options": [
        "Only the imported goods.",
        "Economic, cultural, political, and social effects across different groups.",
        "Assume trade always helps everyone equally."
      ],
      "answer": 1,
      "why": "Exchange can create different benefits and costs across a society."
    },
    {
      "title": "Evidence",
      "q": "Which evidence combination best reconstructs a complex society?",
      "options": [
        "Only monumental architecture.",
        "Archaeology, texts where available, environmental data, material culture, and settlement patterns.",
        "Only later legends."
      ],
      "answer": 1,
      "why": "Multiple evidence types reduce dependence on a single surviving record."
    }
  ],
  "closing": "Your civilization profile illustrates how provision, coordination, and exchange can develop in different combinations. Complex societies did not follow one universal path.",
  "note": "The term civilization is used here as a historical systems category, not a ranking of human worth or cultural superiority.",
  "sources": []
};