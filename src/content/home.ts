/**
 * Homepage content. All copy for the marketing page lives here so that
 * sections stay presentational and text can be edited in one place.
 *
 * Multi-line copy is expressed as string arrays where the line breaks are
 * meaningful to the rhythm of the writing; components render one <p> per entry.
 */

export type CardGlyph = "flask" | "lens" | "cube" | "orbit" | "lattice" | "spiral" | "waveform";

export const hero = {
  eyebrow: "Personal laboratory",
  headline: {
    lead: "Built by experience.",
    accent: "Expanded by AI.",
  },
  subheadline:
    "Human experience meets artificial intelligence to investigate, build, and rethink what's possible.",
  paragraph:
    "I'm exploring what happens when decades of real-world problem solving meet tools capable of researching, testing, creating, and iterating at a speed we've never had before.",
  primaryCta: { label: "Explore the Build", href: "#building" },
  secondaryCta: { label: "Follow the Journey", href: "#final-cta" },
  supportingLine:
    "No hype. No predetermined conclusions. Ask better questions, test what we can, and build what works.",
} as const;

export const whatThisIs = {
  id: "what-this-is",
  heading: "What This Is",
  intro: "A personal laboratory for ideas worth testing.",
  supporting:
    "Colin's AI is where curiosity becomes experiments, investigations become evidence, and ideas become things we can actually use.",
  cards: [
    {
      title: "AI Experiments",
      glyph: "flask" as CardGlyph,
      copy: "Hands-on work with models, agents, tools, interfaces and emerging technology to figure out what actually works — not what the marketing says should work.",
    },
    {
      title: "Evidence First",
      glyph: "lens" as CardGlyph,
      copy: "Start with the question. Find the strongest evidence available. Separate what we know from what we suspect. Test what can be tested. Change the conclusion when the evidence changes.",
    },
    {
      title: "Digital Products",
      glyph: "cube" as CardGlyph,
      copy: "Practical tools and intelligent systems built to solve real problems, reduce friction and explore entirely new ways of working.",
    },
  ],
} as const;

export type Project = {
  slug: string;
  title: string;
  headline?: string;
  copy: readonly string[];
  emphasis?: string;
  cta: { label: string; href: string };
  glyph: CardGlyph;
  accent: "blue" | "cyan" | "violet" | "aurora";
};

export const building = {
  id: "building",
  heading: "What I'm Building",
  eyebrow: "Exploring. Building. Shipping.",
  supporting: ["Not everything here will succeed.", "That's part of the point."],
  projects: [
    {
      slug: "future-os",
      title: "Future OS",
      headline:
        "What if software understood where you're trying to go, not just what button you clicked?",
      copy: [
        "An experiment in creating a more human, adaptive relationship between people and intelligent systems.",
      ],
      cta: { label: "Explore Future OS", href: "/projects" },
      glyph: "orbit",
      accent: "blue",
    },
    {
      slug: "ai-experiments",
      title: "AI Experiments",
      copy: ["Models. Agents. Voice. Images. Automation. Interfaces."],
      emphasis: "Can this actually do something better than we could before?",
      cta: { label: "See the experiments", href: "/projects" },
      glyph: "lattice",
      accent: "cyan",
    },
    {
      slug: "investigations",
      title: "Investigations",
      copy: [
        "Some things deserve more than a headline, a Reddit comment or somebody else's conclusion.",
        "We collect the evidence, challenge assumptions and see where it actually leads.",
      ],
      cta: { label: "Explore investigations", href: "/investigations" },
      glyph: "spiral",
      accent: "violet",
    },
    {
      slug: "content",
      title: "Content",
      copy: [
        "The builds, failures, discoveries and occasional “holy shit, this actually works” moments along the way.",
        "Articles, videos and notes from the journey.",
      ],
      cta: { label: "Follow along", href: "/projects" },
      glyph: "waveform",
      accent: "aurora",
    },
  ] satisfies readonly Project[],
} as const;

export const howIWork = {
  id: "how-i-work",
  heading: "How I Work",
  concept: ["Question", "Test", "Build"],
  steps: [
    {
      number: "01",
      title: "Question",
      copy: [
        "Start with curiosity.",
        "What are we assuming?",
        "What do we actually know?",
        "What would change our mind?",
      ],
    },
    {
      number: "02",
      title: "Test",
      copy: [
        "Research it. Compare sources. Prototype it. Break it.",
        "Use AI to shorten the distance between “I wonder…” and “now we know.”",
      ],
    },
    {
      number: "03",
      title: "Build",
      copy: [
        "When an idea survives the test, make something with it.",
        "A tool.",
        "An experiment.",
        "A product.",
        "A better question.",
        "Then repeat.",
      ],
    },
  ],
} as const;

export const story = {
  id: "story",
  heading: "From the shop floor to intelligent systems.",
  copy: [
    "I spent decades solving problems in the physical world — where measurements matter, machines either run or they don't, and a theory eventually has to survive contact with reality.",
    "Then AI changed the equation.",
    "For the first time, one person can investigate ideas, compare enormous amounts of information, prototype software, create media and test possibilities at a speed that used to require entire teams.",
    "I didn't leave that real-world experience behind.",
    "I brought it with me.",
    "Colin's AI is the bridge between those two worlds: hands-on experience and machine intelligence.",
    "And I'm still finding out where that bridge leads.",
  ],
} as const;

export const invitation = {
  id: "invitation",
  heading: "You don't need to be an AI expert.",
  subheading: "You just need to be curious.",
  copy: "This is for builders, skeptics, creators, tradespeople, technologists and anyone who has ever looked at the way something is done and thought:",
  emphasis: "There has to be a better way.",
  closing: ["There probably is.", "Let's find it."],
} as const;

export const finalCta = {
  id: "final-cta",
  heading: "Let's build what's next.",
  copy: "Follow the experiments, investigations and products as they happen.",
  primaryCta: { label: "Follow the Journey", href: "/contact" },
  secondaryCta: { label: "Get in Touch", href: "/contact" },
  supportingLine: "New builds. New questions. Useful discoveries. No corporate bullshit.",
} as const;
