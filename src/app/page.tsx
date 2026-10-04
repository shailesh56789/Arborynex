"use client";

import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════
   ANIMATED COUNTER
   ═══════════════════════════════════════════ */
function useCounter(target: number, duration = 2200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const t0 = Date.now();
          const tick = () => {
            const p = Math.min((Date.now() - t0) / duration, 1);
            setCount(Math.floor((1 - Math.pow(1 - p, 4)) * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);

  return { count, ref };
}

/* ═══════════════════════════════════════════
   ARROW ICON (reused)
   ═══════════════════════════════════════════ */
const ArrowRight = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */
const LINKS = ["About", "Services", "Industries", "Insights", "Contact"];

const SERVICES = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
    title: "Enterprise Digital Platforms",
    desc: "End-to-end web platforms, SaaS products, and enterprise portals engineered for scale, security, and performance.",
    tags: ["React", "Next.js", "Node.js", "GraphQL"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
    title: "Mobile Engineering",
    desc: "High-performance native and cross-platform mobile solutions with pixel-perfect UI and seamless backend integration.",
    tags: ["Flutter", "React Native", "Swift", "Kotlin"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "Artificial Intelligence",
    desc: "Custom ML models, predictive analytics, NLP, and generative AI solutions that unlock data-driven competitive advantage.",
    tags: ["TensorFlow", "PyTorch", "LLMs", "MLOps"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
      </svg>
    ),
    title: "Cloud Infrastructure",
    desc: "Cloud-native architecture, Kubernetes orchestration, IaC, and DevSecOps pipelines for enterprise-grade reliability.",
    tags: ["AWS", "Azure", "GCP", "Terraform"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Cybersecurity",
    desc: "Zero-trust architecture, threat intelligence, compliance automation, and SOC services protecting critical assets.",
    tags: ["SIEM", "Zero Trust", "SOC", "GRC"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.4}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Data & Analytics",
    desc: "Enterprise BI platforms, real-time data pipelines, and advanced analytics enabling evidence-based strategic decisions.",
    tags: ["Snowflake", "Databricks", "Power BI", "dbt"],
  },
];

const INDUSTRIES = [
  { name: "Banking & Financial Services", icon: "🏦" },
  { name: "Healthcare & Life Sciences", icon: "🏥" },
  { name: "Retail & Consumer Goods", icon: "🛒" },
  { name: "Manufacturing & Industrial", icon: "🏭" },
  { name: "Education & EdTech", icon: "🎓" },
  { name: "Logistics & Supply Chain", icon: "📦" },
  { name: "Energy & Utilities", icon: "⚡" },
  { name: "Government & Defence", icon: "🏛️" },
];

const INSIGHTS = [
  {
    category: "Thought Leadership",
    title: "Building Sustainable Digital Infrastructure for the Next Decade",
    excerpt: "A strategic framework for enterprises aiming to reduce carbon footprint while accelerating digital transformation at scale.",
    date: "Sep 2026",
    readTime: "8 min",
  },
  {
    category: "Case Study",
    title: "47% Reduction in Stockouts: AI-Powered Inventory for a $2B Retailer",
    excerpt: "How Arborynex deployed predictive ML models to revolutionize supply chain operations across 500+ stores.",
    date: "Aug 2026",
    readTime: "12 min",
  },
  {
    category: "Technical Paper",
    title: "Zero-Trust Security in Hybrid Cloud: An Enterprise Playbook",
    excerpt: "A comprehensive reference architecture for implementing zero-trust across multi-cloud enterprise environments.",
    date: "Jul 2026",
    readTime: "10 min",
  },
];

const LEADERSHIP = [
  { name: "Shailesh Kumar", role: "Founder & CEO", bio: "Visionary technologist with 10+ years leading enterprise digital transformation across global markets." },
  { name: "Coming Soon", role: "Chief Technology Officer", bio: "Driving engineering excellence and architectural innovation across the Arborynex platform ecosystem." },
  { name: "Coming Soon", role: "VP, Business Development", bio: "Building strategic partnerships and expanding Arborynex's enterprise client portfolio globally." },
];

/* ═══════════════════════════════════════════
   COMPONENT
   ═══════════════════════════════════════════ */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const s1 = useCounter(150, 2000);
  const s2 = useCounter(500, 2400);
  const s3 = useCounter(99, 2000);
  const s4 = useCounter(12, 1800);

  /* ── Theme: read from localStorage or system preference ── */
  useEffect(() => {
    const saved = localStorage.getItem("arborynex-theme");
    if (saved === "light") {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    } else if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      // default to dark
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const next = !darkMode;
    setDarkMode(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("arborynex-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("arborynex-theme", "light");
    }
  };

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: "", email: "", company: "", service: "", message: "" });
  };

  return (
    <main className="relative">
      {/* ── NAVBAR ── */}
      <nav className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "nav-solid py-3" : "py-5"}`}>
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group" aria-label="Home">
            <div className="w-8 h-8 rounded-md bg-emerald-500 flex items-center justify-center text-white font-extrabold text-sm tracking-tight">
              A
            </div>
            <div className="leading-none">
              <span className="text-[15px] font-bold tracking-tight text-slate-900 dark:text-white">
                Arborynex
              </span>
              <span className="block text-[8px] text-emerald-600 tracking-[0.22em] uppercase font-semibold mt-px">
                Labs Pvt. Ltd.
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-9">
            {LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} className="text-[12px] font-semibold text-gray-500 hover:text-slate-900 dark:hover:text-white transition-colors tracking-[0.08em] uppercase">
                {l}
              </a>
            ))}

            {/* ── Theme Toggle ── */}
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              title={darkMode ? 'Light mode' : 'Dark mode'}
            >
              <div className="theme-toggle-knob">
                {darkMode ? (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>

            <a href="#contact" className="btn-primary !py-2 !px-5 !text-[12px]">
              Partner With Us
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="theme-toggle !w-10 !h-5"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              <div className="theme-toggle-knob !w-3.5 !h-3.5">
                {darkMode ? (
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                ) : (
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
            </button>
            <button className="text-gray-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {menuOpen
                  ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="lg:hidden nav-solid mt-1 mx-4 rounded-lg p-5 anim-fade-up">
            {LINKS.map((l) => (
              <a key={l} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)}
                className="block py-3 text-[13px] font-semibold text-gray-500 hover:text-slate-900 dark:text-gray-400 dark:hover:text-white transition-colors border-b border-black/5 dark:border-white/5 last:border-0 uppercase tracking-wide">
                {l}
              </a>
            ))}
            <a href="#contact" className="btn-primary block text-center mt-4 !text-[13px]" onClick={() => setMenuOpen(false)}>
              Partner With Us
            </a>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="relative min-h-screen flex items-center hero-bg">
        <div className="absolute inset-0 dot-grid opacity-50" aria-hidden="true" />

        {/* Subtle floating particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: `${Math.random() * 2 + 1}px`, height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
              background: `rgba(16,185,129,${Math.random() * 0.25 + 0.05})`,
              animation: `float ${Math.random() * 10 + 6}s ease-in-out ${Math.random() * 5}s infinite`,
            }} />
          ))}
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-10 pt-32 pb-28 w-full">
          <div className="max-w-[720px]">
            <div className="anim-fade-up">
              <div className="overline mb-10">Arborynex Labs Private Limited</div>
            </div>

            <h1 className="anim-fade-up-d1 heading-xl">
              Engineering the{" "}
              <span className="text-gradient">Future</span>
              <br />
              with Nature&apos;s
              <br />
              <span className="text-gradient">Resilience</span>
            </h1>

            <p className="anim-fade-up-d2 mt-8 body-lg max-w-[580px]">
              We are an enterprise technology firm delivering scalable, secure, and future-ready
              digital solutions. <span className="text-emerald-400/90 font-medium">Arbor</span> (strength of nature)
              + <span className="text-emerald-400/90 font-medium">Nex</span> (next-generation innovation).
            </p>

            <div className="anim-fade-up-d3 mt-10 flex flex-wrap gap-3">
              <a href="#services" className="btn-primary">
                Our Capabilities <ArrowRight />
              </a>
              <a href="#about" className="btn-secondary">
                About Arborynex
              </a>
            </div>

            {/* Trust indicators */}
            <div className="anim-fade-up-d4 mt-20 flex flex-wrap items-center gap-x-8 gap-y-3">
              {["ISO 27001 Certified", "SOC 2 Type II", "GDPR Compliant", "MCA Registered"].map((badge) => (
                <span key={badge} className="flex items-center gap-2 text-[10px] text-gray-600 uppercase tracking-[0.15em] font-semibold">
                  <span className="w-1 h-1 rounded-full bg-emerald-600" />
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-[18px] h-[28px] rounded-full border border-white/10 flex justify-center pt-1.5">
            <div className="w-[3px] h-[6px] rounded-full bg-emerald-500/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ── CLIENT MARQUEE ── */}
      <section className="py-10 border-y border-black/[0.06] dark:border-white/[0.03]">
        <div className="marquee-mask">
          <div className="flex items-center gap-20 anim-marquee w-max">
            {[...Array(2)].flatMap((_, s) =>
              ["Fortune 500 Partners", "Global Financial Institutions", "Healthcare Leaders", "Retail Enterprises", "Government Bodies", "Manufacturing Giants", "EdTech Innovators", "Energy Corporations"].map(
                (n, i) => (
                  <span key={`${s}-${i}`} className="text-[11px] text-gray-700 font-semibold tracking-[0.12em] uppercase whitespace-nowrap flex items-center gap-3">
                    <span className="w-[3px] h-[3px] rounded-full bg-emerald-900" />
                    {n}
                  </span>
                )
              )
            )}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-28 lg:py-40">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <div className="overline mb-6">About the Company</div>
              <h2 className="heading-lg mb-6">
                Where Nature&apos;s Strength Meets{" "}
                <span className="text-gradient">Enterprise Innovation</span>
              </h2>
              <div className="space-y-5">
                <p className="body-lg">
                  <strong className="text-slate-900 dark:text-white font-semibold">Arborynex Labs Private Limited</strong> is a
                  next-generation technology consultancy delivering enterprise-grade digital transformation
                  across industries.
                </p>
                <p className="body-sm">
                  Our name embodies our philosophy — <em className="text-emerald-400/80">Arbor</em> (Latin for tree:
                  deep roots, enduring strength) + <em className="text-emerald-400/80">Nex</em> (next &amp; nexus:
                  future-forward, interconnected). We architect solutions that grow like nature —
                  resilient, sustainable, and ever-evolving.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-8">
                <div className="card-highlight p-5 rounded-xl">
                  <div className="text-emerald-400 font-bold text-lg mb-1 tracking-tight">Arbor</div>
                  <div className="text-[12px] text-gray-600 leading-relaxed">Trees · Deep Roots · Enduring Strength · Organic Growth</div>
                </div>
                <div className="card-highlight p-5 rounded-xl">
                  <div className="text-emerald-400 font-bold text-lg mb-1 tracking-tight">Nex</div>
                  <div className="text-[12px] text-gray-600 leading-relaxed">Next-Gen · Nexus · Future-Forward · Connected</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { label: "Our Mission", icon: "◎", text: "Empower enterprises with technology rooted in reliability, sustainability, and relentless innovation — bridging today's needs with tomorrow's possibilities." },
                { label: "Our Vision", icon: "◈", text: "To be the world's most trusted technology partner for organizations building a sustainable digital future — growing like nature, one strong branch at a time." },
                { label: "Our Values", icon: "◆", text: "Integrity in every engagement. Innovation at every layer. Sustainability in every solution. Client success as our only measure of success." },
              ].map((item, i) => (
                <div key={i} className="card p-6 flex gap-5 group">
                  <div className="icon-box group-hover:bg-emerald-500/12 group-hover:border-emerald-500/20">
                    <span className="text-sm">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="heading-md !text-sm mb-2 group-hover:text-emerald-300 transition-colors">{item.label}</h3>
                    <p className="body-sm !text-[13px]">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-20 border-y border-black/[0.06] dark:border-white/[0.03]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
            {[
              { ref: s1.ref, val: s1.count, suf: "+", label: "Enterprise Projects", sub: "Delivered successfully" },
              { ref: s2.ref, val: s2.count, suf: "+", label: "Team Members", sub: "Across global offices" },
              { ref: s3.ref, val: s3.count, suf: ".9%", label: "Uptime SLA", sub: "Guaranteed availability" },
              { ref: s4.ref, val: s4.count, suf: "+", label: "Countries", sub: "Global presence" },
            ].map((s, i) => (
              <div key={i} ref={s.ref}>
                <div className="stat-value text-gradient">{s.val}{s.suf}</div>
                <div className="text-slate-900 dark:text-white font-semibold text-sm mt-2">{s.label}</div>
                <div className="text-gray-700 text-xs mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="py-28 lg:py-40">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <div className="overline mb-6">Capabilities</div>
            <h2 className="heading-lg mb-5">
              End-to-End Technology{" "}
              <span className="text-gradient">Solutions</span>
            </h2>
            <p className="body-lg">
              From strategy and design to engineering and managed services — we deliver
              comprehensive solutions that drive measurable business outcomes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SERVICES.map((s, i) => (
              <div key={i} className="card p-7 group" id={`service-${i}`}>
                <div className="icon-box mb-5 group-hover:bg-emerald-500/12 group-hover:border-emerald-500/20">
                  {s.icon}
                </div>
                <h3 className="heading-md mb-3 group-hover:text-emerald-300 transition-colors">{s.title}</h3>
                <p className="body-sm mb-5">{s.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {s.tags.map((t) => <span key={t} className="tag">{t}</span>)}
                </div>
                <div className="btn-text opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section id="industries" className="py-28 lg:py-40 border-t border-black/[0.06] dark:border-white/[0.03]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <div className="overline mb-6">Industry Expertise</div>
              <h2 className="heading-lg mb-5">
                Deep Domain Knowledge Across{" "}
                <span className="text-gradient">Critical Sectors</span>
              </h2>
              <p className="body-sm mb-8">
                Our cross-industry experience enables us to bring proven patterns and sector-specific
                compliance knowledge to every engagement.
              </p>
              <a href="#contact" className="btn-secondary">
                Discuss Your Industry
              </a>
            </div>

            <div className="lg:col-span-3 grid grid-cols-2 gap-3">
              {INDUSTRIES.map((ind, i) => (
                <div key={i} className="card p-5 flex items-center gap-4 group cursor-default">
                  <span className="text-xl group-hover:scale-110 transition-transform duration-300">{ind.icon}</span>
                  <span className="text-[13px] font-medium text-gray-500 dark:text-gray-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{ind.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="py-28 lg:py-40 border-t border-black/[0.06] dark:border-white/[0.03]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="max-w-2xl mb-16">
            <div className="overline mb-6">Leadership</div>
            <h2 className="heading-lg mb-5">
              Guided by{" "}
              <span className="text-gradient">Experience</span>
            </h2>
            <p className="body-lg">
              Our leadership team brings decades of enterprise technology expertise,
              driving Arborynex&apos;s mission to build sustainable digital futures.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            {LEADERSHIP.map((p, i) => (
              <div key={i} className="card p-7 group text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/8 border border-emerald-500/15 flex items-center justify-center mx-auto mb-5 text-emerald-400 text-xl font-bold group-hover:bg-emerald-500/15 transition-all">
                  {p.name.charAt(0)}
                </div>
                <h3 className="text-slate-900 dark:text-white font-bold text-base mb-1">{p.name}</h3>
                <div className="text-emerald-500/70 text-xs font-semibold uppercase tracking-wider mb-3">{p.role}</div>
                <p className="body-sm !text-[13px]">{p.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ARBORYNEX ── */}
      <section className="py-28 lg:py-40 border-t border-black/[0.06] dark:border-white/[0.03]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <div className="overline justify-center mb-6">The Arborynex Advantage</div>
            <h2 className="heading-lg">
              Why Leading Enterprises{" "}
              <span className="text-gradient">Choose Us</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { n: "01", t: "Deep-Rooted Expertise", d: "Seasoned professionals delivering mission-critical projects across Fortune 500 enterprises and high-growth startups." },
              { n: "02", t: "Future-Forward Architecture", d: "We design for the next decade — architectures that evolve gracefully with emerging technologies and market shifts." },
              { n: "03", t: "Sustainable & Scalable", d: "Like nature's ecosystems, our solutions scale organically — from proof-of-concept to global enterprise deployment." },
              { n: "04", t: "End-to-End Partnership", d: "Strategy → Design → Engineering → Deployment → Support. One trusted partner for the complete technology lifecycle." },
            ].map((item, i) => (
              <div key={i} className="card p-7 group">
                <span className="text-emerald-700 font-mono text-xs font-bold block mb-4 group-hover:text-emerald-400 transition-colors">{item.n}</span>
                <h3 className="heading-md !text-[15px] mb-3 group-hover:text-emerald-300 transition-colors">{item.t}</h3>
                <p className="body-sm !text-[13px]">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INSIGHTS ── */}
      <section id="insights" className="py-28 lg:py-40 border-t border-black/[0.06] dark:border-white/[0.03]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
            <div>
              <div className="overline mb-6">Insights & Research</div>
              <h2 className="heading-lg">
                Latest from{" "}
                <span className="text-gradient">Arborynex</span>
              </h2>
            </div>
            <a href="#" className="btn-text">View all <ArrowRight className="w-3.5 h-3.5" /></a>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {INSIGHTS.map((post, i) => (
              <article key={i} className="card p-7 group cursor-pointer flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-600 mb-3">{post.category}</span>
                <h3 className="text-slate-900 dark:text-white font-semibold text-base leading-snug mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">{post.title}</h3>
                <p className="body-sm !text-[13px] mb-5 flex-1">{post.excerpt}</p>
                <div className="flex items-center justify-between text-[11px] text-gray-700 font-medium pt-4 border-t border-white/[0.04]">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="py-28 border-t border-black/[0.06] dark:border-white/[0.03] relative overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-50" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="heading-lg mb-5">
            Ready to Build the{" "}
            <span className="text-gradient">Future?</span>
          </h2>
          <p className="body-lg mx-auto mb-10 max-w-xl">
            Whether you&apos;re modernizing legacy systems, launching new digital products, or exploring
            AI — Arborynex Labs is your technology partner.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#contact" className="btn-primary">
              Schedule a Consultation <ArrowRight />
            </a>
            <a href="#services" className="btn-secondary">
              Explore Capabilities
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-28 lg:py-40 border-t border-black/[0.06] dark:border-white/[0.03]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-5 gap-16">
            <div className="lg:col-span-2">
              <div className="overline mb-6">Contact</div>
              <h2 className="heading-lg mb-5">
                Let&apos;s Start a{" "}
                <span className="text-gradient">Conversation</span>
              </h2>
              <p className="body-sm mb-10">
                Share your business objectives and technology challenges.
                Our experts will respond with a tailored strategy within 24 hours.
              </p>

              <div className="space-y-5">
                {[
                  { icon: "✉", label: "Business Inquiries", value: "contact@arborynex.com" },
                  { icon: "📍", label: "Headquarters", value: "India" },
                  { icon: "🕐", label: "Business Hours", value: "Mon – Sat · 9 AM – 7 PM IST" },
                ].map((c, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="icon-box !w-9 !h-9 !rounded-md text-sm">{c.icon}</div>
                    <div>
                      <div className="text-[10px] text-gray-700 uppercase tracking-[0.14em] font-semibold mb-0.5">{c.label}</div>
                      <div className="text-slate-900 dark:text-white text-sm font-medium">{c.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="card p-8 sm:p-10">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-20 text-center anim-fade-up">
                    <div className="icon-box-lg !w-14 !h-14 mb-5 text-xl">✓</div>
                    <h3 className="text-slate-900 dark:text-white font-bold text-xl mb-2">Inquiry Received</h3>
                    <p className="body-sm">Our team will respond within 24 business hours.</p>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className="label">Full Name *</label>
                        <input id="name" type="text" required className="input" placeholder="Your name"
                          value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="email" className="label">Business Email *</label>
                        <input id="email" type="email" required className="input" placeholder="you@company.com"
                          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="company" className="label">Company</label>
                        <input id="company" type="text" className="input" placeholder="Organization name"
                          value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                      </div>
                      <div>
                        <label htmlFor="service" className="label">Service Interest</label>
                        <select id="service" className="input !appearance-none"
                          value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
                          <option value="">Select a service</option>
                          {SERVICES.map((s, i) => <option key={i} value={s.title}>{s.title}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className="label">Project Details *</label>
                      <textarea id="message" required rows={5} className="input resize-none"
                        placeholder="Describe your objectives, timeline, and requirements..."
                        value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                    </div>
                    <button type="submit" className="btn-primary w-full">
                      Submit Inquiry <ArrowRight />
                    </button>
                    <p className="text-[10px] text-gray-700 text-center tracking-wide">
                      Protected by our Privacy Policy. Response within 24 business hours.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-black/[0.06] dark:border-white/[0.04] pt-16 pb-8">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-14">
            <div className="col-span-2 lg:col-span-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-7 h-7 rounded-md bg-emerald-500 flex items-center justify-center text-white font-extrabold text-xs">A</div>
                <div className="leading-none">
                  <span className="text-sm font-bold text-slate-900 dark:text-white">Arborynex</span>
                  <span className="block text-[7px] text-emerald-700 tracking-[0.22em] uppercase font-semibold mt-px">Labs Private Limited</span>
                </div>
              </div>
              <p className="body-sm !text-[12px] max-w-[260px] mb-4">
                Engineering the future with nature&apos;s resilience.
                Enterprise technology solutions built to endure.
              </p>
              <div className="flex items-center gap-3 text-[9px] text-gray-800 uppercase tracking-[0.15em] font-semibold">
                <span>MCA Registered</span>
                <span className="w-[3px] h-[3px] rounded-full bg-gray-800" />
                <span>CIN Verified</span>
              </div>
            </div>

            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold text-[11px] mb-5 uppercase tracking-[0.14em]">Company</h4>
              <div className="space-y-2.5">
                {["About", "Leadership", "Careers", "Newsroom", "ESG"].map((l) => (
                  <a key={l} href={`#${l.toLowerCase()}`} className="block text-gray-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white text-[12px] transition-colors">{l}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold text-[11px] mb-5 uppercase tracking-[0.14em]">Solutions</h4>
              <div className="space-y-2.5">
                {["Digital Platforms", "Mobile", "AI & ML", "Cloud", "Security", "Analytics"].map((s) => (
                  <a key={s} href="#services" className="block text-gray-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white text-[12px] transition-colors">{s}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-slate-900 dark:text-white font-semibold text-[11px] mb-5 uppercase tracking-[0.14em]">Resources</h4>
              <div className="space-y-2.5">
                {["Case Studies", "Blog", "Whitepapers", "Documentation", "API Reference"].map((r) => (
                  <a key={r} href="#insights" className="block text-gray-500 dark:text-gray-600 hover:text-slate-900 dark:hover:text-white text-[12px] transition-colors">{r}</a>
                ))}
              </div>
            </div>
          </div>

          <div className="divider mb-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-800 text-[11px]">
              © {new Date().getFullYear()} Arborynex Labs Private Limited. All rights reserved.
            </p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy", "Sitemap"].map((l) => (
                <a key={l} href="#" className="text-gray-500 dark:text-gray-700 hover:text-slate-900 dark:hover:text-white text-[11px] transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
