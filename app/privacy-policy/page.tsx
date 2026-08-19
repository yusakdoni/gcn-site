import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";

export const metadata = {
  title: "Privacy Policy",
  description: "How PT Gega Cahaya Nusantara collects and uses information submitted through this website.",
};

export default function PrivacyPolicyPage() {
  return (
    <main>
      <Navbar />
      <section className="pt-40 pb-16 bg-deep-blue">
        <Container>
          <span className="eyebrow text-electric mb-6">Privacy Policy</span>
          <h1 className="text-white text-3xl md:text-h1 max-w-2xl">How we handle your information</h1>
        </Container>
      </section>
      <section className="py-20 bg-white">
        <Container className="max-w-3xl space-y-8 text-[16px] leading-relaxed text-navy/75">
          <p>
            This policy explains what information PT Gega Cahaya Nusantara ("GCN", "we", "us") collects
            through this website's Contact and Request for Quotation (RFQ) forms, and how it is used.
          </p>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2">What we collect</h2>
            <p>
              When you submit the Contact or RFQ form, we collect the information you provide directly:
              name, company name, email address, phone number, and the details of your inquiry or
              requirement (including any file you choose to attach).
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2">How we use it</h2>
            <p>
              We use this information only to respond to your inquiry, prepare a quotation, and
              communicate with you about your request. We do not sell your information to third parties.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2">Retention</h2>
            <p>
              We retain inquiry and RFQ information for as long as needed to respond to your request and
              maintain our business records, after which it may be deleted.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2">Your rights</h2>
            <p>
              You may ask us to access, correct, or delete the information you submitted by contacting us
              at{" "}
              <a href="mailto:sales@gcnusantara.com" className="text-electric hover:underline">
                sales@gcnusantara.com
              </a>
              .
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2">Contact</h2>
            <p>
              Questions about this policy can be sent to{" "}
              <a href="mailto:sales@gcnusantara.com" className="text-electric hover:underline">
                sales@gcnusantara.com
              </a>
              .
            </p>
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
