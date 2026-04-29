export const JD_TEMPLATE = {
  title: "Senior Frontend Engineer",
  department: "Engineering",
  location: "Bengaluru (Hybrid)",
  jobType: "Full-time",
  experienceMin: 4,
  experienceMax: 7,
  openings: 2,
  employmentType: "Permanent",
  responsibilities: [
    "Build and ship polished product surfaces with a strong eye for UX detail.",
    "Collaborate with design and backend to shape cohesive product experiences.",
    "Own frontend quality: performance, accessibility, and testability.",
    "Mentor engineers on React, TypeScript, and modern UI patterns.",
  ],
  interviewSettings: {
    codeEditor: true,
    mobile: false,
    avatar: true,
    faceMatch: true,
    resumeBased: true,
    manualMode: false,
    webcam: true,
    secondaryCam: false,
  },
  questionType: "scenario" as const,
  maxQuestions: 10,
  autoSkipSeconds: 120,
  customQuestions: [
    "Describe a complex React performance bug you debugged — what did you try, what worked?",
    "Walk me through how you'd architect a real-time collaborative editor.",
  ],
  skillGroups: [
    {
      name: "Core Frontend",
      criteria: "All Mandatory" as const,
      skills: ["React 19", "TypeScript", "Next.js", "CSS Architecture"],
    },
    {
      name: "Quality & Tooling",
      criteria: "At Least One" as const,
      skills: ["Testing (Vitest/Playwright)", "Performance profiling", "Accessibility"],
    },
    {
      name: "Nice to have",
      criteria: "None" as const,
      skills: ["Framer Motion", "Three.js", "Design systems"],
    },
  ],
};

export type DemoCandidate = {
  id: string;
  name: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  fitPercent: number;
  fitLevel: "high" | "medium" | "low";
  trustScore: number;
  aiRoundScore: number;
  cheatingFlags: number;
  overallScore: number;
  avatarHue: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  keyConcerns: string[];
  recommendation: "strong_hire" | "hire" | "maybe" | "no_hire";
  recommendationText: string;
  skills: {
    name: string;
    rating: number;
    evaluation: string;
  }[];
  questions: {
    id: number;
    question: string;
    answer: string;
    score: number;
    positives: string[];
    concerns: string[];
  }[];
  dimensionalScores: {
    technical: number;
    communication: number;
    problemSolving: number;
    confidence: number;
  };
};

