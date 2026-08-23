"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, TextareaField, ConsentCheckbox, HoneypotField } from "@/components/forms/Fields";
import { useLanguage } from "@/lib/i18n/LanguageContext";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const { lang } = useLanguage();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-mist bg-offwhite p-10 text-center flex flex-col items-center gap-3">
        <h3 className="text-h3 text-xl">{lang === "id" ? "Pesan terkirim." : "Message sent."}</h3>
        <p className="text-body text-navy/70 max-w-sm">{lang === "id" ? "Kami akan menghubungi Anda kembali secepatnya." : "We'll get back to you as soon as possible."}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <HoneypotField />
      <div className="grid md:grid-cols-2 gap-6">
        <TextField label="Full Name" labelId="Nama Lengkap" name="name" required />
        <TextField label="Email" labelId="Email" name="email" type="email" required />
      </div>
      <TextField label="Company" labelId="Perusahaan" name="company" />
      <TextField label="Subject" labelId="Subjek" name="subject" required />
      <TextareaField label="Message" labelId="Pesan" name="message" required />

      <ConsentCheckbox name="consent" />

      {status === "error" && (
        <p className="text-[14px] text-red-600">{lang === "id" ? "Terjadi kesalahan. Silakan coba lagi atau kirim email langsung kepada kami." : "Something went wrong. Please try again or email us directly."}</p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-fit">
        {status === "submitting" ? (lang === "id" ? "Mengirim..." : "Sending...") : (lang === "id" ? "Diskusikan Kebutuhan Anda" : "Discuss Your Requirement")}
      </Button>
    </form>
  );
}
