export type DevShelfProduct = {
  slug: string;
  name: string;
  price: string;
  amount: number;
  priceId: string;
  tag: string;
  shortDescription: string;
  description: string;
  downloadFile: string;
  includes: string[];
};

export const products: DevShelfProduct[] = [
  {
    slug: "csharp-foundation-kit",
    name: "C# Foundation Kit",
    price: "EUR 161",
    amount: 161,
    priceId: "pri_01kwegvcfyape1fy1nwv9v34dv",
    tag: "Starter",
    shortDescription: "C# syntax notes, examples and practice tasks for a clean programming base.",
    description: "Beginner-friendly C# PDF lessons, syntax notes, examples, and practice tasks for building a clean programming base.",
    downloadFile: "/downloads/CSharp-Foundation-Kit.pdf",
    includes: ["C# fundamentals", "Syntax notes", "Practice tasks", "Study checklist"],
  },
  {
    slug: "dotnet-developer-bundle",
    name: ".NET Developer Bundle",
    price: "EUR 199",
    amount: 199,
    priceId: "pri_01kwegvd2gcwjcy4jy12ky0e0d",
    tag: "Popular",
    shortDescription: ".NET guides, runtime notes, project patterns and learning worksheets.",
    description: "Structured .NET guides, runtime notes, project patterns, and learning worksheets for independent study.",
    downloadFile: "/downloads/DotNET-Developer-Bundle.pdf",
    includes: [".NET runtime notes", "Project patterns", "Learning worksheets", "Reference files"],
  },
  {
    slug: "aspnet-core-starter",
    name: "ASP.NET Core Starter",
    price: "EUR 219",
    amount: 219,
    priceId: "pri_01kwegvdmj1g6rbcr5z4d1srvk",
    tag: "Web dev",
    shortDescription: "ASP.NET Core course files, MVC/API notes and deployment checklists.",
    description: "ASP.NET Core course files, MVC/API notes, deployment checklists, and practical web development resources.",
    downloadFile: "/downloads/ASP.NET-Core-Starter.pdf",
    includes: ["ASP.NET Core notes", "API checklist", "MVC overview", "Deployment steps"],
  },
  {
    slug: "programming-practice-lab",
    name: "Programming Practice Lab",
    price: "EUR 245",
    amount: 245,
    priceId: "pri_01kwegve71ty3r4fmpmg94f3x6",
    tag: "Practice",
    shortDescription: "Exercises, problem sets, checklists and progress trackers.",
    description: "Code exercises, problem sets, checklists, and progress trackers for regular programming practice.",
    downloadFile: "/downloads/Programming-Practice-Lab.pdf",
    includes: ["Problem sets", "Practice sheets", "Progress tracker", "Review checklist"],
  },
  {
    slug: "software-engineering-notes",
    name: "Software Engineering Notes",
    price: "EUR 249",
    amount: 249,
    priceId: "pri_01kwegvesqdx9wb64xv9vz5vvm",
    tag: "Core skills",
    shortDescription: "Reference sheets, planning templates and workflow notes.",
    description: "Core software engineering study files, reference sheets, planning templates, and clean workflow notes.",
    downloadFile: "/downloads/Software-Engineering-Notes.pdf",
    includes: ["Reference sheets", "Planning templates", "Workflow notes", "Study assets"],
  },
  {
    slug: "advanced-csharp-course",
    name: "Advanced C# Course Pack",
    price: "EUR 250",
    amount: 250,
    priceId: "pri_01kwegvfc9e6wzsrsgpybkpagv",
    tag: "Advanced",
    shortDescription: "OOP, LINQ, async patterns and applied project notes.",
    description: "Advanced C# materials with object-oriented programming, LINQ, async patterns, and applied project notes.",
    downloadFile: "/downloads/Advanced-CSharp-Course-Pack.pdf",
    includes: ["OOP notes", "LINQ examples", "Async patterns", "Applied projects"],
  },
  {
    slug: "modern-dotnet-pro-pack",
    name: "Modern .NET Pro Pack",
    price: "EUR 255",
    amount: 255,
    priceId: "pri_01kwegvfyrz47pw4z4rxebmcmx",
    tag: "Pro pack",
    shortDescription: "Modern .NET archive with architecture notes and reusable study files.",
    description: "Modern .NET and C# resource archive with deeper examples, architecture notes, and reusable study files.",
    downloadFile: "/downloads/Modern-DotNET-Pro-Pack.pdf",
    includes: ["Architecture notes", "Modern .NET files", "Reusable examples", "Study archive"],
  },
  {
    slug: "complete-devshelf-library",
    name: "Complete DevShelf Library",
    price: "EUR 500",
    amount: 500,
    priceId: "pri_01kwegvgqn1dh2p9d73z3qxwwv",
    tag: "Complete",
    shortDescription: "Full programming library with C#, .NET, ASP.NET Core and bonuses.",
    description: "Full programming library bundle with C#, .NET, ASP.NET Core, exercises, notes, templates, and bonus resources.",
    downloadFile: "/downloads/Complete-DevShelf-Library.pdf",
    includes: ["Complete PDF library", "C# and .NET files", "ASP.NET Core resources", "Bonus templates"],
  },
];

export const productMap = Object.fromEntries(products.map((product) => [product.slug, product])) as Record<string, DevShelfProduct>;
