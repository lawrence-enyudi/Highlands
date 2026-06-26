const STORAGE_KEY = 'highlands_properties'

const defaultProperties = [
  {
    id: 'woodlands-house-lot',
    title: 'The Woodlands',
    propertyType: 'House & Lot',
    description: '3BR modern home, 450 sqm',
    status: 'Available',
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
    return [...defaultProperties]
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties))
    return [...defaultProperties]
  }

  try {
    const parsed = JSON.parse(stored)
    return Array.isArray(parsed) ? parsed : [...defaultProperties]
  } catch {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultProperties))
    return [...defaultProperties]
  }
}

const writeStoredProperties = (properties) => {
  if (!canUseLocalStorage()) {
    return false
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(properties))
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
  const nextProperty = {
    ...property,
    id: property?.id ?? createUniqueId(),
  }

  properties.push(nextProperty)
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