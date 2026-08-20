export interface BlogSection {
  heading: string;
  paragraphs: string[];
  takeaway?: string;
}

export interface BlogArticle {
  slug: string;
  title: string;
  cluster: "Web & Software" | "Backend & APIs" | "AI & Automation" | "Finance & Fintech";
  badge: string;
  readingTime: string;
  publishedDate: string;
  author: string;
  heroExcerpt: string;
  sections: BlogSection[];
  connectedServices?: { title: string; href: string; tag: string }[];
  connectedSolutions?: { title: string; href: string; badge: string }[];
  connectedTools?: { title: string; href: string; badge: string }[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export interface GuideSection {
  id: string;
  title: string;
  content: string[];
  keyPoints?: string[];
}

export interface PillarGuide {
  slug: string;
  title: string;
  pillarTopic: string;
  readingTime: string;
  publishedDate: string;
  summary: string;
  targetAudience: string[];
  architectureSummary: string;
  sections: GuideSection[];
  connectedServices: { title: string; href: string; tag: string }[];
  connectedSolutions: { title: string; href: string; badge: string }[];
  connectedTools?: { title: string; href: string; badge: string }[];
  faqs: { question: string; answer: string }[];
  metaTitle: string;
  metaDescription: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  badge: string;
  clientType: string;
  challenge: string;
  context: string;
  solution: string;
  architectureHighlights: string[];
  keyFeatures: string[];
  engineeringDecisions: { decision: string; rationale: string }[];
  technicalMetrics: string[];
  technologies: string[];
  connectedServices: { title: string; href: string; tag: string }[];
  connectedSolutions: { title: string; href: string; badge: string }[];
  liveToolLink?: { title: string; href: string };
  metaTitle: string;
  metaDescription: string;
}

// ─── 12 BLOG ARTICLES ─────────────────────────────────────────────────────────

export const BLOG_ARTICLES: Record<string, BlogArticle> = {
  "what-is-web-application-development": {
    slug: "what-is-web-application-development",
    title: "What Is Web Application Development? A Modern Engineering Guide",
    cluster: "Web & Software",
    badge: "Web Architecture",
    readingTime: "6 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Understand how modern web applications combine decoupled client interfaces, asynchronous backend APIs, and relational databases to power interactive digital products.",
    sections: [
      {
        heading: "1. Defining a Modern Web Application",
        paragraphs: [
          "Unlike static websites that deliver pre-rendered informational pages, a web application is dynamic software running in the browser. Web apps allow users to authenticate, manipulate complex datasets, execute transactions, and receive real-time updates.",
          "Modern web applications are built using client-side JavaScript frameworks (such as Next.js and React) communicating with backend microservices via REST or GraphQL APIs.",
        ],
        takeaway: "Web applications are interactive software platforms designed around dynamic user state and business logic.",
      },
      {
        heading: "2. The Modern Full-Stack Architecture",
        paragraphs: [
          "A production-grade web application architecture consists of three decoupled layers: the presentation layer (Next.js/React), the application API gateway (Fastify/Node.js), and the persistence tier (PostgreSQL/Redis).",
          "Decoupling the frontend from the backend ensures optimal performance: frontends can be cached at the edge via CDNs, while backends scale independently to handle heavy transaction throughput.",
        ],
      },
      {
        heading: "3. Key Considerations for Building Web Applications",
        paragraphs: [
          "When architecting a web app, engineering teams must prioritize end-to-end type safety (TypeScript), stateless JWT session governance, database indexing for sub-10ms query execution, and automated CI/CD deployment pipelines.",
        ],
      },
    ],
    connectedServices: [
      { title: "Web Application Development", href: "/services/web-application-development", tag: "Full-Stack" },
      { title: "Backend & API Systems", href: "/services/backend-development", tag: "APIs" },
      { title: "SaaS Platform Development", href: "/services/web-application-development/saas-development", tag: "SaaS" },
    ],
    connectedSolutions: [
      { title: "Startup MVP Engineering", href: "/solutions/startup-mvp", badge: "MVP" },
      { title: "Enterprise Business Operations", href: "/solutions/business-management", badge: "ERP / CRM" },
    ],
    faqs: [
      { question: "How does a web app differ from a mobile app?", answer: "A web app runs directly inside web browsers without requiring app store installation, whereas mobile apps are installed natively on iOS or Android devices." },
      { question: "What is the best technology stack for web app development?", answer: "At NVIT.SPACE, we recommend full-stack TypeScript: Next.js (App Router) for the frontend, Fastify for high-speed REST APIs, and PostgreSQL with Prisma for relational data persistence." },
    ],
    metaTitle: "What Is Web Application Development? A Modern Guide | NVIT.SPACE",
    metaDescription: "Learn what web application development is, how modern full-stack architectures work, and how decoupled APIs power high-performance digital products.",
  },

  "website-vs-web-application": {
    slug: "website-vs-web-application",
    title: "Website vs Web Application: Key Differences, Costs & Architecture",
    cluster: "Web & Software",
    badge: "Architecture Comparison",
    readingTime: "5 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Discover the critical differences between a business website and a full-stack web application to choose the right architecture for your business goals.",
    sections: [
      {
        heading: "1. Core Difference: Information vs Interaction",
        paragraphs: [
          "The primary distinction between a website and a web application lies in user intent. A website delivers structured information (e.g. company portfolio, blog, service landing pages) aimed at building brand credibility and driving search traffic.",
          "A web application is a functional tool where users perform tasks, such as managing inventory, processing loan applications, or collaborating with team members.",
        ],
        takeaway: "Websites provide static information for reading; web applications provide interactive functionality for doing.",
      },
      {
        heading: "2. Technical Complexity & Database Requirements",
        paragraphs: [
          "Websites typically utilize static site generation (SSG) or lightweight headless CMS layers. In contrast, web applications require complex relational database schemas (PostgreSQL), user authentication (JWT/OAuth), role-based permissions, and stateful business logic.",
        ],
      },
      {
        heading: "3. Cost & Development Timeline Comparisons",
        paragraphs: [
          "A high-performance business website can typically be engineered and launched in 1 to 2 weeks. A custom web application requires 4 to 8 weeks to build authentication, API endpoints, database schemas, and administrative control panels.",
        ],
      },
    ],
    connectedServices: [
      { title: "Website Development", href: "/services/website-development", tag: "Web" },
      { title: "Web Application Development", href: "/services/web-application-development", tag: "Full-Stack" },
      { title: "Custom Web Applications", href: "/services/web-application-development/custom-web-app-development", tag: "Bespoke" },
    ],
    connectedSolutions: [
      { title: "Startup MVP Engineering", href: "/solutions/startup-mvp", badge: "MVP" },
    ],
    faqs: [
      { question: "Can a website evolve into a web application over time?", answer: "Yes. Many companies launch with an SEO-focused website and later add an authenticated customer portal or dashboard on a subdomain (e.g. app.domain.com)." },
    ],
    metaTitle: "Website vs Web Application: Key Differences Explained | NVIT.SPACE",
    metaDescription: "Understand the differences between websites and web applications in terms of architecture, database requirements, development costs, and timelines.",
  },

  "what-is-saas-development": {
    slug: "what-is-saas-development",
    title: "What Is SaaS Development? Multi-Tenancy, Billing & Scalable Architecture",
    cluster: "Web & Software",
    badge: "SaaS Engineering",
    readingTime: "7 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Explore how Software-as-a-Service (SaaS) platforms are architected, from multi-tenant database isolation to recurring subscription billing and API rate limiting.",
    sections: [
      {
        heading: "1. The SaaS Business Model & Architecture",
        paragraphs: [
          "Software-as-a-Service (SaaS) delivers centrally hosted applications to users over the internet on a recurring subscription basis. Instead of installing software locally, customers access the platform via web browsers or mobile apps.",
        ],
        takeaway: "SaaS eliminates on-premise installation, providing continuous cloud updates and recurring revenue models.",
      },
      {
        heading: "2. Multi-Tenant Database Isolation Strategies",
        paragraphs: [
          "A crucial architectural decision in SaaS development is data isolation. In a shared-database multi-tenant model, all customers share a PostgreSQL instance with strict `organizationId` foreign key isolation and Row-Level Security (RLS).",
          "For enterprise clients with strict compliance needs, a siloed database model provisions dedicated database instances per tenant while sharing common application microservices.",
        ],
      },
      {
        heading: "3. Automated Subscription Billing & Seat Governance",
        paragraphs: [
          "SaaS platforms require integration with payment providers (Stripe/Razorpay) to handle plan upgrades, prorated billing, automated invoice generation, and seat-based access permissions.",
        ],
      },
    ],
    connectedServices: [
      { title: "SaaS Platform Development", href: "/services/web-application-development/saas-development", tag: "SaaS" },
      { title: "Backend & API Systems", href: "/services/backend-development", tag: "APIs" },
      { title: "Node.js & Fastify Backend", href: "/services/backend-development/nodejs-development", tag: "Backend" },
    ],
    connectedSolutions: [
      { title: "Startup MVP Engineering", href: "/solutions/startup-mvp", badge: "MVP" },
    ],
    faqs: [
      { question: "What is the best database for a SaaS application?", answer: "PostgreSQL is the industry standard for SaaS applications due to its robust relational integrity, JSONB support for unstructured data, and Row-Level Security (RLS) features." },
    ],
    metaTitle: "What Is SaaS Development? Multi-Tenancy & Architecture | NVIT.SPACE",
    metaDescription: "Learn how SaaS applications are engineered: multi-tenant database models, recurring subscription billing, user role governance, and cloud scalability.",
  },

  "what-is-rest-api": {
    slug: "what-is-rest-api",
    title: "What Is a REST API? A Practical Guide to Web Service Architecture",
    cluster: "Backend & APIs",
    badge: "API Architecture",
    readingTime: "5 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "A comprehensive introduction to RESTful APIs, HTTP methods, status codes, stateless authentication, and OpenAPI documentation standards.",
    sections: [
      {
        heading: "1. Understanding Representational State Transfer (REST)",
        paragraphs: [
          "A REST API (Representational State Transfer) is an architectural style for web services that enables decoupled systems to communicate over HTTP using standard methods (GET, POST, PUT, DELETE) and JSON payloads.",
        ],
        takeaway: "REST APIs standardise server communication using universal HTTP verbs and predictable JSON responses.",
      },
      {
        heading: "2. Key Principles of RESTful Design",
        paragraphs: [
          "Statelessness: Each request from client to server must contain all necessary authentication and context data (via JWT Bearer tokens in headers).",
          "Uniform Interface: Resources are identified by clear URI paths (e.g. `/api/v1/companies/123`), and responses adhere to standardized status codes (200 OK, 201 Created, 400 Bad Request, 404 Not Found).",
        ],
      },
    ],
    connectedServices: [
      { title: "REST API Engineering", href: "/services/backend-development/rest-api-development", tag: "REST" },
      { title: "Node.js & Fastify Backend", href: "/services/backend-development/nodejs-development", tag: "Fastify" },
      { title: "Backend & API Systems", href: "/services/backend-development", tag: "APIs" },
    ],
    faqs: [
      { question: "Why use Fastify over Express for REST APIs?", answer: "Fastify processes up to 75,000 requests per second (nearly 3x faster than Express) with built-in schema compilation and lower memory usage." },
    ],
    metaTitle: "What Is a REST API? Practical Architecture Guide | NVIT.SPACE",
    metaDescription: "Discover how REST APIs work: HTTP verbs, status codes, stateless JWT authentication, and high-performance Fastify backend implementation.",
  },

  "rest-vs-graphql": {
    slug: "rest-vs-graphql",
    title: "REST vs GraphQL: Choosing the Right API Architecture for Your Product",
    cluster: "Backend & APIs",
    badge: "API Protocols",
    readingTime: "6 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Compare REST and GraphQL architectures: over-fetching, schema strongly typed contracts, caching performance, and when to choose each protocol.",
    sections: [
      {
        heading: "1. The Fundamental Architectural Difference",
        paragraphs: [
          "REST APIs expose multiple dedicated endpoints (e.g. `/users`, `/posts`, `/comments`), returning fixed JSON structures. GraphQL exposes a single endpoint where clients request precisely the fields they require in a single round-trip.",
        ],
        takeaway: "REST provides simplicity and native HTTP caching; GraphQL eliminates over-fetching for complex data graphs.",
      },
      {
        heading: "2. Tradeoffs: Caching, Complexity & Tooling",
        paragraphs: [
          "REST APIs leverage standard HTTP status codes and CDN caching effortlessly. GraphQL simplifies complex nested data queries but requires specialized caching strategies (DataLoader) and introduces query complexity risks.",
        ],
      },
    ],
    connectedServices: [
      { title: "GraphQL API Architecture", href: "/services/backend-development/graphql-development", tag: "GraphQL" },
      { title: "REST API Engineering", href: "/services/backend-development/rest-api-development", tag: "REST" },
    ],
    faqs: [
      { question: "Can a project use both REST and GraphQL?", answer: "Yes. Many platforms use GraphQL for dynamic client dashboards and REST for external third-party webhook integrations." },
    ],
    metaTitle: "REST vs GraphQL: Architecture & Tradeoff Comparison | NVIT.SPACE",
    metaDescription: "Compare REST and GraphQL: understand over-fetching, CDN caching, DataLoader batching, and how to select the best API protocol for your system.",
  },

  "postgresql-schema-design": {
    slug: "postgresql-schema-design",
    title: "PostgreSQL Schema Design: Normalization, Composite Indexing & Performance",
    cluster: "Backend & APIs",
    badge: "Database Engineering",
    readingTime: "7 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Learn how to architect high-performance PostgreSQL relational schemas with foreign key constraints, composite B-Tree indexes, and ACID transaction locks.",
    sections: [
      {
        heading: "1. Relational Integrity & 3NF Normalization",
        paragraphs: [
          "Proper database normalization (Third Normal Form or 3NF) eliminates data redundancy and prevents orphaned records through strict foreign key constraints and cascade rules.",
        ],
        takeaway: "Normalized relational schemas ensure data consistency and prevent ledger corruption.",
      },
      {
        heading: "2. Strategic Indexing: B-Tree, GIN, and Partial Indexes",
        paragraphs: [
          "Indexing is the difference between a 2-millisecond query and a 5-second database freeze. Use composite B-Tree indexes for multi-column lookups (e.g. `pincode` + `bankId`), GIN indexes for JSONB search, and partial indexes for active records.",
        ],
      },
    ],
    connectedServices: [
      { title: "PostgreSQL Database Architecture", href: "/services/backend-development/postgresql-development", tag: "Database" },
      { title: "Backend & API Systems", href: "/services/backend-development", tag: "APIs" },
    ],
    faqs: [
      { question: "When should I use JSONB in PostgreSQL?", answer: "Use JSONB for semi-structured data like bank policy attributes or user audit logs that vary between entities, while keeping core transactional data in normalized columns." },
    ],
    metaTitle: "PostgreSQL Schema Design & Indexing Guide | NVIT.SPACE",
    metaDescription: "Master PostgreSQL relational schema design: composite B-Tree indexing, foreign key constraints, ACID transaction locks, and sub-10ms query execution.",
  },

  "ai-chatbot-vs-ai-agent": {
    slug: "ai-chatbot-vs-ai-agent",
    title: "AI Chatbots vs Autonomous AI Agents: What's the Difference?",
    cluster: "AI & Automation",
    badge: "AI Evolution",
    readingTime: "5 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Understand the architectural evolution from conversational AI chatbots to autonomous multi-tool AI agents capable of planning and executing complex workflows.",
    sections: [
      {
        heading: "1. Chatbots Converse; Agents Execute",
        paragraphs: [
          "An AI chatbot is designed for natural language conversation, answering user questions based on a fixed knowledge context (RAG). An autonomous AI agent goes further: it formulates multi-step plans, calls external APIs, queries databases, and loops through verification steps to achieve an assigned goal without human intervention.",
        ],
        takeaway: "Chatbots provide answers; autonomous agents execute end-to-end tasks.",
      },
      {
        heading: "2. Tool-Calling & ReAct Architecture",
        paragraphs: [
          "AI agents utilize the Reasoning + Acting (ReAct) framework. When given an objective (e.g. 'Audit this loan applicant'), the agent determines which tools to call (OCR parser $\rightarrow$ Pincode checker $\rightarrow$ CRM logger) and combines the results into an actionable decision.",
        ],
      },
    ],
    connectedServices: [
      { title: "Autonomous AI Agents", href: "/services/ai-development/ai-agent-development", tag: "AI Agents" },
      { title: "AI Chatbots & Conversational AI", href: "/services/ai-development/ai-chatbot-development", tag: "Chatbots" },
      { title: "AI-Powered Automation", href: "/services/ai-development/ai-automation", tag: "Automation" },
    ],
    faqs: [
      { question: "How do you prevent AI agents from getting stuck in infinite loops?", answer: "We implement deterministic maximum iteration counters, timeout boundaries, and structured JSON output validation schemas." },
    ],
    metaTitle: "AI Chatbots vs AI Agents: Key Differences | NVIT.SPACE",
    metaDescription: "Understand the differences between conversational AI chatbots and autonomous multi-tool AI agents: tool calling, ReAct architecture, and API execution.",
  },

  "what-is-document-ai": {
    slug: "what-is-document-ai",
    title: "What Is Document AI? Neural OCR & Intelligent Document Processing",
    cluster: "AI & Automation",
    badge: "Document OCR",
    readingTime: "6 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Learn how Document AI combines computer vision and LLMs to extract structured financial data from bank statements, salary slips, invoices, and KYC IDs in seconds.",
    sections: [
      {
        heading: "1. Beyond Traditional OCR",
        paragraphs: [
          "Traditional OCR merely recognizes text characters on a page. Document AI (Intelligent Document Processing or IDP) understands the semantic layout: it extracts multi-column transaction tables, identifies salary credits, detects fraud anomalies, and returns clean structured JSON.",
        ],
        takeaway: "Document AI turns unstructured PDF scans into verified, actionable JSON database records.",
      },
      {
        heading: "2. Fintech & Lending Use Cases",
        paragraphs: [
          "In digital lending platforms, Document AI parses 6 months of bank statement transactions in under 5 seconds, calculating average monthly balances (ABB), salary deposits, and existing EMI bounces automatically.",
        ],
      },
    ],
    connectedServices: [
      { title: "Document AI & Neural OCR", href: "/services/ai-development/document-ai", tag: "OCR" },
      { title: "Batch Data & Spreadsheet ETL", href: "/services/business-automation/data-automation", tag: "ETL" },
    ],
    connectedSolutions: [
      { title: "Loan Origination Platforms", href: "/solutions/loan-finance-platforms", badge: "Lending LOS" },
    ],
    faqs: [
      { question: "How accurate is Document AI on scanned paper receipts?", answer: "With modern computer vision preprocessing and transformer models, extraction accuracy exceeds 99% on standard financial documents." },
    ],
    metaTitle: "What Is Document AI? Neural OCR & Document Processing | NVIT.SPACE",
    metaDescription: "Discover how Document AI extracts structured data from bank statements, invoices, and KYC IDs with 99%+ accuracy in digital lending workflows.",
  },

  "what-is-workflow-automation": {
    slug: "what-is-workflow-automation",
    title: "What Is Workflow Automation? State Machines & Operational Efficiency",
    cluster: "AI & Automation",
    badge: "Automation Core",
    readingTime: "5 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Discover how custom workflow engines replace slow email approval chains with deterministic state machines and instant WhatsApp triggers.",
    sections: [
      {
        heading: "1. Eliminating Human Bottlenecks",
        paragraphs: [
          "Workflow automation connects disparate business systems—such as ERPs, CRMs, and payment gateways—to execute sequential business actions automatically when triggered by specific events.",
        ],
        takeaway: "Automated state machines eliminate delayed approvals and manual data re-entry.",
      },
    ],
    connectedServices: [
      { title: "Workflow Automation Engines", href: "/services/business-automation/workflow-automation", tag: "Workflows" },
      { title: "CRM & Pipeline Automation", href: "/services/business-automation/crm-automation", tag: "CRM" },
    ],
    faqs: [
      { question: "Can workflows send notifications to WhatsApp Business?", answer: "Yes. Workflows can trigger interactive WhatsApp messages with 1-click approval buttons for managers." },
    ],
    metaTitle: "What Is Workflow Automation? State Machines & Tech | NVIT.SPACE",
    metaDescription: "Learn how workflow automation engines streamline business processes using deterministic state machines, webhook bridges, and WhatsApp notifications.",
  },

  "how-emi-is-calculated": {
    slug: "how-emi-is-calculated",
    title: "How Is Loan EMI Calculated? Mathematical Formula & Worked Example",
    cluster: "Finance & Fintech",
    badge: "EMI Mathematics",
    readingTime: "6 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "A clear step-by-step breakdown of the reducing-balance EMI formula used by Indian banks, with explicit numerical examples and amortization concepts.",
    sections: [
      {
        heading: "1. The Universal Reducing-Balance Formula",
        paragraphs: [
          "Banks compute loan EMIs using the reducing-balance method: `EMI = [P * r * (1+r)^n] / [(1+r)^n - 1]`. Interest is charged only on the remaining unpaid principal at each monthly cycle.",
        ],
        takeaway: "Reducing-balance calculation ensures you pay less total interest than flat-rate calculations.",
      },
      {
        heading: "2. Worked Step-by-Step Example",
        paragraphs: [
          "On a loan of ₹5,00,000 at 12% annual interest for 5 years (60 months), monthly rate `r = 0.01`. The resulting EMI is exactly ₹11,122 per month with total interest of ₹1,67,333.",
        ],
      },
    ],
    connectedTools: [
      { title: "Loan EMI Calculator", href: "/finance-tools/emi-calculator", badge: "Interactive" },
      { title: "Personal Loan EMI Calculator", href: "/finance-tools/personal-loan-emi-calculator", badge: "Personal" },
      { title: "Loan Tenure Calculator", href: "/finance-tools/loan-tenure-calculator", badge: "Tenure" },
    ],
    connectedSolutions: [
      { title: "Loan Origination Platforms", href: "/solutions/loan-finance-platforms", badge: "Lending Tech" },
    ],
    faqs: [
      { question: "Why does the principal component increase in later months?", answer: "As early payments reduce the outstanding principal balance, the monthly interest charge decreases, allowing a larger portion of your fixed EMI to pay down the remaining principal." },
    ],
    metaTitle: "How Is Loan EMI Calculated? Formula & Example | NVIT.SPACE",
    metaDescription: "Learn the exact mathematical reducing-balance formula used by banks to calculate loan EMIs, with clear step-by-step numbers and examples.",
  },

  "what-is-a-loan-origination-system": {
    slug: "what-is-a-loan-origination-system",
    title: "What Is a Loan Origination System (LOS)? Architecture & Workflows",
    cluster: "Finance & Fintech",
    badge: "Lending Technology",
    readingTime: "7 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Explore how modern digital Loan Origination Systems manage the complete lending lifecycle from borrower intake to underwriting and disbursal.",
    sections: [
      {
        heading: "1. The Role of an LOS in Digital Lending",
        paragraphs: [
          "A Loan Origination System (LOS) is the core operational software that manages loan applications from initial lead capture through credit assessment, policy validation, document underwriting, and sanction generation.",
        ],
        takeaway: "An LOS automates policy matching and document extraction to cut loan turnaround times.",
      },
      {
        heading: "2. Key Architectural Modules",
        paragraphs: [
          "Modern LOS architectures include digital intake portals, pincode serviceability lookups across 19,500+ locations, Document AI OCR parsers, and executive round-robin lead distribution engines.",
        ],
      },
    ],
    connectedServices: [
      { title: "Custom CRM Development", href: "/services/web-application-development/crm-development", tag: "CRM" },
      { title: "Document AI & Neural OCR", href: "/services/ai-development/document-ai", tag: "OCR" },
    ],
    connectedSolutions: [
      { title: "Loan Origination Platforms", href: "/solutions/loan-finance-platforms", badge: "Lending Tech" },
      { title: "Fintech Platforms", href: "/solutions/fintech", badge: "Fintech Core" },
    ],
    faqs: [
      { question: "What is the difference between an LOS and an LMS?", answer: "An LOS (Loan Origination System) handles the application and underwriting process until disbursal. An LMS (Loan Management System) manages post-disbursal EMI repayments and collections." },
    ],
    metaTitle: "What Is a Loan Origination System (LOS)? | NVIT.SPACE",
    metaDescription: "Discover how modern digital Loan Origination Systems operate: borrower intake, 19.5k pincode matching, Document AI underwriting, and bank API integration.",
  },

  "how-loan-eligibility-is-calculated": {
    slug: "how-loan-eligibility-is-calculated",
    title: "How Loan Eligibility Is Calculated: Salary, FOIR & Debt Capacity",
    cluster: "Finance & Fintech",
    badge: "Underwriting Models",
    readingTime: "6 min read",
    publishedDate: "August 2026",
    author: "NVIT Engineering Team",
    heroExcerpt: "Understand the FOIR (Fixed Obligation to Income Ratio) model used by bank underwriters to determine maximum borrower credit limits.",
    sections: [
      {
        heading: "1. The FOIR Underwriting Ratio",
        paragraphs: [
          "Underwriters evaluate loan eligibility using the Fixed Obligation to Income Ratio (FOIR). Most Indian banks allow 50% to 65% of your net monthly income to be committed toward all loan EMIs combined.",
        ],
        takeaway: "Your maximum loan capacity equals your disposable EMI margin reversed through the EMI formula.",
      },
    ],
    connectedTools: [
      { title: "Loan Eligibility Calculator", href: "/finance-tools/loan-eligibility-calculator", badge: "Capacity Check" },
      { title: "Home Loan EMI Calculator", href: "/finance-tools/home-loan-emi-calculator", badge: "Mortgage" },
    ],
    connectedSolutions: [
      { title: "Loan Origination Platforms", href: "/solutions/loan-finance-platforms", badge: "Lending Tech" },
    ],
    faqs: [
      { question: "How can I quickly boost my loan eligibility?", answer: "Close existing credit card debts or small personal loans to free up monthly FOIR capacity, or add an earning co-applicant." },
    ],
    metaTitle: "How Loan Eligibility Is Calculated: FOIR & Salary | NVIT.SPACE",
    metaDescription: "Understand how bank underwriters calculate loan eligibility using FOIR, monthly salary, and existing debt obligations to estimate credit limits.",
  },
};

// ─── 4 PILLAR GUIDES ─────────────────────────────────────────────────────────

export const PILLAR_GUIDES: Record<string, PillarGuide> = {
  "saas-development-guide": {
    slug: "saas-development-guide",
    title: "The Comprehensive SaaS Development Guide: Architecture, Multi-Tenancy & Scale",
    pillarTopic: "SaaS Architecture & Engineering",
    readingTime: "14 min read",
    publishedDate: "August 2026",
    summary: "An authoritative end-to-end technical guide for engineering scalable multi-tenant SaaS platforms, configuring subscription billing, enforcing role-based permissions, and deploying zero-downtime cloud infrastructure.",
    targetAudience: ["Startup Founders", "Technical Co-Founders", "Engineering Managers", "Full-Stack Architects"],
    architectureSummary: "Decoupled Next.js frontend with edge caching, Fastify TypeScript REST API gateway, shared PostgreSQL relational database with Row-Level Security (RLS), Redis distributed caching, and Docker VPS orchestration.",
    sections: [
      {
        id: "architecture",
        title: "1. Multi-Tenant Architectural Foundations",
        content: [
          "Multi-tenancy is the architectural core of any SaaS product. Designing for multi-tenancy means deciding early between a shared database with tenant column isolation, separate schemas per tenant, or separate physical databases.",
          "For 95% of SaaS applications, a shared database with strict PostgreSQL Row-Level Security (RLS) and Prisma middleware provides the ideal balance between low infrastructure overhead and absolute data isolation.",
        ],
        keyPoints: [
          "Shared database with tenant-level foreign key indexing minimizes hosting costs.",
          "Row-Level Security (RLS) prevents accidental cross-tenant data leaks at the database level.",
          "Stateless JWT tokens include verified tenant IDs to eliminate database session lookups.",
        ],
      },
      {
        id: "billing",
        title: "2. Subscription Billing & Seat Management",
        content: [
          "Integrating Stripe or Razorpay requires robust webhook architecture. Webhooks must be idempotent: store incoming webhook event IDs in Redis or PostgreSQL to prevent processing the same billing invoice event multiple times.",
          "Support seat-based pricing, organization workspace switching, and automated invoice PDF generation to satisfy B2B customer requirements.",
        ],
        keyPoints: [
          "Idempotent webhook handlers prevent duplicate credit allocation.",
          "Seat management allows organization admins to invite team members with granular RBAC permissions.",
        ],
      },
      {
        id: "security",
        title: "3. Enterprise Security & Role-Based Access Control (RBAC)",
        content: [
          "Implement fine-grained permissions (Owner, Admin, Member, Viewer). Every API request must pass through an authentication plugin verifying token validity and permission scopes before executing database queries.",
        ],
      },
      {
        id: "deployment",
        title: "4. Production Cloud Deployment & Monitoring",
        content: [
          "Containerize frontend and backend services using Docker. Deploy behind Nginx reverse proxies with SSL termination, PM2 process clustering, and automated daily encrypted PostgreSQL database backups.",
        ],
      },
    ],
    connectedServices: [
      { title: "SaaS Platform Development", href: "/services/web-application-development/saas-development", tag: "SaaS" },
      { title: "Web Application Development", href: "/services/web-application-development", tag: "Full-Stack" },
      { title: "Node.js & Fastify Backend", href: "/services/backend-development/nodejs-development", tag: "Backend" },
    ],
    connectedSolutions: [
      { title: "Startup MVP Engineering", href: "/solutions/startup-mvp", badge: "MVP" },
    ],
    faqs: [
      { question: "How much does it cost to host an early-stage SaaS platform?", answer: "Using Docker containerization on Linux VPS instances, monthly hosting costs are typically between $20 and $50/month for up to 10,000 active users." },
    ],
    metaTitle: "SaaS Development Guide: Architecture & Multi-Tenancy | NVIT.SPACE",
    metaDescription: "Comprehensive SaaS engineering guide: multi-tenant PostgreSQL architectures, Stripe recurring billing, RBAC permissions, and Docker VPS deployments.",
  },

  "fintech-software-development-guide": {
    slug: "fintech-software-development-guide",
    title: "Fintech Software Development Guide: Banking APIs, Ledgers & Security",
    pillarTopic: "Fintech Architecture & Ledger Systems",
    readingTime: "16 min read",
    publishedDate: "August 2026",
    summary: "An in-depth technical blueprint for architecting mission-critical fintech software: double-entry accounting ledgers, banking API integrations, Document AI KYC pipelines, and institutional security standards.",
    targetAudience: ["Fintech Leaders", "Banking CTOs", "Lending Operations Heads", "Financial Software Architects"],
    architectureSummary: "ACID-compliant PostgreSQL double-entry ledgers, Fastify REST APIs with idempotency keys, AES-256 field-level encryption, Document AI neural OCR, and Redis message queue workers.",
    sections: [
      {
        id: "ledgers",
        title: "1. Double-Entry Accounting & ACID Relational Integrity",
        content: [
          "Financial software requires zero room for balance discrepancies. A double-entry accounting ledger is an immutable database record where every transaction contains at least one debit and one credit of equal amounts.",
          "Using PostgreSQL atomic transaction blocks (`BEGIN ... COMMIT`) and row-level locking ensures that simultaneous credit transfers maintain 100% balance integrity with zero race conditions.",
        ],
        keyPoints: [
          "Total debits must equal total credits in every single transaction block.",
          "Ledger entries must be append-only with zero in-place updates or deletions.",
          "Header-based idempotency keys ensure network retries never create duplicate transactions.",
        ],
      },
      {
        id: "banking-apis",
        title: "2. Banking API Integration & Webhook Handling",
        content: [
          "Banking core systems and payment gateways can experience transient network timeouts. Engineering resilient fintech software requires exponential backoff retries, Redis queue workers (BullMQ), and dead-letter queue inspection tools.",
        ],
      },
      {
        id: "compliance-security",
        title: "3. Data Security, KYC & Field-Level Encryption",
        content: [
          "Enforce AES-256 encryption for sensitive identifiers (Aadhaar, PAN, bank account numbers). Sensitive tokens must be stored in httpOnly secure cookies, and all API calls must be logged in tamper-evident audit trails.",
        ],
      },
    ],
    connectedServices: [
      { title: "Backend & API Systems", href: "/services/backend-development", tag: "APIs" },
      { title: "Document AI & Neural OCR", href: "/services/ai-development/document-ai", tag: "OCR" },
      { title: "PostgreSQL Database Architecture", href: "/services/backend-development/postgresql-development", tag: "Ledgers" },
    ],
    connectedSolutions: [
      { title: "Fintech Software Solutions", href: "/solutions/fintech", badge: "Fintech Core" },
      { title: "Loan Origination Platforms", href: "/solutions/loan-finance-platforms", badge: "Lending Tech" },
    ],
    connectedTools: [
      { title: "Universal EMI Calculator", href: "/finance-tools/emi-calculator", badge: "Interactive" },
      { title: "Company Category Checker API", href: "/company-check", badge: "Live API" },
    ],
    faqs: [
      { question: "How do you guarantee transaction idempotency in fintech backends?", answer: "Clients send a unique UUID `Idempotency-Key` header with write requests. The Fastify API checks Redis for this key before executing the database transaction, immediately returning cached results if duplicate requests arrive." },
    ],
    metaTitle: "Fintech Software Development Guide: Ledgers & Security | NVIT.SPACE",
    metaDescription: "A comprehensive fintech engineering guide: double-entry accounting ledgers, banking API integration, Document AI verification, and field-level encryption.",
  },

  "web-application-development-guide": {
    slug: "web-application-development-guide",
    title: "Web Application Development Guide: Decoupled Full-Stack Architecture",
    pillarTopic: "Full-Stack Web Engineering",
    readingTime: "12 min read",
    publishedDate: "August 2026",
    summary: "A practical guide to building enterprise full-stack web applications with Next.js, React, TypeScript, Fastify microservices, and high-concurrency PostgreSQL databases.",
    targetAudience: ["Full-Stack Developers", "Solutions Architects", "Product Managers"],
    architectureSummary: "Next.js App Router for frontend rendering, Tailwind CSS & Framer Motion for responsive UI, Fastify backend API services with Zod validation, and Prisma ORM on PostgreSQL.",
    sections: [
      {
        id: "frontend",
        title: "1. Frontend Architecture with Next.js & React 19",
        content: [
          "Utilizing the Next.js App Router enables server-side rendering (SSR) for initial page loads while streaming dynamic client components for interactive user dashboards.",
        ],
        keyPoints: [
          "Server Components reduce client JavaScript bundle size by up to 40%.",
          "Zustand and TanStack Table provide reactive client state management and paginated data grids.",
        ],
      },
      {
        id: "backend",
        title: "2. Fastify REST Microservices & Type Safety",
        content: [
          "TypeScript across both client and server ensures end-to-end type safety. Fastify plugins encapsulate routes, authentication middleware, and database connections cleanly.",
        ],
      },
    ],
    connectedServices: [
      { title: "Web Application Development", href: "/services/web-application-development", tag: "Full-Stack" },
      { title: "Node.js & Fastify Backend", href: "/services/backend-development/nodejs-development", tag: "Backend" },
    ],
    connectedSolutions: [
      { title: "Startup MVP Engineering", href: "/solutions/startup-mvp", badge: "MVP" },
    ],
    faqs: [
      { question: "Why use TypeScript across the entire full-stack codebase?", answer: "Shared TypeScript interfaces eliminate serialization mismatches between frontend API callers and backend route handlers, catching bugs during compile time." },
    ],
    metaTitle: "Web Application Development Guide: Architecture | NVIT.SPACE",
    metaDescription: "Master modern web application architecture: Next.js SSR, Fastify REST microservices, TypeScript type safety, and relational database schemas.",
  },

  "loan-platform-development-guide": {
    slug: "loan-platform-development-guide",
    title: "Digital Loan Platform Development Guide: LOS, Policy Matrices & OCR",
    pillarTopic: "Lending Technology & LOS Architecture",
    readingTime: "15 min read",
    publishedDate: "August 2026",
    summary: "The definitive engineering blueprint for building digital loan origination platforms: borrower onboarding funnels, 19,500+ pincode serviceability engines, Document AI statement OCR, and DSA sales pipelines.",
    targetAudience: ["Lending Founders", "DSA Network Directors", "Fintech Product Managers", "Fintech Engineers"],
    architectureSummary: "Mobile-first borrower intake funnel, 19,500+ Indian pincode B-Tree indexing engine, Document AI neural statement parsing, Fastify lead routing gateway, and real-time WhatsApp triggers.",
    sections: [
      {
        id: "intake",
        title: "1. Frictionless Borrower Intake & OTP Authentication",
        content: [
          "Borrower drop-off occurs when intake forms exceed 3 steps. We design a 3-step mobile-first onboarding flow with phone OTP verification and interactive EMI sliders that captures borrower intent in under 60 seconds.",
        ],
        keyPoints: [
          "Phone OTP verification eliminates fake spam leads immediately.",
          "Pre-qualification sliders provide instant borrowing estimates to keep applicants engaged.",
        ],
      },
      {
        id: "policy-matrix",
        title: "2. Pan-India Pincode Serviceability & Employer Categorization",
        content: [
          "Our platforms index 19,500+ Indian pincodes with composite database indexes to cross-reference multi-bank serviceability lists in under 10ms. Employer prefix search matches applicants across Cat A, B, C, and D lender tier lists instantly.",
        ],
      },
      {
        id: "ocr-underwriting",
        title: "3. Document AI Statement Parsing & Underwriter Console",
        content: [
          "Borrowers upload PDF bank statements and salary slips. Document AI parses multi-page transaction tables in 5 seconds, calculating average balances and salary credits automatically for executive review.",
        ],
      },
    ],
    connectedServices: [
      { title: "Custom CRM Development", href: "/services/web-application-development/crm-development", tag: "CRM" },
      { title: "Document AI & Neural OCR", href: "/services/ai-development/document-ai", tag: "OCR" },
      { title: "Batch Data & Spreadsheet ETL", href: "/services/business-automation/data-automation", tag: "ETL" },
    ],
    connectedSolutions: [
      { title: "Loan Origination Platforms", href: "/solutions/loan-finance-platforms", badge: "Lending Tech" },
      { title: "Fintech Software Solutions", href: "/solutions/fintech", badge: "Fintech" },
    ],
    connectedTools: [
      { title: "Pincode Eligibility Checker", href: "/pincode-check", badge: "19.5k Pincodes" },
      { title: "Company Category Checker", href: "/company-check", badge: "Live API" },
      { title: "Loan EMI Calculator", href: "/finance-tools/emi-calculator", badge: "Interactive" },
    ],
    faqs: [
      { question: "How does the system handle multi-bank policy updates?", answer: "We provide an administrative CSV/Excel batch upload module that automatically validates and updates bank pincode and company category lists without code deployments." },
    ],
    metaTitle: "Digital Loan Platform Development Guide | NVIT.SPACE",
    metaDescription: "An authoritative guide to building digital lending platforms: borrower onboarding, 19.5k pincode policy lookup, Document AI OCR, and DSA lead management.",
  },
};

// ─── 3 AUTHENTIC CASE STUDIES ────────────────────────────────────────────────

export const CASE_STUDIES: Record<string, CaseStudy> = {
  "pan-india-pincode-eligibility-engine": {
    slug: "pan-india-pincode-eligibility-engine",
    title: "Engineering a High-Performance Pan-India Pincode Eligibility Engine",
    badge: "Database & API Architecture",
    clientType: "Fintech & Lending Infrastructure",
    challenge: "Lending underwriters and sales executives spent hours manually searching disconnected Excel spreadsheets from multiple partner banks to verify whether a borrower's 6-digit PIN code was serviceable, causing severe loan processing bottlenecks and high customer drop-off.",
    context: "In Indian retail lending, every bank maintains distinct serviceability lists covering varying subsets of the country's 19,500+ postal PIN codes. Merging and querying these disparate lists in real time during customer onboarding was an operational hurdle.",
    solution: "NVIT.SPACE engineered a centralized high-speed Pincode Eligibility Engine backed by normalized PostgreSQL relational tables and composite B-Tree indexes. The engine enriches every pincode with state, district, and office location data while cross-referencing multi-bank serviceability policies in under 10 milliseconds.",
    architectureHighlights: [
      "Normalized PostgreSQL relational database indexing 19,500+ Indian postal PIN codes.",
      "Composite B-Tree database indexes ensuring sub-10ms query execution under heavy concurrent lookups.",
      "Sub-20ms Fastify REST API endpoint serving live web frontend and mobile client applications.",
      "Batch CSV ingestion pipeline enabling non-technical operators to upload updated monthly bank policy sheets.",
    ],
    keyFeatures: [
      "Instant 6-digit PIN code serviceability validation across multiple partner banking institutions.",
      "Automatic geographical enrichment providing verified City, District, State, and Post Office names.",
      "Administrative CSV batch upload console with automated schema validation and deduplication.",
      "Public-facing client lookup utility embedded directly on NVIT.SPACE web platform.",
    ],
    engineeringDecisions: [
      { decision: "Composite B-Tree Indexes", rationale: "Standard full-table scans took ~450ms. Adding composite B-Tree indexes on `(pincode, bankId)` dropped query latency to under 8ms." },
      { decision: "Fastify Microservice Architecture", rationale: "Fastify's schema compilation delivered 3x higher throughput compared to standard Express servers for high-volume lookup traffic." },
    ],
    technicalMetrics: [
      "19,500+ Postal Pincodes Indexed",
      "<10ms Average Query Execution Time",
      "100% Pan-India Geographical Coverage",
      "Zero Downtime Monthly Policy Updates",
    ],
    technologies: ["PostgreSQL", "Fastify", "TypeScript", "Prisma ORM", "Next.js", "Docker VPS"],
    connectedServices: [
      { title: "Backend & API Systems", href: "/services/backend-development", tag: "APIs" },
      { title: "PostgreSQL Database Architecture", href: "/services/backend-development/postgresql-development", tag: "Database" },
      { title: "Batch Data & Spreadsheet ETL", href: "/services/business-automation/data-automation", tag: "ETL" },
    ],
    connectedSolutions: [
      { title: "Loan Origination Platforms", href: "/solutions/loan-finance-platforms", badge: "Lending Tech" },
      { title: "Fintech Software Solutions", href: "/solutions/fintech", badge: "Fintech" },
    ],
    liveToolLink: { title: "Live Pincode Checker Utility", href: "/pincode-check" },
    metaTitle: "Case Study: Pan-India Pincode Eligibility Engine | NVIT.SPACE",
    metaDescription: "How NVIT.SPACE engineered a sub-10ms PostgreSQL pincode eligibility engine indexing 19,500+ Indian PIN codes and multi-bank lending policies.",
  },

  "enterprise-company-category-checker": {
    slug: "enterprise-company-category-checker",
    title: "Building an Autocomplete Employer Categorization Search Engine",
    badge: "Fintech & Search Engine",
    clientType: "Fintech Lending Operations",
    challenge: "Lenders classify corporate employers into Category A, B, C, and D tiers to determine personal loan interest rates and borrowing limits. Loan officers struggled to match company names accurately due to typographical differences, spelling variations, and fragmented bank tier sheets.",
    context: "A single corporate employer might appear as 'HCL Technologies Ltd', 'HCL Tech', or 'HCL' across different banking policy lists. Underwriters required an instant prefix and fuzzy autocomplete search tool to identify verified company tiers in real time.",
    solution: "NVIT.SPACE built a specialized Company Category Checker API utilizing PostgreSQL full-text search, trigram indexing (`pg_trgm`), and Fastify API caching. The system provides real-time autocomplete suggestions within 50ms as the loan officer types.",
    architectureHighlights: [
      "Trigram and ILIKE prefix search indexing hundreds of thousands of registered corporate employer entities.",
      "Sub-50ms autocomplete API endpoint with debounced client-side queries.",
      "Multi-bank category aggregation displaying Cat A, B, C, or D status across all partner banks in a unified card.",
      "Direct integration with borrower application funnels to apply instant interest rate discounts.",
    ],
    keyFeatures: [
      "Real-time autocomplete suggestions as user types company name.",
      "Unified multi-bank category view highlighting policy tiers across major lenders.",
      "Verified company city, state, and corporate entity identification.",
      "Administrative CSV synchronization engine for updating monthly employer tier revisions.",
    ],
    engineeringDecisions: [
      { decision: "Trigram & B-Tree Indexing", rationale: "Enabling PostgreSQL `pg_trgm` indexes allowed flexible fuzzy matching without the heavy operational overhead of Elasticsearch." },
      { decision: "Debounced API Calls", rationale: "Client-side 250ms debouncing reduced unnecessary API server requests by over 70% during active user typing." },
    ],
    technicalMetrics: [
      "<50ms Autocomplete Search Latency",
      "Unified Multi-Bank Policy View",
      "100k+ Indexed Corporate Employers",
      "Zero Third-Party Search SaaS Dependencies",
    ],
    technologies: ["PostgreSQL (pg_trgm)", "Fastify", "TypeScript", "Next.js", "Tailwind CSS"],
    connectedServices: [
      { title: "REST API Engineering", href: "/services/backend-development/rest-api-development", tag: "REST" },
      { title: "Custom Web Applications", href: "/services/web-application-development/custom-web-app-development", tag: "Full-Stack" },
    ],
    connectedSolutions: [
      { title: "Loan Origination Platforms", href: "/solutions/loan-finance-platforms", badge: "Lending Tech" },
      { title: "Fintech Software Solutions", href: "/solutions/fintech", badge: "Fintech" },
    ],
    liveToolLink: { title: "Live Company Category Checker", href: "/company-check" },
    metaTitle: "Case Study: Employer Categorization Search Engine | NVIT.SPACE",
    metaDescription: "How NVIT.SPACE built a sub-50ms PostgreSQL employer categorization autocomplete engine for digital lending underwriting and policy matching.",
  },

  "multi-tenant-loan-origination-system": {
    slug: "multi-tenant-loan-origination-system",
    title: "Architecting a Scalable Multi-Tenant Loan Origination System",
    badge: "Full-Stack Lending Platform",
    clientType: "Fintech Lending Distribution & DSAs",
    challenge: "Loan distribution networks and direct selling agents (DSAs) operated across manual paper workflows, physical document drop-offs, and disjointed WhatsApp chats, causing 7-to-10 day loan processing turnaround times and unacceptably high lead leakage.",
    context: "A modern loan origination platform required a cohesive digital ecosystem: a mobile-first borrower application flow, instant policy checks, Document AI statement OCR, executive lead routing, and an administrative review console.",
    solution: "NVIT.SPACE architected an end-to-end digital Loan Origination System combining a responsive Next.js frontend, sub-20ms Fastify API microservices, Document AI neural PDF statement parsing, and weighted round-robin lead distribution with instant WhatsApp alerts.",
    architectureHighlights: [
      "Mobile-first 3-step borrower intake funnel with phone OTP verification.",
      "Automated Document AI pipeline parsing 6-month PDF bank statements into structured income metrics in 5 seconds.",
      "Sub-500ms weighted round-robin lead allocation to sales executives with instant WhatsApp notification triggers.",
      "Granular role-based underwriter console with 1-click status updates and audit logs.",
    ],
    keyFeatures: [
      "Frictionless borrower pre-qualification with interactive EMI sliders.",
      "Integrated 19.5k pincode and company category policy lookups.",
      "Document AI neural OCR extraction for bank statements and salary slips.",
      "Executive review console with audit logging and multi-bank application tracking.",
    ],
    engineeringDecisions: [
      { decision: "Decoupled Next.js & Fastify Architecture", rationale: "Decoupling allowed edge hosting for the borrower frontend while the Fastify backend scaled independently for heavy OCR processing." },
      { decision: "Document AI Pipeline", rationale: "Replacing manual underwriter data entry with neural OCR reduced average document ingestion time from 45 minutes to under 5 seconds." },
    ],
    technicalMetrics: [
      "<60s Borrower Application Completion",
      "<5s Document AI Statement Extraction",
      "<500ms Automated Lead Allocation",
      "100% Digital Paperless Lending Lifecycle",
    ],
    technologies: ["Next.js (App Router)", "Fastify", "PostgreSQL", "Prisma ORM", "Document AI (OCR)", "WhatsApp Cloud API", "Docker VPS"],
    connectedServices: [
      { title: "Web Application Development", href: "/services/web-application-development", tag: "Full-Stack" },
      { title: "Custom CRM Development", href: "/services/web-application-development/crm-development", tag: "CRM" },
      { title: "Document AI & Neural OCR", href: "/services/ai-development/document-ai", tag: "AI OCR" },
    ],
    connectedSolutions: [
      { title: "Loan Origination Platforms", href: "/solutions/loan-finance-platforms", badge: "Lending Tech" },
      { title: "Fintech Software Solutions", href: "/solutions/fintech", badge: "Fintech" },
    ],
    metaTitle: "Case Study: Digital Loan Origination System | NVIT.SPACE",
    metaDescription: "How NVIT.SPACE architected a multi-tenant digital Loan Origination System with Document AI statement parsing and automated WhatsApp lead distribution.",
  },
};
