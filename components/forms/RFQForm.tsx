"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { TextField, SelectField, TextareaField, ConsentCheckbox, HoneypotField } from "@/components/forms/Fields";
import { INDUSTRY_OPTIONS } from "@/lib/types/rfq";

type Status = "idle" | "submitting" | "success" | "error";

export function RFQForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("/api/rfq", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-mist bg-offwhite p-10 text-center flex flex-col items-center gap-3">
        <h3 className="text-h3 text-xl">Thank you.</h3>
        <p className="text-body text-navy/70 max-w-sm">
          Our team will review your requirement and contact you shortly.
        </p>
        <Button variant="ghost" onClick={() => setStatus("idle")} className="mt-2 normal-case tracking-normal">
          Submit another request
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <HoneypotField />
      <div className="grid md:grid-cols-2 gap-6">
        <TextField label="Company Name" name="companyName" required />
        <TextField label="Contact Person" name="contactPerson" required />
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <TextField label="Email" name="email" type="email" required />
        <TextField label="Phone" name="phone" type="tel" required />
      </div>

      <SelectField label="Industry" name="industry" options={INDUSTRY_OPTIONS} required />

      <TextField label="Product / Service Required" name="productOrService" required />
      <TextareaField label="Specification" name="specification" required />

      <div className="grid md:grid-cols-2 gap-6">
        <TextField label="Quantity" name="quantity" required />
        <TextField label="Required Delivery Date" name="requiredDeliveryDate" type="date" required />
      </div>

      <TextField label="Delivery Location" name="deliveryLocation" required />
      <TextField label="Budget Range" name="budgetRange" placeholder="Optional" />

      <div>
        <label className="text-[13px] font-medium text-navy/70 mb-2 block">Attachment</label>
        <input
          type="file"
          name="attachment"
          className="w-full border border-mist bg-white px-4 py-3 text-[15px] text-navy/70 file:mr-4 file:px-4 file:py-2 file:border-0 file:bg-deep-blue file:text-white file:text-[13px] file:tracking-widest file:uppercase"
        />
      </div>

      <TextareaField label="Additional Information" name="additionalInformation" />

      <ConsentCheckbox name="consent" />

      {status === "error" && (
        <p className="text-[14px] text-red-600">
          Something went wrong sending your request. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" disabled={status === "submitting"} className="w-fit">
        {status === "submitting" ? "Submitting..." : "Submit RFQ"}
      </Button>
    </form>
  );
}
