import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "public", "downloads");
fs.mkdirSync(outDir, { recursive: true });

const PROJECT_NAME = "DevShelf Academy";

const sources = [
  {
    title: "Open Data Structures",
    author: "Pat Morin",
    license: "Creative Commons Attribution 2.5",
    url: "https://opendatastructures.org/",
  },
  {
    title: "Dive Into Python 3",
    author: "Mark Pilgrim",
    license: "Creative Commons Attribution-ShareAlike",
    url: "https://diveintopython3.net/",
  },
  {
    title: "Comprehensive Rust",
    author: "Google Android Team and contributors",
    license: "CC BY 4.0",
    url: "https://google.github.io/comprehensive-rust/",
  },
  {
    title: "Structure and Interpretation of Computer Programs",
    author: "Harold Abelson, Gerald Jay Sussman, Julie Sussman",
    license: "CC BY-SA 4.0",
    url: "https://web.mit.edu/6.001/6.037/sicp.pdf",
  },
  {
    title: "Introduction to Graph Theory",
    author: "Darij Grinberg",
    license: "CC0 1.0",
    url: "https://www.cip.ifi.lmu.de/~grinberg/t/22s/graphs.pdf",
  },
];

const topicBank = {
  fundamentals: [
    "variables and naming",
    "expressions and evaluation",
    "conditionals",
    "loops",
    "functions",
    "input validation",
    "strings",
    "lists",
    "dictionaries",
    "files",
    "modules",
    "debugging",
  ],
  structures: [
    "arrays and lists",
    "stacks",
    "queues",
    "hash maps",
    "sets",
    "linked structures",
    "trees",
    "graphs",
    "search",
    "sorting",
    "complexity",
    "memory tradeoffs",
  ],
  systems: [
    "ownership",
    "borrowing",
    "lifetimes",
    "error handling",
    "interfaces",
    "modules",
    "testing",
    "concurrency",
    "state management",
    "safe refactoring",
    "performance notes",
    "release checklist",
  ],
};

const productPlans = [
  {
    file: "Starter-Study-Kit.pdf",
    title: "Starter Study Kit",
    subtitle: "Programming fundamentals, daily study rhythm, and first practical projects.",
    pages: 200,
    paths: ["fundamentals"],
    price: "EUR 161",
  },
  {
    file: "Digital-Notes-Bundle.pdf",
    title: "Digital Notes Bundle",
    subtitle: "A developer note-taking system with templates, summaries, and review workflows.",
    pages: 220,
    paths: ["fundamentals", "structures"],
    price: "EUR 199",
  },
  {
    file: "Method-Starter-Pack.pdf",
    title: "Method Starter Pack",
    subtitle: "A repeatable study method for learning programming, abstraction, and problem solving.",
    pages: 240,
    paths: ["fundamentals", "structures"],
    price: "EUR 219",
  },
  {
    file: "Practice-File-Lab.pdf",
    title: "Practice File Lab",
    subtitle: "Drills, worksheets, debugging logs, and programming challenge pages.",
    pages: 260,
    paths: ["fundamentals", "structures", "systems"],
    price: "EUR 245",
  },
  {
    file: "Resource-Desk-Pack.pdf",
    title: "Resource Desk Pack",
    subtitle: "Reference pages, project templates, review checklists, and workflow documents.",
    pages: 280,
    paths: ["fundamentals", "structures", "systems"],
    price: "EUR 249",
  },
  {
    file: "Advanced-Study-Vault.pdf",
    title: "Advanced Study Vault",
    subtitle: "Algorithms, data structures, Rust fundamentals, and deeper systems thinking.",
    pages: 320,
    paths: ["structures", "systems", "fundamentals"],
    price: "EUR 250",
  },
  {
    file: "Professional-Archive.pdf",
    title: "Professional Archive",
    subtitle: "Professional project planning, implementation reviews, and portfolio-ready study tracks.",
    pages: 360,
    paths: ["systems", "structures", "fundamentals"],
    price: "EUR 255",
  },
  {
    file: "Complete-Digital-Library.pdf",
    title: "Complete Digital Library",
    subtitle: "The full DevShelf Academy programming study library in one complete digital product.",
    pages: 420,
    paths: ["fundamentals", "structures", "systems"],
    price: "EUR 500",
  },
];

function escapePdf(text) {
  return String(text)
    .replace(/\\/g, "\\\\")
    .replace(/\(/g, "\\(")
    .replace(/\)/g, "\\)");
}

function wrapText(text, maxChars = 88) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";

  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }

  if (line) lines.push(line);
  return lines;
}

function cycle(array, index) {
  return array[index % array.length];
}

