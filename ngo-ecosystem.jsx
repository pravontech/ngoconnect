import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --forest: #1C3829;
      --sage: #3A6B4E;
      --mint: #6BAE87;
      --pale-mint: #B8DECA;
      --cream: #F5EFE6;
      --parchment: #EDE4D6;
      --sand: #D4A96A;
      --terracotta: #C1603A;
      --rust: #9E3D1E;
      --charcoal: #2A2A2A;
      --muted: #7A7570;
      --border: #D6CABC;
      --white: #FDFAF6;
      --card: #FAF6F0;
      --overlay: rgba(28,56,41,0.85);
    }

    body { font-family: 'DM Sans', sans-serif; background: var(--cream); color: var(--charcoal); }

    .playfair { font-family: 'Playfair Display', serif; }
    .mono { font-family: 'DM Mono', monospace; }

    /* Scrollbar */
    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--parchment); }
    ::-webkit-scrollbar-thumb { background: var(--mint); border-radius: 3px; }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { transform: translateX(-20px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    @keyframes pulse-ring {
      0% { transform: scale(0.8); opacity: 1; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-8px); }
    }
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .animate-fadeUp { animation: fadeUp 0.6s ease forwards; }
    .animate-fadeIn { animation: fadeIn 0.4s ease forwards; }
    .animate-float { animation: float 4s ease-in-out infinite; }

    /* Cards */
    .card-hover {
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      cursor: pointer;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 16px 48px rgba(28,56,41,0.14);
    }

    /* Buttons */
    .btn-primary {
      background: var(--forest);
      color: var(--white);
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
      letter-spacing: 0.02em;
    }
    .btn-primary:hover { background: var(--sage); transform: translateY(-1px); }

    .btn-secondary {
      background: transparent;
      color: var(--forest);
      border: 1.5px solid var(--forest);
      border-radius: 8px;
      padding: 11px 23px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-secondary:hover { background: var(--forest); color: var(--white); }

    .btn-coral {
      background: var(--terracotta);
      color: var(--white);
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s, transform 0.15s;
    }
    .btn-coral:hover { background: var(--rust); transform: translateY(-1px); }

    .btn-sand {
      background: var(--sand);
      color: var(--forest);
      border: none;
      border-radius: 8px;
      padding: 12px 24px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-sand:hover { background: #c4973a; transform: translateY(-1px); }

    /* Tags */
    .tag {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }

    /* Input */
    .input-field {
      width: 100%;
      padding: 12px 16px;
      border: 1.5px solid var(--border);
      border-radius: 8px;
      background: var(--white);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      color: var(--charcoal);
      outline: none;
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .input-field:focus {
      border-color: var(--mint);
      box-shadow: 0 0 0 3px rgba(107,174,135,0.15);
    }

    /* Select */
    select.input-field { appearance: none; cursor: pointer; }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: var(--forest);
      color: var(--white);
      padding: 14px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 500;
      z-index: 9999;
      animation: fadeUp 0.3s ease;
      box-shadow: 0 8px 32px rgba(0,0,0,0.2);
      max-width: 320px;
      border-left: 4px solid var(--mint);
    }

    /* Modal overlay */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,0.5);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 0.2s ease;
    }
    .modal-box {
      background: var(--white);
      border-radius: 16px;
      padding: 32px;
      max-width: 520px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
      animation: fadeUp 0.3s ease;
    }

    /* Skeleton loader */
    .skeleton {
      background: linear-gradient(90deg, var(--parchment) 25%, var(--border) 50%, var(--parchment) 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
      border-radius: 6px;
    }

    /* Badge */
    .verified-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: rgba(107,174,135,0.15);
      color: var(--sage);
      padding: 3px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
    }

    /* Mobile phone frame */
    .phone-frame {
      width: 375px;
      min-height: 720px;
      background: var(--white);
      border-radius: 40px;
      border: 8px solid var(--charcoal);
      box-shadow: 0 40px 80px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.1);
      overflow: hidden;
      position: relative;
    }
    .phone-notch {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 120px;
      height: 28px;
      background: var(--charcoal);
      border-radius: 0 0 18px 18px;
      z-index: 10;
    }

    /* Stat counter */
    .stat-number {
      font-family: 'Playfair Display', serif;
      font-size: 36px;
      font-weight: 700;
      color: var(--forest);
      line-height: 1;
    }

    /* Progress bar */
    .progress-bar {
      height: 8px;
      background: var(--parchment);
      border-radius: 4px;
      overflow: hidden;
    }
    .progress-fill {
      height: 100%;
      border-radius: 4px;
      background: linear-gradient(90deg, var(--mint), var(--sage));
      transition: width 0.8s ease;
    }

    /* Nav tab */
    .nav-tab {
      padding: 8px 20px;
      border-radius: 6px;
      font-weight: 500;
      font-size: 14px;
      cursor: pointer;
      transition: all 0.2s;
      border: none;
      background: none;
      font-family: 'DM Sans', sans-serif;
    }
    .nav-tab.active {
      background: var(--forest);
      color: var(--white);
    }
    .nav-tab:not(.active) {
      color: var(--muted);
    }
    .nav-tab:not(.active):hover {
      color: var(--forest);
      background: var(--parchment);
    }

    /* Sidebar item */
    .sidebar-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.15s;
      font-size: 14px;
      font-weight: 500;
      color: rgba(255,255,255,0.75);
      border: none;
      background: none;
      width: 100%;
      text-align: left;
      font-family: 'DM Sans', sans-serif;
    }
    .sidebar-item:hover {
      background: rgba(255,255,255,0.08);
      color: white;
    }
    .sidebar-item.active {
      background: rgba(107,174,135,0.25);
      color: var(--pale-mint);
    }

    /* Table styles */
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th {
      text-align: left;
      padding: 12px 16px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--muted);
      border-bottom: 1.5px solid var(--border);
      background: var(--parchment);
    }
    .data-table td {
      padding: 14px 16px;
      font-size: 14px;
      border-bottom: 1px solid var(--border);
      color: var(--charcoal);
    }
    .data-table tr:hover td { background: var(--card); }

    /* Star rating */
    .stars { color: var(--sand); font-size: 13px; letter-spacing: 1px; }

    /* Map placeholder */
    .map-placeholder {
      background: linear-gradient(135deg, #e8f5e9, #c8e6c9, #a5d6a7);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      gap: 8px;
      color: var(--sage);
      font-weight: 600;
      font-size: 14px;
      position: relative;
      overflow: hidden;
    }
    .map-placeholder::before {
      content: '';
      position: absolute;
      inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2340916C' fill-opacity='0.08'%3E%3Cpath d='M20 20L40 0H0z'/%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
    }

    /* Donation amount button */
    .amount-btn {
      padding: 10px 20px;
      border-radius: 8px;
      border: 1.5px solid var(--border);
      background: var(--white);
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 15px;
      cursor: pointer;
      transition: all 0.2s;
      color: var(--charcoal);
    }
    .amount-btn.selected {
      border-color: var(--forest);
      background: var(--forest);
      color: var(--white);
    }
    .amount-btn:hover:not(.selected) {
      border-color: var(--mint);
      background: var(--card);
    }

    /* Volunteer card */
    .volunteer-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 16px;
      transition: all 0.2s;
    }
    .volunteer-card:hover {
      border-color: var(--mint);
      box-shadow: 0 4px 16px rgba(107,174,135,0.12);
    }

    /* Category card */
    .category-card {
      background: var(--card);
      border: 1.5px solid var(--border);
      border-radius: 16px;
      padding: 24px 20px;
      text-align: center;
      cursor: pointer;
      transition: all 0.25s;
    }
    .category-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 32px rgba(28,56,41,0.1);
      border-color: var(--mint);
      background: var(--white);
    }

    /* Event card accent */
    .event-card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 14px;
      overflow: hidden;
      transition: all 0.25s;
    }
    .event-card:hover {
      transform: translateY(-3px);
      box-shadow: 0 12px 32px rgba(28,56,41,0.1);
    }

    /* Platform switcher */
    .platform-btn {
      padding: 10px 24px;
      border-radius: 8px;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 13px;
      cursor: pointer;
      transition: all 0.2s;
      border: 2px solid transparent;
      letter-spacing: 0.02em;
    }
    .platform-btn.active {
      background: var(--white);
      color: var(--forest);
      border-color: var(--mint);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
    .platform-btn:not(.active) {
      background: transparent;
      color: rgba(255,255,255,0.7);
      border-color: rgba(255,255,255,0.2);
    }
    .platform-btn:not(.active):hover {
      color: white;
      border-color: rgba(255,255,255,0.5);
      background: rgba(255,255,255,0.1);
    }

    /* Responsive */
    @media (max-width: 768px) {
      .phone-frame { width: 100%; border-radius: 0; border: none; }
      .hide-mobile { display: none !important; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   MOCK DATA
───────────────────────────────────────────── */
const CATEGORIES_DATA = [
  { id: "orphanage", label: "Orphanage", icon: "🏠", count: 143, color: "#C1603A" },
  { id: "animal", label: "Animal Welfare", icon: "🐾", count: 89, color: "#3A6B4E" },
  { id: "women", label: "Women Empowerment", icon: "💜", count: 212, color: "#7B4FA6" },
  { id: "education", label: "Education NGOs", icon: "📚", count: 367, color: "#2471A3" },
  { id: "elderly", label: "Old Age Homes", icon: "🤍", count: 54, color: "#B7770D" },
  { id: "environment", label: "Environment", icon: "🌿", count: 198, color: "#1C7C4A" },
];

const NGOS = [
  { id: 1, name: "Bal Ashram Trust", city: "Jaipur", state: "Rajasthan", category: "orphanage", emoji: "🏠", rating: 4.8, volunteers: 234, donors: 1200, raised: 450000, target: 600000,
    description: "Providing shelter, education and hope to 500+ orphaned children since 1998. We believe every child deserves a home.",
    mission: "Every child deserves a home, education, and a chance to dream big. We provide comprehensive care for orphaned and abandoned children across Rajasthan.",
    address: "12, Gandhi Nagar, Near SMS Hospital, Jaipur, Rajasthan 302001",
    phone: "+91 98765 43210", email: "contact@balashram.org", website: "balashram.org", verified: true, featured: true, founded: 1998,
    tags: ["Children", "Education", "Shelter"]},
  { id: 2, name: "Paws & Claws Foundation", city: "Mumbai", state: "Maharashtra", category: "animal", emoji: "🐾", rating: 4.9, volunteers: 189, donors: 890, raised: 320000, target: 500000,
    description: "Rescuing and rehabilitating stray animals across urban Mumbai. Running India's largest no-kill shelter.",
    mission: "No animal left behind. We rescue, rehabilitate and rehome stray and injured animals, running Mumbai's largest no-kill shelter.",
    address: "45, Andheri West, Near D.N. Nagar Metro, Mumbai, Maharashtra 400053",
    phone: "+91 87654 32109", email: "help@pawsclaws.org", website: "pawsclaws.org", verified: true, featured: true, founded: 2010,
    tags: ["Animals", "Rescue", "Shelter"]},
  { id: 3, name: "Shakti Women's Collective", city: "Bengaluru", state: "Karnataka", category: "women", emoji: "💜", rating: 4.7, volunteers: 312, donors: 2100, raised: 780000, target: 1000000,
    description: "Empowering rural women through skill training and microfinance. Reach: 10,000 women across Karnataka.",
    mission: "Building economic independence and dignity for rural women through vocational training, microfinance, and legal aid.",
    address: "78, 5th Block, Koramangala, Bengaluru, Karnataka 560034",
    phone: "+91 76543 21098", email: "info@shakticollective.org", website: "shakticollective.org", verified: true, featured: false, founded: 2005,
    tags: ["Women", "Microfinance", "Skills"]},
  { id: 4, name: "Vidyalaya Education Fund", city: "Delhi", state: "Delhi", category: "education", emoji: "📚", rating: 4.6, volunteers: 445, donors: 3400, raised: 1200000, target: 2000000,
    description: "Providing quality education to underprivileged children in urban slums. 15,000 students enrolled.",
    mission: "Ensuring every child gets quality education regardless of economic background. We run 45 community schools across Delhi-NCR.",
    address: "34, Karol Bagh Market Lane, New Delhi 110005",
    phone: "+91 65432 10987", email: "learn@vidyalaya.org", website: "vidyalaya.org", verified: true, featured: true, founded: 2001,
    tags: ["Education", "Children", "Schools"]},
  { id: 5, name: "Vriddhashram Seva Trust", city: "Pune", state: "Maharashtra", category: "elderly", emoji: "🤍", rating: 4.9, volunteers: 156, donors: 670, raised: 240000, target: 400000,
    description: "Caring for 300+ abandoned elderly with dignity, medical care and warmth.",
    mission: "Growing old should be peaceful, not lonely. We provide 24/7 care, medical support and companionship to abandoned senior citizens.",
    address: "90, Kothrud Housing Colony, Pune, Maharashtra 411029",
    phone: "+91 54321 09876", email: "care@vriddhashram.org", website: "vriddhashram.org", verified: false, featured: false, founded: 2008,
    tags: ["Elderly", "Healthcare", "Care"]},
  { id: 6, name: "Green Earth Initiative", city: "Chennai", state: "Tamil Nadu", category: "environment", emoji: "🌿", rating: 4.5, volunteers: 567, donors: 5600, raised: 2100000, target: 3000000,
    description: "Planted 800,000 trees. Restoring coastal ecosystems and fighting plastic pollution in South India.",
    mission: "Heal the earth, plant hope, breathe tomorrow. Our mission is to restore 10,000 acres of degraded forest and coastal land by 2030.",
    address: "23, 6th Avenue, Anna Nagar, Chennai, Tamil Nadu 600040",
    phone: "+91 43210 98765", email: "plant@greenearth.org", website: "greenearth.org", verified: true, featured: true, founded: 2012,
    tags: ["Environment", "Trees", "Ocean"]},
];

const EVENTS = [
  { id: 1, ngoId: 1, ngoName: "Bal Ashram Trust", title: "Annual Children's Day Celebration", date: "2025-11-14", location: "Bal Ashram Campus, Jaipur", description: "Join us for a day of joy, games, art exhibitions and performances by our 500 children. A truly heartwarming experience.", category: "orphanage", spots: 50, registered: 32, emoji: "🎉" },
  { id: 2, ngoId: 2, ngoName: "Paws & Claws Foundation", title: "Street Animal Vaccination Drive", date: "2025-04-15", location: "Andheri West, Mumbai", description: "Mass vaccination and sterilization camp. Volunteers needed to assist vets and manage logistics.", category: "animal", spots: 30, registered: 28, emoji: "💉" },
  { id: 3, ngoId: 6, ngoName: "Green Earth Initiative", title: "Coastal Cleanup & Tree Plantation", date: "2025-05-05", location: "Marina Beach, Chennai", description: "Earth Day mega-event: cleanup drive followed by mangrove plantation along 2km of coastline.", category: "environment", spots: 200, registered: 145, emoji: "🌊" },
  { id: 4, ngoId: 3, ngoName: "Shakti Women's Collective", title: "Women Entrepreneurship Summit", date: "2025-06-08", location: "The Lalit, Bengaluru", description: "2-day summit with talks, workshops and funding pitches. Connect with 200+ changemakers.", category: "women", spots: 100, registered: 87, emoji: "✨" },
  { id: 5, ngoId: 4, ngoName: "Vidyalaya Education Fund", title: "Teach for a Day Program", date: "2025-04-22", location: "Multiple Schools, Delhi", description: "Spend a day teaching your skill — coding, art, sports, science — to underprivileged students.", category: "education", spots: 120, registered: 95, emoji: "🏫" },
];

const VOLUNTEERS = [
  { id: 1, name: "Priya Sharma", city: "Mumbai", skills: ["Teaching", "Marketing"], status: "active", joined: "2024-01-15", ngo: "Vidyalaya Education Fund" },
  { id: 2, name: "Rohan Mehta", city: "Delhi", skills: ["Medical", "Logistics"], status: "pending", joined: "2025-03-20", ngo: "Paws & Claws Foundation" },
  { id: 3, name: "Ananya Singh", city: "Bengaluru", skills: ["Coding", "Design"], status: "active", joined: "2023-08-10", ngo: "Green Earth Initiative" },
  { id: 4, name: "Kiran Patel", city: "Ahmedabad", skills: ["Finance", "Legal"], status: "active", joined: "2024-05-01", ngo: "Shakti Women's Collective" },
  { id: 5, name: "Deepa Nair", city: "Chennai", skills: ["Photography", "Social Media"], status: "pending", joined: "2025-03-28", ngo: "Bal Ashram Trust" },
];

const DONATIONS = [
  { id: 1, donor: "Anonymous", ngo: "Green Earth Initiative", amount: 5000, date: "2025-03-10", method: "UPI" },
  { id: 2, donor: "Rahul K.", ngo: "Vidyalaya Education Fund", amount: 10000, date: "2025-03-09", method: "Card" },
  { id: 3, donor: "Meena S.", ngo: "Bal Ashram Trust", amount: 2500, date: "2025-03-08", method: "Razorpay" },
  { id: 4, donor: "Tech Corp Ltd", ngo: "Shakti Women's Collective", amount: 50000, date: "2025-03-07", method: "NEFT" },
  { id: 5, donor: "Anonymous", ngo: "Paws & Claws Foundation", amount: 1000, date: "2025-03-06", method: "UPI" },
];

/* ─────────────────────────────────────────────
   HELPER COMPONENTS
───────────────────────────────────────────── */
const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);
  return <div className="toast">✓ {message}</div>;
};

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  return <span className="stars">{"★".repeat(full)}{"☆".repeat(5 - full)} <span style={{ color: "#7A7570", fontSize: 12, fontFamily: "DM Sans" }}>{rating}</span></span>;
};

