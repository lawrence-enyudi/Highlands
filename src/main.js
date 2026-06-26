import './style.css'
import './db.js'
import { getProperties } from './db.js'

const injectResource = (tagName, attributes) => {
  if (attributes.id && document.getElementById(attributes.id)) {
    return null
  }

  const element = document.createElement(tagName)
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'innerText') {
      element.innerText = value
    } else {
      element.setAttribute(key, value)
    }
  })
  document.head.appendChild(element)
  return element
}

injectResource('link', {
  id: 'google-fonts-dm-sans-playfair',
  rel: 'stylesheet',
  href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=Playfair+Display:wght@400;700&display=swap',
})

injectResource('script', {
  id: 'tailwind-cdn',
  src: 'https://cdn.tailwindcss.com/3.4.17',
  defer: 'true',
})

const lucideScript = injectResource('script', {
  id: 'lucide-cdn',
  src: 'https://cdn.jsdelivr.net/npm/lucide@0.263.0/dist/umd/lucide.min.js',
  defer: 'true',
})

document.querySelector('#app').innerHTML = `
<style>
  :root {
    --slate-950: #020617;
    --slate-900: #0f172a;
    --slate-800: #1e293b;
    --slate-700: #334155;
    --amber-400: #fbbf24;
    --amber-300: #fcd34d;
  }

  * { box-sizing: border-box; }
  html { scroll-behavior: smooth; background: var(--slate-950); }
  body {
    margin: 0;
    font-family: 'DM Sans', sans-serif;
    color: #e2e8f0;
    background:
      radial-gradient(circle at top left, rgba(251, 191, 36, 0.16), transparent 28%),
      radial-gradient(circle at top right, rgba(148, 163, 184, 0.12), transparent 26%),
      linear-gradient(180deg, #020617 0%, #0f172a 38%, #020617 100%);
  }

  .font-display { font-family: 'Playfair Display', serif; }
  .page-shell {
    position: relative;
    isolation: isolate;
  }

  .page-shell::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: radial-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px);
    background-size: 24px 24px;
    opacity: 0.18;
    pointer-events: none;
    z-index: -1;
  }

  .topbar {
    background: rgba(2, 6, 23, 0.82);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(51, 65, 85, 0.65);
  }

  .hero-card,
  .feature-card,
  .contact-card,
  .property-card,
  .info-card {
    background: rgba(15, 23, 42, 0.78);
    border: 1px solid rgba(51, 65, 85, 0.8);
    box-shadow: 0 24px 60px rgba(2, 6, 23, 0.28);
    backdrop-filter: blur(16px);
  }

  .hero-image {
    min-height: 680px;
    background-image:
      linear-gradient(180deg, rgba(2, 6, 23, 0.18), rgba(2, 6, 23, 0.88)),
      url('https://images.pexels.com/photos/6493861/pexels-photo-6493861.jpeg?auto=compress&cs=tinysrgb&w=1920');
    background-position: center;
    background-size: cover;
  }

  .section-title {
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--amber-400);
    font-size: 0.75rem;
    font-weight: 700;
  }

  .soft-chip {
    border: 1px solid rgba(251, 191, 36, 0.18);
    background: rgba(251, 191, 36, 0.08);
    color: #fde68a;
  }

  .prop-card {
    transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .prop-card:hover {
    transform: translateY(-6px);
    border-color: rgba(251, 191, 36, 0.3);
    box-shadow: 0 26px 60px rgba(2, 6, 23, 0.4);
  }

  #viewing-modal { transition: opacity 0.3s; }
  #viewing-modal.hidden { opacity: 0; pointer-events: none; }

  .nav-link {
    color: #cbd5e1;
    transition: color 0.2s ease;
  }
  .nav-link:hover { color: #fbbf24; }

  .hero-badge {
    border: 1px solid rgba(251, 191, 36, 0.22);
    background: rgba(2, 6, 23, 0.5);
    backdrop-filter: blur(12px);
  }

  .section-kicker {
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: rgba(251, 191, 36, 0.9);
    font-size: 0.7rem;
    font-weight: 700;
  }

  .section-heading {
    font-family: 'Playfair Display', serif;
    font-weight: 700;
    line-height: 1.05;
    color: #fff;
  }

  .section-copy {
    color: #cbd5e1;
    line-height: 1.9;
  }

  .property-meta {
    border-top: 1px solid rgba(51, 65, 85, 0.7);
    background: linear-gradient(180deg, rgba(15, 23, 42, 0.72), rgba(2, 6, 23, 0.92));
  }

  .quick-pill {
    border: 1px solid rgba(51, 65, 85, 0.9);
    background: rgba(15, 23, 42, 0.72);
    color: #e2e8f0;
  }

  .quick-pill.active {
    border-color: rgba(251, 191, 36, 0.45);
    background: rgba(251, 191, 36, 0.12);
    color: #fde68a;
  }
</style>
<div data-template-id="__page-root" class="page-shell w-full min-h-screen text-white">
  <nav class="topbar sticky top-0 w-full z-50">
   <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
    <a href="#" data-template-id="nav-brand" class="font-display font-bold tracking-wide text-lg text-white" style="font-size: 18px;">Jewel Villafranca</a>
    <div class="hidden md:flex items-center gap-8">
     <a href="#about" data-template-id="nav-about" class="nav-link text-sm">About</a>
     <a href="#properties" data-template-id="nav-properties" class="nav-link text-sm">Properties</a>
     <a href="#services" data-template-id="nav-services" class="nav-link text-sm">Services</a>
     <a href="#contact" data-template-id="nav-contact" class="nav-link text-sm">Contact</a>
    </div><button id="mobile-menu-btn" class="md:hidden text-white" aria-label="Open menu"><i data-lucide="menu" style="width:24px;height:24px;"></i></button>
   </div>
   <div id="mobile-menu" class="hidden md:hidden px-6 pb-4 space-y-3 border-t border-slate-800/80 bg-slate-950/90">
    <a href="#about" class="block text-sm nav-link">About</a> <a href="#properties" class="block text-sm nav-link">Properties</a> <a href="#services" class="block text-sm nav-link">Services</a> <a href="#contact" class="block text-sm nav-link">Contact</a>
   </div>
  </nav>
  <header class="relative overflow-hidden">
   <div class="hero-image absolute inset-0"></div>
   <div class="absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/55 to-slate-950"></div>
  <div class="relative w-full px-4 py-14 sm:px-6 lg:px-10 xl:px-14 lg:py-20">
   <div class="grid gap-10 xl:grid-cols-[1.08fr_0.92fr] items-center min-h-[680px]">
     <div class="max-w-3xl">
      <div class="hero-badge inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs uppercase tracking-[0.28em] text-amber-200">
       Tagaytay Highlands Property Specialist
      </div>
      <h1 data-template-id="hero-title" class="font-display mt-6 max-w-2xl text-5xl font-bold leading-[1.05] text-white sm:text-6xl lg:text-7xl">Curated Highlands Properties, Presented with Clarity</h1>
      <p data-template-id="hero-subtitle" class="mt-6 max-w-xl text-lg leading-8 text-slate-300 sm:text-xl">Explore premium lots, homes, and condominiums in Tagaytay with a refined presentation, clear availability, and direct contact options.</p>
      <div class="mt-8 flex flex-wrap gap-3">
       <button data-template-id="hero-cta" onclick="openViewingModal('')" class="inline-flex items-center justify-center rounded-full bg-amber-400 px-7 py-3 text-sm font-bold text-slate-950 transition hover:bg-amber-300">Schedule a Viewing</button>
       <a href="#properties" class="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-900/60 px-7 py-3 text-sm font-semibold text-slate-100 transition hover:border-amber-400/40 hover:text-amber-200">View Properties</a>
      </div>
      <div class="mt-10 grid max-w-2xl grid-cols-3 gap-4">
       <div class="hero-badge rounded-2xl p-4">
        <p class="text-2xl font-bold text-white">6+</p>
        <p class="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Featured Listings</p>
       </div>
       <div class="hero-badge rounded-2xl p-4">
        <p class="text-2xl font-bold text-white">Tagaytay</p>
        <p class="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Prime Highlands Location</p>
       </div>
       <div class="hero-badge rounded-2xl p-4">
        <p class="text-2xl font-bold text-white">Fast</p>
        <p class="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Direct Inquiry Support</p>
       </div>
      </div>
     </div>
     <div class="lg:justify-self-end">
      <div class="hero-card rounded-[2rem] p-6 sm:p-8">
       <p class="section-kicker">Featured Snapshot</p>
       <div class="mt-4 overflow-hidden rounded-[1.5rem] border border-slate-700/70">
        <img data-template-id="hero-image" loading="lazy" class="h-[340px] w-full object-cover" src="https://images.pexels.com/photos/6493861/pexels-photo-6493861.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1920" alt="Breathtaking aerial view of Tagaytay's lush highlands and winding roads overlooking Taal Lake">
       </div>
       <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <div class="info-card rounded-2xl p-4">
         <p class="text-sm text-slate-400">Service Area</p>
         <p class="mt-2 text-lg font-semibold text-white">Tagaytay Highlands</p>
        </div>
        <div class="info-card rounded-2xl p-4">
         <p class="text-sm text-slate-400">Contact</p>
         <p class="mt-2 text-lg font-semibold text-white">Direct Viber Support</p>
        </div>
       </div>
      </div>
     </div>
    </div>
   </div>
  </header>
  <main>
    <section id="about" class="w-full px-4 py-20 sm:px-6 lg:px-10 xl:px-14 lg:py-24">
    <div class="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-center">
     <div class="hero-card overflow-hidden rounded-[2rem]">
      <img data-template-id="agent-portrait" loading="lazy" class="h-full w-full object-cover" src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1200" alt="Portrait of Jewel Villafranca">
     </div>
     <div class="space-y-6">
      <div>
       <p class="section-kicker">About Jewel</p>
       <h2 data-template-id="about-heading" class="section-heading mt-3 text-4xl sm:text-5xl">A premium property presentation built around trust and clarity</h2>
      </div>
      <p data-template-id="about-text" class="section-copy max-w-2xl text-lg">With years of dedicated experience in Tagaytay Highlands real estate, I help clients find their perfect property whether it is a serene weekend retreat, a sound investment lot, or a luxury residence with breathtaking views of Taal Lake.</p>
      <p data-template-id="about-text-2" class="max-w-2xl text-base leading-8 text-slate-400">From site visits to paperwork, I provide end-to-end guidance so you can focus on envisioning your new life in the highlands.</p>
      <div class="grid gap-4 sm:grid-cols-3">
       <div class="info-card rounded-2xl p-5">
        <p class="text-2xl font-bold text-white">6</p>
        <p class="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Featured Listings</p>
       </div>
       <div class="info-card rounded-2xl p-5">
        <p class="text-2xl font-bold text-white">Tagaytay</p>
        <p class="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Specialty Area</p>
       </div>
       <div class="info-card rounded-2xl p-5">
        <p class="text-2xl font-bold text-white">Direct</p>
        <p class="mt-1 text-xs uppercase tracking-[0.2em] text-slate-400">Client Support</p>
       </div>
      </div>
      <p data-template-id="about-address" class="text-sm text-slate-500">📍 4120 Brgy. Calabuso, Tagaytay City, Cavite, Philippines</p>
     </div>
    </div>
   </section>
  <section id="services" data-template-id="services-section" class="w-full px-4 py-6 sm:px-6 lg:px-10 xl:px-14 lg:py-10">
    <div class="mb-8 flex items-end justify-between gap-4">
     <div>
      <p class="section-kicker">Services</p>
      <h2 data-template-id="services-heading" class="section-heading mt-3 text-3xl sm:text-4xl">Concise support from search to signing</h2>
     </div>
    </div>
    <div class="grid gap-6 lg:grid-cols-3">
      <div data-template-id="service-1-card" class="feature-card rounded-[1.75rem] overflow-hidden">
       <div class="h-56 overflow-hidden">
        <img data-template-id="service-1-img" loading="lazy" class="h-full w-full object-cover" src="https://images.pexels.com/photos/7578899/pexels-photo-7578899.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1000" alt="Two real estate professionals shaking hands in front of a new home">
       </div>
       <div class="p-6">
        <h3 data-template-id="service-1-title" class="text-xl font-bold text-white">Property Buying</h3>
        <p data-template-id="service-1-desc" class="mt-3 leading-7 text-slate-300">Find your perfect home, lot, or condo in Tagaytay Highlands with personalized property matching.</p>
       </div>
      </div>
      <div data-template-id="service-2-card" class="feature-card rounded-[1.75rem] overflow-hidden">
       <div class="h-56 overflow-hidden">
        <img data-template-id="service-2-img" loading="lazy" class="h-full w-full object-cover" src="https://images.pexels.com/photos/7731330/pexels-photo-7731330.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1000" alt="Professional meeting discussing business agreements with laptops and documents">
       </div>
       <div class="p-6">
        <h3 data-template-id="service-2-title" class="text-xl font-bold text-white">Investment Advisory</h3>
        <p data-template-id="service-2-desc" class="mt-3 leading-7 text-slate-300">Get expert guidance on property investments with high appreciation potential in the highlands.</p>
       </div>
      </div>
      <div data-template-id="service-3-card" class="feature-card rounded-[1.75rem] overflow-hidden">
       <div class="h-56 overflow-hidden">
        <img data-template-id="service-3-img" loading="lazy" class="h-full w-full object-cover" src="https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1000" alt="Close-up of a realtor handing over a house key to a new homeowner">
       </div>
       <div class="p-6">
        <h3 data-template-id="service-3-title" class="text-xl font-bold text-white">Documentation Support</h3>
        <p data-template-id="service-3-desc" class="mt-3 leading-7 text-slate-300">Seamless assistance with contracts, titles, and all paperwork from reservation to turnover.</p>
       </div>
      </div>
     </div>
   </section>
  <section id="properties" data-template-id="properties-section" class="w-full px-4 py-20 sm:px-6 lg:px-10 xl:px-14 lg:py-24">
    <div class="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
     <div>
      <p class="section-kicker">Featured Properties</p>
      <h2 data-template-id="properties-heading" class="section-heading mt-3 text-3xl sm:text-4xl">Current listings in the Highlands</h2>
     </div>
     <p class="max-w-xl text-sm leading-7 text-slate-400">Tap a listing to view the gallery and availability details. Sold out items are clearly marked with a visual overlay.</p>
    </div>
    <div class="mb-6 flex flex-wrap gap-3">
     <button class="quick-pill active rounded-full px-4 py-2 text-sm font-semibold" type="button" data-filter="all">All</button>
     <button class="quick-pill rounded-full px-4 py-2 text-sm font-semibold" type="button" data-filter="Available">Available</button>
     <button class="quick-pill rounded-full px-4 py-2 text-sm font-semibold" type="button" data-filter="Pre-Selling">Pre-Selling</button>
     <button class="quick-pill rounded-full px-4 py-2 text-sm font-semibold" type="button" data-filter="Sold Out">Sold Out</button>
    </div>
    <div id="properties-grid" class="grid gap-6 md:grid-cols-2 xl:grid-cols-3"></div>
   </section>
  <section id="contact" data-template-id="contact-section" class="w-full px-4 pb-20 sm:px-6 lg:px-10 xl:px-14 lg:pb-24">
    <div class="contact-card grid gap-8 rounded-[2rem] p-6 lg:grid-cols-[0.9fr_1.1fr] lg:p-8">
     <div class="space-y-6">
      <p class="section-kicker">Contact</p>
      <h2 data-template-id="contact-heading" class="section-heading text-3xl sm:text-4xl">Ready to invest in Tagaytay?</h2>
      <p data-template-id="contact-text" class="max-w-md leading-8 text-slate-300">Let's find the perfect property for you. Reach out today for a no-obligation consultation.</p>
      <div class="space-y-3">
       <a href="viber://chat?number=639750541424" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4 transition hover:border-amber-400/30">
        <i data-lucide="phone" style="width:20px;height:20px;color:#fbbf24;"></i>
        <span data-template-id="contact-phone-1" class="text-slate-200">0975 054 1424 (Viber)</span>
       </a>
       <a href="viber://chat?number=639933684179" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4 transition hover:border-amber-400/30">
        <i data-lucide="message-circle" style="width:20px;height:20px;color:#fbbf24;"></i>
        <span data-template-id="contact-phone-2" class="text-slate-200">0993 368 4179 (Viber)</span>
       </a>
       <a href="mailto:jewelvillafranca@gmail.com" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4 transition hover:border-amber-400/30">
        <i data-lucide="mail" style="width:20px;height:20px;color:#fbbf24;"></i>
        <span data-template-id="contact-email" class="text-amber-200">jewelvillafranca@gmail.com</span>
       </a>
       <div class="flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-4">
        <i data-lucide="map-pin" style="width:20px;height:20px;color:#fbbf24;"></i>
        <span data-template-id="contact-address" class="text-slate-300">4120 Brgy. Calabuso, Tagaytay City, Cavite, Philippines</span>
       </div>
      </div>
     </div>
     <form id="contact-form" class="space-y-4 rounded-[1.5rem] border border-slate-700 bg-slate-950/50 p-6">
       <div>
        <label data-template-id="form-name-label" for="form-name" class="mb-2 block text-sm font-medium text-slate-300">Your Name</label>
        <input id="form-name" type="text" required class="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none" placeholder="Your name">
       </div>
       <div>
        <label data-template-id="form-email-label" for="form-email" class="mb-2 block text-sm font-medium text-slate-300">Your Email</label>
        <input id="form-email" type="email" required class="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none" placeholder="you@example.com">
       </div>
       <div>
        <label data-template-id="form-message-label" for="form-message" class="mb-2 block text-sm font-medium text-slate-300">Your Message</label>
        <textarea id="form-message" rows="4" required class="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder-slate-500 focus:border-amber-400 focus:outline-none resize-none" placeholder="Tell me what you're looking for..."></textarea>
       </div>
       <button data-template-id="form-submit-btn" type="submit" class="w-full rounded-2xl bg-amber-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-amber-300">Send Message</button>
       <p id="form-success" class="hidden text-center text-sm text-emerald-400">Message sent! Opening your email client...</p>
      </form>
    </div>
   </section>
  </main>
  <footer class="border-t border-slate-800/80 bg-slate-950/80">
  <div class="w-full px-4 py-8 text-center sm:px-6 lg:px-10 xl:px-14">
    <p data-template-id="footer-text" class="text-sm text-slate-500">© 2026 Carsheene Jewel B. Villafranca — Tagaytay Highlands Property Specialist</p>
   </div>
  </footer>
  <div id="gallery-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
   <div class="absolute inset-0 bg-black/70" onclick="closePropertyGallery()"></div>
   <div class="relative bg-slate-800 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
    <button onclick="closePropertyGallery()" class="absolute top-4 right-4 text-slate-400 hover:text-white z-10" aria-label="Close"><i data-lucide="x" style="width:24px;height:24px;"></i></button>
    <div class="p-8">
     <h2 id="gallery-title" class="text-2xl font-bold mb-2 text-white"></h2>
     <div class="flex items-center gap-3 mb-6">
      <p id="gallery-description" class="text-slate-300 text-sm"></p>
      <span id="gallery-status" class="ml-auto inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider"></span>
     </div>
     <div class="space-y-6"><img id="gallery-main" class="w-full h-80 object-cover rounded-lg">
      <div id="gallery-thumbs" class="grid grid-cols-3 gap-4"></div>
     </div><button onclick="openViewingModalFromGallery()" class="mt-8 w-full px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-lg hover:bg-amber-300 transition-colors">Schedule Viewing</button>
    </div>
   </div>
  </div>
  <div id="viewing-modal" class="hidden fixed inset-0 z-[100] flex items-center justify-center p-4">
   <div class="absolute inset-0 bg-black/70" onclick="closeViewingModal()"></div>
   <div class="relative bg-slate-800 rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
    <button onclick="closeViewingModal()" class="absolute top-4 right-4 text-slate-400 hover:text-white" aria-label="Close"><i data-lucide="x" style="width:24px;height:24px;"></i></button>
    <h2 data-template-id="modal-heading" class="canva-text font-display font-bold mb-6" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 24px;">Schedule a Viewing</h2>
    <form id="viewing-form" class="space-y-4">
     <div><label data-template-id="modal-name-label" for="v-name" class="canva-text block text-sm mb-1" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Full Name</label><input id="v-name" type="text" required="" class="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-amber-400 focus:outline-none">
     </div>
     <div><label data-template-id="modal-email-label" for="v-email" class="canva-text block text-sm mb-1" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Email Address</label><input id="v-email" type="email" required="" class="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-amber-400 focus:outline-none">
     </div>
     <div><label data-template-id="modal-phone-label" for="v-phone" class="canva-text block text-sm mb-1" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Phone Number</label><input id="v-phone" type="tel" required="" class="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-amber-400 focus:outline-none">
     </div>
     <div><label data-template-id="modal-date-label" for="v-date" class="canva-text block text-sm mb-1" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Preferred Date</label><input id="v-date" type="date" required="" class="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-amber-400 focus:outline-none">
     </div>
     <div><label data-template-id="modal-property-label" for="v-property" class="canva-text block text-sm mb-1" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Property of Interest</label><input id="v-property" type="text" class="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-amber-400 focus:outline-none">
     </div>
     <div><label data-template-id="modal-notes-label" for="v-notes" class="canva-text block text-sm mb-1" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Additional Notes</label><textarea id="v-notes" rows="3" class="w-full px-4 py-3 rounded-lg bg-slate-700 border border-slate-600 text-white focus:border-amber-400 focus:outline-none resize-none"></textarea>
     </div><button data-template-id="modal-submit-btn" type="submit" class="canva-button w-full px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-lg hover:bg-amber-300 transition-colors" style="background: rgb(251, 191, 36); color: rgb(15, 23, 42); font-weight: 700; font-style: normal; font-size: 16px;">Request Viewing</button>
     <p id="viewing-success" class="hidden text-green-400 text-sm text-center">Viewing request sent! Opening your email client...</p>
    </form>
   </div>
  </div>
</div>
`

