import { useState, useMemo } from 'react'
import './index.css'

const PROJECTS = [
  {
    rank: 1,
    emoji: "🦞",
    name: "OpenClaw",
    tagline: "The fastest-growing GitHub repo in history",
    desc: "Open-source autonomous AI agent connecting to 20+ messaging platforms. Gained 34,000 stars in 48 hours. 247,000+ total stars.",
    stars: "247K ⭐",
    stack: ["TypeScript", "Node.js", "LLM"],
    category: "AI Agent",
    link: "https://github.com/openclaw/openclaw",
    hot: true
  },
  {
    rank: 2,
    emoji: "🤖",
    name: "Claw Code",
    tagline: "Claude Code reverse-engineered and open-sourced",
    desc: "Built from accidentally leaked Claude Code source maps. 72,000 stars and 72,600 forks in days — one of the fastest dev-tool launches ever.",
    stars: "72K ⭐",
    stack: ["Python", "Rust"],
    category: "Dev Tool",
    link: "https://claw-code.codes",
    hot: true
  },
  {
    rank: 3,
    emoji: "🌐",
    name: "Browser-Use",
    tagline: "Give AI agents full browser control",
    desc: "Open-source Python framework for LLM-powered browser automation. The free alternative to OpenAI Operator. 78,000+ stars.",
    stars: "78K ⭐",
    stack: ["Python", "Playwright"],
    category: "AI Agent",
    link: "https://github.com/browser-use/browser-use"
  },
  {
    rank: 4,
    emoji: "🎥",
    name: "Screenpipe",
    tagline: "AI that remembers everything you do",
    desc: "Records screen + mic 24/7, OCRs and transcribes everything locally, exposes it via MCP. #1 GitHub trending twice. Raised $2.8M.",
    stars: "41K ⭐",
    stack: ["Rust", "Tauri", "SQLite"],
    category: "Productivity",
    link: "https://github.com/screenpipe/screenpipe"
  },
  {
    rank: 5,
    emoji: "🐾",
    name: "Pangolin",
    tagline: "Self-hosted Cloudflare Tunnels alternative",
    desc: "WireGuard-based reverse proxy and tunneling for homelabbers. No port forwarding needed. YC 2025 backed. 19,000+ stars.",
    stars: "19K ⭐",
    stack: ["Go", "WireGuard"],
    category: "Infrastructure",
    link: "https://github.com/fossorl/pangolin"
  },
  {
    rank: 6,
    emoji: "⚡",
    name: "Superset Terminal",
    tagline: "Run 10+ AI coding agents in parallel",
    desc: "Terminal IDE purpose-built for parallel Claude Code / Codex agents across isolated git worktrees. Used by engineers at Amazon and Google.",
    stars: "8K ⭐",
    stack: ["TypeScript", "Electron"],
    category: "Dev Tool",
    link: "https://superset.sh"
  },
  {
    rank: 7,
    emoji: "📎",
    name: "Clippy LLM",
    tagline: "The 90s icon reborn as a local AI assistant",
    desc: "Microsoft's Clippy resurrected as an offline LLM interface. Runs Gemma 3, Qwen3, Phi-4 locally. Creator got a job offer from Anthropic.",
    stars: "22K ⭐",
    stack: ["Electron", "TypeScript", "Llama.cpp"],
    category: "AI Tool",
    link: "https://github.com/felixrieseberg/clippy",
    hot: true
  },
  {
    rank: 8,
    emoji: "🐱",
    name: "Kitten TTS",
    tagline: "Production-quality voice in 25MB",
    desc: "State-of-the-art text-to-speech that fits in under 25MB, runs on CPU, no GPU needed. 8 voices. Runs on a Raspberry Pi or in-browser.",
    stars: "9K ⭐",
    stack: ["Python", "ONNX"],
    category: "AI Model",
    link: "https://github.com/KittenML/KittenTTS"
  },
  {
    rank: 9,
    emoji: "🖥️",
    name: "Term.everything",
    tagline: "Run any GUI app inside a terminal",
    desc: "Hijacks the Wayland protocol to render full graphical apps — browsers, IDEs — as terminal output. Runs Firefox over SSH in a terminal.",
    stars: "15K ⭐",
    stack: ["TypeScript", "Wayland"],
    category: "Infra Hack",
    link: "https://github.com/mmulet/term.everything"
  },
  {
    rank: 10,
    emoji: "🦫",
    name: "Marmot",
    tagline: "Data catalog as a single Go binary",
    desc: "Zero-Kafka, zero-Elasticsearch data catalog backed only by Postgres. Built-in MCP server so AI assistants can query your data in natural language.",
    stars: "4K ⭐",
    stack: ["Go", "PostgreSQL"],
    category: "Data",
    link: "https://github.com/marmotdata/marmot"
  },
  {
    rank: 11,
    emoji: "🐕",
    name: "PgDog",
    tagline: "Horizontal sharding for Postgres — zero app changes",
    desc: "Rust proxy that adds connection pooling, load balancing, and horizontal sharding to any Postgres setup. Handles millions of QPS in production.",
    stars: "6K ⭐",
    stack: ["Rust", "PostgreSQL"],
    category: "Database",
    link: "https://github.com/levkk/pgdog"
  },
  {
    rank: 12,
    emoji: "🎁",
    name: "HN Wrapped 2025",
    tagline: "Spotify Wrapped but for your HN history",
    desc: "Enter your HN username, get an AI-generated roast and analysis of your entire year on Hacker News. Personality profile, predictions, trends.",
    stars: "—",
    stack: ["Web", "Gemini API"],
    category: "Fun",
    link: "https://hn-wrapped.kadoa.com"
  },
  {
    rank: 13,
    emoji: "🕰️",
    name: "HN Time Capsule",
    tagline: "LLMs grade 10-year-old predictions",
    desc: "Andrej Karpathy vibe-coded this in 3 hours with Claude. Feeds old HN threads to GPT-5 to grade who predicted the future correctly. Cost $58 to run.",
    stars: "3K ⭐",
    stack: ["Python", "GPT-5"],
    category: "Fun",
    link: "https://github.com/karpathy/hn-time-capsule"
  },
  {
    rank: 14,
    emoji: "💬",
    name: "Open WebUI",
    tagline: "The self-hosted ChatGPT everyone actually uses",
    desc: "Feature-rich, self-hosted LLM web UI for Ollama and OpenAI-compatible APIs. 124,000+ GitHub stars, 282M Docker pulls. The community standard.",
    stars: "124K ⭐",
    stack: ["SvelteKit", "FastAPI", "Python"],
    category: "AI Tool",
    link: "https://github.com/open-webui/open-webui"
  },
  {
    rank: 15,
    emoji: "🧠",
    name: "Kilo Code",
    tagline: "Open-source Cursor alternative, 500+ models",
    desc: "AI coding agent for VS Code supporting 500+ models. 1.5M+ users, 10,000+ stars. #1 Product Hunt. Co-founded by GitLab co-founder.",
    stars: "10K ⭐",
    stack: ["TypeScript", "VS Code API"],
    category: "Dev Tool",
    link: "https://github.com/Kilo-Org/kilocode"
  },
  {
    rank: 16,
    emoji: "💻",
    name: "Anyon_e Laptop",
    tagline: "A complete laptop built from scratch by one person",
    desc: "Custom CNC aluminum chassis, custom PCB, custom battery controller, mechanical keyboard, OLED display. Everything open-sourced. Jaws dropped worldwide.",
    stars: "21K ⭐",
    stack: ["RK3588", "KiCad", "Debian"],
    category: "Hardware",
    link: "https://news.ycombinator.com/item?id=42797260",
    hot: true
  },
  {
    rank: 17,
    emoji: "📚",
    name: "HackerBook",
    tagline: "22GB of Hacker News, browsable offline in your browser",
    desc: "20 years of HN in gzipped SQLite shards, queried via WebAssembly in-browser. Zero server. Instant navigation. Forever archive.",
    stars: "5K ⭐",
    stack: ["SQLite", "WebAssembly", "JS"],
    category: "Data",
    link: "https://github.com/DOSAYGO-STUDIO/HackerBook"
  },
  {
    rank: 18,
    emoji: "🤖",
    name: "AI Zettelkasten",
    tagline: "AI builds your second brain automatically",
    desc: "AI agent that extracts, links and surfaces ideas from articles, videos and PDFs — building an interconnected knowledge graph automatically.",
    stars: "2K ⭐",
    stack: ["Python", "Embeddings", "Graph DB"],
    category: "Productivity",
    link: "#"
  },
  {
    rank: 19,
    emoji: "🐝",
    name: "BrowserBee",
    tagline: "Cline for web browsing — AI inside your Chrome",
    desc: "Chrome extension that watches your browser and automates web tasks via natural language. Privacy-respecting, runs locally, no external server.",
    stars: "3K ⭐",
    stack: ["TypeScript", "Chrome API"],
    category: "AI Tool",
    link: "https://github.com/parsaghaffari/browserbee"
  },
  {
    rank: 20,
    emoji: "🦀",
    name: "Fresh Terminal Editor",
    tagline: "A modern Vim replacement built in Rust",
    desc: "Minimal, blazing-fast terminal text editor in Rust. Modern alternative to Vim and Nano. No config required. Clean codebase designed to hack on.",
    stars: "7K ⭐",
    stack: ["Rust"],
    category: "Dev Tool",
    link: "#"
  }
]

