import React, { useState, useEffect, useMemo } from "react";
import {
  Search,
  ChevronRight,
  ArrowRight,
  Menu,
  X,
  ArrowLeft,
  Clock,
  Share2,
  Printer,
  MapPin,
  Phone,
  Mail,
  Linkedin,
  Twitter,
  Facebook,
  CheckCircle2,
  Leaf,
} from "lucide-react";

// --- Assets & Data ---

const HERO_SLIDES = [
  {
    id: 1,
    date: "October 12, 2025",
    title: "Preparing for the Next Chapter in Construction: 2025 Market Report",
    description:
      "Our report examines if construction business owners are ready for transition. Whether retirement feels far off or just around the corner, understanding where you stand is crucial.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    category: "Construction",
    author: "Sarah Jenkins, CPA",
    readTime: "8 min read",
    content: `
      <h3 class="text-2xl font-serif font-bold text-slate-900 mb-4">The Construction Landscape is Shifting</h3>
      <p class="mb-6 text-slate-600 leading-relaxed">The construction industry is facing a pivotal moment in 2025. With labor shortages continuing to challenge project timelines and material costs fluctuating wildly, business owners are finding themselves at a crossroads. Our latest market report indicates that 65% of family-owned construction firms do not have a formal succession plan in place.</p>
      
      <h3 class="text-2xl font-serif font-bold text-slate-900 mb-4">Valuation and Exit Strategy</h3>
      <p class="mb-6 text-slate-600 leading-relaxed">Understanding the true value of your business goes beyond simple asset calculation. It involves assessing your goodwill, your contract backlog, and the stability of your workforce. For those looking to exit in the next 5-10 years, the time to start maximizing that value is now.</p>
      
      <blockquote class="border-l-4 border-emerald-600 pl-4 italic text-slate-700 my-8 font-serif">
        "Transition isn't just about handing over the keys; it's about ensuring the legacy of what you've built continues to thrive."
      </blockquote>

      <h3 class="text-2xl font-serif font-bold text-slate-900 mb-4">Key Takeaways for 2025</h3>
      <ul class="list-disc pl-5 space-y-2 text-slate-600 mb-6">
        <li>Digitize your project management to increase operational efficiency.</li>
        <li>Review your tax structure to optimize for capital gains exemptions.</li>
        <li>Invest in retention strategies for key project managers and site supervisors.</li>
      </ul>
    `,
  },
  {
    id: 2,
    date: "October 08, 2025",
    title: "Cyber Security 101: Protecting Your Financial Assets",
    description:
      "In an era of digital transformation, safeguarding client data is paramount. Learn the essential steps every firm needs to take to prevent a breach.",
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    category: "Technology",
    author: "David Chen, CISSP",
    readTime: "6 min read",
    content: `
      <h3 class="text-2xl font-serif font-bold text-slate-900 mb-4">The New Threat Landscape</h3>
      <p class="mb-6 text-slate-600 leading-relaxed">Cyber attacks on financial institutions and accounting firms have risen by 40% in the last year alone. The data you hold is valuable, making you a prime target for ransomware and phishing attacks.</p>
      <p class="mb-6 text-slate-600 leading-relaxed">It is no longer a question of 'if' but 'when'. Implementing multi-factor authentication (MFA) and regular staff training are the baseline requirements for modern security hygiene.</p>
    `,
  },
  {
    id: 3,
    date: "September 28, 2025",
    title: "2025 Federal Budget Highlights: What It Means for You",
    description:
      "A comprehensive breakdown of the new federal tax changes and how they impact small to medium-sized enterprises in the coming fiscal year.",
    image:
      "https://images.unsplash.com/photo-1554224155-98406852d004?q=80&w=2071&auto=format&fit=crop",
    category: "Tax Insights",
    author: "Elena Rodriguez, Tax Partner",
    readTime: "12 min read",
    content: `
      <h3 class="text-2xl font-serif font-bold text-slate-900 mb-4">Changes to Capital Gains</h3>
      <p class="mb-6 text-slate-600 leading-relaxed">The 2025 budget introduces significant changes to the capital gains inclusion rate. For corporations and trusts, this adjustment will require a strategic review of investment portfolios and divestiture timings.</p>
      <h3 class="text-2xl font-serif font-bold text-slate-900 mb-4">Small Business Deduction</h3>
      <p class="mb-6 text-slate-600 leading-relaxed">Good news for manufacturing and processing sectors: the small business deduction limit has been adjusted to account for inflation, providing some much-needed relief.</p>
    `,
  },
  {
    id: 4,
    date: "September 15, 2025",
    title: "Sustainable Growth: ESG Strategies for Modern Business",
    description:
      "Environmental, Social, and Governance criteria are no longer optional. Discover how to integrate sustainability into your core business strategy.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
    category: "Sustainability",
    author: "Marcus Thorne, ESG Consultant",
    readTime: "5 min read",
    content: `
      <h3 class="text-2xl font-serif font-bold text-slate-900 mb-4">Why ESG Matters Now</h3>
      <p class="mb-6 text-slate-600 leading-relaxed">Investors and banks are increasingly using ESG criteria to screen potential investments. A strong ESG score can lower your cost of capital and attract top-tier talent who want to work for purpose-driven organizations.</p>
      <p class="mb-6 text-slate-600 leading-relaxed">Start small: measure your carbon footprint, audit your supply chain for ethical labor practices, and formalize your governance policies.</p>
    `,
  },
];

