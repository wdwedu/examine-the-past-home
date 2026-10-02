window.BUILD_PAST_CONFIG={
  "title": "Build a Movement",
  "brief": "Model how historical reform and social movements organized goals, coalitions, communication, tactics, and pressure. The game analyzes strategy historically; it does not advocate a present-day political cause.",
  "principle": "Movements are collective. Their trajectories depend on participants, opponents, institutions, resources, communication, public response, repression, opportunity, and internal debate.",
  "metrics": [
    "Reach",
    "Organization",
    "Pressure"
  ],
  "steps": [
    {
      "category": "Goal",
      "prompt": "How narrowly will the movement define its immediate goal?",
      "context": "Movements often balance broad visions against specific achievable demands.",
      "options": [
        {
          "name": "Single Immediate Demand",
          "desc": "Focus on one clearly defined change.",
          "effect": [
            5,
            15,
            8
          ],
          "note": "A narrow demand can simplify coordination while leaving broader goals unresolved."
        },
        {
          "name": "Broad Reform Platform",
          "desc": "Connect several related demands.",
          "effect": [
            12,
            5,
            8
          ],
          "note": "A broad platform can attract different constituencies while making coordination harder."
        },
        {
          "name": "Long-Term Vision",
          "desc": "Emphasize a transformative future goal.",
          "effect": [
            10,
            0,
            12
          ],
          "note": "A long-term vision can inspire supporters while offering fewer short-term benchmarks."
        }
      ]
    },
    {
      "category": "Coalition",
      "prompt": "How will supporters be organized?",
      "context": "Coalitions can expand reach but create internal differences over priorities and tactics.",
      "options": [
        {
          "name": "Local Chapters",
          "desc": "Build many community organizations.",
          "effect": [
            12,
            15,
            5
          ],
          "note": "Local chapters can deepen participation but require coordination."
        },
        {
          "name": "National Leadership",
          "desc": "Centralize messaging and planning.",
          "effect": [
            8,
            15,
            10
          ],
          "note": "Central leadership can coordinate campaigns while distancing decisions from local members."
        },
        {
          "name": "Broad Alliance",
          "desc": "Partner with unions, churches, clubs, or civic groups.",
          "effect": [
            18,
            5,
            8
          ],
          "note": "Alliances can expand reach while introducing competing priorities."
        }
      ]
    },
    {
      "category": "Tactics",
      "prompt": "Choose a primary historical tactic.",
      "context": "Movements have used petitions, litigation, boycotts, strikes, marches, mutual aid, education, and other tactics; effects depend on context.",
      "options": [
        {
          "name": "Petitions & Lobbying",
          "desc": "Pressure institutions through formal channels.",
          "effect": [
            5,
            10,
            6
          ],
          "note": "Formal channels can create access but may move slowly."
        },
        {
          "name": "Mass Demonstrations",
          "desc": "Make participation visible in public space.",
          "effect": [
            15,
            8,
            15
          ],
          "note": "Demonstrations can signal numbers and urgency while facing opposition or repression."
        },
        {
          "name": "Economic Pressure",
          "desc": "Use boycotts or strikes where historically relevant.",
          "effect": [
            10,
            12,
            18
          ],
          "note": "Economic tactics can create leverage but require sustained organization and participant support."
        }
      ]
    },
    {
      "category": "Communication",
      "prompt": "How will the movement spread information?",
      "context": "Print, speeches, meetings, radio, music, visual symbols, and later media can shape reach and message control.",
      "options": [
        {
          "name": "Local Organizers",
          "desc": "Rely on face-to-face networks.",
          "effect": [
            8,
            15,
            5
          ],
          "note": "Local organizers can build trust while expanding more slowly."
        },
        {
          "name": "Mass Media",
          "desc": "Seek broad newspaper, radio, or television attention.",
          "effect": [
            18,
            3,
            10
          ],
          "note": "Mass media can expand reach while giving outsiders influence over framing."
        },
        {
          "name": "Movement Publications",
          "desc": "Produce dedicated newspapers, pamphlets, or newsletters.",
          "effect": [
            12,
            12,
            6
          ],
          "note": "Movement-controlled media can preserve message control but require resources."
        }
      ]
    },
    {
      "category": "Response & Adaptation",
      "prompt": "How will the movement respond when tactics produce mixed results?",
      "context": "Historical movements often changed tactics after opposition, legal rulings, repression, success, or internal debate.",
      "options": [
        {
          "name": "Evaluate Evidence",
          "desc": "Study participation, institutional response, and unintended effects.",
          "effect": [
            5,
            15,
            10
          ],
          "note": "Feedback can help movements adapt strategy while preserving organizational learning."
        },
        {
          "name": "Repeat the Same Tactic",
          "desc": "Use one tactic regardless of conditions.",
          "effect": [
            0,
            5,
            5
          ],
          "note": "Consistency can signal commitment but may ignore changing circumstances."
        },
        {
          "name": "Fragment Into Separate Groups",
          "desc": "Allow factions to pursue independent strategies.",
          "effect": [
            8,
            -10,
            8
          ],
          "note": "Fragmentation can encourage experimentation while reducing coordination."
        }
      ]
    }
  ],
  "tests": [
    {
      "title": "Historical Evaluation",
      "q": "How should a historian judge whether a movement tactic 'worked'?",
      "options": [
        "Only by whether leaders claimed success.",
        "Define the goal, time period, evidence, and effects on different groups.",
        "Assume the largest crowd always means success."
      ],
      "answer": 1,
      "why": "Effectiveness depends on the stated goal, evidence, time horizon, and consequences."
    },
    {
      "title": "Movement Leadership",
      "q": "A famous leader dominates later memory. What should historians do?",
      "options": [
        "Treat the leader as the whole movement.",
        "Investigate local organizers, participants, institutions, opponents, and networks too.",
        "Ignore leadership entirely."
      ],
      "answer": 1,
      "why": "Movements are collective even when public memory centers individuals."
    },
    {
      "title": "Competing Strategies",
      "q": "Two factions disagree about tactics. What is the strongest historical approach?",
      "options": [
        "Declare one faction correct without evidence.",
        "Compare goals, context, resources, risks, outcomes, and participant perspectives.",
        "Assume disagreement means the movement failed."
      ],
      "answer": 1,
      "why": "Internal debate is historical evidence and should be analyzed rather than flattened into a verdict."
    }
  ],
  "closing": "Your movement profile highlights tradeoffs among reach, organization, and pressure. Historical movements changed through collective action, institutional response, internal debate, and shifting opportunities.",
  "note": "Neutral historical-strategy exercise; it does not recommend a present-day political cause, party, candidate, or tactic.",
  "sources": []
};