const ALL_CATEGORIES = ['All', ...Array.from(new Set(PROJECTS.map(p => p.category)))]

function ProjectCard({ project }) {
  const href = project.link && project.link !== '#' ? project.link : null

  const handleClick = () => {
    if (href) window.open(href, '_blank', 'noopener,noreferrer')
  }

  return (
    <div
      className={`project-card${project.rank === 1 ? ' rank-1' : ''}`}
      onClick={handleClick}
      role="article"
      aria-label={project.name}
    >
      <div className="card-top">
        <span className="rank-badge">#{project.rank}</span>
        <div className="badge-row">
          {project.hot && <span className="hot-badge">🔥 HOT</span>}
          <span className="stars-text">{project.stars}</span>
        </div>
      </div>

      <div className="card-body">
        <div className="name-row">
          <span className="card-emoji">{project.emoji}</span>
          <span className="card-name">{project.name}</span>
        </div>
        <p className="card-tagline">{project.tagline}</p>
        <p className="card-desc">{project.desc}</p>
      </div>

      <div className="card-footer">
        <div className="tag-row">
          <span className="cat-tag">{project.category}</span>
          {project.stack.map(s => (
            <span key={s} className="stack-tag">{s}</span>
          ))}
        </div>
        {href && (
          <a
            className="card-cta"
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
          >
            View Project →
          </a>
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return PROJECTS.filter(p => {
      const matchCat = activeCategory === 'All' || p.category === activeCategory
      const matchQ = !q || (
        p.name.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.stack.some(s => s.toLowerCase().includes(q))
      )
      return matchCat && matchQ
    })
  }, [query, activeCategory])

  return (
    <>
      {/* ── HERO ──────────────────────────────────────── */}
      <header className="hero">
        <div className="hero-badge">✦ April 2026 Edition</div>
        <h1 className="hero-title">
          DevBuilds <span className="grad">2026</span> 🔥
        </h1>
        <p className="hero-subtitle">
          The 20 most impressive things software engineers built recently —
          curated from GitHub, Hacker News & Product Hunt.
        </p>
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">20</div>
            <div className="hero-stat-lbl">Projects</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">5</div>
            <div className="hero-stat-lbl">🔥 Hot</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">600K+</div>
            <div className="hero-stat-lbl">Total Stars</div>
          </div>
          <div className="hero-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">11</div>
            <div className="hero-stat-lbl">Categories</div>
          </div>
        </div>
      </header>

      {/* ── CONTROLS ──────────────────────────────────── */}
      <div className="controls">
        <div className="search-wrap">
          <span className="search-icon">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search projects, tech stack, descriptions…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            aria-label="Search projects"
          />
        </div>
        <div className="filter-bar" role="group" aria-label="Filter by category">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn${activeCategory === cat ? ' active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <p className="results-info">
          Showing <b>{filtered.length}</b> of {PROJECTS.length} projects
        </p>
      </div>

      {/* ── GRID ──────────────────────────────────────── */}
      <main className="grid-wrap">
        <div className="project-grid">
          {filtered.length > 0 ? (
            filtered.map(p => <ProjectCard key={p.rank} project={p} />)
          ) : (
            <div className="empty">
              <div className="empty-icon">🔭</div>
              <div className="empty-title">No projects match your search</div>
              <p>Try a different keyword or reset the filter</p>
            </div>
          )}
        </div>
      </main>

      {/* ── FOOTER ────────────────────────────────────── */}
      <footer>
        Curated by{' '}
        <a href="https://claude.ai" target="_blank" rel="noopener noreferrer">Claude</a>
        {' '}· April 2026 ·{' '}
        <a href="https://github.com/Moath2026/devbuilds2026" target="_blank" rel="noopener noreferrer">Source on GitHub</a>
      </footer>
    </>
  )
}