export const CANDIDATES: DemoCandidate[] = [
  {
    id: "c_001",
    name: "Aarav Mehta",
    initials: "AM",
    role: "Senior Frontend Engineer",
    email: "aarav.mehta@example.com",
    phone: "+91 98xxx 22145",
    fitPercent: 91,
    fitLevel: "high",
    trustScore: 9.4,
    aiRoundScore: 88,
    cheatingFlags: 0,
    overallScore: 89,
    avatarHue: 220,
    summary:
      "Strong technical depth paired with clear communication. Answers showed first-principles thinking on performance and state modelling. Confident scenario walkthroughs, with concrete tradeoffs rather than generic patterns.",
    strengths: [
      "Excellent mental model of React reconciliation and concurrent rendering.",
      "Precise vocabulary — distinguished paint vs layout vs commit where it mattered.",
      "Offered tradeoffs (RSC vs client fetch, cache-then-revalidate vs SWR) unprompted.",
      "Product instinct: flagged accessibility and empty states without being asked.",
    ],
    weaknesses: [
      "Testing strategy was thinner than implementation depth.",
      "Defaulted to known libraries rather than reasoning about first principles twice.",
    ],
    keyConcerns: [],
    recommendation: "strong_hire",
    recommendationText:
      "Strong hire. Deep frontend expertise with mature tradeoff thinking. Would raise the bar on any product team.",
    skills: [
      { name: "React 19", rating: 5, evaluation: "Explained Suspense boundaries and transitions with worked examples." },
      { name: "TypeScript", rating: 5, evaluation: "Comfortable with conditional/mapped types and variance." },
      { name: "Next.js", rating: 4, evaluation: "Clear on App Router, RSC streaming, and caching boundaries." },
      { name: "CSS Architecture", rating: 4, evaluation: "Design-token first, understood cascade layers." },
      { name: "Testing", rating: 3, evaluation: "Pragmatic but not ideology — favours Playwright for integration." },
      { name: "Accessibility", rating: 4, evaluation: "Knows ARIA landmarks, focus management, keyboard traps." },
    ],
    questions: [
      {
        id: 1,
        question: "Walk me through how you'd architect a real-time collaborative editor.",
        answer:
          "I'd start with CRDT vs OT — for a document editor I'd go Yjs because of the mature ecosystem. The canonical state lives in a Y.Doc, persisted via a provider (y-websocket or a Liveblocks-style managed service). For presence (cursors, selections) I'd use the awareness protocol, which is ephemeral and doesn't bloat the document. On the render side, I'd wrap the editor in a binding — say y-prosemirror — so local edits produce ops and remote ops patch the editor. The tricky bits are undo (need a y-undo-manager scoped per-user to avoid undoing someone else's edit) and offline (buffer ops and merge on reconnect — CRDT handles the merge automatically). Scaling: one doc per room, persist snapshots on idle, GC tombstones periodically.",
        score: 95,
        positives: [
          "Chose CRDT for the right reason (eventual consistency + offline merges).",
          "Called out presence as separate from document state.",
          "Addressed undo scoping — subtle correctness point most miss.",
        ],
        concerns: [
          "Didn't touch conflict surfacing in UI (e.g. 'someone else is editing this block').",
        ],
      },
      {
        id: 2,
        question: "Describe a complex React performance bug you debugged.",
        answer:
          "We had a dashboard that janked on every keystroke in a filter input. Profiler showed the entire tree re-rendering. Root cause: a Context provider held the filter value and was consumed by a chart grid three levels deep — so every keystroke re-rendered the grid. The fix was two-fold: split the context into a 'value' context and a 'setter' context so components that only dispatch don't subscribe to value changes; then memoised the chart row with a custom comparator keyed on the props it actually read. Keystroke cost dropped from 180ms to sub-frame.",
        score: 90,
        positives: [
          "Identified context-shape as the real bug, not 'add memo everywhere'.",
          "Measured before and after — frame-time not vibes.",
        ],
        concerns: ["Could have mentioned useDeferredValue as an alternative lever."],
      },
      {
        id: 3,
        question: "How do you think about accessibility in a design system?",
        answer:
          "Accessibility is a system property, not a component property. The system has to make the accessible path the default — colour tokens that meet contrast in both themes, focus rings that survive composition, keyboard handlers baked into primitives (Menu, Dialog, Combobox). I lean on Radix or Ark for the hard primitives because rolling your own focus trap is a losing fight. Audit-wise I run axe in CI on a storybook build so regressions block the PR.",
        score: 82,
        positives: [
          "Framed accessibility as defaults, not audits.",
          "Named concrete primitives — not hand-wavy.",
        ],
        concerns: [
          "Light on screen-reader testing — didn't mention NVDA/VoiceOver flows.",
        ],
      },
    ],
    dimensionalScores: {
      technical: 92,
      communication: 90,
      problemSolving: 89,
      confidence: 86,
    },
  },
  {
    id: "c_002",
    name: "Priya Raghavan",
    initials: "PR",
    role: "Senior Frontend Engineer",
    email: "priya.r@example.com",
    phone: "+91 98xxx 33190",
    fitPercent: 82,
    fitLevel: "high",
    trustScore: 9.1,
    aiRoundScore: 81,
    cheatingFlags: 0,
    overallScore: 81,
    avatarHue: 280,
    summary:
      "Solid, pragmatic engineer. Real production experience with Next.js App Router. Prefers shipping to theorising — answers were concrete and battle-tested.",
    strengths: [
      "Shipped three production Next.js migrations — scars and lessons.",
      "Strong instinct for incremental rollout and feature flags.",
    ],
    weaknesses: [
      "Less depth on rendering internals compared to top candidate.",
      "Tended to reach for libraries before reasoning from first principles.",
    ],
    keyConcerns: [],
    recommendation: "hire",
    recommendationText: "Hire. Reliable senior with strong shipping instincts. Will move the team forward on product velocity.",
    skills: [
      { name: "React 19", rating: 4, evaluation: "Fluent on hooks, handles concurrent edges with care." },
      { name: "TypeScript", rating: 4, evaluation: "Uses generics well, avoids over-typing." },
      { name: "Next.js", rating: 5, evaluation: "Led two App Router migrations — deep operational knowledge." },
      { name: "CSS Architecture", rating: 3, evaluation: "Tailwind-first, comfortable but not opinionated." },
      { name: "Testing", rating: 4, evaluation: "Playwright in CI, snapshot discipline." },
      { name: "Accessibility", rating: 3, evaluation: "Knows basics, defers to component libraries." },
    ],
    questions: [
      {
        id: 1,
        question: "Walk me through how you'd architect a real-time collaborative editor.",
        answer:
          "I'd lean on a managed service — Liveblocks or similar — because the infrastructure (presence, persistence, permissions) is non-trivial. I'd wrap the editor (Tiptap or Lexical) in a room, push ops through the provider, and keep awareness for cursors. For auth I'd sign room tokens server-side scoped to document IDs.",
        score: 78,
        positives: ["Pragmatic: buy vs build tradeoff was clear.", "Thought about auth scoping."],
        concerns: ["Didn't engage with the distributed systems side — CRDTs, merge semantics."],
      },
      {
        id: 2,
        question: "Describe a complex React performance bug you debugged.",
        answer:
          "Our product catalog's filter sidebar was dropping frames on mobile. Turned out an animated icon library we imported was shipping 400kb of JS and every filter click mounted 30 of them. Replaced with inline SVGs, added react-window for the result list, and moved filter computation into a useDeferredValue so typing stayed responsive. Cut TBT by 60%.",
        score: 80,
        positives: ["Fixed both bundle size AND rendering cost.", "Measured TBT."],
        concerns: ["Bundle bloat is more 'audit' than 'debug' — a little surface-level."],
      },
    ],
    dimensionalScores: {
      technical: 83,
      communication: 82,
      problemSolving: 80,
      confidence: 84,
    },
  },
  {
    id: "c_003",
    name: "Rohan Kapoor",
    initials: "RK",
    role: "Senior Frontend Engineer",
    email: "rohan.k@example.com",
    phone: "+91 97xxx 11048",
    fitPercent: 64,
    fitLevel: "medium",
    trustScore: 7.9,
    aiRoundScore: 68,
    cheatingFlags: 1,
    overallScore: 66,
    avatarHue: 30,
    summary:
      "Competent mid-level profile reaching for senior. Good fundamentals but shallow on system-level decisions. One minor tab-switching flag during a coding segment — not disqualifying but worth a follow-up.",
    strengths: [
      "Clean code under pressure — refactored on the fly without breaking.",
      "Good communication — asked clarifying questions before diving in.",
    ],
    weaknesses: [
      "Systems thinking is still growing — mostly cited patterns without reasoning from tradeoffs.",
      "Testing story felt rehearsed rather than lived.",
    ],
    keyConcerns: [
      "One tab-switch event detected during coding round (duration ~18s).",
    ],
    recommendation: "maybe",
    recommendationText: "Maybe — schedule a focused systems round before deciding.",
    skills: [
      { name: "React 19", rating: 4, evaluation: "Comfortable, but reasoning felt textbook." },
      { name: "TypeScript", rating: 3, evaluation: "Types are correct but defensive — lots of `any` in edge cases." },
      { name: "Next.js", rating: 3, evaluation: "Knows Pages Router well, learning App Router." },
      { name: "CSS Architecture", rating: 3, evaluation: "Tailwind user, no deep opinion on tokens or layers." },
      { name: "Testing", rating: 2, evaluation: "Named Jest + RTL but couldn't discuss flake mitigation." },
      { name: "Accessibility", rating: 3, evaluation: "Knows ARIA basics." },
    ],
    questions: [
      {
        id: 1,
        question: "Walk me through how you'd architect a real-time collaborative editor.",
        answer:
          "I'd use WebSockets to broadcast changes to everyone in the room. When someone types, we send the diff and the others apply it. For conflicts, I'd use operational transform.",
        score: 58,
        positives: ["Named OT correctly."],
        concerns: [
          "Didn't explain how OT resolves conflicts.",
          "No mention of persistence, offline, or presence.",
          "Tab-switch detected for 18s during this answer.",
        ],
      },
      {
        id: 2,
        question: "Describe a complex React performance bug you debugged.",
        answer:
          "We had a slow table, so I added React.memo to the row component and it got faster.",
        score: 55,
        positives: [],
        concerns: [
          "Thin on detail — no measurement, no root cause.",
          "Didn't distinguish memo from deeper issues like context shape.",
        ],
      },
    ],
    dimensionalScores: {
      technical: 68,
      communication: 72,
      problemSolving: 62,
      confidence: 70,
    },
  },
  {
    id: "c_004",
    name: "Saanvi Desai",
    initials: "SD",
    role: "Senior Frontend Engineer",
    email: "saanvi.d@example.com",
    phone: "+91 90xxx 55722",
    fitPercent: 71,
    fitLevel: "medium",
    trustScore: 8.5,
    aiRoundScore: 74,
    cheatingFlags: 0,
    overallScore: 73,
    avatarHue: 340,
    summary:
      "Strong product instincts, competent engineer. Comes from a design-engineering background — thinks in flows and states first, implementation second. Technical depth slightly below bar on architecture questions.",
    strengths: ["Unusual design sensibility for an engineer.", "Excellent at turning vague requirements into concrete states."],
    weaknesses: ["Less confident on performance internals.", "Hasn't led a migration end-to-end."],
    keyConcerns: [],
    recommendation: "maybe",
    recommendationText: "Maybe — strong for a design-engineering role specifically, borderline for pure senior FE.",
    skills: [
      { name: "React 19", rating: 4, evaluation: "Fluent, especially on form and interaction patterns." },
      { name: "TypeScript", rating: 3, evaluation: "Functional, not deep." },
      { name: "Next.js", rating: 3, evaluation: "Uses it, no strong operational opinion yet." },
      { name: "CSS Architecture", rating: 5, evaluation: "Standout — articulate on tokens, motion, and restraint." },
      { name: "Testing", rating: 3, evaluation: "Playwright for critical paths." },
      { name: "Accessibility", rating: 5, evaluation: "Excellent — led the a11y audit at her last company." },
    ],
    questions: [
      {
        id: 1,
        question: "Walk me through how you'd architect a real-time collaborative editor.",
        answer:
          "I'd start with the UX — what happens when two cursors land on the same block, how conflicts surface visually, what the offline indicator looks like. Then underneath I'd use a CRDT library like Yjs because it handles merges without blocking the UI thread. Presence layer is separate, cheap to broadcast.",
        score: 76,
        positives: ["Led with UX — rare and valuable.", "Chose CRDT for the right reason."],
        concerns: ["Didn't go deep on the data model or scaling considerations."],
      },
      {
        id: 2,
        question: "Describe a complex React performance bug you debugged.",
        answer:
          "An animation sequence dropped frames on low-end Android. I profiled with Chrome's performance tab on a throttled CPU, found the culprit was an opacity transition on a 2000-element list. Moved to `content-visibility: auto` for off-screen items and the dropped frames vanished.",
        score: 78,
        positives: ["Used `content-visibility` — rare and right.", "Tested on a real low-end profile, not just desktop."],
        concerns: [],
      },
    ],
    dimensionalScores: {
      technical: 72,
      communication: 82,
      problemSolving: 76,
      confidence: 74,
    },
  },
  {
    id: "c_005",
    name: "Vikram Shetty",
    initials: "VS",
    role: "Senior Frontend Engineer",
    email: "vikram.s@example.com",
    phone: "+91 88xxx 40912",
    fitPercent: 38,
    fitLevel: "low",
    trustScore: 5.2,
    aiRoundScore: 42,
    cheatingFlags: 4,
    overallScore: 41,
    avatarHue: 10,
    summary:
      "Multiple integrity flags detected during the session. Technical answers were generic and frequently contradicted the resume. Not recommended.",
    strengths: ["Fluent speaker — presented confidently."],
    weaknesses: [
      "Answers were generic; couldn't go two levels deep on any claim.",
      "Resume and session contradicted on 'led a migration' claim.",
    ],
    keyConcerns: [
      "4 tab-switch events during the session (total ~2m 40s).",
      "Second face detected in frame on 2 occasions.",
      "Copy-paste pattern in code editor consistent with external source.",
    ],
    recommendation: "no_hire",
    recommendationText: "Not recommended — multiple integrity signals plus shallow technical depth. Do not advance.",
    skills: [
      { name: "React 19", rating: 2, evaluation: "Named concepts correctly but couldn't explain them." },
      { name: "TypeScript", rating: 2, evaluation: "Surface-level." },
      { name: "Next.js", rating: 2, evaluation: "Textbook answers." },
      { name: "CSS Architecture", rating: 2, evaluation: "No strong opinion." },
      { name: "Testing", rating: 1, evaluation: "Couldn't discuss beyond 'we write Jest tests'." },
      { name: "Accessibility", rating: 1, evaluation: "Not engaged — 'designers handle it'." },
    ],
    questions: [
      {
        id: 1,
        question: "Walk me through how you'd architect a real-time collaborative editor.",
        answer:
          "I'd use WebSockets and a database. Each user sends their changes, server broadcasts to everyone else. For conflicts we'd use last-write-wins.",
        score: 35,
        positives: [],
        concerns: [
          "Last-write-wins in a collaborative editor causes data loss.",
          "No mention of document model, persistence, or consistency.",
          "Tab-switch detected during answer (45s).",
        ],
      },
      {
        id: 2,
        question: "Describe a complex React performance bug you debugged.",
        answer:
          "There was a slow page. I added useMemo and it got faster.",
        score: 32,
        positives: [],
        concerns: [
          "No root-cause analysis.",
          "Useless without context — what was slow, what was measured.",
          "Second face detected in frame during this answer.",
        ],
      },
    ],
    dimensionalScores: {
      technical: 38,
      communication: 58,
      problemSolving: 36,
      confidence: 64,
    },
  },
];
