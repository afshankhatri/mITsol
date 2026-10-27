import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Seo } from '@/components/Seo';
import { PageHeader } from '@/components/PageHeader';
import { companyInfo } from '@/data/company';
import { sitemapSections } from '@/generated/sitemap-data';

export default function SitemapPage() {
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.meridianinfotechsolutions.in/#business",
    "name": "Meridian InfoTech Solutions",
    "description": "Meridian InfoTech Solutions is an established computer and IT maintenance service provider with over a decade of experience. We serve individuals and businesses with comprehensive IT services — from laptop and computer repair to AMC contracts, refurbished device sales, and responsible e-waste management.",
    "url": "https://www.meridianinfotechsolutions.in/",
    "logo": "https://www.meridianinfotechsolutions.in/logo.webp/",
    "image": "https://www.meridianinfotechsolutions.in/logo.webp/",
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
  //   '@type': 'CollectionPage',
  //   name: `HTML Sitemap - ${companyInfo.name}`,
  //   description:
  //     'An index of the most important public pages on Meridian InfoTech Solutions, organized by section for easy browsing and search engine discovery.',
  //   url: 'https://www.meridianinfotechsolutions.in/sitemap',
  // };

  return (
    <>
      <Seo
        title="HTML Sitemap"
        description="Browse the most important public pages on Meridian InfoTech Solutions, organized into clear sections for services, company pages, locations, and specialized SEO pages."
        canonicalPath="/sitemap/"
        jsonLd={jsonLd}
      />

      <PageHeader
        label="HTML Sitemap"
        title={<>A clear map of the site, organized for people and crawlers.</>}
        description="Use this page to quickly find our main service pages, company information, branch locations, and SEO landing pages."
        crumbs={[{ label: 'Sitemap' }]}
      />

      <section className="container-px py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {sitemapSections.map((section) => (
            <article
              key={section.key}
              className="rounded-3xl border border-ink-200 dark:border-ink-800 bg-white dark:bg-ink-900 p-6 shadow-sm"
            >
              <h2 className="text-lg font-700 text-ink-900 dark:text-ink-50">{section.label}</h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-500 dark:text-ink-400">
                {section.description}
              </p>

              {'links' in section && section.links && (
                <ul className="mt-5 space-y-3">
                  {section.links.map((page) => (
                    <li key={page.to}>
                      <Link
                        to={page.to}
                        className="group flex items-center justify-between gap-3 text-sm text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400"
                      >
                        <span>{page.label}</span>
                        <ChevronRight className="h-4 w-4 shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 dark:text-ink-700" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {'subsections' in section && section.subsections && (
                <div className="mt-5 space-y-5">
                  {section.subsections.map((group) => (
                    <section key={group.key} aria-labelledby={`sitemap-${group.key}`}>
                      <h3 id={`sitemap-${group.key}`} className="text-sm font-700 text-ink-900 dark:text-ink-50">
                        {group.label}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-ink-500 dark:text-ink-400">
                        {group.description}
                      </p>
                      <ul className="mt-3 space-y-3">
                        {group.links.map((page) => (
                          <li key={page.to}>
                            <Link
                              to={page.to}
                              className="group flex items-center justify-between gap-3 text-sm text-ink-600 transition-colors hover:text-brand-600 dark:text-ink-300 dark:hover:text-brand-400"
                            >
                              <span>{page.label}</span>
                              <ChevronRight className="h-4 w-4 shrink-0 text-ink-300 transition-transform group-hover:translate-x-0.5 dark:text-ink-700" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
