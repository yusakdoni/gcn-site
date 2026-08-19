export interface EditorialPhoto { src:string; alt:string; credit:string; }
const G="/assets/generated/";
export const PHOTOS = {
 hero:{src:G+"hero-supply-trading-construction-001.jpg",alt:"Generated temporary image showing supply, trading and construction activities",credit:"AI-generated temporary website asset"},
 construction:{src:G+"project-asphalt-001.jpg",alt:"Generated temporary road construction project image",credit:"AI-generated temporary website asset"},
 building:{src:G+"project-waterproofing-renovation-001.jpg",alt:"Generated temporary building renovation project image",credit:"AI-generated temporary website asset"},
 materials:{src:G+"project-building-material-001.jpg",alt:"Generated temporary construction material supply image",credit:"AI-generated temporary website asset"},
 medical:{src:G+"project-medical-001.jpg",alt:"Generated temporary medical equipment supply image",credit:"AI-generated temporary website asset"},
 machinery:{src:G+"project-machinery-001.jpg",alt:"Generated temporary machinery supply image",credit:"AI-generated temporary website asset"},
 aviation:{src:G+"project-aviation-001.jpg",alt:"Generated temporary aircraft and aviation supply image",credit:"AI-generated temporary website asset"},
 industryConstruction:{src:G+"industry-construction.jpg",alt:"Generated temporary construction industry image",credit:"AI-generated temporary website asset"},
 industryMaterial:{src:G+"industry-material.jpg",alt:"Generated temporary building materials industry image",credit:"AI-generated temporary website asset"},
 industryMachinery:{src:G+"industry-machinery.jpg",alt:"Generated temporary machinery industry image",credit:"AI-generated temporary website asset"},
 industryChemical:{src:G+"industry-chemical.jpg",alt:"Generated temporary chemical industry image",credit:"AI-generated temporary website asset"},
 industryMedical:{src:G+"industry-medical.jpg",alt:"Generated temporary medical industry image",credit:"AI-generated temporary website asset"},
 industryAviation:{src:G+"industry-aviation.jpg",alt:"Generated temporary aviation industry image",credit:"AI-generated temporary website asset"},
 constructionAerial:{src:G+"project-asphalt-001.jpg",alt:"Generated temporary construction image",credit:"AI-generated temporary website asset"},
 industrialBridge:{src:G+"project-waterproofing-renovation-001.jpg",alt:"Generated temporary infrastructure image",credit:"AI-generated temporary website asset"},
 industrialFactory:{src:G+"project-machinery-001.jpg",alt:"Generated temporary industrial equipment image",credit:"AI-generated temporary website asset"},
 warehouseBoxes:{src:G+"project-building-material-001.jpg",alt:"Generated temporary warehouse material image",credit:"AI-generated temporary website asset"},
 containerVans:{src:G+"project-building-material-001.jpg",alt:"Generated temporary supply image",credit:"AI-generated temporary website asset"},
} satisfies Record<string,EditorialPhoto>;
export const SERVICE_PHOTOS = {
 "supply":PHOTOS.materials, "trading":PHOTOS.materials, "construction":PHOTOS.construction
} satisfies Record<string,EditorialPhoto>;