const ProgressBar = ({ raised, target }) => {
  const pct = Math.min((raised / target) * 100, 100);
  return (
    <div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 12, color: "var(--muted)" }}>
        <span>₹{(raised / 100000).toFixed(1)}L raised</span>
        <span>{pct.toFixed(0)}%</span>
      </div>
    </div>
  );
};

const CategoryTag = ({ cat }) => {
  const c = CATEGORIES_DATA.find(x => x.id === cat) || {};
  return (
    <span className="tag" style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}30` }}>
      {c.icon} {c.label}
    </span>
  );
};

const Avatar = ({ name, size = 40, bg = "var(--forest)" }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: size * 0.38, flexShrink: 0, fontFamily: "DM Sans" }}>
    {name?.split(" ").map(n => n[0]).join("").slice(0, 2)}
  </div>
);

const NGOEmoji = ({ emoji, size = 48, bg = "var(--parchment)" }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.5, flexShrink: 0 }}>
    {emoji}
  </div>
);

const Modal = ({ title, onClose, children }) => (
  <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
    <div className="modal-box">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 className="playfair" style={{ fontSize: 22, color: "var(--forest)" }}>{title}</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "var(--muted)", lineHeight: 1 }}>×</button>
      </div>
      {children}
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   NGO CARD
───────────────────────────────────────────── */
const NGOCard = ({ ngo, onClick }) => (
  <div className="card-hover" onClick={() => onClick(ngo)}
    style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
    <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
      <NGOEmoji emoji={ngo.emoji} size={52} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "var(--forest)", fontFamily: "Playfair Display", lineHeight: 1.3 }}>{ngo.name}</h3>
          {ngo.verified && <span className="verified-badge">✓ Verified</span>}
        </div>
        <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>📍 {ngo.city}, {ngo.state}</div>
        <Stars rating={ngo.rating} />
      </div>
    </div>
    <CategoryTag cat={ngo.category} />
    <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ngo.description}</p>
    <ProgressBar raised={ngo.raised} target={ngo.target} />
    <div style={{ display: "flex", gap: 8 }}>
      {ngo.tags.map(t => <span key={t} style={{ fontSize: 11, padding: "3px 8px", background: "var(--parchment)", borderRadius: 4, color: "var(--muted)", fontWeight: 500 }}>{t}</span>)}
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 8, borderTop: "1px solid var(--border)" }}>
      <span style={{ fontSize: 13, color: "var(--muted)" }}>👥 {ngo.volunteers} volunteers</span>
      <span style={{ fontSize: 13, color: "var(--sage)", fontWeight: 600 }}>View Details →</span>
    </div>
  </div>
);

/* ─────────────────────────────────────────────
   EVENT CARD
───────────────────────────────────────────── */
const EventCard = ({ event, onRegister }) => {
  const spotsLeft = event.spots - event.registered;
  const pct = (event.registered / event.spots) * 100;
  return (
    <div className="event-card">
      <div style={{ background: "var(--forest)", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 28 }}>{event.emoji}</span>
        <span style={{ fontSize: 12, color: "var(--pale-mint)", fontWeight: 600, fontFamily: "DM Mono" }}>
          {new Date(event.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
        </span>
      </div>
      <div style={{ padding: 20 }}>
        <div style={{ fontSize: 11, color: "var(--muted)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{event.ngoName}</div>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--charcoal)", fontFamily: "Playfair Display", lineHeight: 1.4, marginBottom: 8 }}>{event.title}</h3>
        <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 12 }}>📍 {event.location}</div>
        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 14 }}>{event.description}</p>
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>
            <span>{event.registered}/{event.spots} registered</span>
            <span style={{ color: spotsLeft < 10 ? "var(--terracotta)" : "var(--sage)", fontWeight: 600 }}>{spotsLeft} spots left</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${pct}%` }} />
          </div>
        </div>
        <button className="btn-primary" style={{ width: "100%", padding: "10px" }} onClick={() => onRegister(event)}>Register as Volunteer</button>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   DONATION MODAL