const escapeHtml = (value) => String(value ?? '')
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#39;')

const propertiesGrid = document.getElementById('properties-grid')
const galleryModal = document.getElementById('gallery-modal')
const viewingModal = document.getElementById('viewing-modal')
const galleryTitle = document.getElementById('gallery-title')
const galleryDescription = document.getElementById('gallery-description')
const galleryStatus = document.getElementById('gallery-status')
const galleryMain = document.getElementById('gallery-main')
const galleryThumbs = document.getElementById('gallery-thumbs')

let currentPropertyForViewing = ''

const getStatusClasses = (status) => {
  if (status === 'Sold Out') {
    return 'bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/40'
  }

  if (status === 'Pre-Selling') {
    return 'bg-amber-500/20 text-amber-200 ring-1 ring-amber-400/40'
  }

  return 'bg-emerald-500/20 text-emerald-200 ring-1 ring-emerald-400/40'
}

const renderPropertiesGrid = () => {
  if (!propertiesGrid) {
    return
  }

  const activeFilter = document.querySelector('[data-filter].active')?.dataset.filter || 'all'
  const properties = getProperties()
  const filteredProperties = activeFilter === 'all'
    ? properties
    : properties.filter((property) => property.status === activeFilter)

  propertiesGrid.innerHTML = ''

  filteredProperties.forEach((property) => {
    const previewImage = property.gallery?.[0] || 'https://images.pexels.com/photos/6493861/pexels-photo-6493861.jpeg?auto=compress&cs=tinysrgb&w=1200'
    const soldOut = property.status === 'Sold Out'
    const title = `${escapeHtml(property.title)} – ${escapeHtml(property.propertyType)}`

    propertiesGrid.insertAdjacentHTML('beforeend', `
      <button onclick="openPropertyGallery('${escapeHtml(property.id)}')" class="prop-card relative overflow-hidden rounded-[1.75rem] border border-slate-800 bg-slate-900/85 text-left shadow-xl transition-shadow duration-300 cursor-pointer">
        <div class="relative">
          <img data-template-id="${escapeHtml(property.id)}-img" loading="lazy" class="h-64 w-full object-cover" src="${escapeHtml(previewImage)}" alt="${title}">
          ${soldOut ? `
            <div class="absolute inset-0 bg-slate-950/70"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="rounded-full border border-white/30 bg-slate-950/80 px-4 py-2 text-sm font-bold tracking-[0.3em] text-white">SOLD OUT</span>
            </div>
          ` : ''}
        </div>
        <div class="p-5">
          <h3 data-template-id="${escapeHtml(property.id)}-title" class="text-xl font-bold text-white">${title}</h3>
          <p data-template-id="${escapeHtml(property.id)}-desc" class="mt-2 text-sm leading-7 text-slate-400">${escapeHtml(property.description)}</p>
          <div class="mt-4 flex items-center justify-between gap-3">
            <span class="inline-block text-amber-400 text-sm font-medium">View Gallery →</span>
            <span class="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${soldOut ? 'bg-rose-500/15 text-rose-200' : property.status === 'Pre-Selling' ? 'bg-amber-500/15 text-amber-200' : 'bg-emerald-500/15 text-emerald-200'}">${escapeHtml(property.status)}</span>
          </div>
        </div>
      </button>
    `)
  })

  if (window.lucide) {
    lucide.createIcons()
  }
}

