import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { contactPageQuery } from "@/sanity/lib/queries";
import ContactForm from "@/components/ContactForm";

interface ContactPageData {
  heroImage?: any;
  heroSlides?: { image: any; alt?: string }[];
  officeAddress?: string;
  phoneNumbers?: string;
  faxNumber?: string;
  email?: string;
}

export default async function ContactPage() {
  let pageData: ContactPageData | null = null;

  try {
    pageData = await client.fetch(contactPageQuery);
  } catch (e) {
    console.error("Sanity fetch error:", e);
  }

  // Pehle heroImage, na ho to heroSlides ki pehli image
  const heroSource = pageData?.heroImage?.asset
    ? pageData.heroImage
    : pageData?.heroSlides?.find((s) => s?.image?.asset)?.image;

  let heroImageUrl: string | null = null;
  try {
    heroImageUrl = heroSource ? urlFor(heroSource).width(1920).url() : null;
  } catch (e) {
    console.error("Hero image error:", e);
  }

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="relative flex min-h-[420px] items-center overflow-hidden bg-blue-900 pb-20 pt-20">
        {heroImageUrl && (
          <img
            src={heroImageUrl}
            alt={pageData?.heroImage?.alt || "Contact Us"}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-blue-950/60" />

        <div className="relative z-10 mx-auto w-full max-w-3xl px-6 py-16 text-center">
          <span className="text-sm font-bold uppercase tracking-[0.3em] text-teal-300">
            Get In Touch
          </span>
          <h1 className="mt-4 font-serif text-4xl italic text-white sm:text-5xl">
            We&apos;d Love to Hear From You
          </h1>
        </div>
      </section>
      


      {/* Info Cards + Form */}
      <ContactForm
        officeAddress={pageData?.officeAddress}
        phoneNumbers={pageData?.phoneNumbers}
        faxNumber={pageData?.faxNumber}
        email={pageData?.email}
      />
      {/* Donation Payment Options */}
<section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
  <h2 className="mb-2 text-2xl font-bold text-gray-900">
    Support Us Through Donation
  </h2>

  <p className="mb-6 text-gray-600">
    You can support our mission through the following payment methods.
  </p>

  <div className="grid gap-5 sm:grid-cols-2">

    {/* EasyPaisa */}
    <div className="rounded-xl border border-green-200 bg-green-50 p-5">
      <h3 className="text-xl font-bold text-green-700">
        EasyPaisa
      </h3>
      <p className="mt-3 text-sm text-gray-600">
        Account Title : Adil Zaman
      </p>
      <p className="font-semibold text-gray-900">
        Youth Evolution Foundation Founder
      </p>

      <p className="mt-3 text-sm text-gray-600">
        EasyPaisa Number
      </p>
      <p className="font-bold text-gray-900">
          03445907911
      </p>
    </div>

    {/* Bank Transfer */}
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-5">
      <h3 className="text-xl font-bold text-blue-700">
        Bank Transfer
      </h3>
      <p className="mt-3 text-sm text-gray-600">
        Bank Name
      </p>
      <p className="font-semibold text-gray-900">
        YOUR BANK NAME
      </p>

      <p className="mt-3 text-sm text-gray-600">
        Account Title
      </p>
      <p className="font-semibold text-gray-900">
        Youth Evolution Foundation
      </p>

      <p className="mt-3 text-sm text-gray-600">
        IBAN
      </p>
      <p className="break-all font-bold text-gray-900">
        YOUR-IBAN
      </p>
    </div>

  </div>
</section>
 
    </main>
  );
}