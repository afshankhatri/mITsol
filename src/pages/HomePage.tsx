import { Seo } from '@/components/Seo';
import { HeroSection } from '@/components/home/HeroSection';
import { StackedCardsSection } from '@/components/home/StackedCardsSection';
import { StatsCenterpiece } from '@/components/home/StatsCenterpiece';
import { ServicesGridSection } from '@/components/home/ServicesGridSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { TestimonialsPreviewSection } from '@/components/home/TestimonialsPreviewSection';
import { CtaSection } from '@/components/CtaSection';
import { companyInfo } from '@/data/company';
import { services } from '@/data/services';




export default function HomePage() {
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
  //   '@type': 'LocalBusiness',
  //   name: companyInfo.name,
  //   description: companyInfo.description,
  //   telephone: companyInfo.phones.map((phone) => phone.number),
  //   email: companyInfo.email,
  //   address: {
  //     '@type': 'PostalAddress',
  //     streetAddress: companyInfo.address,
  //   },
  //   foundingDate: String(companyInfo.foundedYear),
  //   makesOffer: services.map((s) => ({
  //     '@type': 'Offer',
  //     itemOffered: {
  //       '@type': 'Service',
  //       name: s.title, 
  //       description: s.summary,
  //     },
  //   })),
  // };

  return (
    <>
      <Seo
        title="Meridian InfoTech Solutions — Computer, Laptop & IT Maintenance Services"
        description={companyInfo.description}
        canonicalPath="/"
        jsonLd={jsonLd}
      />
      <HeroSection />
      <StackedCardsSection />
      <StatsCenterpiece />
      <ServicesGridSection />
      <CtaSection/>
      <WhyChooseUsSection />
      <TestimonialsPreviewSection />
      <CtaSection />

      {/* Map */}
      <section className="container-px py-12">
        <div className="overflow-hidden rounded-3xl border border-ink-200 dark:border-ink-800 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1886.6684886508688!2d72.83416793880511!3d18.960719632233328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7cf081f036933%3A0x795dd73dbc7a0b1d!2sMeridian%20Infotech%20Solutions!5e0!3m2!1sen!2sin!4v1785439109812!5m2!1sen!2sin"
            className="h-72 w-full sm:h-96"
            loading="lazy"
            title="shop location"
          />
        </div>
      </section>

    </>
  );
}