function openPropertyGallery(propertyId) {
  const property = getProperties().find((item) => item.id === propertyId)

  if (!property) {
    return
  }

  const images = Array.isArray(property.gallery) && property.gallery.length > 0
    ? property.gallery
    : ['https://images.pexels.com/photos/6493861/pexels-photo-6493861.jpeg?auto=compress&cs=tinysrgb&w=1200']

  currentPropertyForViewing = `${property.title} – ${property.propertyType}`
  galleryTitle.textContent = currentPropertyForViewing
  galleryDescription.textContent = property.description
  galleryStatus.textContent = property.status
  galleryStatus.className = `ml-auto inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider ${getStatusClasses(property.status)}`
  galleryMain.src = images[0]
  galleryMain.alt = currentPropertyForViewing

  galleryThumbs.innerHTML = ''
  images.forEach((image, index) => {
    const thumb = document.createElement('img')
    thumb.src = image
    thumb.alt = `${currentPropertyForViewing} image ${index + 1}`
    thumb.className = 'w-full h-24 object-cover rounded cursor-pointer hover:opacity-75 transition-opacity'
    thumb.onclick = () => {
      galleryMain.src = image
    }
    galleryThumbs.appendChild(thumb)
  })

  galleryModal.classList.remove('hidden')
  galleryModal.style.opacity = '1'
  if (window.lucide) {
    lucide.createIcons()
  }
}

