const STORAGE_KEY = 'highlands_properties'

const defaultProperties = [
  {
    id: 'woodlands-house-lot',
    title: 'The Woodlands',
    propertyType: 'House & Lot',
    description: '3BR modern home, 450 sqm',
    status: 'Available',
    price: '₱18,500,000',
    blockLot: 'Block 8, Lot 12',
    paymentTerms: 'Cash, bank financing, or in-house',
    promos: [
      {
        title: 'Early Bird',
        discountPercent: 10,
        expiresAt: '2026-06-30',
      },
      {
        title: 'Summer Offer',
        discountPercent: 5,
        expiresAt: '2026-07-15',
      },
    ],
    gallery: [
      'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
  {
    id: 'suites-condominium',
    title: 'The Suites',
    propertyType: 'Condominium',
    description: '1BR unit with balcony',
    status: 'Pre-Selling',
    price: '₱9,800,000',
    blockLot: 'Tower B, Unit 1708',
    paymentTerms: 'Cash or bank financing',
    promos: [
      {
        title: 'Reserve Now',
        discountPercent: 8,
        expiresAt: '2026-06-30',
      },
      {
        title: 'Launch Promo',
        discountPercent: 4,
        expiresAt: '2026-07-10',
      },
    ],
    gallery: [
      'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
  {
    id: 'greenlands-residential-lot',
    title: 'Greenlands',
    propertyType: 'Residential Lot',
    description: '300 sqm corner lot',
    status: 'Available',
    price: '₱7,250,000',
    blockLot: 'Block 3, Lot 4',
    paymentTerms: 'Cash or flexible terms',
    gallery: [
      'https://images.pexels.com/photos/158229/garden-flowers-wooden-house-architecture-158229.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
  {
    id: 'highland-villas-pool-villa',
    title: 'Highland Villas',
    propertyType: 'Pool Villa',
    description: '4BR luxury villa, 600 sqm',
    status: 'Available',
    price: '₱28,900,000',
    blockLot: 'Phase 2, Villa 6',
    paymentTerms: 'Cash, bank financing, or staged payment',
    gallery: [
      'https://images.pexels.com/photos/1001965/pexels-photo-1001965.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/259954/pexels-photo-259954.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/1743231/pexels-photo-1743231.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
  {
    id: 'midlands-townhouse',
    title: 'Midlands Townhouse',
    propertyType: 'Townhouse',
    description: '2-storey end-unit, 3BR',
    status: 'Available',
    price: '₱13,700,000',
    blockLot: 'Block 5, Lot 2',
    paymentTerms: 'Bank financing preferred',
    gallery: [
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1600',
      'https://images.pexels.com/photos/280229/pexels-photo-280229.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
  {
    id: 'sky-suite-penthouse',
    title: 'Sky Suite',
    propertyType: 'Penthouse',
    description: 'Top-floor 2BR',
    status: 'Sold Out',
    price: '₱21,400,000',
    blockLot: 'Tower C, Penthouse 2',
    paymentTerms: 'Sold out',
    gallery: [
      'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/271667/pexels-photo-271667.jpeg?auto=compress&cs=tinysrgb&w=1200',
      'https://images.pexels.com/photos/323776/pexels-photo-323776.jpeg?auto=compress&cs=tinysrgb&w=1200',
    ],
  },
]

const canUseLocalStorage = () => {
  try {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
  } catch {
    return false
  }
}

const readStoredProperties = () => {
  if (!canUseLocalStorage()) {
    return defaultProperties.map((property) => normalizeProperty(property))
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties))
    return defaultProperties.map((property) => normalizeProperty(property))
  }

  try {
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed)
      ? parsed.map((property) => normalizeProperty(property))
      : defaultProperties.map((property) => normalizeProperty(property))
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties))
    return defaultProperties.map((property) => normalizeProperty(property))
  }
}

function normalizePromo(promo) {
  if (!promo || typeof promo !== 'object') {
    return null
  }

  const discountPercent = Number(promo.discountPercent ?? promo.discount ?? 0)
  const expiresAt = String(promo.expiresAt ?? promo.endsAt ?? '').trim()

  if (!discountPercent || !expiresAt) {
    return null
  }

  return {
    title: String(promo.title ?? '').trim() || `${discountPercent}% OFF`,
    discountPercent,
    expiresAt,
  }
}

function normalizeProperty(property) {
  const source = property && typeof property === 'object' ? property : {}

  return {
    status: 'Available',
    gallery: [],
    promos: [],
    price: '',
    blockLot: '',
    paymentTerms: '',
    ...source,
    gallery: Array.isArray(source.gallery) ? source.gallery.filter(Boolean) : [],
    promos: Array.isArray(source.promos)
      ? source.promos.map(normalizePromo).filter(Boolean).slice(0, 2)
      : [],
  }
}

const writeStoredProperties = (properties) => {
  if (!canUseLocalStorage()) {
    return false
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(properties.map((property) => normalizeProperty(property))))
  return true
}

const createUniqueId = () => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }

  return `property-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

export const getProperties = () => readStoredProperties()

export const saveProperty = (property) => {
  const properties = readStoredProperties()
  const nextProperty = normalizeProperty({
    ...property,
    id: property?.id ?? createUniqueId(),
  })
  const existingIndex = properties.findIndex((item) => item.id === nextProperty.id)

  if (existingIndex >= 0) {
    properties[existingIndex] = nextProperty
  } else {
    properties.push(nextProperty)
  }

  return writeStoredProperties(properties)
}

export const deleteProperty = (id) => {
  const properties = readStoredProperties()
  const nextProperties = properties.filter((property) => property.id !== id)
  return writeStoredProperties(nextProperties)
}

export const updatePropertyStatus = (id, newStatus) => {
  const properties = readStoredProperties()
  const targetProperty = properties.find((property) => property.id === id)

  if (!targetProperty) {
    return false
  }

  targetProperty.status = newStatus
  return writeStoredProperties(properties)
}

if (canUseLocalStorage()) {
  readStoredProperties()
}

if (typeof window !== 'undefined') {
  window.getProperties = getProperties
  window.saveProperty = saveProperty
  window.deleteProperty = deleteProperty
  window.updatePropertyStatus = updatePropertyStatus
}