function makeLessonPage(plan, pageNumber) {
  const pathName = cycle(plan.paths, pageNumber - 2);
  const topics = topicBank[pathName];
  const topic = cycle(topics, pageNumber + plan.title.length);
  const nextTopic = cycle(topics, pageNumber + plan.title.length + 3);
  const mode = pageNumber % 6;

  if (mode === 0) {
    return {
      heading: `Lesson ${pageNumber - 1}: ${titleCase(topic)}`,
      body: [
        `Goal: understand ${topic} well enough to use it in a small program without copying a tutorial.`,
        `Start by writing a plain English definition. Then write one code-shaped example using names from a realistic project, not generic words like foo or data.`,
        `The practical test is simple: if you can change the input, predict the output, and explain why the code still works, the concept is becoming usable knowledge.`,
        `Connect this lesson with ${nextTopic}. Good developers do not memorize isolated facts; they connect a tool to the problem it solves and the tradeoff it creates.`,
      ],
      tasks: [
        `Write a 12 line example that uses ${topic}.`,
        "Mark each line as input, transformation, decision, storage, or output.",
        "Create one broken version and describe the error in your own words.",
        "Rewrite the solution with clearer names and fewer assumptions.",
      ],
    };
  }

  if (mode === 1) {
    return {
      heading: `Worksheet ${pageNumber - 1}: Build With ${titleCase(topic)}`,
      body: [
        `This worksheet turns ${topic} into a working exercise. Keep the scope small and finish one version before adding features.`,
        "A useful exercise has a visible result, a small data set, and at least one edge case. Do not skip the edge case: it teaches more than the happy path.",
        `Use ${nextTopic} as the optional extension if the first version works cleanly.`,
      ],
      tasks: [
        "Define the input in one sentence.",
        "Define the output in one sentence.",
        "List three invalid inputs and how the program should respond.",
        "Add one review note after the task is complete.",
      ],
    };
  }

  if (mode === 2) {
    return {
      heading: `Debug Log ${pageNumber - 1}: ${titleCase(topic)}`,
      body: [
        `Debugging ${topic} requires slowing down and proving each assumption. The fastest path is usually the smallest reproducible example.`,
        "Record the exact symptom, the line or block you suspect, and the test that proves the fix. A good debug log prevents the same mistake from becoming a weekly habit.",
        `When the fix is complete, explain how this mistake relates to ${nextTopic}.`,
      ],
      tasks: [
        "Write the error or wrong output exactly.",
        "Write what you expected instead.",
        "Write the smallest input that triggers the problem.",
        "Write the final rule you learned from the fix.",
      ],
    };
  }

  if (mode === 3) {
    return {
      heading: `Reference Page ${pageNumber - 1}: ${titleCase(topic)}`,
      body: [
        `${titleCase(topic)} should be kept as a practical reference: when to use it, what it costs, and what mistake usually appears first.`,
        "Avoid writing references as long articles. The best reference page can be scanned in under one minute and then used immediately while coding.",
        `Compare it with ${nextTopic}: if both can solve the same task, write why one is clearer or cheaper.`,
      ],
      tasks: [
        "Write one use case.",
        "Write one anti-pattern.",
        "Write one performance or readability tradeoff.",
        "Write one mini example that fits on half a page.",
      ],
    };
  }

  if (mode === 4) {
    return {
      heading: `Project Step ${pageNumber - 1}: Apply ${titleCase(topic)}`,
      body: [
        `Use ${topic} inside a small project rather than as a disconnected exercise. The project can be a tracker, parser, file organizer, quiz, search tool, or API helper.`,
        "Keep the first version boring and reliable. Add style, extra commands, or interface details only after the behavior is stable.",
        `The extension step should involve ${nextTopic}, so the project grows through a real technical reason.`,
      ],
      tasks: [
        "Write the feature as a user action.",
        "List the data the feature needs.",
        "Describe the function boundaries.",
        "Add one test case for normal input and one for invalid input.",
      ],
    };
  }

  return {
    heading: `Review ${pageNumber - 1}: Connect ${titleCase(topic)} To Practice`,
    body: [
      `This review page checks whether ${topic} is becoming automatic. Review is not rereading; review means producing something from memory and checking it against reality.`,
      "If the concept is still blurry, reduce the example until it has only one moving part. Then add complexity back one piece at a time.",
      `Write how ${topic} supports or conflicts with ${nextTopic}.`,
    ],
    tasks: [
      "Explain the concept in three sentences.",
      "Write one example without looking anything up.",
      "Circle the step where you felt uncertain.",
      "Schedule one follow-up exercise for tomorrow.",
    ],
  };
}

