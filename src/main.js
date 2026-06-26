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
  body { font-family: 'DM Sans', sans-serif; }
  .font-display { font-family: 'Playfair Display', serif; }
  .hero-overlay { background: linear-gradient(to bottom, rgba(15,23,42,0.5), rgba(15,23,42,0.85)); }
  .prop-card:hover { transform: translateY(-4px); }
  .prop-card { transition: transform 0.3s ease; }
  html { scroll-behavior: smooth; }
  #viewing-modal { transition: opacity 0.3s; }
  #viewing-modal.hidden { opacity: 0; pointer-events: none; }
</style>
<div data-template-id="__page-root" class="w-full min-h-screen bg-slate-900 text-white" style="background: rgb(15, 23, 42);">
  <nav class="sticky top-0 w-full z-50 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800">
   <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
    <a href="#" data-template-id="nav-brand" class="canva-text font-display font-bold text-lg" style="color: rgb(251, 191, 36); font-weight: 700; font-style: normal; font-size: 16px;">Jewel Villafranca</a>
    <div class="hidden md:flex items-center gap-8">
     <a href="#about" data-template-id="nav-about" class="canva-link text-sm hover:text-amber-400 transition-colors" style="color: rgb(226, 232, 240); font-weight: 400; font-style: normal; font-size: 16px;">About</a> <a href="#properties" data-template-id="nav-properties" class="canva-link text-sm hover:text-amber-400 transition-colors" style="color: rgb(226, 232, 240); font-weight: 400; font-style: normal; font-size: 16px;">Properties</a> <a href="#services" data-template-id="nav-services" class="canva-link text-sm hover:text-amber-400 transition-colors" style="color: rgb(226, 232, 240); font-weight: 400; font-style: normal; font-size: 16px;">Services</a> <a href="#contact" data-template-id="nav-contact" class="canva-link text-sm hover:text-amber-400 transition-colors" style="color: rgb(226, 232, 240); font-weight: 400; font-style: normal; font-size: 16px;">Contact</a>
    </div><button id="mobile-menu-btn" class="md:hidden text-white" aria-label="Open menu"><i data-lucide="menu" style="width:24px;height:24px;"></i></button>
   </div>
   <div id="mobile-menu" class="hidden md:hidden px-6 pb-4 space-y-3">
    <a href="#about" class="block text-sm hover:text-amber-400">About</a> <a href="#properties" class="block text-sm hover:text-amber-400">Properties</a> <a href="#services" class="block text-sm hover:text-amber-400">Services</a> <a href="#contact" class="block text-sm hover:text-amber-400">Contact</a>
   </div>
  </nav>
  <header class="relative w-full" style="height: calc(90 * min(var(--vh, 1vh), 1vh));">
   <img data-template-id="hero-image" loading="lazy" class="canva-image absolute inset-0 w-full h-full object-cover" src="https://images.pexels.com/photos/6493861/pexels-photo-6493861.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=1920" alt="Breathtaking aerial view of Tagaytay's lush highlands and winding roads overlooking Taal Lake">
   <div class="hero-overlay absolute inset-0 flex flex-col items-center justify-center text-center px-6">
    <p data-template-id="hero-tagline" class="canva-text uppercase tracking-[0.25em] text-sm mb-4" style="color: rgb(251, 191, 36); font-weight: 500; font-style: normal; font-size: 14px;">Tagaytay Highlands</p>
    <h1 data-template-id="hero-title" class="canva-text font-display font-bold max-w-3xl leading-tight" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 48px;">Your Dream Property Awaits in Tagaytay</h1>
    <p data-template-id="hero-subtitle" class="canva-text mt-6 max-w-xl opacity-90" style="color: rgb(226, 232, 240); font-weight: 400; font-style: normal; font-size: 18px;">Exclusive lots, homes, and condominiums curated by your trusted highlands specialist.</p><button data-template-id="hero-cta" onclick="openViewingModal('')" class="canva-button mt-8 inline-block px-8 py-3 border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 transition-colors font-medium tracking-wide" style="color: rgb(251, 191, 36); font-weight: 500; font-style: normal; font-size: 16px;">Schedule a Viewing</button>
   </div>
  </header>
  <main>
   <section id="about" class="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
    <img data-template-id="agent-portrait" loading="lazy" class="canva-image w-full max-w-sm mx-auto rounded-lg shadow-2xl aspect-[3/4] object-cover" src="canva://MAHNWzUGNqE/1" alt="699431026_1446534424154932_6118603240397610858_n.jpg">
    <div>
     <h2 data-template-id="about-heading" class="canva-text font-display font-bold mb-4" style="color: rgb(251, 191, 36); font-weight: 700; font-style: normal; font-size: 24px;">About Me</h2>
     <p data-template-id="about-name" class="canva-text font-bold mb-1" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 18px;">JEWEL B. VILLAFRANCA</p>
     <p data-template-id="about-title" class="canva-text mb-4 opacity-75" style="color: rgb(251, 191, 36); font-weight: 500; font-style: normal; font-size: 16px;">Property Specialist</p>
     <p data-template-id="about-text" class="canva-text leading-relaxed opacity-85" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">With years of dedicated experience in Tagaytay Highlands real estate, I help clients find their perfect property — whether it's a serene weekend retreat, a sound investment lot, or a luxury residence with breathtaking views of Taal Lake.</p>
     <p data-template-id="about-text-2" class="canva-text mt-4 leading-relaxed opacity-85" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">From site visits to paperwork, I provide end-to-end guidance so you can focus on envisioning your new life in the highlands.</p>
     <p data-template-id="about-address" class="canva-text mt-6 text-sm opacity-60" style="color: rgb(148, 163, 184); font-weight: 400; font-style: normal; font-size: 16px;">📍 4120 Brgy. Calabuso, Tagaytay City, Cavite, Philippines</p>
    </div>
   </section>
   <section id="services" data-template-id="services-section" class="canva-section py-20 px-6" style="background: rgb(30, 41, 59);">
    <div class="max-w-6xl mx-auto">
     <h2 data-template-id="services-heading" class="canva-text font-display font-bold text-center mb-12" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 24px;">My Services</h2>
     <div class="grid md:grid-cols-3 gap-8">
      <div data-template-id="service-1-card" class="canva-card rounded-xl overflow-hidden" style="background: rgb(15, 23, 42);">
       <img data-template-id="service-1-img" loading="lazy" class="canva-image w-full h-44 object-cover" src="https://images.pexels.com/photos/7578899/pexels-photo-7578899.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800" alt="Two real estate professionals shaking hands in front of a new home">
       <div class="p-6 text-center">
        <h3 data-template-id="service-1-title" class="canva-text font-bold mb-2" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 19px;">Property Buying</h3>
        <p data-template-id="service-1-desc" class="canva-text text-sm opacity-75" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Find your perfect home, lot, or condo in Tagaytay Highlands with personalized property matching.</p><a href="#contact" class="inline-block mt-4 text-amber-400 text-sm font-medium hover:underline">Inquire Now →</a>
       </div>
      </div>
      <div data-template-id="service-2-card" class="canva-card rounded-xl overflow-hidden" style="background: rgb(15, 23, 42);">
       <img data-template-id="service-2-img" loading="lazy" class="canva-image w-full h-44 object-cover" src="https://images.pexels.com/photos/7731330/pexels-photo-7731330.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800" alt="Professional meeting discussing business agreements with laptops and documents">
       <div class="p-6 text-center">
        <h3 data-template-id="service-2-title" class="canva-text font-bold mb-2" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 19px;">Investment Advisory</h3>
        <p data-template-id="service-2-desc" class="canva-text text-sm opacity-75" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Get expert guidance on property investments with high appreciation potential in the highlands.</p><a href="#contact" class="inline-block mt-4 text-amber-400 text-sm font-medium hover:underline">Inquire Now →</a>
       </div>
      </div>
      <div data-template-id="service-3-card" class="canva-card rounded-xl overflow-hidden" style="background: rgb(15, 23, 42);">
       <img data-template-id="service-3-img" loading="lazy" class="canva-image w-full h-44 object-cover" src="https://images.pexels.com/photos/8293778/pexels-photo-8293778.jpeg?auto=compress&amp;cs=tinysrgb&amp;w=800" alt="Close-up of a realtor handing over a house key to a new homeowner">
       <div class="p-6 text-center">
        <h3 data-template-id="service-3-title" class="canva-text font-bold mb-2" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 19px;">Documentation Support</h3>
        <p data-template-id="service-3-desc" class="canva-text text-sm opacity-75" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Seamless assistance with contracts, titles, and all paperwork from reservation to turnover.</p><a href="#contact" class="inline-block mt-4 text-amber-400 text-sm font-medium hover:underline">Inquire Now →</a>
       </div>
      </div>
     </div>
    </div>
   </section>
   <section id="properties" data-template-id="properties-section" class="canva-section py-20 px-6" style="background: rgb(15, 23, 42);">
    <div class="max-w-6xl mx-auto">
     <h2 data-template-id="properties-heading" class="canva-text font-display font-bold text-center mb-12" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 24px;">Featured Properties</h2>
     <div id="properties-grid" class="grid md:grid-cols-3 gap-8"></div>
    </div>
   </section>
   <section id="contact" data-template-id="contact-section" class="canva-section py-20 px-6" style="background: rgb(30, 41, 59);">
    <div class="max-w-4xl mx-auto">
     <h2 data-template-id="contact-heading" class="canva-text font-display font-bold text-center mb-4" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 24px;">Ready to Invest in Tagaytay?</h2>
     <p data-template-id="contact-text" class="canva-text text-center opacity-85 mb-10" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Let's find the perfect property for you. Reach out today for a no-obligation consultation.</p>
     <div class="grid md:grid-cols-2 gap-10">
      <div class="space-y-5">
       <h3 data-template-id="contact-info-heading" class="canva-text font-bold mb-4" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 19px;">Get In Touch</h3><a href="viber://chat?number=639750541424" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-5 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"><i data-lucide="phone" style="width:20px;height:20px;color:#fbbf24;"></i><span data-template-id="contact-phone-1" class="canva-text" style="color: rgb(226, 232, 240); font-weight: 400; font-style: normal; font-size: 16px;">0975 054 1424 (Viber)</span></a> <a href="viber://chat?number=639933684179" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-5 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"><i data-lucide="message-circle" style="width:20px;height:20px;color:#fbbf24;"></i><span data-template-id="contact-phone-2" class="canva-text" style="color: rgb(226, 232, 240); font-weight: 400; font-style: normal; font-size: 16px;">0993 368 4179 (Viber)</span></a> <a href="mailto:jewelvillafranca@gmail.com" target="_blank" rel="noopener noreferrer" class="flex items-center gap-3 px-5 py-3 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"><i data-lucide="mail" style="width:20px;height:20px;color:#fbbf24;"></i><span data-template-id="contact-email" class="canva-text" style="color: rgb(251, 191, 36); font-weight: 400; font-style: normal; font-size: 16px;">jewelvillafranca@gmail.com</span></a>
       <div class="flex items-center gap-3 px-5 py-3 bg-slate-800 rounded-lg"><i data-lucide="map-pin" style="width:20px;height:20px;color:#fbbf24;"></i><span data-template-id="contact-address" class="canva-text text-sm" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">4120 Brgy. Calabuso, Tagaytay City, Cavite, Philippines</span>
       </div>
      </div>
      <form id="contact-form" class="space-y-4">
       <div><label data-template-id="form-name-label" for="form-name" class="canva-text block text-sm mb-1" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Your Name</label><input id="form-name" type="text" required="" class="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-amber-400 focus:outline-none">
       </div>
       <div><label data-template-id="form-email-label" for="form-email" class="canva-text block text-sm mb-1" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Your Email</label><input id="form-email" type="email" required="" class="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-amber-400 focus:outline-none">
       </div>
       <div><label data-template-id="form-message-label" for="form-message" class="canva-text block text-sm mb-1" style="color: rgb(203, 213, 225); font-weight: 400; font-style: normal; font-size: 16px;">Your Message</label><textarea id="form-message" rows="4" required="" class="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-white focus:border-amber-400 focus:outline-none resize-none"></textarea>
       </div><button data-template-id="form-submit-btn" type="submit" class="canva-button w-full px-6 py-3 bg-amber-400 text-slate-900 font-bold rounded-lg hover:bg-amber-300 transition-colors" style="background: rgb(251, 191, 36); color: rgb(15, 23, 42); font-weight: 700; font-style: normal; font-size: 16px;">Send Message</button>
       <p id="form-success" class="hidden text-green-400 text-sm text-center mt-2">Message sent! Opening your email client...</p>
      </form>
     </div>
    </div>
   </section>
  </main>
  <footer class="text-center py-8 border-t border-slate-800">
   <p data-template-id="footer-text" class="canva-text text-sm opacity-50" style="color: rgb(100, 116, 139); font-weight: 400; font-style: normal; font-size: 16px;">© 2026 Carsheene Jewel B. Villafranca — Tagaytay Highlands Property Specialist</p>
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

  const properties = getProperties()
  propertiesGrid.innerHTML = ''

  properties.forEach((property) => {
    const previewImage = property.gallery?.[0] || 'https://images.pexels.com/photos/6493861/pexels-photo-6493861.jpeg?auto=compress&cs=tinysrgb&w=1200'
    const soldOut = property.status === 'Sold Out'
    const title = `${escapeHtml(property.title)} – ${escapeHtml(property.propertyType)}`

    propertiesGrid.insertAdjacentHTML('beforeend', `
      <button onclick="openPropertyGallery('${escapeHtml(property.id)}')" class="prop-card relative rounded-xl overflow-hidden bg-slate-800 shadow-xl text-left hover:shadow-2xl transition-shadow duration-300 cursor-pointer">
        <div class="relative">
          <img data-template-id="${escapeHtml(property.id)}-img" loading="lazy" class="canva-image w-full h-56 object-cover" src="${escapeHtml(previewImage)}" alt="${title}">
          ${soldOut ? `
            <div class="absolute inset-0 bg-slate-950/70"></div>
            <div class="absolute inset-0 flex items-center justify-center">
              <span class="rounded-full border border-white/30 bg-slate-950/80 px-4 py-2 text-sm font-bold tracking-[0.3em] text-white">SOLD OUT</span>
            </div>
          ` : ''}
        </div>
        <div class="p-5">
          <h3 data-template-id="${escapeHtml(property.id)}-title" class="canva-text font-bold" style="color: rgb(255, 255, 255); font-weight: 700; font-style: normal; font-size: 19px;">${title}</h3>
          <p data-template-id="${escapeHtml(property.id)}-desc" class="canva-text mt-2 text-sm opacity-75" style="color: rgb(148, 163, 184); font-weight: 400; font-style: normal; font-size: 16px;">${escapeHtml(property.description)}</p>
          <div class="mt-3 flex items-center justify-between gap-3">
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