const NAV_DATA = {
  Services: [
    "Assurance & Accounting",
    "Tax Services",
    "Consulting",
    "Corporate Finance",
    "Bookkeeping & Cloud Accounting",
    "Enterprise Risk",
    "Insolvency",
    "Valuations",
    "Digital Services",
    "Forensics & Litigation Support",
    "Succession Planning",
    "Mergers & Acquisitions",
  ],
  Clients: [
    "Agriculture",
    "Real Estate & Construction",
    "Technology & Media",
    "Healthcare Professionals",
    "Oil & Gas",
    "Public Sector",
    "Non-Profit Organizations",
    "Indigenous Services",
    "Food & Beverage",
    "Manufacturing",
    "Retail & Consumer",
    "Forestry",
  ],
  "Business Insights": [
    "Latest Articles",
    "Webinars & Events",
    "Economic Reports",
    "Tax Alerts",
    "Podcast: The Bottom Line",
    "Newsletters",
    "Case Studies",
    "Whitepapers",
  ],
  About: [
    "Our Firm",
    "Leadership Team",
    "Community Impact",
    "Diversity & Inclusion",
    "Careers at Ginkgo",
    "Alumni Network",
    "Awards & Recognition",
    "Contact Us",
  ],
};

// --- Components ---

const Logo = ({ onClick }) => (
  <div
    onClick={onClick}
    className="flex items-center gap-3 group cursor-pointer z-50 relative"
  >
    <div className="relative w-10 h-10 flex items-center justify-center bg-white rounded-tr-xl rounded-bl-xl shadow-lg transition-transform group-hover:scale-105">
      <Leaf className="w-6 h-6 text-slate-900" />
    </div>
    <div className="flex flex-col">
      <span className="text-2xl font-serif font-bold tracking-tight text-white leading-none">
        GINKGO
      </span>
      <span className="text-[10px] uppercase tracking-widest text-slate-300 font-medium">
        Accounting & Consulting Inc.
      </span>
    </div>
  </div>
);

// --- Modals & Overlays ---

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center border-b border-emerald-600/30">
          <h3 className="text-white text-xl font-serif font-bold">
            Start a Conversation
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:ring-2 focus:ring-emerald-600 outline-none"
                placeholder="john@company.com"
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Topic
              </label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:ring-2 focus:ring-emerald-600 outline-none">
                <option>General Inquiry</option>
                <option>Tax Services</option>
                <option>Consulting</option>
                <option>Careers</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col h-full">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Message
            </label>
            <textarea
              className="flex-grow w-full bg-slate-50 border border-slate-200 rounded p-3 text-sm focus:ring-2 focus:ring-emerald-600 outline-none resize-none mb-4"
              placeholder="How can we help you today?"
            ></textarea>
            <button className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 rounded transition-colors flex items-center justify-center gap-2">
              Send Message <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="bg-slate-50 px-8 py-4 border-t border-slate-100 flex justify-between items-center text-xs text-slate-500">
          <span>
            Or call us directly at: <strong>1-800-GINKGO-1</strong>
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Toronto • Vancouver • Calgary
          </span>
        </div>
      </div>
    </div>
  );
};

