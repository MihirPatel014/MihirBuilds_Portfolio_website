export const SITE_URL = 'https://www.mihirbuilds.com';

export const BUSINESS = {
  name: 'MihirBuilds',
  legalName: 'MihirBuilds',
  email: 'mihirbuilds@gmail.com',
  tagline: 'WhatsApp, Email & Workflow Automation',
  whatsapp: {
    number: '919054576359',
    defaultMessage:
      "Hi MihirBuilds, I'd like to know more about your WhatsApp, email and workflow automation services.",
  },
  address: {
    street: '',
    locality: 'Surat',
    region: 'Gujarat',
    country: 'IN',
    countryName: 'India',
    coordinates: {
      latitude: 21.1702,
      longitude: 72.8311,
    },
  },
  mapEmbedUrl:
    'https://www.google.com/maps?q=Surat%2C%20Gujarat%2C%20India&z=11&hl=en&output=embed',
  mapDirectionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Surat%2C%20Gujarat%2C%20India',
  mapPlaceUrl: 'https://www.google.com/maps/search/?api=1&query=Surat%2C%20Gujarat%2C%20India',
  businessHours: 'Monday - Sunday: 9:00 AM - 6:00 PM IST',
  geoTimezone: 'Asia/Kolkata',
} as const;

export const LOCATION_LABEL = `${BUSINESS.address.locality}, ${BUSINESS.address.region}, ${BUSINESS.address.countryName}`;

export const WHATSAPP_LINK = `https://wa.me/${BUSINESS.whatsapp.number}?text=${encodeURIComponent(
  BUSINESS.whatsapp.defaultMessage
)}`;

export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#organization`,
  name: BUSINESS.name,
  url: SITE_URL,
  email: BUSINESS.email,
  description:
    'MihirBuilds helps businesses automate WhatsApp, email, lead management and repetitive workflows with custom automation solutions.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.address.locality,
    addressRegion: BUSINESS.address.region,
    addressCountry: BUSINESS.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: BUSINESS.address.coordinates.latitude,
    longitude: BUSINESS.address.coordinates.longitude,
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: BUSINESS.email,
      url: WHATSAPP_LINK,
      availableLanguage: ['English', 'Gujarati', 'Hindi'],
    },
  ],
  areaServed: 'Worldwide',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '09:00',
      closes: '18:00',
    },
  ],
};