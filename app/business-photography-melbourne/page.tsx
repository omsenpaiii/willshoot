import Link from "next/link";
import { pageMetadata, SITE_URL } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

const path = "/business-photography-melbourne";
export const metadata = pageMetadata(
  "Business Photography & Video Shoots Melbourne | WillShoot",
  "Melbourne business photography and video shoots for teams, workplaces, products, properties, and social media. Plan your brand shoot with WillShoot.",
  path,
);

const services = [
  { title: "Business & workplace photography", description: "Show customers your space, people, and day-to-day work with professional images for your website and social channels." },
  { title: "Team portraits & headshots", description: "Introduce the people behind your business with coordinated team photos and professional headshots." },
  { title: "Brand videos & business reels", description: "Bring your story to life through promotional videos, founder interviews, and short-form content for Instagram and Facebook." },
  { title: "Product & property content", description: "Showcase products, details, interiors, and properties with photography and video tailored to your brief." },
];

export default function BusinessPhotographyPage() {
  return (
    <>
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${SITE_URL}${path}#service`,
        name: "Business photography and video shoots in Melbourne",
        serviceType: "Business photography and video production",
        url: `${SITE_URL}${path}`,
        provider: { "@id": `${SITE_URL}/#organization` },
        areaServed: { "@type": "City", name: "Melbourne" },
        description: "Photography and video for business teams, workplaces, products, properties, and social media content.",
      }} />
      <section className="bg-brand-pure-black text-brand-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-6">
          <nav aria-label="Breadcrumb" className="text-sm text-brand-white/70">
            <Link href="/services" className="underline underline-offset-4 hover:text-brand-white">Services</Link>
            <span aria-hidden="true"> / </span><span>Melbourne business shoots</span>
          </nav>
          <p className="text-xs uppercase tracking-widest text-brand-red font-bold">Your business, in focus</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">Business Photography &amp; Video Shoots in Melbourne</h1>
          <p className="text-brand-white/70 text-lg leading-relaxed">Professional visuals for the people, products, and spaces behind your brand. WillShoot helps Melbourne businesses create photography, brand films, and reels for their websites, social media, and advertising.</p>
          <Link href="/contact?interest=photography" className="inline-block px-8 py-3.5 bg-brand-red text-brand-white rounded-full font-bold hover:bg-brand-red/90">Plan Your Business Shoot</Link>
        </div>
      </section>
      <section className="py-16 md:py-24 bg-brand-white">
        <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">Looking for a business photographer near you?</h2>
            <p className="text-brand-dark-gray leading-relaxed">We are based in Melbourne and available for shoots across nearby areas. Share your suburb, preferred date, and what you would like to capture, and we will confirm availability, travel arrangements, and a quote before you book.</p>
            <p className="text-brand-dark-gray leading-relaxed">Whether you need fresh website images, content for a launch, or a library of social media reels, we start with your brief and agree on the deliverables that suit your business.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {services.map((service) => (
              <article key={service.title} className="bg-brand-soft-white rounded-2xl border border-brand-light-gray p-8 space-y-4">
                <h3 className="text-xl font-bold">{service.title}</h3>
                <p className="text-brand-dark-gray leading-relaxed">{service.description}</p>
              </article>
            ))}
          </div>
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl font-bold tracking-tight">From the first brief to the final edit</h2>
            <ol className="list-decimal pl-5 space-y-3 text-brand-dark-gray leading-relaxed">
              <li>Tell us about your business, audience, location, and where you will use the content.</li>
              <li>We agree on the shot list, deliverables, schedule, and quote before confirming the shoot.</li>
              <li>We capture your content and edit it according to the agreed brief, with revisions as outlined in your quote.</li>
            </ol>
          </div>
          <div className="space-y-6 border-t border-brand-light-gray pt-10">
            <h2 className="text-3xl font-bold tracking-tight">Questions before you book</h2>
            <div className="space-y-2"><h3 className="text-lg font-bold">How much does a business shoot cost?</h3><p className="text-brand-dark-gray leading-relaxed">Pricing depends on the location, shoot time, and photography or video deliverables. Send us your brief for a custom quote.</p></div>
            <div className="space-y-2"><h3 className="text-lg font-bold">Can we combine photography and video?</h3><p className="text-brand-dark-gray leading-relaxed">Yes. We can plan a shoot that captures photos and videos together. We will confirm the scope and schedule with you before booking.</p></div>
            <div className="space-y-2"><h3 className="text-lg font-bold">Where can we see your work?</h3><p className="text-brand-dark-gray leading-relaxed">Visit our <Link href="/work" className="underline underline-offset-4 hover:text-brand-red">recent work</Link> to watch real shoots from our Instagram account.</p></div>
            <Link href="/contact?interest=videography" className="inline-block px-8 py-3.5 bg-brand-red text-brand-white rounded-full font-bold hover:bg-brand-red/90">Request a Quote</Link>
          </div>
        </div>
      </section>
    </>
  );
}
