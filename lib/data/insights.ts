import { PHOTOS, EditorialPhoto } from "@/lib/data/photos";

export interface Insight {
  slug: string;
  cat: string;
  title: string;
  summary: string;
  intro: string;
  body: string[];
  image: EditorialPhoto;
}

// Single source of truth for Insights content.
// Used by: app/insights/page.tsx (list), app/insights/[slug]/page.tsx (detail),
// and components/layout/InsightsTeaser.tsx (homepage teaser).
// To add/edit an article, edit this array only — see STRUCTURE_MAP.md.
export const INSIGHTS: Insight[] = [
  {
    slug: "construction-requirements-before-procurement",
    cat: "Construction",
    title: "Why the construction requirement should be clear before procurement starts",
    summary:
      "Scope, quantities, specifications, site conditions, and delivery dates shape the quality of a construction procurement process.",
    intro:
      "Procurement quality begins with a requirement that can be understood, priced, scheduled, and delivered.",
    body: [
      "Construction requirements often combine drawings or specifications, quantities, site conditions, work sequences, and required completion dates. When these elements are unclear, supplier comparison becomes difficult and project risk increases.",
      "A practical procurement process starts by separating the requirement into work packages and material categories. This creates a common basis for supplier quotations and helps the project team compare like with like.",
      "The result is not simply a better purchase price. It is a clearer execution plan with fewer avoidable gaps between specification, supplier, delivery, and site work.",
    ],
    image: PHOTOS.constructionAerial,
  },
  {
    slug: "material-specification-procurement",
    cat: "Procurement",
    title: "What a good material specification changes in procurement",
    summary:
      "Clear specifications reduce ambiguity, improve supplier comparison, and make commercial decisions easier to defend.",
    intro:
      "Specification is the bridge between a project requirement and a comparable supplier quotation.",
    body: [
      "A material request should make clear what the project actually needs: type, grade, size, quantity, application, delivery point, and timing. The level of detail depends on the material and the consequence of using the wrong product.",
      "With a clear specification, suppliers can respond more accurately and procurement teams can compare availability, lead time, price, and commercial terms without losing the technical context.",
      "For recurring materials, the specification can also become a reusable procurement standard that improves consistency across projects.",
    ],
    image: PHOTOS.warehouseBoxes,
  },
  {
    slug: "building-maintenance-planning",
    cat: "Facilities",
    title: "From reactive repairs to structured building maintenance",
    summary:
      "A simple maintenance plan can connect recurring repairs, materials, contractors, and site priorities into a more predictable operating rhythm.",
    intro:
      "Building maintenance becomes more predictable when recurring needs are visible before they become urgent.",
    body: [
      "A simple maintenance register can capture assets, recurring defects, planned work, material needs, contractor requirements, and target completion dates.",
      "This information helps facility teams prioritize work, coordinate suppliers, and prepare materials before a minor issue becomes a larger disruption.",
      "The same discipline can support renovation and finishing work by making scope, materials, and site coordination visible in one plan.",
    ],
    image: PHOTOS.industrialBridge,
  },
  {
    slug: "specialized-equipment-sourcing",
    cat: "Technical Supply",
    title: "The discipline behind specialized equipment sourcing",
    summary:
      "Equipment and spare-part requirements need specification accuracy, suitable sourcing channels, documentation, and delivery follow-up.",
    intro:
      "Specialized supply is less about finding a product name and more about matching the exact requirement to a suitable sourcing route.",
    body: [
      "Equipment and spare-part requests often depend on model, specification, compatibility, quantity, certification, documentation, and delivery requirements.",
      "A disciplined sourcing process records those details first, then compares suitable manufacturers, distributors, and suppliers against technical and commercial criteria.",
      "For regulated or specialized categories, the sourcing process should also preserve the documentation and approvals required for the transaction.",
    ],
    image: PHOTOS.industrialFactory,
  },
];
