window.BUILD_PAST_CONFIG={
  "title": "Build a Trade Network",
  "brief": "Design a historical exchange system linking production zones, markets, routes, information, and risk.",
  "principle": "Trade networks depend on geography, transport costs, trust, security, political authority, demand, and the ability to survive disruption.",
  "metrics": [
    "Reach",
    "Resilience",
    "Cost"
  ],
  "steps": [
    {
      "category": "Hub",
      "prompt": "Choose the network's central hub.",
      "context": "A hub connects routes but also concentrates risk.",
      "options": [
        {
          "name": "Coastal Port",
          "desc": "Connect sea and inland routes.",
          "effect": [
            18,
            0,
            5
          ],
          "note": "Ports extend reach but can be vulnerable to blockade or storms."
        },
        {
          "name": "Inland Crossroads",
          "desc": "Link overland routes from several regions.",
          "effect": [
            12,
            8,
            2
          ],
          "note": "Crossroads can diversify land routes while limiting maritime access."
        },
        {
          "name": "Distributed Markets",
          "desc": "Use several smaller hubs.",
          "effect": [
            8,
            15,
            -5
          ],
          "note": "Distribution improves resilience but raises coordination costs."
        }
      ]
    },
    {
      "category": "Transport",
      "prompt": "Choose the dominant transport system.",
      "context": "Roads, rivers, caravans, and sea lanes have different cost and risk profiles.",
      "options": [
        {
          "name": "River Transport",
          "desc": "Move bulk goods along navigable rivers.",
          "effect": [
            10,
            8,
            12
          ],
          "note": "Rivers can lower transport costs where geography allows."
        },
        {
          "name": "Caravan Routes",
          "desc": "Use staged overland exchange.",
          "effect": [
            12,
            6,
            -2
          ],
          "note": "Caravans connect inland regions but require security and provisioning."
        },
        {
          "name": "Sea Lanes",
          "desc": "Move large cargoes by ship.",
          "effect": [
            20,
            0,
            15
          ],
          "note": "Sea transport can expand reach and lower bulk costs while facing weather and maritime risks."
        }
      ]
    },
    {
      "category": "Goods",
      "prompt": "What mix of goods moves through the network?",
      "context": "High-value goods, staples, and diversified cargo create different incentives.",
      "options": [
        {
          "name": "High-Value Luxuries",
          "desc": "Focus on compact valuable goods.",
          "effect": [
            15,
            -5,
            10
          ],
          "note": "Luxury trade can support long routes but depends on elite demand."
        },
        {
          "name": "Staple Goods",
          "desc": "Move food and basic materials.",
          "effect": [
            5,
            10,
            5
          ],
          "note": "Staple trade supports daily needs but often requires high-volume transport."
        },
        {
          "name": "Diverse Cargo",
          "desc": "Mix luxuries, staples, and raw materials.",
          "effect": [
            10,
            12,
            0
          ],
          "note": "Diversification can spread market risk."
        }
      ]
    },
    {
      "category": "Security",
      "prompt": "How will routes manage risk?",
      "context": "Protection can come from political agreements, escorts, fortified stops, or route diversification.",
      "options": [
        {
          "name": "Political Treaties",
          "desc": "Negotiate safe passage and toll rules.",
          "effect": [
            8,
            10,
            5
          ],
          "note": "Agreements can lower conflict while depending on political stability."
        },
        {
          "name": "Armed Escorts",
          "desc": "Protect valuable shipments directly.",
          "effect": [
            3,
            8,
            -10
          ],
          "note": "Escorts can deter attack but add significant cost."
        },
        {
          "name": "Multiple Routes",
          "desc": "Avoid dependence on one corridor.",
          "effect": [
            8,
            16,
            -8
          ],
          "note": "Route redundancy increases resilience while raising coordination costs."
        }
      ]
    },
    {
      "category": "Information",
      "prompt": "How will traders learn about prices and danger?",
      "context": "Information speed affects market decisions and route choice.",
      "options": [
        {
          "name": "Merchant Networks",
          "desc": "Rely on trusted personal connections.",
          "effect": [
            8,
            10,
            5
          ],
          "note": "Trust networks can move information effectively but may exclude outsiders."
        },
        {
          "name": "Official Posts",
          "desc": "Use state or institutional messengers.",
          "effect": [
            5,
            8,
            0
          ],
          "note": "Official systems can standardize information where governments maintain them."
        },
        {
          "name": "Open Market Signals",
          "desc": "Rely on prices at major fairs and ports.",
          "effect": [
            12,
            0,
            8
          ],
          "note": "Markets reveal demand but information may arrive slowly from distant regions."
        }
      ]
    }
  ],
  "tests": [
    {
      "title": "Route Closure",
      "q": "A major route closes suddenly. Which design feature most directly improves resilience?",
      "options": [
        "Dependence on one hub and one route.",
        "Alternative routes and multiple exchange partners.",
        "Larger decorative market buildings."
      ],
      "answer": 1,
      "why": "Redundancy helps networks reroute around disruptions."
    },
    {
      "title": "Price Change",
      "q": "Demand for one major export collapses. What reduces vulnerability?",
      "options": [
        "A more diverse cargo mix and customer base.",
        "Selling only the same export in greater quantity.",
        "Ignoring price information."
      ],
      "answer": 0,
      "why": "Diversification can reduce exposure to a single market."
    },
    {
      "title": "Historical Evidence",
      "q": "How can historians reconstruct trade networks?",
      "options": [
        "Only from royal chronicles.",
        "Combine shipwrecks, coins, ceramics, merchant records, ports, roads, and other material and written evidence.",
        "Assume modern trade routes existed unchanged in the past."
      ],
      "answer": 1,
      "why": "Networks are reconstructed through multiple evidence types."
    }
  ],
  "closing": "Your network profile shows how reach, resilience, and cost interact. Historical trade systems grew through both opportunity and vulnerability.",
  "note": "Trade effects varied across regions and social groups; network growth should not be treated as automatically beneficial to everyone.",
  "sources": []
};