function titleCase(value) {
  return String(value).replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function ownershipLines(plan) {
  return [
    `${PROJECT_NAME} owns this compiled product, page layout, original study structure, original explanations, exercises, worksheets, and delivery package.`,
    "Referenced open educational sources remain owned by their respective authors and are credited in the attribution section.",
    "This PDF is sold as a DevShelf Academy educational study product, not as a resale of a third-party book.",
    `Product: ${plan.title}`,
    `Listed price: ${plan.price}`,
  ];
}

function makePages(plan) {
  const pages = [];

  pages.push({
    title: plan.title,
    subtitle: plan.subtitle,
    lines: [
      `${PROJECT_NAME} programming education product`,
      `Edition: 2026 commercial digital study pack`,
      `Total pages: ${plan.pages}`,
      "",
      ...ownershipLines(plan),
      "",
      "How to use this file: complete one lesson page, one worksheet page, and one review page per study session. Write code while reading; passive reading is not enough.",
    ],
  });

  pages.push({
    title: "Study System Overview",
    subtitle: "Read less randomly. Build more deliberately.",
    lines: [
      "This product is organized as a repeatable learning system. Every topic is paired with a task, a review prompt, and a small project angle.",
      "The best way to use the pack is to move page by page, but you can also search for a topic and use a single page as a practical checklist.",
      "Core cycle: read the page, write the smallest possible example, break it once, fix it, and record the lesson.",
      "Every page is original DevShelf Academy instructional material. Open sources are used as conceptual references and credited at the end.",
    ],
  });

  while (pages.length < plan.pages - 2) {
    const lesson = makeLessonPage(plan, pages.length + 1);
    pages.push({
      title: lesson.heading,
      subtitle: "Original DevShelf Academy lesson page",
      lines: [...lesson.body, "", "Practice tasks:", ...lesson.tasks.map((task) => `- ${task}`)],
    });
  }

  pages.push({
    title: "Final Review Checklist",
    subtitle: "Use this page before moving to the next product or a larger project.",
    lines: [
      "Can you explain the strongest concept from this pack without opening the PDF?",
      "Can you point to one program you wrote because of this pack?",
      "Can you name one mistake you now understand better?",
      "Can you identify the next topic that deserves deeper practice?",
      "Save your final notes next to your code. Your code is the proof that the study worked.",
      "",
      ...ownershipLines(plan),
    ],
  });

  pages.push({
    title: "Attribution and License Notes",
    subtitle: "Open educational references used while preparing this original product.",
    lines: [
      "DevShelf Academy prepared this PDF as an original study product with original structure, explanations, worksheets, review pages, and practice tasks.",
      "The following open sources were used as references for topic selection and educational framing. No third-party book is being resold as-is.",
      "",
      ...sources.flatMap((source) => [
        `${source.title}`,
        `Author: ${source.author}`,
        `License: ${source.license}`,
        `URL: ${source.url}`,
        "",
      ]),
      "If you adapt or redistribute material derived from share-alike sources, follow the compatible license terms and provide attribution.",
    ],
  });

  return pages;
}

function pageToStream(page, pageIndex, totalPages) {
  const commands = ["BT", "/F1 9 Tf", "50 812 Td", "12 TL"];
  commands.push(`(${escapePdf(`${PROJECT_NAME} | ${pageIndex}/${totalPages}`)}) Tj`);
  commands.push("0 -34 Td");
  commands.push("/F2 22 Tf");
  for (const line of wrapText(page.title, 48)) {
    commands.push(`(${escapePdf(line)}) Tj`);
    commands.push("0 -26 Td");
  }
  commands.push("/F1 12 Tf");
  for (const line of wrapText(page.subtitle, 70)) {
    commands.push(`(${escapePdf(line)}) Tj`);
    commands.push("0 -18 Td");
  }
  commands.push("0 -10 Td");
  commands.push("/F1 10.5 Tf");

  for (const rawLine of page.lines) {
    if (rawLine === "") {
      commands.push("0 -10 Td");
      continue;
    }
    for (const line of wrapText(rawLine, 87)) {
      commands.push(`(${escapePdf(line)}) Tj`);
      commands.push("0 -15 Td");
    }
  }

  commands.push("ET");
  commands.push("BT");
  commands.push("/F1 8 Tf");
  commands.push("50 32 Td");
  commands.push(`(${escapePdf(`${PROJECT_NAME} owns this compiled study product. Open references are credited in this PDF.`)}) Tj`);
  commands.push("ET");
  return commands.join("\n");
}

function createPdf(filePath, plan) {
  const pages = makePages(plan);
  const objects = [];
  const contentStreams = pages.map((page, index) => pageToStream(page, index + 1, pages.length));
  const pageIds = pages.map((_, index) => 6 + index * 2);

  objects[0] = "<< /Type /Catalog /Pages 2 0 R >>";
  objects[1] = `<< /Type /Pages /Kids [${pageIds.map((id) => `${id} 0 R`).join(" ")}] /Count ${pages.length} >>`;
  objects[2] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>";
  objects[3] = "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>";

  contentStreams.forEach((stream, index) => {
    const contentId = 5 + index * 2;
    const pageId = 6 + index * 2;
    objects[contentId - 1] = `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`;
    objects[pageId - 1] = `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 842] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${contentId} 0 R >>`;
  });

  let pdf = "%PDF-1.4\n";
  const offsets = [0];

  for (let i = 0; i < objects.length; i += 1) {
    offsets.push(Buffer.byteLength(pdf));
    pdf += `${i + 1} 0 obj\n${objects[i]}\nendobj\n`;
  }

  const xrefOffset = Buffer.byteLength(pdf);
  pdf += `xref\n0 ${objects.length + 1}\n`;
  pdf += "0000000000 65535 f \n";

  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }

  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  fs.writeFileSync(filePath, pdf);
}

for (const plan of productPlans) {
  createPdf(path.join(outDir, plan.file), plan);
}

console.log(`Generated ${productPlans.length} large DevShelf product PDFs in ${outDir}`);