function closePropertyGallery() {
  galleryModal.classList.add('hidden')
}

function openViewingModal(property) {
  document.getElementById('v-property').value = property || ''
  viewingModal.classList.remove('hidden')
  viewingModal.style.opacity = '1'
}

function openViewingModalFromGallery() {
  closePropertyGallery()
  openViewingModal(currentPropertyForViewing)
}

function closeViewingModal() {
  viewingModal.classList.add('hidden')
}

window.openPropertyGallery = openPropertyGallery
window.closePropertyGallery = closePropertyGallery
window.openViewingModal = openViewingModal
window.openViewingModalFromGallery = openViewingModalFromGallery
window.closeViewingModal = closeViewingModal

document.querySelectorAll('[data-filter]').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach((item) => item.classList.remove('active'))
    button.classList.add('active')
    renderPropertiesGrid()
  })
})

document.getElementById('mobile-menu-btn').addEventListener('click', () => {
  document.getElementById('mobile-menu').classList.toggle('hidden')
})

document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const name = document.getElementById('form-name').value
  const email = document.getElementById('form-email').value
  const message = document.getElementById('form-message').value
  const subject = encodeURIComponent(`Property Inquiry from ${name}`)
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)
  window.open(`mailto:jewelvillafranca@gmail.com?subject=${subject}&body=${body}`, '_blank')
  document.getElementById('form-success').classList.remove('hidden')
  e.target.reset()
  setTimeout(() => document.getElementById('form-success').classList.add('hidden'), 5000)
})

document.getElementById('viewing-form').addEventListener('submit', (e) => {
  e.preventDefault()
  const name = document.getElementById('v-name').value
  const email = document.getElementById('v-email').value
  const phone = document.getElementById('v-phone').value
  const date = document.getElementById('v-date').value
  const property = document.getElementById('v-property').value
  const notes = document.getElementById('v-notes').value
  const subject = encodeURIComponent(`Viewing Request from ${name}`)
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Date: ${date}\nProperty: ${property}\n\nNotes:\n${notes}`)
  window.open(`mailto:jewelvillafranca@gmail.com?subject=${subject}&body=${body}`, '_blank')
  document.getElementById('viewing-success').classList.remove('hidden')
  e.target.reset()
  setTimeout(() => {
    document.getElementById('viewing-success').classList.add('hidden')
    closeViewingModal()
  }, 3000)
})

renderPropertiesGrid()
if (window.lucide) {
  lucide.createIcons()
}
