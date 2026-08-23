import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { T } from "@/components/i18n/T";

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
          <span className="eyebrow text-electric mb-6"><T en="Privacy Policy" id="Kebijakan Privasi"/></span>
          <h1 className="text-white text-3xl md:text-h1 max-w-2xl"><T en="How we handle your information" id="Bagaimana kami menangani informasi Anda"/></h1>
        </Container>
      </section>
      <section className="py-20 bg-white">
        <Container className="max-w-3xl space-y-8 text-[16px] leading-relaxed text-navy/75">
          <p>
            <T
              en={<>This policy explains what information PT Gega Cahaya Nusantara ("GCN", "we", "us") collects through this website's Contact and Request for Quotation (RFQ) forms, and how it is used.</>}
              id={<>Kebijakan ini menjelaskan informasi apa yang dikumpulkan oleh PT Gega Cahaya Nusantara ("GCN", "kami") melalui form Contact dan Request for Quotation (RFQ) di website ini, serta bagaimana informasi tersebut digunakan.</>}
            />
          </p>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2"><T en="What we collect" id="Informasi yang kami kumpulkan"/></h2>
            <p>
              <T
                en="When you submit the Contact or RFQ form, we collect the information you provide directly: name, company name, email address, phone number, and the details of your inquiry or requirement (including any file you choose to attach)."
                id="Saat Anda mengirimkan form Contact atau RFQ, kami mengumpulkan informasi yang Anda berikan secara langsung: nama, nama perusahaan, alamat email, nomor telepon, dan detail pertanyaan atau kebutuhan Anda (termasuk file yang Anda pilih untuk dilampirkan)."
              />
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2"><T en="How we use it" id="Bagaimana kami menggunakannya"/></h2>
            <p>
              <T
                en="We use this information only to respond to your inquiry, prepare a quotation, and communicate with you about your request. We do not sell your information to third parties."
                id="Kami menggunakan informasi ini hanya untuk merespons pertanyaan Anda, menyiapkan penawaran, dan berkomunikasi dengan Anda terkait permintaan Anda. Kami tidak menjual informasi Anda ke pihak ketiga."
              />
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2"><T en="Retention" id="Penyimpanan Data"/></h2>
            <p>
              <T
                en="We retain inquiry and RFQ information for as long as needed to respond to your request and maintain our business records, after which it may be deleted."
                id="Kami menyimpan informasi pertanyaan dan RFQ selama diperlukan untuk merespons permintaan Anda dan menjaga catatan bisnis kami, setelah itu dapat dihapus."
              />
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2"><T en="Your rights" id="Hak Anda"/></h2>
            <p>
              <T
                en={<>You may ask us to access, correct, or delete the information you submitted by contacting us at{" "}<a href="mailto:sales@gcnusantara.com" className="text-electric hover:underline">sales@gcnusantara.com</a>.</>}
                id={<>Anda dapat meminta kami untuk mengakses, mengoreksi, atau menghapus informasi yang Anda kirimkan dengan menghubungi kami di{" "}<a href="mailto:sales@gcnusantara.com" className="text-electric hover:underline">sales@gcnusantara.com</a>.</>}
              />
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-navy mb-2"><T en="Contact" id="Kontak"/></h2>
            <p>
              <T
                en={<>Questions about this policy can be sent to{" "}<a href="mailto:sales@gcnusantara.com" className="text-electric hover:underline">sales@gcnusantara.com</a>.</>}
                id={<>Pertanyaan tentang kebijakan ini dapat dikirim ke{" "}<a href="mailto:sales@gcnusantara.com" className="text-electric hover:underline">sales@gcnusantara.com</a>.</>}
              />
            </p>
          </div>
        </Container>
      </section>
      <Footer />
    </main>
  );
}