const SearchOverlay = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState("");

  // Flatten data for search
  const allLinks = useMemo(() => {
    const links = [];
    Object.entries(NAV_DATA).forEach(([category, items]) => {
      items.forEach((item) =>
        links.push({ type: "page", title: item, category })
      );
    });
    HERO_SLIDES.forEach((slide) =>
      links.push({
        type: "article",
        title: slide.title,
        category: "Insight",
        data: slide,
      })
    );
    return links;
  }, []);

  const results = query
    ? allLinks.filter((l) =>
        l.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] bg-slate-900/98 animate-in fade-in duration-200 flex flex-col pt-24 px-6">
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors"
      >
        <X className="w-8 h-8" />
      </button>
      <div className="max-w-3xl mx-auto w-full">
        <div className="relative mb-12">
          <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 text-emerald-500" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, industries, or insights..."
            className="w-full bg-transparent border-b-2 border-slate-700 text-3xl md:text-5xl font-serif font-bold text-white pb-4 pl-12 focus:border-emerald-500 outline-none placeholder:text-slate-700 transition-colors"
          />
        </div>

        <div className="space-y-4 overflow-y-auto max-h-[60vh]">
          {query === "" && (
            <p className="text-slate-500 text-lg">
              Start typing to explore our firm's expertise...
            </p>
          )}
          {query !== "" && results.length === 0 && (
            <p className="text-slate-500 text-lg">
              No results found for "{query}".
            </p>
          )}
          {results.map((result, idx) => (
            <div
              key={idx}
              onClick={() => {
                onNavigate(result);
                onClose();
              }}
              className="group flex items-center justify-between p-4 rounded-lg hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10"
            >
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-1 block">
                  {result.category}
                </span>
                <h4 className="text-xl text-slate-200 group-hover:text-white font-serif font-medium">
                  {result.title}
                </h4>
              </div>
              <ArrowRight className="text-slate-600 group-hover:text-emerald-500 transition-colors w-5 h-5" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MegaMenu = ({
  activeTab,
  isVisible,
  onMouseEnter,
  onMouseLeave,
  onLinkClick,
}) => {
  if (!activeTab || !isVisible) return null;
  const items = NAV_DATA[activeTab] || [];

  return (
    <div
      className="absolute top-full left-0 w-full bg-white border-t-4 border-emerald-600 shadow-xl z-50 animate-in fade-in slide-in-from-top-1 duration-200"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="max-w-7xl mx-auto px-6 py-10">
        <h3 className="text-2xl font-serif text-slate-900 mb-6 pb-2 border-b border-slate-200">
          {activeTab}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 gap-x-8">
          {items.map((item, idx) => (
            <button
              key={idx}
              onClick={() => onLinkClick({ title: item, category: activeTab })}
              className="flex items-center text-left text-slate-600 hover:text-emerald-700 hover:pl-1 transition-all group"
            >
              <ChevronRight className="w-4 h-4 text-emerald-500 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="text-sm font-medium">{item}</span>
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <button className="text-sm font-bold text-slate-900 flex items-center hover:underline hover:text-emerald-700">
            View all {activeTab} <ArrowRight className="ml-1 w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Page Components ---

const ArticleView = ({ article, onBack, onOpenContact }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-500 bg-white min-h-screen pb-20">
      <div className="relative h-[400px] w-full">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/60"></div>
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-4xl mx-auto px-6 w-full pb-12">
            <button
              onClick={onBack}
              className="text-white flex items-center gap-2 mb-6 hover:text-emerald-400 transition-colors font-bold uppercase text-xs tracking-widest"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Insights
            </button>
            <span className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-widest text-emerald-300 uppercase border border-emerald-500/30 bg-slate-900/50 rounded-full backdrop-blur-md">
              {article.category}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-3 space-y-8">
          <div className="border-l-2 border-emerald-500 pl-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Published
            </p>
            <p className="text-slate-900 font-medium">{article.date}</p>
          </div>
          <div className="border-l-2 border-emerald-500 pl-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Author
            </p>
            <p className="text-slate-900 font-medium">{article.author}</p>
          </div>
          <div className="border-l-2 border-emerald-500 pl-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
              Read Time
            </p>
            <div className="flex items-center gap-2 text-slate-900 font-medium">
              <Clock className="w-4 h-4 text-emerald-500" /> {article.readTime}
            </div>
          </div>
          <div className="flex gap-4 pt-4">
            <button className="p-2 text-slate-400 hover:text-emerald-500 border border-slate-200 rounded-full hover:border-emerald-500 transition-all">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="p-2 text-slate-400 hover:text-emerald-500 border border-slate-200 rounded-full hover:border-emerald-500 transition-all">
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-9">
          <p className="text-xl font-serif text-slate-600 italic leading-relaxed mb-8">
            {article.description}
          </p>
          <hr className="border-slate-200 mb-8" />
          <div
            className="prose prose-lg prose-slate max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
          <div className="mt-16 bg-slate-50 p-8 rounded-xl border border-slate-100">
            <h4 className="font-bold font-serif text-slate-900 mb-2">
              Need professional advice on this topic?
            </h4>
            <p className="text-slate-600 mb-4">
              Our specialized team is ready to help you navigate these changes.
            </p>
            <button
              onClick={onOpenContact}
              className="bg-slate-900 text-white px-6 py-3 rounded font-bold text-sm hover:bg-emerald-600 transition-colors"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Generic Template for Service/Client Pages
const ServiceTemplate = ({ title, category, onOpenContact }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  // Dynamic images based on category
  const bgImage =
    category === "Clients"
      ? "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
      : "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="pt-24 min-h-screen bg-white animate-in fade-in duration-500">
      {/* Small Hero */}
      <div className="relative h-[300px] w-full bg-slate-900 overflow-hidden">
        <img
          src={bgImage}
          className="w-full h-full object-cover opacity-30"
          alt="Background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent"></div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <span className="text-emerald-400 font-bold uppercase tracking-widest text-sm mb-2 block">
              {category}
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white">
              {title}
            </h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-serif font-bold text-slate-900 mb-6">
            Our Approach to {title}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-6">
            At Ginkgo, we understand that {title} requires a nuanced approach.
            Our dedicated team of experts combines deep industry knowledge with
            innovative strategies to deliver results that matter. We don't just
            provide answers; we provide the roadmap to your future success.
          </p>
          <p className="text-slate-600 leading-relaxed mb-12">
            Whether you are a startup looking to scale or an established
            enterprise seeking to optimize, our {title} solutions are tailored
            to meet your unique challenges.
          </p>

          <h3 className="text-xl font-serif font-bold text-slate-900 mb-6">
            Key Capabilities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              "Strategic Planning",
              "Risk Assessment",
              "Operational Efficiency",
              "Regulatory Compliance",
            ].map((cap, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg border border-slate-100"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{cap}</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Comprehensive solutions designed for impact.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-emerald-50 border-l-4 border-emerald-600 p-6 rounded-r-lg">
            <h4 className="font-bold font-serif text-slate-900 mb-2">
              Why Choose Ginkgo?
            </h4>
            <p className="text-sm text-slate-700">
              We have been recognized as a top-tier firm in {title} for three
              consecutive years. Our client-first philosophy ensures you always
              have a partner in your corner.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-xl shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-serif font-bold mb-4">
                Ready to elevate your business?
              </h3>
              <p className="text-slate-300 text-sm mb-6">
                Connect with our {title} specialists today to schedule a
                consultation.
              </p>
              <button
                onClick={onOpenContact}
                className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 rounded transition-colors"
              >
                Get in Touch
              </button>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-32 h-32 bg-emerald-500 rounded-full opacity-20 blur-2xl"></div>
          </div>

          <div className="border border-slate-200 p-6 rounded-xl">
            <h4 className="font-bold font-serif text-slate-900 mb-4 border-b border-slate-100 pb-2">
              Related Insights
            </h4>
            <ul className="space-y-4">
              {HERO_SLIDES.slice(0, 3).map((slide) => (
                <li key={slide.id} className="group cursor-pointer">
                  <span className="text-xs text-emerald-600 font-bold uppercase">
                    {slide.category}
                  </span>
                  <p className="text-sm text-slate-700 font-medium group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {slide.title}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Main Application ---

export default function App() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [view, setView] = useState({ type: "home", data: null });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (data) => {
    setView({ type: "page", data: data });
    setHoveredNav(null);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleArticleClick = (article) => {
    setView({ type: "article", data: article });
    setIsSearchOpen(false);
  };

  const handleHomeClick = () => {
    setView({ type: "home", data: null });
    window.scrollTo(0, 0);
  };

  // Render current view content
  const renderContent = () => {
    if (view.type === "home") {
      const currentSlide = HERO_SLIDES[activeSlide];
      return (
        <main className="relative h-screen min-h-[700px] w-full bg-slate-900 flex flex-col pt-32 lg:pt-0">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
            {HERO_SLIDES.map((slide, idx) => (
              <img
                key={slide.id}
                src={slide.image}
                alt={slide.title}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
                  idx === activeSlide ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          <div className="relative z-20 flex-grow flex items-center mt-20">
            <div className="max-w-7xl w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-2">
              <div className="max-w-2xl animate-in slide-in-from-left duration-700 fade-in">
                <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-emerald-300 uppercase border border-emerald-500/30 bg-emerald-900/30 rounded-full">
                  {currentSlide.category}
                </span>
                <p className="text-emerald-100 mb-2 font-medium">
                  {currentSlide.date}
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white leading-tight mb-6">
                  {currentSlide.title}
                </h1>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-xl">
                  {currentSlide.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => handleArticleClick(currentSlide)}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white px-8 py-3.5 rounded font-bold text-sm uppercase tracking-wider transition-all shadow-lg hover:shadow-emerald-600/30 flex items-center gap-2"
                  >
                    Read Full Insight
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-30 w-full border-t border-white/10 bg-slate-900/80 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4">
                {HERO_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => setActiveSlide(idx)}
                    className={`text-left py-6 px-4 md:px-6 transition-all duration-300 relative group overflow-hidden ${
                      activeSlide === idx
                        ? "bg-slate-800/80"
                        : "hover:bg-slate-800/40"
                    }`}
                  >
                    {activeSlide === idx && (
                      <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                    )}

                    <h4
                      className={`text-sm md:text-base font-serif font-bold mb-1 transition-colors ${
                        activeSlide === idx
                          ? "text-white"
                          : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {slide.title.split(":")[0]}
                    </h4>
                    <p
                      className={`text-xs transition-colors line-clamp-1 ${
                        activeSlide === idx
                          ? "text-emerald-400"
                          : "text-slate-500"
                      }`}
                    >
                      {slide.category}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </main>
      );
    }

    if (view.type === "article") {
      return (
        <div className="pt-24 lg:pt-28">
          <ArticleView
            article={view.data}
            onBack={handleHomeClick}
            onOpenContact={() => setIsContactOpen(true)}
          />
        </div>
      );
    }

    if (view.type === "page") {
      return (
        <ServiceTemplate
          title={view.data.title}
          category={view.data.category}
          onOpenContact={() => setIsContactOpen(true)}
        />
      );
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden flex flex-col">
      {/* --- Header / Navigation --- */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-slate-900/95 backdrop-blur-md py-2 shadow-md"
            : "bg-slate-900 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between mb-2">
            <Logo onClick={handleHomeClick} />

            <div className="hidden lg:flex items-center gap-4">
              {/* Contact CTA in Header */}
              <button
                onClick={() => setIsContactOpen(true)}
                className="text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors border border-slate-700 hover:border-emerald-500 rounded px-4 py-2"
              >
                Contact Us
              </button>
              {/* Search Icon */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-white hover:text-emerald-400 transition-colors p-2"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          <nav className="hidden lg:flex items-center space-x-10 mt-4 relative">
            {Object.keys(NAV_DATA).map((item) => (
              <div
                key={item}
                className="group py-2 cursor-pointer"
                onMouseEnter={() => setHoveredNav(item)}
                onMouseLeave={() => setHoveredNav(null)}
                onClick={handleHomeClick}
              >
                <span
                  className={`text-sm font-bold uppercase tracking-wide transition-colors ${
                    hoveredNav === item ? "text-emerald-400" : "text-slate-200"
                  }`}
                >
                  {item}
                </span>
                <div className="absolute h-4 w-full bottom-0"></div>
              </div>
            ))}
          </nav>

          <MegaMenu
            activeTab={hoveredNav}
            isVisible={!!hoveredNav}
            onMouseEnter={() => setHoveredNav(hoveredNav)}
            onMouseLeave={() => setHoveredNav(null)}
            onLinkClick={handleNavClick}
          />
        </div>
      </header>

      {/* --- Main Content --- */}
      {renderContent()}

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="text-white font-serif font-bold text-2xl tracking-tight flex items-center gap-2">
                <Leaf className="w-5 h-5 text-emerald-500" /> GINKGO
              </div>
              <p className="text-sm leading-relaxed">
                Providing clear, actionable financial insights to help your
                business grow strong roots and reach new heights.
              </p>
              <div className="flex gap-4">
                <Linkedin className="w-5 h-5 hover:text-emerald-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-emerald-400 cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 hover:text-emerald-400 cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
                Services
              </h4>
              <ul className="space-y-3 text-sm">
                <li
                  onClick={() =>
                    handleNavClick({
                      title: "Assurance & Accounting",
                      category: "Services",
                    })
                  }
                  className="hover:text-emerald-400 cursor-pointer transition-colors"
                >
                  Assurance
                </li>
                <li
                  onClick={() =>
                    handleNavClick({
                      title: "Tax Services",
                      category: "Services",
                    })
                  }
                  className="hover:text-emerald-400 cursor-pointer transition-colors"
                >
                  Tax Services
                </li>
                <li
                  onClick={() =>
                    handleNavClick({
                      title: "Consulting",
                      category: "Services",
                    })
                  }
                  className="hover:text-emerald-400 cursor-pointer transition-colors"
                >
                  Consulting
                </li>
                <li
                  onClick={() =>
                    handleNavClick({
                      title: "Digital Services",
                      category: "Services",
                    })
                  }
                  className="hover:text-emerald-400 cursor-pointer transition-colors"
                >
                  Digital & Tech
                </li>
              </ul>
            </div>

            {/* Links Column */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
                Company
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                  About Us
                </li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                  Careers
                </li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                  Privacy Policy
                </li>
                <li className="hover:text-emerald-400 cursor-pointer transition-colors">
                  Terms of Service
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div>
              <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-6">
                Contact
              </h4>
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>
                    100 Financial District Blvd,
                    <br />
                    Toronto, ON M5J 2T3
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>1-800-GINKGO-1</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span>hello@ginkgo.com</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="bg-slate-950 py-6 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
            <p>
              &copy; 2025 Ginkgo Accounting & Consulting Inc. All rights
              reserved.
            </p>
            <p className="mt-2 md:mt-0">
              Designed for Professional Excellence.
            </p>
          </div>
        </div>
      </footer>

      {/* --- Mobile Menu Overlay --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900 pt-24 px-6 overflow-y-auto lg:hidden">
          <div className="flex flex-col space-y-6">
            {Object.keys(NAV_DATA).map((item) => (
              <div key={item} className="border-b border-slate-800 pb-4">
                <h3 className="text-xl font-serif text-white mb-3">{item}</h3>
                <div className="grid grid-cols-1 gap-2 pl-4">
                  {NAV_DATA[item].slice(0, 5).map((subItem, idx) => (
                    <button
                      key={idx}
                      onClick={() =>
                        handleNavClick({ title: subItem, category: item })
                      }
                      className="text-left text-slate-400 text-sm hover:text-emerald-400 py-1"
                    >
                      {subItem}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Global Modals */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={(result) => {
          if (result.type === "article") handleArticleClick(result.data);
          else handleNavClick(result);
        }}
      />
    </div>
  );
}
