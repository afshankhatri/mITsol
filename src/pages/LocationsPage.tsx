import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Clock, ArrowRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/PageHeader';
import { CtaSection } from '@/components/CtaSection';
import { locations } from '@/data/locations';

export default function LocationsPage() {

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.meridianinfotechsolutions.in/#business",
    "name": "Meridian InfoTech Solutions",
    "description": "Meridian InfoTech Solutions is an established computer and IT maintenance service provider with over a decade of experience. We serve individuals and businesses with comprehensive IT services — from laptop and computer repair to AMC contracts, refurbished device sales, and responsible e-waste management.",
    "url": "https://www.meridianinfotechsolutions.in/",
    "logo": "https://www.meridianinfotechsolutions.in/logo.webp/",
    "image": "https://www.meridianinfotechsolutions.in/logo.webp",
    "telephone": ["+918689868720", "+919152549454", "+919930919588"],
    "email": "help@meridianinfotechsolutions.in",
    "foundingDate": "2018",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "4, Mezzanine Floor, Plot 133, Arafat Palace, Nawroji Hill Road, 1st Road, Chinch Bunder",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400009",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 18.960719632233328,
      "longitude": 72.83416793880511
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://www.facebook.com/people/Meridian-InfoTech-Solutions/61592486051081/",
      "https://www.instagram.com/meridianinfotechsolutions_/",
      "https://www.linkedin.com/company/meridian-infotech-solutions/",
      "https://x.com/m_it_sol"
    ],
    "makesOffer": [
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Laptop Repair & Maintenance", "description": "Screen replacements, keyboard fixes, battery swaps, charging port repairs, and full diagnostics for all laptop brands."}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Computer Maintenance & Repair", "description": "Hardware upgrades, virus removal, performance tuning, and full diagnostics for desktop PCs and all-in-ones."}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Annual Maintenance Contracts (AMC)", "description": "Comprehensive annual maintenance contracts for businesses covering all computers, laptops, and IT infrastructure."}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Used & Refurbished Device Sales", "description": "Buy and sell quality-tested refurbished laptops and computers with warranty at unbeatable prices."}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Tablet Repair Services", "description": "Screen replacements, battery repairs, charging port fixes, and software support for all tablet brands."}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Android Device Services", "description": "Screen replacement, battery repair, charging port fixes, software flashing, and data recovery for Android devices."}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "iOS Device Services", "description": "iPhone screen and battery replacement, charging port repair, and software support by experienced technicians."}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Computer Hardware Support", "description": "Hard drive and SSD upgrades, RAM expansion, GPU installation, motherboard diagnostics, and component-level repair."}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Software & IT Support", "description": "Operating system installation, virus and malware removal, software troubleshooting, and general IT support."}},
      {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "E-Waste Management", "description": "Environmentally responsible collection and recycling of old computers, laptops, and electronic waste."}}
    ]
  }

  // const jsonLd = {
  //   '@context': 'https://schema.org',
  //   '@type': 'ItemList',
  //   itemListElement: locations.map((l, i) => ({
  //     '@type': 'ListItem',
  //     position: i + 1,
  //     item: {
  //       '@type': 'Place',
  //       name: l.name,
  //       address: l.address,
  //       url: `https://www.meridianinfotechsolutions.in/locations/${l,
  //     },
  //   })),
  // };

  return (
    <>
      <Seo
        title="Our Locations — Find a Branch Near You"
        description="Meridian InfoTech Solutions has multiple branches to serve you better. Find the location nearest to you with full contact details, hours, and services."
        canonicalPath="/locations/"
        jsonLd={jsonLd}
      />

      <PageHeader
        label="Locations"
        title={<>Find us <span className="text-gradient">near you</span></>}
        description="With multiple branches across the region, expert IT service is never far away. Visit any of our locations for a free diagnostic."
        crumbs={[{ label: 'Locations' }]}
      />

      <section className="container-px py-16">
        <div className="grid gap-6 lg:grid-cols-3">
          {locations.map((loc, i) => (
            <motion.div
              key={loc.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/locations/${loc.slug}/`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-ink-900/5 hover:-translate-y-1"
              >
                {/* Map preview */}
                <div className="relative h-44 overflow-hidden bg-ink-100 dark:bg-ink-800">
                  <iframe
                    src={loc.mapEmbed}
                    className="h-full w-full grayscale transition-all duration-500 group-hover:grayscale-0"
                    loading="lazy"
                    title={`Map of ${loc.name}`}
                  />
                  <div className="absolute inset-0 bg-ink-900/10 transition-opacity group-hover:bg-transparent" />
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full glass-strong px-3 py-1.5 text-xs font-700 text-ink-900 dark:text-ink-50">
                    <MapPin className="h-3.5 w-3.5 text-brand-500" />
                    {loc.shortName}
                  </div>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-700 text-ink-900 dark:text-ink-50">{loc.name}</h3>
                  <p className="mt-1 text-sm text-brand-600 dark:text-brand-400">{loc.tagline}</p>

                  <div className="mt-4 space-y-2.5 text-sm text-ink-500 dark:text-ink-400">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span>{loc.phone}</span>
                    </div>
                    <div className="flex items-start gap-2.5">
                      <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-500" />
                      <span>{loc.hours}</span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center gap-1.5 text-sm font-700 text-ink-700 dark:text-ink-200 transition-colors group-hover:text-brand-600 dark:group-hover:text-brand-400">
                    View branch details
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CtaSection
        title="Not sure which branch to visit?"
        description="Contact us and we will direct you to the nearest location that can best serve your needs."
      />
    </>
  );
}
