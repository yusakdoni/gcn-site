"use client";

import { FormEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField, ConsentCheckbox } from "@/components/forms/Fields";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const { lang } = useLanguage();
  const startedAt = useRef(Date.now());

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      ...Object.fromEntries(formData),
      sourcePage: `${window.location.pathname}${window.location.search}`,
      formStartedAt: startedAt.current,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
      startedAt.current = Date.now();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-mist bg-offwhite p-10 text-center flex flex-col items-center gap-3">
        <h3 className="text-h3 text-xl">{lang === "id" ? "Pengajuan kemitraan terkirim." : "Partnership enquiry sent."}</h3>
        <p className="text-body text-navy/70 max-w-sm">
          {lang === "id"
            ? "Informasi Anda sudah diteruskan ke tim GCN untuk ditinjau. Kami akan menghubungi Anda bila ada kebutuhan atau peluang yang relevan."
            : "Your information has been forwarded to the GCN team for review. We will contact you when there is a relevant requirement or opportunity."}
        </p>
        <Button variant="ghost" onClick={() => setStatus("idle")} className="mt-2 normal-case tracking-normal">
          {lang === "id" ? "Kirim pengajuan lain" : "Submit another enquiry"}
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <TextField label="Full Name" labelId="Nama Lengkap" name="name" autoComplete="name" required />
        <TextField label="Email" labelId="Email" name="email" type="email" autoComplete="email" required />
      </div>
      <TextField label="Company" labelId="Perusahaan" name="company" autoComplete="organization" />
      <TextField label="Subject" labelId="Subjek" name="subject" required />
      <TextareaField label="Message" labelId="Pesan" name="message" required />

      <ConsentCheckbox name="consent" />

      {status === "error" && (
        <p className="text-[14px] text-red-600">
          {lang === "id"
            ? "Pengajuan belum berhasil terkirim. Silakan coba lagi atau kirim email langsung ke sales@gcnusantara.com."
            : "The enquiry could not be submitted. Please try again or email sales@gcnusantara.com directly."}
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-fit">
        {status === "submitting"
          ? lang === "id" ? "Mengirim..." : "Sending..."
          : lang === "id" ? "Kirim Pengajuan Kemitraan" : "Submit Partnership Enquiry"}
      </Button>
    </form>
  );
}
