import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { T } from "@/components/i18n/T";

export function FinalCTA() {
  return (
    <section className="py-24 md:py-32 bg-deep-blue">
      <Container className="flex flex-col items-center text-center gap-6">
        <h2 className="text-white text-3xl md:text-h2 max-w-2xl">
          <T en="Have a Procurement or Supply Requirement?" id="Punya Kebutuhan Pengadaan atau Supply?"/>
        </h2>
        <p className="text-white/70 text-body max-w-lg">
          <T en="Tell us what you need and our team will review your requirement and respond promptly." id="Sampaikan kebutuhan Anda dan tim kami akan meninjau serta merespons dengan cepat."/>
        </p>
        <Button href="/rfq" className="bg-white text-navy hover:bg-electric hover:text-white mt-2">
          <T en="Request a Quotation" id="Ajukan Penawaran"/>
        </Button>
      </Container>
    </section>
  );
}