───────────────────────────────────────────── */
const DonationModal = ({ ngo, onClose, onSuccess }) => {
  const [amount, setAmount] = useState(500);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [step, setStep] = useState(1);
  const presets = [100, 500, 1000, 5000];

  const handleDonate = () => {
    setStep(2);
    setTimeout(() => { onClose(); onSuccess(`Donation of ₹${amount} to ${ngo.name} successful!`); }, 2000);
  };

  return (
    <Modal title={`Donate to ${ngo.name}`} onClose={onClose}>
      {step === 1 ? (
        <>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
              <NGOEmoji emoji={ngo.emoji} size={40} />
              <div>
                <div style={{ fontWeight: 600, color: "var(--forest)" }}>{ngo.name}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{ngo.city} · {ngo.verified ? "✓ Verified NGO" : "Unverified"}</div>
              </div>
            </div>
            <ProgressBar raised={ngo.raised} target={ngo.target} />
          </div>

          <div style={{ marginBottom: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 10 }}>Choose Amount</label>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 10 }}>
              {presets.map(p => (
                <button key={p} className={`amount-btn ${amount === p && !custom ? "selected" : ""}`}
                  onClick={() => { setAmount(p); setCustom(""); }}>₹{p}</button>
              ))}
            </div>
            <input className="input-field" placeholder="Or enter custom amount" value={custom}
              onChange={e => { setCustom(e.target.value); if (e.target.value) setAmount(Number(e.target.value)); }}
              style={{ fontSize: 15, fontWeight: 600 }} />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 10 }}>Payment Method</label>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {[{ id: "upi", label: "🔵 UPI" }, { id: "razorpay", label: "💳 Razorpay" }, { id: "card", label: "💳 Card" }].map(m => (
                <button key={m.id} className={`amount-btn ${method === m.id ? "selected" : ""}`} style={{ flex: 1, fontSize: 13 }}
                  onClick={() => setMethod(m.id)}>{m.label}</button>
              ))}
            </div>
            {method === "upi" && (
              <input className="input-field" placeholder="Enter UPI ID (e.g. name@upi)" value={upiId}
                onChange={e => setUpiId(e.target.value)} style={{ marginTop: 10 }} />
            )}
          </div>

          <div style={{ background: "var(--parchment)", borderRadius: 10, padding: 14, marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}>
              <span style={{ color: "var(--muted)" }}>Donation Amount</span>
              <span style={{ fontWeight: 600 }}>₹{amount}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
              <span style={{ color: "var(--muted)" }}>Platform Fee</span>
              <span style={{ color: "var(--sage)", fontWeight: 600 }}>₹0</span>
            </div>
            <div style={{ borderTop: "1px solid var(--border)", marginTop: 10, paddingTop: 10, display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: 16 }}>
              <span>Total</span><span style={{ color: "var(--forest)" }}>₹{amount}</span>
            </div>
          </div>

          <button className="btn-coral" style={{ width: "100%", padding: 14, fontSize: 15 }} onClick={handleDonate}>
            Donate ₹{amount} Now
          </button>
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--muted)", marginTop: 12 }}>🔒 Secure donation. 80G tax benefit available.</p>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "24px 0" }}>
          <div style={{ fontSize: 64, marginBottom: 16, animation: "float 2s ease infinite" }}>🎉</div>
          <h3 className="playfair" style={{ fontSize: 24, color: "var(--forest)", marginBottom: 8 }}>Processing…</h3>
          <p style={{ color: "var(--muted)" }}>Completing your donation of ₹{amount}</p>
          <div style={{ margin: "20px auto", width: 40, height: 40, borderRadius: "50%", border: "3px solid var(--mint)", borderTopColor: "var(--forest)", animation: "spin 0.8s linear infinite" }} />
        </div>
      )}
    </Modal>
  );
};

