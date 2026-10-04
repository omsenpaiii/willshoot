import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms & Conditions | WillShoot",
  description: "Terms for using WillShoot's website and creative services, including bookings, payments, cancellations, and refunds.",
};

const terms = [
  {
    id: "agreement",
    title: "Using our website and services",
    paragraphs: [
      "These terms apply to the WillShoot website and our video production, photography, social media, and digital marketing services. Please review these terms, including our strict no-refund policy, before accepting a quote, confirming a booking, signing an agreement, or making any payment. By proceeding with a booking or payment, you acknowledge that you have read and accepted these terms.",
      "Your accepted quote or written service agreement sets out the details of your project. Any specifically agreed project terms take priority over these general terms where they differ.",
    ],
  },
  {
    id: "bookings",
    title: "Bookings, scope, and payments",
    paragraphs: [
      "Bookings are confirmed once we agree on the scope in writing and receive any payment required by your quote. Deliverables, fees, payment dates, and any deposit will be specified in that quote or agreement.",
      "Additional shoot time, revisions, travel, advertising spend, or work outside the agreed scope may incur additional fees. We will discuss and obtain your approval for those costs before proceeding. Please pay invoices by their stated due dates.",
    ],
  },
  {
    id: "refunds",
    title: "Cancellations, rescheduling, and refunds",
    paragraphs: [
      "Every project begins with time, care, and resources reserved especially for you. To honour that commitment, WillShoot maintains a strict no-refund policy. All payments, including deposits, instalments, and payments made in full, are final and non-refundable under any circumstances. We kindly ask that you feel comfortable with your project requirements and these terms before making a payment, and we appreciate your understanding.",
      "If your plans change, please contact us as early as possible. We will do our best to explore a suitable alternative date, subject to availability and any costs discussed and agreed with you. Rescheduling is not guaranteed.",
      "Your requirements matter to us, and we are happy to work with you to fulfil the agreed brief. If something needs attention, please let us know so we can discuss revisions, adjustments, or a suitable alternative within the agreed scope. If we are unable to meet a particular requirement, we will work with you to explore an alternative way forward. Our approach is to resolve concerns through continued service and collaboration; refunds will not be issued, including for cancellations, changes of mind, dissatisfaction, or requirements we are unable to fulfil.",
    ],
  },
  {
    id: "responsibilities",
    title: "Your responsibilities",
    paragraphs: [
      "Please provide accurate briefs, timely feedback, and the access, materials, and approvals needed for your project. You are responsible for obtaining permission to use any materials you supply and arranging necessary location access and participant consent unless we agree otherwise.",
      "Delays in receiving information or approvals may affect delivery dates. We will communicate any resulting changes to the schedule or scope with you.",
    ],
  },
  {
    id: "delivery",
    title: "Delivery, revisions, and results",
    paragraphs: [
      "Delivery dates and included revision rounds will be agreed for each project. Changes to the brief or requests beyond the agreed revisions may require a revised timeline and quote.",
      "We aim to create thoughtful, high-quality work aligned with your brief. Marketing performance depends on factors such as audience, budget, and platform behaviour, so we do not promise a specific number of views, leads, sales, or returns.",
    ],
  },
  {
    id: "ownership",
    title: "Content and intellectual property",
    paragraphs: [
      "Ownership and permitted use of final deliverables will be set out in your quote or written agreement. Raw footage, working files, and editable project files are included only when expressly agreed. Third-party music, fonts, stock media, and other licensed assets remain subject to their licence terms.",
      "The text, images, branding, and other material on this website belong to WillShoot or their respective owners. Please obtain permission before reproducing or using them beyond uses permitted by law. We will seek your permission before featuring your project in our portfolio.",
    ],
  },
  {
    id: "privacy",
    title: "Privacy and third-party services",
    paragraphs: [
      "We use the information you provide to respond to enquiries, manage bookings, and deliver our services. Please avoid sending sensitive information that is not needed for your project.",
      "Our website and services may involve third-party websites, advertising platforms, or tools with their own terms and privacy practices. We do not control their availability or policies.",
    ],
  },
  {
    id: "updates",
    title: "Updates and questions",
    paragraphs: [
      "We may update these terms from time to time. Updates apply to future bookings; existing projects remain subject to the terms agreed when booked unless we mutually agree otherwise. If you have a question or concern, please contact us so we can work towards a fair resolution.",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="bg-brand-pure-black text-brand-white pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12 space-y-6">
          <p className="text-xs uppercase tracking-widest text-brand-red font-bold">Working together</p>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">Terms &amp; Conditions</h1>
          <p className="text-brand-white/70 text-base md:text-lg leading-relaxed max-w-2xl">
            Clear expectations for a smooth creative partnership. Here are the terms that guide our website, bookings, and services.
          </p>
          <p className="text-sm text-brand-white/60">Last updated: 4 October 2026</p>
        </div>
      </section>

      <section className="bg-brand-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <nav aria-label="Terms and conditions sections" className="border-b border-brand-light-gray pb-10 mb-10">
            <p className="text-xs uppercase tracking-widest font-bold text-brand-medium-gray mb-4">On this page</p>
            <ol className="grid gap-3 sm:grid-cols-2 text-sm">
              {terms.map((term, index) => (
                <li key={term.id}>
                  <a href={`#${term.id}`} className="hover:text-brand-red underline underline-offset-4">
                    {index + 1}. {term.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="space-y-10">
            {terms.map((term, index) => (
              <section key={term.id} id={term.id} aria-labelledby={`${term.id}-title`} className={term.id === "refunds" ? "rounded-2xl border border-brand-red/20 bg-brand-soft-white p-6 md:p-8" : "space-y-4"}>
                <h2 id={`${term.id}-title`} className="text-xl md:text-2xl font-bold tracking-tight mb-4">
                  {index + 1}. {term.title}
                </h2>
                <div className="space-y-4 text-brand-dark-gray text-base leading-relaxed [&_p]:[text-wrap:pretty]">
                  {term.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-brand-light-gray space-y-3">
            <h2 className="text-xl font-bold">Let&apos;s keep things clear.</h2>
            <p className="text-brand-dark-gray leading-relaxed">
              For questions about these terms or your booking, email{" "}
              <a href="mailto:contact@willshoot.au" className="underline underline-offset-4 hover:text-brand-red">contact@willshoot.au</a>{" "}
              or <Link href="/contact" className="underline underline-offset-4 hover:text-brand-red">get in touch</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