/* ─────────────────────────────────────────────
   VOLUNTEER MODAL
───────────────────────────────────────────── */
const VolunteerModal = ({ event, onClose, onSuccess }) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", skills: "", message: "" });
  const handle = () => { onClose(); onSuccess(`Application submitted for "${event.title}"!`); };
  return (
    <Modal title="Register as Volunteer" onClose={onClose}>
      <div style={{ background: "var(--parchment)", borderRadius: 10, padding: 14, marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}>
        <span style={{ fontSize: 28 }}>{event.emoji}</span>
        <div>
          <div style={{ fontWeight: 600, color: "var(--forest)", fontSize: 14 }}>{event.title}</div>
          <div style={{ fontSize: 12, color: "var(--muted)" }}>📅 {event.date} · 📍 {event.location}</div>
        </div>
      </div>
      <div style={{ display: "grid", gap: 14 }}>
        {[["name", "Full Name", "text"], ["email", "Email Address", "email"], ["phone", "Phone Number", "tel"]].map(([k, l, t]) => (
          <div key={k}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>{l}</label>
            <input className="input-field" type={t} placeholder={l} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
          </div>
        ))}
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>Skills / Expertise</label>
          <input className="input-field" placeholder="e.g. Teaching, First Aid, Photography..." value={form.skills} onChange={e => setForm({ ...form, skills: e.target.value })} />
        </div>
        <div>
          <label style={{ fontSize: 12, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>Why do you want to volunteer?</label>
          <textarea className="input-field" rows={3} placeholder="Tell the NGO about your motivation..." value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical" }} />
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
        <button className="btn-secondary" onClick={onClose} style={{ flex: 1 }}>Cancel</button>
        <button className="btn-primary" onClick={handle} style={{ flex: 2 }}>Submit Application</button>
      </div>
    </Modal>
  );
};

/* ─────────────────────────────────────────────
   NGO DETAILS PAGE
───────────────────────────────────────────── */
const NGODetail = ({ ngo, onBack, onDonate, onVolunteer }) => {
  const ngoEvents = EVENTS.filter(e => e.ngoId === ngo.id);
  const [activeTab, setActiveTab] = useState("about");
  return (
    <div style={{ background: "var(--cream)", minHeight: "100%" }}>
      {/* Header */}
      <div style={{ background: "var(--forest)", padding: "20px 24px" }}>
        <button onClick={onBack} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 14, fontFamily: "DM Sans", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
          ← Back to Listings
        </button>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div style={{ width: 80, height: 80, background: "rgba(255,255,255,0.1)", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, flexShrink: 0 }}>{ngo.emoji}</div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <h1 className="playfair" style={{ fontSize: 26, color: "white", fontWeight: 700 }}>{ngo.name}</h1>
              {ngo.verified && <span style={{ background: "rgba(107,174,135,0.3)", color: "var(--pale-mint)", padding: "3px 8px", borderRadius: 4, fontSize: 11, fontWeight: 700 }}>✓ VERIFIED</span>}
            </div>
            <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, marginTop: 4 }}>📍 {ngo.city}, {ngo.state} · Est. {ngo.founded}</div>
            <Stars rating={ngo.rating} />
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", background: "var(--sage)", gap: 1 }}>
        {[["👥", ngo.volunteers, "Volunteers"], ["❤️", ngo.donors.toLocaleString(), "Donors"], ["💰", `₹${(ngo.raised / 100000).toFixed(1)}L`, "Raised"]].map(([icon, val, lbl]) => (
          <div key={lbl} style={{ background: "var(--forest)", padding: "14px", textAlign: "center" }}>
            <div style={{ fontSize: 20 }}>{icon}</div>
            <div className="playfair" style={{ color: "white", fontSize: 18, fontWeight: 700 }}>{val}</div>
            <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 11 }}>{lbl}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "0 24px" }}>
        <div style={{ display: "flex", gap: 4, overflowX: "auto" }}>
          {["about", "events", "donate", "contact"].map(t => (
            <button key={t} className={`nav-tab ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)} style={{ margin: "8px 0", whiteSpace: "nowrap" }}>
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: "24px", display: "flex", flexDirection: "column", gap: 20 }}>
        {activeTab === "about" && (
          <>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <h3 className="playfair" style={{ fontSize: 18, color: "var(--forest)", marginBottom: 12 }}>Our Mission</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)", fontStyle: "italic", borderLeft: "3px solid var(--mint)", paddingLeft: 14 }}>{ngo.mission}</p>
            </div>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20 }}>
              <h3 className="playfair" style={{ fontSize: 18, color: "var(--forest)", marginBottom: 12 }}>About</h3>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: "var(--muted)" }}>{ngo.description}</p>
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {ngo.tags.map(t => <span key={t} style={{ padding: "6px 14px", background: "var(--parchment)", borderRadius: 20, fontSize: 13, fontWeight: 500, color: "var(--sage)" }}>{t}</span>)}
            </div>
          </>
        )}

        {activeTab === "events" && (
          <div style={{ display: "grid", gap: 16 }}>
            {ngoEvents.length === 0 ? (
              <div style={{ textAlign: "center", padding: 40, color: "var(--muted)" }}>No upcoming events from this NGO.</div>
            ) : ngoEvents.map(e => <EventCard key={e.id} event={e} onRegister={onVolunteer} />)}
          </div>
        )}

        {activeTab === "donate" && (
          <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
            <h3 className="playfair" style={{ fontSize: 20, color: "var(--forest)", marginBottom: 8 }}>Support {ngo.name}</h3>
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20, lineHeight: 1.7 }}>Your donation directly funds their programs. 80G tax exemption available.</p>
            <ProgressBar raised={ngo.raised} target={ngo.target} />
            <div style={{ marginTop: 16, padding: "14px", background: "var(--parchment)", borderRadius: 10, fontSize: 13, color: "var(--muted)" }}>
              🎯 Goal: ₹{(ngo.target / 100000).toFixed(0)}L · {((ngo.raised / ngo.target) * 100).toFixed(0)}% funded by {ngo.donors.toLocaleString()} donors
            </div>
            <button className="btn-coral" style={{ width: "100%", marginTop: 20, padding: 14, fontSize: 15 }} onClick={() => onDonate(ngo)}>
              💝 Donate Now
            </button>
          </div>
        )}

        {activeTab === "contact" && (
          <>
            <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, display: "grid", gap: 14 }}>
              {[["📍", "Address", ngo.address], ["📞", "Phone", ngo.phone], ["✉️", "Email", ngo.email], ["🌐", "Website", ngo.website]].map(([icon, label, val]) => (
                <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 18, marginTop: 1 }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--muted)" }}>{label}</div>
                    <div style={{ fontSize: 14, color: "var(--charcoal)", marginTop: 2 }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="map-placeholder" style={{ height: 200 }}>
              <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>🗺️</div>
                <div style={{ fontWeight: 700, color: "var(--sage)" }}>{ngo.name}</div>
                <div style={{ fontSize: 13, color: "var(--sage)", opacity: 0.8 }}>{ngo.city}, {ngo.state}</div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              <a href={`tel:${ngo.phone}`} style={{ textDecoration: "none" }}>
                <button className="btn-primary" style={{ width: "100%", fontSize: 13 }}>📞 Call</button>
              </a>
              <a href={`mailto:${ngo.email}`} style={{ textDecoration: "none" }}>
                <button className="btn-secondary" style={{ width: "100%", fontSize: 13 }}>✉️ Email</button>
              </a>
              <button className="btn-sand" style={{ width: "100%", fontSize: 13 }} onClick={() => window.open(`https://${ngo.website}`, "_blank")}>🌐 Visit</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   WEBSITE: HOME
───────────────────────────────────────────── */
const WebsiteHome = ({ onSearch, onCategoryClick, onNGOClick, onEventRegister, onDonate }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCity, setSearchCity] = useState("");
  const [searchType, setSearchType] = useState("");
  const handleSearch = () => onSearch({ query: searchQuery, city: searchCity, type: searchType });

  return (
    <div>
      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, var(--forest) 0%, var(--sage) 60%, var(--mint) 100%)", padding: "80px 40px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
        <div style={{ position: "absolute", bottom: -40, left: -40, width: 200, height: 200, borderRadius: "50%", background: "rgba(255,255,255,0.03)" }} />
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", position: "relative" }}>
          <span className="tag" style={{ background: "rgba(184,222,202,0.2)", color: "var(--pale-mint)", border: "1px solid rgba(184,222,202,0.3)", marginBottom: 20, display: "inline-block" }}>🌱 2,400+ NGOs · 48 Cities · India's Largest Platform</span>
          <h1 className="playfair" style={{ fontSize: "clamp(32px, 6vw, 56px)", color: "white", fontWeight: 900, lineHeight: 1.15, marginBottom: 20 }}>
            Find NGOs and Social<br />
            <em style={{ color: "var(--sand)", fontStyle: "italic" }}>Organizations Near You</em>
          </h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1.7, marginBottom: 40, maxWidth: 540, margin: "0 auto 40px" }}>
            Discover, volunteer, donate and make a real difference. Connect with causes that matter to you.
          </p>

          {/* Search */}
          <div style={{ background: "var(--white)", borderRadius: 16, padding: 8, display: "flex", gap: 8, flexWrap: "wrap", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
            <input className="input-field" style={{ flex: "2 1 160px", border: "none", background: "var(--parchment)" }} placeholder="🔍  NGO name or keyword…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <input className="input-field" style={{ flex: "1 1 120px", border: "none", background: "var(--parchment)" }} placeholder="📍  City" value={searchCity} onChange={e => setSearchCity(e.target.value)} />
            <select className="input-field" style={{ flex: "1 1 130px", border: "none", background: "var(--parchment)" }} value={searchType} onChange={e => setSearchType(e.target.value)}>
              <option value="">All Types</option>
              {CATEGORIES_DATA.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
            <button className="btn-primary" style={{ flex: "0 0 auto", padding: "12px 28px" }} onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{ background: "var(--charcoal)", padding: "20px 40px", display: "flex", justifyContent: "center", gap: 60, flexWrap: "wrap" }}>
        {[["2,400+", "NGOs Listed"], ["48", "Cities"], ["₹12Cr+", "Donated"], ["28,000+", "Volunteers"]].map(([num, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div className="playfair" style={{ fontSize: 28, fontWeight: 700, color: "var(--sand)" }}>{num}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px" }}>
        {/* Categories */}
        <div style={{ marginBottom: 60 }}>
          <h2 className="playfair" style={{ fontSize: 32, color: "var(--forest)", marginBottom: 8 }}>Browse by Category</h2>
          <p style={{ color: "var(--muted)", marginBottom: 28 }}>Find NGOs working in the areas you care about most.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 16 }}>
            {CATEGORIES_DATA.map(cat => (
              <div key={cat.id} className="category-card" onClick={() => onCategoryClick(cat.id)}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>{cat.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 14, color: cat.color, marginBottom: 4 }}>{cat.label}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{cat.count} NGOs</div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured NGOs */}
        <div style={{ marginBottom: 60 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div>
              <h2 className="playfair" style={{ fontSize: 32, color: "var(--forest)", marginBottom: 4 }}>Featured NGOs</h2>
              <p style={{ color: "var(--muted)" }}>Verified organizations making real impact.</p>
            </div>
            <button className="btn-secondary" onClick={() => onSearch({})}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {NGOS.filter(n => n.featured).map(ngo => (
              <NGOCard key={ngo.id} ngo={ngo} onClick={onNGOClick} />
            ))}
          </div>
        </div>

        {/* Events */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24 }}>
            <div>
              <h2 className="playfair" style={{ fontSize: 32, color: "var(--forest)", marginBottom: 4 }}>Upcoming Events</h2>
              <p style={{ color: "var(--muted)" }}>Join events, drives and campaigns near you.</p>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {EVENTS.slice(0, 3).map(e => <EventCard key={e.id} event={e} onRegister={onEventRegister} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   WEBSITE: LISTING PAGE
───────────────────────────────────────────── */
const WebsiteListing = ({ initialFilters, onNGOClick }) => {
  const [filters, setFilters] = useState({ city: initialFilters?.city || "", state: "", type: initialFilters?.type || "", query: initialFilters?.query || "" });
  const filtered = NGOS.filter(n => {
    if (filters.city && !n.city.toLowerCase().includes(filters.city.toLowerCase())) return false;
    if (filters.state && n.state !== filters.state) return false;
    if (filters.type && n.category !== filters.type) return false;
    if (filters.query && !n.name.toLowerCase().includes(filters.query.toLowerCase()) && !n.description.toLowerCase().includes(filters.query.toLowerCase())) return false;
    return true;
  });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      <h1 className="playfair" style={{ fontSize: 36, color: "var(--forest)", marginBottom: 8 }}>All NGOs</h1>
      <p style={{ color: "var(--muted)", marginBottom: 32 }}>Showing {filtered.length} organizations</p>

      {/* Filters */}
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, marginBottom: 32, display: "flex", gap: 14, flexWrap: "wrap", alignItems: "flex-end" }}>
        <div style={{ flex: "2 1 180px" }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Search</label>
          <input className="input-field" placeholder="NGO name or keyword" value={filters.query} onChange={e => setFilters({ ...filters, query: e.target.value })} />
        </div>
        <div style={{ flex: "1 1 130px" }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>City</label>
          <input className="input-field" placeholder="Any city" value={filters.city} onChange={e => setFilters({ ...filters, city: e.target.value })} />
        </div>
        <div style={{ flex: "1 1 130px" }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>State</label>
          <select className="input-field" value={filters.state} onChange={e => setFilters({ ...filters, state: e.target.value })}>
            <option value="">All States</option>
            {[...new Set(NGOS.map(n => n.state))].map(s => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div style={{ flex: "1 1 140px" }}>
          <label style={{ fontSize: 11, fontWeight: 700, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 6 }}>Category</label>
          <select className="input-field" value={filters.type} onChange={e => setFilters({ ...filters, type: e.target.value })}>
            <option value="">All Types</option>
            {CATEGORIES_DATA.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
          </select>
        </div>
        <button className="btn-secondary" onClick={() => setFilters({ city: "", state: "", type: "", query: "" })} style={{ padding: "11px 16px", fontSize: 13 }}>Clear</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {filtered.map(ngo => <NGOCard key={ngo.id} ngo={ngo} onClick={onNGOClick} />)}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No NGOs found</div>
          <div>Try adjusting your filters</div>
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   WEBSITE MAIN
───────────────────────────────────────────── */
const Website = () => {
  const [page, setPage] = useState("home");
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [searchFilters, setSearchFilters] = useState({});
  const [donateNGO, setDonateNGO] = useState(null);
  const [volunteerEvent, setVolunteerEvent] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => setToast(msg);

  return (
    <div style={{ background: "var(--cream)", minHeight: "100vh" }}>
      {/* Nav */}
      <nav style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "0 32px", position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", height: 64 }}>
          <div onClick={() => setPage("home")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10, marginRight: 40 }}>
            <span style={{ fontSize: 28 }}>🌱</span>
            <span className="playfair" style={{ fontSize: 20, fontWeight: 700, color: "var(--forest)" }}>NGOConnect</span>
          </div>
          <div style={{ display: "flex", gap: 4, flex: 1 }}>
            {[["home", "Home"], ["listing", "Discover NGOs"], ["events", "Events"]].map(([p, l]) => (
              <button key={p} className={`nav-tab ${page === p ? "active" : ""}`} onClick={() => setPage(p)}>{l}</button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn-secondary" style={{ fontSize: 13, padding: "8px 16px" }}>Login</button>
            <button className="btn-coral" style={{ fontSize: 13, padding: "8px 16px" }}>Donate</button>
          </div>
        </div>
      </nav>

      {/* Content */}
      {page === "home" && !selectedNGO && (
        <WebsiteHome
          onSearch={(f) => { setSearchFilters(f); setPage("listing"); }}
          onCategoryClick={(cat) => { setSearchFilters({ type: cat }); setPage("listing"); }}
          onNGOClick={(n) => { setSelectedNGO(n); setPage("detail"); }}
          onEventRegister={(e) => setVolunteerEvent(e)}
          onDonate={(n) => setDonateNGO(n)}
        />
      )}
      {page === "listing" && !selectedNGO && (
        <WebsiteListing initialFilters={searchFilters} onNGOClick={(n) => { setSelectedNGO(n); setPage("detail"); }} />
      )}
      {page === "events" && (
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
          <h1 className="playfair" style={{ fontSize: 36, color: "var(--forest)", marginBottom: 8 }}>All Events</h1>
          <p style={{ color: "var(--muted)", marginBottom: 32 }}>Upcoming volunteer opportunities and drives</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {EVENTS.map(e => <EventCard key={e.id} event={e} onRegister={(ev) => setVolunteerEvent(ev)} />)}
          </div>
        </div>
      )}
      {page === "detail" && selectedNGO && (
        <NGODetail ngo={selectedNGO} onBack={() => { setSelectedNGO(null); setPage("listing"); }}
          onDonate={(n) => setDonateNGO(n)} onVolunteer={(e) => setVolunteerEvent(e)} />
      )}

      {donateNGO && <DonationModal ngo={donateNGO} onClose={() => setDonateNGO(null)} onSuccess={showToast} />}
      {volunteerEvent && <VolunteerModal event={volunteerEvent} onClose={() => setVolunteerEvent(null)} onSuccess={showToast} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

/* ─────────────────────────────────────────────
   MOBILE APP
───────────────────────────────────────────── */
const MobileApp = () => {
  const [screen, setScreen] = useState("home");
  const [activeTab, setActiveTab] = useState("home");
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [donateNGO, setDonateNGO] = useState(null);
  const [volunteerEvent, setVolunteerEvent] = useState(null);
  const [toast, setToast] = useState(null);
  const [searchQ, setSearchQ] = useState("");

  const navTo = (tab) => { setActiveTab(tab); setScreen(tab); setSelectedNGO(null); };

  const filtered = NGOS.filter(n => !searchQ || n.name.toLowerCase().includes(searchQ.toLowerCase()) || n.city.toLowerCase().includes(searchQ.toLowerCase()));

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "40px 20px", background: "linear-gradient(135deg, var(--forest), var(--sage))", minHeight: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        <div style={{ color: "white", textAlign: "center" }}>
          <div className="playfair" style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>NGOConnect Mobile</div>
          <div style={{ opacity: 0.7, fontSize: 14 }}>React Native App Preview</div>
        </div>

        <div className="phone-frame" style={{ width: 375, height: 760, overflowY: "auto", background: "var(--cream)" }}>
          <div className="phone-notch" />
          <div style={{ paddingTop: 36, height: "100%", display: "flex", flexDirection: "column" }}>

            {/* App content */}
            <div style={{ flex: 1, overflowY: "auto" }}>

              {/* HOME SCREEN */}
              {screen === "home" && (
                <div>
                  <div style={{ background: "linear-gradient(135deg, var(--forest), var(--sage))", padding: "24px 20px 32px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                      <div>
                        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>Good morning 👋</div>
                        <div className="playfair" style={{ color: "white", fontSize: 22, fontWeight: 700 }}>Discover NGOs</div>
                      </div>
                      <Avatar name="User" size={40} bg="rgba(255,255,255,0.15)" />
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 12, padding: "10px 14px", display: "flex", gap: 8, alignItems: "center" }}
                      onClick={() => navTo("discover")}>
                      <span style={{ fontSize: 16 }}>🔍</span>
                      <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>Search NGOs, cities, causes…</span>
                    </div>
                  </div>

                  <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 24 }}>
                    {/* Quick stats */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                      {[["🌱", "2,400+", "NGOs"], ["👥", "28K", "Volunteers"], ["💰", "₹12Cr", "Donated"], ["🏙️", "48", "Cities"]].map(([icon, val, lbl]) => (
                        <div key={lbl} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
                          <div style={{ fontSize: 22, marginBottom: 4 }}>{icon}</div>
                          <div className="playfair" style={{ fontSize: 20, fontWeight: 700, color: "var(--forest)" }}>{val}</div>
                          <div style={{ fontSize: 11, color: "var(--muted)" }}>{lbl}</div>
                        </div>
                      ))}
                    </div>

                    {/* Categories */}
                    <div>
                      <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 18, color: "var(--forest)", marginBottom: 14 }}>Categories</div>
                      <div style={{ display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4 }}>
                        {CATEGORIES_DATA.map(cat => (
                          <div key={cat.id} onClick={() => navTo("discover")}
                            style={{ flexShrink: 0, background: `${cat.color}15`, border: `1.5px solid ${cat.color}30`, borderRadius: 12, padding: "12px 14px", textAlign: "center", cursor: "pointer", width: 90 }}>
                            <div style={{ fontSize: 24, marginBottom: 6 }}>{cat.icon}</div>
                            <div style={{ fontSize: 11, fontWeight: 600, color: cat.color, lineHeight: 1.3 }}>{cat.label.split(" ")[0]}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Featured */}
                    <div>
                      <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 18, color: "var(--forest)", marginBottom: 14 }}>Featured</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {NGOS.filter(n => n.featured).slice(0, 3).map(ngo => (
                          <div key={ngo.id} onClick={() => { setSelectedNGO(ngo); setScreen("ngo-detail"); }}
                            style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 14, display: "flex", gap: 12, cursor: "pointer" }}>
                            <NGOEmoji emoji={ngo.emoji} size={48} />
                            <div style={{ flex: 1, minWidth: 0 }}>
                              <div style={{ fontWeight: 600, fontSize: 14, color: "var(--forest)", fontFamily: "Playfair Display" }}>{ngo.name}</div>
                              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 4 }}>📍 {ngo.city}</div>
                              <Stars rating={ngo.rating} />
                            </div>
                            <span style={{ fontSize: 14, color: "var(--sage)", alignSelf: "center" }}>›</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Events */}
                    <div>
                      <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 18, color: "var(--forest)", marginBottom: 14 }}>Events Near You</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                        {EVENTS.slice(0, 2).map(ev => (
                          <div key={ev.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden", cursor: "pointer" }}>
                            <div style={{ background: "var(--forest)", padding: "10px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                              <span style={{ fontSize: 20 }}>{ev.emoji}</span>
                              <span style={{ fontSize: 11, color: "var(--pale-mint)", fontFamily: "DM Mono" }}>{ev.date}</span>
                            </div>
                            <div style={{ padding: 12 }}>
                              <div style={{ fontWeight: 600, fontSize: 13, color: "var(--charcoal)", marginBottom: 4 }}>{ev.title}</div>
                              <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>📍 {ev.location}</div>
                              <button className="btn-primary" style={{ fontSize: 12, padding: "7px 14px" }} onClick={() => setVolunteerEvent(ev)}>Register</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DISCOVER */}
              {screen === "discover" && (
                <div style={{ padding: "16px" }}>
                  <div style={{ fontFamily: "Playfair Display", fontWeight: 700, fontSize: 22, color: "var(--forest)", marginBottom: 14 }}>Discover NGOs</div>
                  <input className="input-field" placeholder="🔍  Search NGOs or cities…" value={searchQ} onChange={e => setSearchQ(e.target.value)} style={{ marginBottom: 16 }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {filtered.map(ngo => (
                      <div key={ngo.id} onClick={() => { setSelectedNGO(ngo); setScreen("ngo-detail"); }}
                        style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, padding: 14, cursor: "pointer" }}>
                        <div style={{ display: "flex", gap: 12, marginBottom: 10 }}>
                          <NGOEmoji emoji={ngo.emoji} size={44} />
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 600, fontSize: 14, color: "var(--forest)", fontFamily: "Playfair Display" }}>{ngo.name}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)" }}>📍 {ngo.city} · {ngo.volunteers} volunteers</div>
                            <Stars rating={ngo.rating} />
                          </div>
                        </div>
                        <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{ngo.description}</p>
                        <ProgressBar raised={ngo.raised} target={ngo.target} />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* NGO DETAIL */}
              {screen === "ngo-detail" && selectedNGO && (
                <div>
                  <div style={{ background: "var(--forest)", padding: "16px" }}>
                    <button onClick={() => setScreen("discover")} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 13, fontFamily: "DM Sans", marginBottom: 12 }}>← Back</button>
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <NGOEmoji emoji={selectedNGO.emoji} size={60} bg="rgba(255,255,255,0.1)" />
                      <div>
                        <div className="playfair" style={{ color: "white", fontSize: 20, fontWeight: 700 }}>{selectedNGO.name}</div>
                        <div style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>📍 {selectedNGO.city}</div>
                        <Stars rating={selectedNGO.rating} />
                      </div>
                    </div>
                  </div>
                  <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ display: "flex", gap: 10 }}>
                      <button className="btn-coral" style={{ flex: 1, fontSize: 13 }} onClick={() => setDonateNGO(selectedNGO)}>💝 Donate</button>
                      <button className="btn-primary" style={{ flex: 1, fontSize: 13 }} onClick={() => setVolunteerEvent(EVENTS[0])}>👋 Volunteer</button>
                    </div>
                    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
                      <div className="playfair" style={{ fontSize: 16, color: "var(--forest)", marginBottom: 8 }}>Mission</div>
                      <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.7, borderLeft: "3px solid var(--mint)", paddingLeft: 12, fontStyle: "italic" }}>{selectedNGO.mission}</p>
                    </div>
                    <ProgressBar raised={selectedNGO.raised} target={selectedNGO.target} />
                    <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, display: "grid", gap: 12 }}>
                      {[["📞", selectedNGO.phone], ["✉️", selectedNGO.email], ["📍", selectedNGO.address]].map(([icon, val]) => (
                        <div key={val} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ fontSize: 16, marginTop: 1 }}>{icon}</span>
                          <span style={{ fontSize: 13, color: "var(--charcoal)", lineHeight: 1.5 }}>{val}</span>
                        </div>
                      ))}
                    </div>
                    <div className="map-placeholder" style={{ height: 140 }}>
                      <div style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
                        <span style={{ fontSize: 30 }}>🗺️</span>
                        <div style={{ fontWeight: 700, color: "var(--sage)", fontSize: 13 }}>{selectedNGO.city}, {selectedNGO.state}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* EVENTS */}
              {screen === "events" && (
                <div style={{ padding: 16 }}>
                  <div className="playfair" style={{ fontSize: 22, fontWeight: 700, color: "var(--forest)", marginBottom: 16 }}>Events</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                    {EVENTS.map(ev => (
                      <div key={ev.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
                        <div style={{ background: "var(--forest)", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: 24 }}>{ev.emoji}</span>
                          <span style={{ fontSize: 11, color: "var(--pale-mint)", fontFamily: "DM Mono" }}>{ev.date}</span>
                        </div>
                        <div style={{ padding: 14 }}>
                          <div style={{ fontWeight: 600, color: "var(--charcoal)", fontSize: 14, fontFamily: "Playfair Display", marginBottom: 4 }}>{ev.title}</div>
                          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>by {ev.ngoName}</div>
                          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 10 }}>📍 {ev.location}</div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontSize: 12, color: ev.spots - ev.registered < 10 ? "var(--terracotta)" : "var(--sage)", fontWeight: 600 }}>{ev.spots - ev.registered} spots left</span>
                            <button className="btn-primary" style={{ fontSize: 12, padding: "7px 14px" }} onClick={() => setVolunteerEvent(ev)}>Join</button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PROFILE */}
              {screen === "profile" && (
                <div style={{ padding: 20 }}>
                  <div style={{ textAlign: "center", marginBottom: 24 }}>
                    <Avatar name="Arjun Sharma" size={80} bg="var(--forest)" />
                    <div className="playfair" style={{ fontSize: 20, fontWeight: 700, color: "var(--forest)", marginTop: 12 }}>Arjun Sharma</div>
                    <div style={{ fontSize: 14, color: "var(--muted)" }}>arjun@email.com · Mumbai</div>
                    <span className="tag" style={{ background: "rgba(107,174,135,0.15)", color: "var(--sage)", marginTop: 8 }}>🌱 Active Volunteer</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 24 }}>
                    {[["3", "NGOs\nFollowed"], ["5", "Events\nAttended"], ["₹2,500", "Donated"]].map(([val, lbl]) => (
                      <div key={lbl} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, textAlign: "center" }}>
                        <div className="playfair" style={{ fontSize: 18, fontWeight: 700, color: "var(--forest)" }}>{val}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", lineHeight: 1.4, whiteSpace: "pre-line" }}>{lbl}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
                    {["My Donations", "Volunteer History", "Saved NGOs", "Notifications", "Settings", "Log Out"].map((item, i) => (
                      <div key={item} style={{ padding: "14px 18px", borderBottom: i < 5 ? "1px solid var(--border)" : "none", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", color: item === "Log Out" ? "var(--terracotta)" : "var(--charcoal)", fontWeight: 500, fontSize: 14 }}>
                        <span>{item}</span>
                        {item !== "Log Out" && <span style={{ color: "var(--muted)" }}>›</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Nav */}
            <div style={{ background: "var(--white)", borderTop: "1px solid var(--border)", display: "flex", padding: "8px 0", flexShrink: 0 }}>
              {[["home", "🏠", "Home"], ["discover", "🔍", "Discover"], ["events", "📅", "Events"], ["profile", "👤", "Profile"]].map(([tab, icon, label]) => (
                <button key={tab} onClick={() => navTo(tab)} style={{ flex: 1, background: "none", border: "none", cursor: "pointer", padding: "6px 4px", display: "flex", flexDirection: "column", alignItems: "center", gap: 3, fontFamily: "DM Sans" }}>
                  <span style={{ fontSize: 20 }}>{icon}</span>
                  <span style={{ fontSize: 10, fontWeight: 600, color: activeTab === tab ? "var(--forest)" : "var(--muted)" }}>{label}</span>
                  {activeTab === tab && <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--forest)" }} />}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {donateNGO && <DonationModal ngo={donateNGO} onClose={() => setDonateNGO(null)} onSuccess={(m) => setToast(m)} />}
      {volunteerEvent && <VolunteerModal event={volunteerEvent} onClose={() => setVolunteerEvent(null)} onSuccess={(m) => setToast(m)} />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

/* ─────────────────────────────────────────────
   ADMIN DASHBOARD
───────────────────────────────────────────── */
const AdminDashboard = () => {
  const [section, setSection] = useState("overview");
  const [ngos, setNgos] = useState(NGOS);
  const [events, setEvents] = useState(EVENTS);
  const [volunteers, setVolunteers] = useState(VOLUNTEERS);
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [editNGO, setEditNGO] = useState(null);

  const showToast = (msg) => setToast(msg);
  const deleteNGO = (id) => { setNgos(p => p.filter(n => n.id !== id)); showToast("NGO removed successfully"); };
  const approveVolunteer = (id) => { setVolunteers(p => p.map(v => v.id === id ? { ...v, status: "active" } : v)); showToast("Volunteer approved!"); };
  const deleteVolunteer = (id) => { setVolunteers(p => p.filter(v => v.id !== id)); showToast("Volunteer removed"); };

  const NAV = [
    { id: "overview", icon: "📊", label: "Overview" },
    { id: "ngos", icon: "🏢", label: "Manage NGOs" },
    { id: "events", icon: "📅", label: "Events" },
    { id: "volunteers", icon: "👥", label: "Volunteers" },
    { id: "donations", icon: "💰", label: "Donations" },
  ];

  const AddNGOModal = () => {
    const [form, setForm] = useState({ name: "", city: "", state: "", category: "", description: "", email: "", phone: "" });
    const handleSave = () => {
      setNgos(p => [...p, { ...form, id: Date.now(), emoji: "🌱", rating: 0, volunteers: 0, donors: 0, raised: 0, target: 100000, verified: false, featured: false, founded: new Date().getFullYear(), tags: [], mission: form.description, address: `${form.city}, ${form.state}`, website: "" }]);
      setModal(null);
      showToast(`${form.name} added successfully!`);
    };
    return (
      <Modal title="Add New NGO" onClose={() => setModal(null)}>
        <div style={{ display: "grid", gap: 14 }}>
          {[["name", "NGO Name"], ["email", "Email Address"], ["phone", "Phone Number"]].map(([k, l]) => (
            <div key={k}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>{l}</label>
              <input className="input-field" placeholder={l} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} />
            </div>
          ))}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>City</label>
              <input className="input-field" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>State</label>
              <input className="input-field" placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>Category</label>
            <select className="input-field" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              <option value="">Select Category</option>
              {CATEGORIES_DATA.map(c => <option key={c.id} value={c.id}>{c.icon} {c.label}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--charcoal)", display: "block", marginBottom: 6 }}>Description</label>
            <textarea className="input-field" rows={3} placeholder="Brief description of the NGO's work..." value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: "vertical" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button className="btn-secondary" onClick={() => setModal(null)} style={{ flex: 1 }}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} style={{ flex: 2 }}>Add NGO</button>
        </div>
      </Modal>
    );
  };

  const AddEventModal = () => {
    const [form, setForm] = useState({ title: "", date: "", location: "", description: "", ngoId: "", spots: 50 });
    const handleSave = () => {
      const ngo = ngos.find(n => n.id === Number(form.ngoId));
      setEvents(p => [...p, { ...form, id: Date.now(), ngoId: Number(form.ngoId), ngoName: ngo?.name || "Unknown", registered: 0, category: ngo?.category || "education", emoji: "📅" }]);
      setModal(null);
      showToast("Event added successfully!");
    };
    return (
      <Modal title="Add New Event" onClose={() => setModal(null)}>
        <div style={{ display: "grid", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>NGO</label>
            <select className="input-field" value={form.ngoId} onChange={e => setForm({ ...form, ngoId: e.target.value })}>
              <option value="">Select NGO</option>
              {ngos.map(n => <option key={n.id} value={n.id}>{n.emoji} {n.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Event Title</label>
            <input className="input-field" placeholder="Event title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Date</label>
              <input className="input-field" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Max Volunteers</label>
              <input className="input-field" type="number" value={form.spots} onChange={e => setForm({ ...form, spots: e.target.value })} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Location</label>
            <input className="input-field" placeholder="Event location" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, display: "block", marginBottom: 6 }}>Description</label>
            <textarea className="input-field" rows={3} placeholder="Event description…" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} style={{ resize: "vertical" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button className="btn-secondary" onClick={() => setModal(null)} style={{ flex: 1 }}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} style={{ flex: 2 }}>Add Event</button>
        </div>
      </Modal>
    );
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--cream)", fontFamily: "DM Sans" }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: "var(--forest)", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "24px 20px", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 24 }}>🌱</span>
            <span className="playfair" style={{ color: "white", fontSize: 18, fontWeight: 700 }}>NGOConnect</span>
          </div>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em" }}>Admin Panel</span>
        </div>

        <nav style={{ flex: 1, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map(item => (
            <button key={item.id} className={`sidebar-item ${section === item.id ? "active" : ""}`} onClick={() => setSection(item.id)}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Avatar name="Admin" size={34} bg="rgba(255,255,255,0.15)" />
            <div>
              <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>Admin User</div>
              <div style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Super Admin</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <div style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <h1 style={{ fontSize: 18, fontWeight: 700, color: "var(--charcoal)", fontFamily: "Playfair Display" }}>
            {NAV.find(n => n.id === section)?.label}
          </h1>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <span style={{ fontSize: 12, color: "var(--muted)" }}>{new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</span>
            {section === "ngos" && <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setModal("add-ngo")}>+ Add NGO</button>}
            {section === "events" && <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setModal("add-event")}>+ Add Event</button>}
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>

          {/* OVERVIEW */}
          {section === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {[
                  { icon: "🏢", val: ngos.length, label: "Total NGOs", sub: `+${ngos.filter(n => n.verified).length} verified`, color: "var(--forest)" },
                  { icon: "📅", val: events.length, label: "Active Events", sub: "This month", color: "var(--terracotta)" },
                  { icon: "👥", val: volunteers.filter(v => v.status === "active").length, label: "Active Volunteers", sub: `${volunteers.filter(v => v.status === "pending").length} pending`, color: "var(--sage)" },
                  { icon: "💰", val: "₹12Cr+", label: "Total Donations", sub: "Lifetime", color: "var(--sand)" },
                ].map(stat => (
                  <div key={stat.label} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, padding: 20, borderTop: `4px solid ${stat.color}` }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
                    <div className="stat-number" style={{ color: stat.color }}>{stat.val}</div>
                    <div style={{ fontSize: 13, color: "var(--charcoal)", fontWeight: 600, marginTop: 4 }}>{stat.label}</div>
                    <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{stat.sub}</div>
                  </div>
                ))}
              </div>

              {/* Pending approvals */}
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--charcoal)" }}>⏳ Pending Volunteer Approvals</div>
                  <span style={{ background: "var(--terracotta)", color: "white", fontSize: 11, padding: "2px 8px", borderRadius: 10, fontWeight: 700 }}>{volunteers.filter(v => v.status === "pending").length} pending</span>
                </div>
                <table className="data-table">
                  <thead><tr><th>Volunteer</th><th>City</th><th>NGO</th><th>Skills</th><th>Action</th></tr></thead>
                  <tbody>
                    {volunteers.filter(v => v.status === "pending").map(v => (
                      <tr key={v.id}>
                        <td><div style={{ display: "flex", gap: 10, alignItems: "center" }}><Avatar name={v.name} size={32} /><span style={{ fontWeight: 500 }}>{v.name}</span></div></td>
                        <td>{v.city}</td>
                        <td style={{ maxWidth: 150 }}><span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block" }}>{v.ngo}</span></td>
                        <td><div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{v.skills.map(s => <span key={s} style={{ fontSize: 11, padding: "2px 6px", background: "var(--parchment)", borderRadius: 4, color: "var(--muted)" }}>{s}</span>)}</div></td>
                        <td>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button style={{ fontSize: 12, padding: "5px 12px", background: "var(--sage)", color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "DM Sans" }} onClick={() => approveVolunteer(v.id)}>✓ Approve</button>
                            <button style={{ fontSize: 12, padding: "5px 10px", background: "var(--parchment)", color: "var(--terracotta)", border: "1px solid var(--terracotta)", borderRadius: 6, cursor: "pointer", fontFamily: "DM Sans" }} onClick={() => deleteVolunteer(v.id)}>✕</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Recent NGOs */}
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: "var(--charcoal)" }}>🏢 Unverified NGOs</div>
                </div>
                <table className="data-table">
                  <thead><tr><th>NGO</th><th>Location</th><th>Category</th><th>Raised</th><th>Status</th><th>Action</th></tr></thead>
                  <tbody>
                    {ngos.filter(n => !n.verified).map(n => (
                      <tr key={n.id}>
                        <td><div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontSize: 20 }}>{n.emoji}</span><span style={{ fontWeight: 600, fontFamily: "Playfair Display", fontSize: 14 }}>{n.name}</span></div></td>
                        <td>{n.city}, {n.state}</td>
                        <td><CategoryTag cat={n.category} /></td>
                        <td>₹{(n.raised / 100000).toFixed(1)}L</td>
                        <td><span style={{ fontSize: 11, padding: "3px 8px", background: "rgba(212,169,106,0.15)", color: "#B7770D", borderRadius: 4, fontWeight: 700 }}>PENDING</span></td>
                        <td>
                          <button style={{ fontSize: 12, padding: "5px 12px", background: "var(--forest)", color: "white", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "DM Sans" }}
                            onClick={() => { setNgos(p => p.map(x => x.id === n.id ? { ...x, verified: true } : x)); showToast(`${n.name} verified!`); }}>
                            ✓ Verify
                          </button>
                        </td>
                      </tr>
                    ))}
                    {ngos.filter(n => !n.verified).length === 0 && (
                      <tr><td colSpan={6} style={{ textAlign: "center", color: "var(--muted)", padding: 24 }}>All NGOs verified ✓</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* NGOs */}
          {section === "ngos" && (
            <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>All NGOs ({ngos.length})</div>
                <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setModal("add-ngo")}>+ Add NGO</button>
              </div>
              <table className="data-table">
                <thead><tr><th>NGO</th><th>Location</th><th>Category</th><th>Volunteers</th><th>Raised</th><th>Status</th><th>Actions</th></tr></thead>
                <tbody>
                  {ngos.map(n => (
                    <tr key={n.id}>
                      <td><div style={{ display: "flex", gap: 10, alignItems: "center" }}><span style={{ fontSize: 22 }}>{n.emoji}</span><div><div style={{ fontWeight: 700, fontFamily: "Playfair Display", fontSize: 14 }}>{n.name}</div><div style={{ fontSize: 11, color: "var(--muted)" }}>{n.email}</div></div></div></td>
                      <td>{n.city}, {n.state}</td>
                      <td><CategoryTag cat={n.category} /></td>
                      <td>{n.volunteers}</td>
                      <td>₹{(n.raised / 100000).toFixed(1)}L</td>
                      <td>
                        {n.verified
                          ? <span style={{ fontSize: 11, padding: "3px 8px", background: "rgba(107,174,135,0.15)", color: "var(--sage)", borderRadius: 4, fontWeight: 700 }}>✓ VERIFIED</span>
                          : <span style={{ fontSize: 11, padding: "3px 8px", background: "rgba(193,96,58,0.12)", color: "var(--terracotta)", borderRadius: 4, fontWeight: 700 }}>PENDING</span>}
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          {!n.verified && (
                            <button style={{ fontSize: 11, padding: "4px 10px", background: "var(--sage)", color: "white", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "DM Sans" }}
                              onClick={() => { setNgos(p => p.map(x => x.id === n.id ? { ...x, verified: true } : x)); showToast(`${n.name} approved!`); }}>Approve</button>
                          )}
                          <button style={{ fontSize: 11, padding: "4px 10px", background: "var(--parchment)", color: "var(--charcoal)", border: "1px solid var(--border)", borderRadius: 5, cursor: "pointer", fontFamily: "DM Sans" }}>Edit</button>
                          <button style={{ fontSize: 11, padding: "4px 10px", background: "rgba(193,96,58,0.1)", color: "var(--terracotta)", border: "1px solid rgba(193,96,58,0.3)", borderRadius: 5, cursor: "pointer", fontFamily: "DM Sans" }}
                            onClick={() => deleteNGO(n.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* EVENTS */}
          {section === "events" && (
            <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>All Events ({events.length})</div>
                <button className="btn-primary" style={{ fontSize: 13 }} onClick={() => setModal("add-event")}>+ Add Event</button>
              </div>
              <table className="data-table">
                <thead><tr><th>Event</th><th>NGO</th><th>Date</th><th>Location</th><th>Registered</th><th>Actions</th></tr></thead>
                <tbody>
                  {events.map(ev => (
                    <tr key={ev.id}>
                      <td><div style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ fontSize: 20 }}>{ev.emoji}</span><span style={{ fontWeight: 600, fontFamily: "Playfair Display", fontSize: 14 }}>{ev.title}</span></div></td>
                      <td style={{ fontSize: 13, color: "var(--muted)" }}>{ev.ngoName}</td>
                      <td style={{ fontFamily: "DM Mono", fontSize: 12 }}>{ev.date}</td>
                      <td style={{ fontSize: 13 }}>{ev.location}</td>
                      <td>
                        <div>
                          <span style={{ fontWeight: 600, fontSize: 13 }}>{ev.registered}/{ev.spots}</span>
                          <div className="progress-bar" style={{ marginTop: 4, width: 80 }}>
                            <div className="progress-fill" style={{ width: `${(ev.registered / ev.spots) * 100}%` }} />
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button style={{ fontSize: 11, padding: "4px 10px", background: "var(--parchment)", color: "var(--charcoal)", border: "1px solid var(--border)", borderRadius: 5, cursor: "pointer", fontFamily: "DM Sans" }}>Edit</button>
                          <button style={{ fontSize: 11, padding: "4px 10px", background: "rgba(193,96,58,0.1)", color: "var(--terracotta)", border: "1px solid rgba(193,96,58,0.3)", borderRadius: 5, cursor: "pointer", fontFamily: "DM Sans" }}
                            onClick={() => { setEvents(p => p.filter(e => e.id !== ev.id)); showToast("Event deleted"); }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VOLUNTEERS */}
          {section === "volunteers" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
                {[["Total", volunteers.length, "var(--forest)"], ["Active", volunteers.filter(v => v.status === "active").length, "var(--sage)"], ["Pending", volunteers.filter(v => v.status === "pending").length, "var(--terracotta)"]].map(([l, v, c]) => (
                  <div key={l} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, borderLeft: `4px solid ${c}` }}>
                    <div className="stat-number" style={{ color: c }}>{v}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600 }}>{l} Volunteers</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: 15 }}>Volunteer Applications</div>
                <table className="data-table">
                  <thead><tr><th>Volunteer</th><th>City</th><th>Skills</th><th>NGO Applied</th><th>Joined</th><th>Status</th><th>Actions</th></tr></thead>
                  <tbody>
                    {volunteers.map(v => (
                      <tr key={v.id}>
                        <td><div style={{ display: "flex", gap: 10, alignItems: "center" }}><Avatar name={v.name} size={32} /><span style={{ fontWeight: 600 }}>{v.name}</span></div></td>
                        <td>{v.city}</td>
                        <td><div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{v.skills.map(s => <span key={s} style={{ fontSize: 11, padding: "2px 6px", background: "var(--parchment)", borderRadius: 4 }}>{s}</span>)}</div></td>
                        <td style={{ fontSize: 13, color: "var(--muted)", maxWidth: 160 }}><span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{v.ngo}</span></td>
                        <td style={{ fontFamily: "DM Mono", fontSize: 12 }}>{v.joined}</td>
                        <td>
                          <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 4, fontWeight: 700,
                            background: v.status === "active" ? "rgba(107,174,135,0.15)" : "rgba(212,169,106,0.15)",
                            color: v.status === "active" ? "var(--sage)" : "#B7770D" }}>
                            {v.status.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: "flex", gap: 6 }}>
                            {v.status === "pending" && (
                              <button style={{ fontSize: 11, padding: "4px 10px", background: "var(--sage)", color: "white", border: "none", borderRadius: 5, cursor: "pointer", fontFamily: "DM Sans" }}
                                onClick={() => approveVolunteer(v.id)}>Approve</button>
                            )}
                            <button style={{ fontSize: 11, padding: "4px 10px", background: "rgba(193,96,58,0.1)", color: "var(--terracotta)", border: "1px solid rgba(193,96,58,0.3)", borderRadius: 5, cursor: "pointer", fontFamily: "DM Sans" }}
                              onClick={() => deleteVolunteer(v.id)}>Remove</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DONATIONS */}
          {section === "donations" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
                {[["₹12Cr+", "Total Collected", "var(--forest)"], ["₹2.1L", "This Month", "var(--sage)"], ["1,847", "Total Donors", "var(--sand)"], ["80G", "Tax Benefit", "var(--terracotta)"]].map(([v, l, c]) => (
                  <div key={l} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, borderTop: `4px solid ${c}` }}>
                    <div className="stat-number" style={{ color: c }}>{v}</div>
                    <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600, marginTop: 4 }}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: 15 }}>Recent Donations</div>
                <table className="data-table">
                  <thead><tr><th>Donor</th><th>NGO</th><th>Amount</th><th>Method</th><th>Date</th></tr></thead>
                  <tbody>
                    {DONATIONS.map(d => (
                      <tr key={d.id}>
                        <td><div style={{ display: "flex", gap: 10, alignItems: "center" }}><Avatar name={d.donor} size={32} /><span style={{ fontWeight: 600 }}>{d.donor}</span></div></td>
                        <td style={{ fontSize: 13 }}>{d.ngo}</td>
                        <td><span className="playfair" style={{ fontSize: 16, fontWeight: 700, color: "var(--sage)" }}>₹{d.amount.toLocaleString()}</span></td>
                        <td><span style={{ fontSize: 11, padding: "3px 8px", background: "var(--parchment)", borderRadius: 4, fontWeight: 600 }}>{d.method}</span></td>
                        <td style={{ fontFamily: "DM Mono", fontSize: 12 }}>{d.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* NGO Fundraising leaderboard */}
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 20 }}>🏆 NGO Fundraising Leaderboard</div>
                {ngos.sort((a, b) => b.raised - a.raised).slice(0, 5).map((n, i) => (
                  <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
                    <span style={{ fontSize: 14, fontWeight: 700, color: i < 3 ? "var(--sand)" : "var(--muted)", width: 20, textAlign: "center" }}>#{i + 1}</span>
                    <span style={{ fontSize: 20 }}>{n.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, fontFamily: "Playfair Display", color: "var(--forest)" }}>{n.name}</div>
                      <ProgressBar raised={n.raised} target={n.target} />
                    </div>
                    <span className="playfair" style={{ fontSize: 15, fontWeight: 700, color: "var(--sage)", flexShrink: 0 }}>₹{(n.raised / 100000).toFixed(1)}L</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {modal === "add-ngo" && <AddNGOModal />}
      {modal === "add-event" && <AddEventModal />}
      {toast && <Toast message={toast} onClose={() => setToast(null)} />}
    </div>
  );
};

/* ─────────────────────────────────────────────
   ROOT APP — PLATFORM SWITCHER
───────────────────────────────────────────── */
export default function App() {
  const [platform, setPlatform] = useState("website");

  return (
    <div style={{ minHeight: "100vh", fontFamily: "DM Sans" }}>
      <GlobalStyle />

      {/* Platform switcher bar */}
      <div style={{ background: "var(--charcoal)", padding: "10px 24px", display: "flex", alignItems: "center", gap: 16, zIndex: 9999, position: "relative", flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginRight: 8 }}>
          <span style={{ fontSize: 18 }}>🌱</span>
          <span className="playfair" style={{ color: "white", fontSize: 15, fontWeight: 700 }}>NGO Ecosystem</span>
        </div>
        <div style={{ display: "flex", gap: 8, flex: 1, flexWrap: "wrap" }}>
          {[
            { id: "website", label: "🖥️  NGO Website", desc: "Next.js 14 · TypeScript · Tailwind" },
            { id: "mobile", label: "📱  Mobile App", desc: "React Native · Expo" },
            { id: "admin", label: "⚙️  Admin Dashboard", desc: "Node.js · MongoDB" },
          ].map(p => (
            <button key={p.id} className={`platform-btn ${platform === p.id ? "active" : ""}`} onClick={() => setPlatform(p.id)}>
              {p.label}
              <span style={{ fontSize: 10, opacity: 0.6, display: "block", fontWeight: 400, marginTop: 1 }}>{p.desc}</span>
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", textAlign: "right", lineHeight: 1.5, display: "flex", flexDirection: "column" }}>
          <span>Full-Stack Platform</span>
          <span style={{ color: "var(--pale-mint)", opacity: 0.7 }}>REST API · JWT · MongoDB</span>
        </div>
      </div>

      {/* Platform views */}
      {platform === "website" && <Website />}
      {platform === "mobile" && <MobileApp />}
      {platform === "admin" && <div style={{ height: "calc(100vh - 58px)" }}><AdminDashboard /></div>}
    </div>
  );
}
