// Terjemahan Bahasa Indonesia untuk konten di lib/data/*.ts.
// Didesain sebagai OVERLAY (bukan pengganti) supaya file data asli
// (services.ts, industries.ts, projects.ts, insights.ts) tidak perlu
// diubah — jadi risiko rusak/kesalahan tipe jauh lebih kecil.
// Cara pakai: localize(SERVICES, SERVICES_ID, lang) atau
// localizeOne(entry, SERVICES_ID, lang).

export function localize<T extends {slug:string}>(items:T[],dict:Record<string,Partial<T>>,lang:string):T[]{
 if(lang!=="id")return items;
 return items.map(it=>({...it,...(dict[it.slug]||{})}));
}
export function localizeOne<T extends {slug:string}>(item:T,dict:Record<string,Partial<T>>,lang:string):T{
 if(lang!=="id")return item;
 return {...item,...(dict[item.slug]||{})};
}

// ===== SERVICES =====
export const SERVICES_ID:Record<string,{title:string;summary:string;capabilities:string[];disclaimer?:string}>={
 supply:{
  title:"Supply",
  summary:"Pengadaan dan penyediaan produk, material, peralatan dan kebutuhan operasional secara andal, sesuai spesifikasi, kuantitas, anggaran dan kebutuhan pengiriman masing-masing klien.",
  capabilities:["Material bangunan dan konstruksi","Mesin, peralatan dan alat pertanian","Produk kimia dan industri","Peralatan medis dan laboratorium untuk manusia","Pesawat, suku cadang pesawat dan peralatan penerbangan","Kebutuhan operasional penerbangan dan bandara non-pesawat","Pencarian supplier, perbandingan penawaran dan koordinasi pemesanan","Pengadaan sesuai spesifikasi khusus klien"],
 },
 trading:{
  title:"Trading",
  summary:"Perdagangan grosir dan pengadaan komersial di seluruh bidang usaha yang menjadi cakupan kami, dengan fokus pada spesifikasi, ketersediaan, syarat komersial dan pengiriman.",
  capabilities:["Perdagangan material bangunan","Perdagangan mesin dan peralatan","Perdagangan barang kimia dan industri","Perdagangan peralatan medis dan laboratorium","Peralatan, suku cadang dan aksesori transportasi udara","Pengadaan multi-kategori dan koordinasi supplier","Dukungan penawaran komersial dan pembelian","Koordinasi pengiriman dan dokumen pendukung"],
 },
 construction:{
  title:"Construction",
  summary:"Pelaksanaan konstruksi untuk jalan, bangunan, pekerjaan konstruksi khusus dan instalasi konstruksi sesuai ruang lingkup proyek dan sertifikasi yang berlaku.",
  capabilities:["Konstruksi jalan dan perkerasan lentur","Pekerjaan pemeliharaan jalan dan sipil umum","Konstruksi dan renovasi bangunan","Waterproofing dan pekerjaan konstruksi khusus","Pekerjaan plafon, dinding, lantai dan finishing","Pekerjaan instalasi konstruksi","Koordinasi material dan lokasi kerja","Inspeksi, serah terima dan dokumentasi proyek"],
  disclaimer:"Pelaksanaan konstruksi dilakukan sesuai ruang lingkup proyek, SBU/subklasifikasi, perizinan, persyaratan teknis dan spesifikasi klien yang berlaku.",
 },
};

// ===== INDUSTRIES =====
export const INDUSTRIES_ID:Record<string,{title:string;description:string;typicalRequirements:string[]}>={
 construction:{
  title:"Construction & Infrastructure",
  description:"Kebutuhan jalan, bangunan, konstruksi khusus dan instalasi yang didukung melalui kegiatan konstruksi dan supply terkait dari kami.",
  typicalRequirements:["Konstruksi jalan / aspal","Konstruksi dan renovasi bangunan","Waterproofing dan pekerjaan khusus","Instalasi konstruksi","Material bangunan dan proyek"],
 },
 "machinery-industrial":{
  title:"Machinery & Industrial",
  description:"Dukungan supply dan trading untuk mesin, peralatan dan alat pertanian berdasarkan spesifikasi dan ketersediaan yang diminta klien.",
  typicalRequirements:["Mesin pertanian","Peralatan industri","Mesin dan suku cadang","Peralatan operasional","Pengadaan sesuai kebutuhan proyek"],
 },
 "chemical-industrial":{
  title:"Chemical & Industrial",
  description:"Pengadaan dan supply komersial untuk barang kimia dan industri sesuai persyaratan regulasi dan keselamatan yang berlaku.",
  typicalRequirements:["Material kimia","Barang industri","Material pendukung proses","Pengadaan berdasarkan spesifikasi"],
 },
 "medical-healthcare":{
  title:"Medical & Healthcare",
  description:"Dukungan supply dan trading untuk peralatan medis dan laboratorium untuk penggunaan manusia, sesuai persetujuan dan persyaratan yang berlaku.",
  typicalRequirements:["Peralatan medis","Peralatan laboratorium","Kebutuhan operasional kesehatan","Dukungan spesifikasi dan dokumentasi"],
 },
 aviation:{
  title:"Aviation",
  description:"Dukungan supply dan trading untuk kebutuhan pesawat maupun non-pesawat. Cakupan produk sengaja dibuat fleksibel dan akan disesuaikan dengan kebutuhan yang disetujui masing-masing klien.",
  typicalRequirements:["Suku cadang dan komponen pesawat","Peralatan dan aksesori pesawat","Peralatan penerbangan non-pesawat","Kebutuhan operasional bandara","Pengadaan penerbangan sesuai kebutuhan klien"],
 },
 "construction-supply":{
  title:"Construction Supply",
  description:"Supply grosir material bangunan dan produk terkait untuk mendukung kebutuhan konstruksi, renovasi dan infrastruktur.",
  typicalRequirements:["Material bangunan","Material konstruksi","Kebutuhan material dalam jumlah besar","Pengadaan material berbasis proyek"],
 },
};

// ===== PROJECTS =====
export const PROJECTS_ID:Record<string,{title:string;sector:string;label:string;challenge:string;approach:string[];outcome:string;tags:string[]}>={
 "road-construction-asphalt":{
  title:"Road Construction & Asphalt Supply",
  sector:"Construction",
  label:"Konsep portofolio sementara",
  challenge:"Pekerjaan jalan membutuhkan kuantitas yang akurat, material yang sesuai, penjadwalan dan koordinasi lokasi kerja.",
  approach:["Meninjau ruang lingkup dan persyaratan teknis","Mencari sumber aspal dan material pendukung","Mengoordinasikan pengiriman dan kegiatan konstruksi","Memantau penyelesaian dan persyaratan serah terima"],
  outcome:"Alur kerja konstruksi dan supply yang terkoordinasi untuk kebutuhan jalan dan perkerasan lentur.",
  tags:["Jalan","Aspal","Konstruksi"],
 },
 "building-waterproofing-renovation":{
  title:"Waterproofing & Building Renovation",
  sector:"Construction",
  label:"Konsep portofolio sementara",
  challenge:"Renovasi bangunan dapat mencakup waterproofing, perbaikan, finishing dan berbagai kebutuhan material sekaligus.",
  approach:["Menilai paket pekerjaan","Menentukan kebutuhan material","Mengoordinasikan kegiatan lokasi dan supply","Mendukung inspeksi dan serah terima"],
  outcome:"Dukungan pelaksanaan dan supply yang terintegrasi untuk perbaikan dan renovasi bangunan.",
  tags:["Waterproofing","Renovasi","Bangunan"],
 },
 "building-material-supply":{
  title:"Building Material Supply",
  sector:"Construction Supply",
  label:"Konsep portofolio sementara",
  challenge:"Proyek membutuhkan ketersediaan material, spesifikasi, kuantitas dan waktu pengiriman yang dapat diandalkan.",
  approach:["Memperjelas spesifikasi dan kuantitas","Mencari supplier yang sesuai","Membandingkan penawaran komersial","Mengoordinasikan pemesanan dan pengiriman"],
  outcome:"Alur pengadaan yang praktis untuk kebutuhan material konstruksi.",
  tags:["Material","Supply","Trading"],
 },
 "machinery-equipment-supply":{
  title:"Machinery & Equipment Supply",
  sector:"Machinery & Industrial",
  label:"Konsep portofolio sementara",
  challenge:"Pengadaan peralatan bergantung pada spesifikasi yang tepat, ketersediaan dan kesesuaian komersial.",
  approach:["Mencatat model dan spesifikasi","Memetakan supplier dan alternatif","Membandingkan penawaran","Mengoordinasikan pengadaan dan pengiriman"],
  outcome:"Dukungan pengadaan mesin dan peralatan berbasis spesifikasi.",
  tags:["Mesin","Peralatan","Supply"],
 },
 "medical-equipment-supply":{
  title:"Medical & Laboratory Equipment Supply",
  sector:"Medical & Healthcare",
  label:"Konsep portofolio sementara",
  challenge:"Produk medis dan laboratorium membutuhkan spesifikasi yang akurat serta dokumentasi pendukung.",
  approach:["Mengonfirmasi spesifikasi produk","Mencari kanal komersial yang memenuhi syarat","Memeriksa kebutuhan dokumentasi","Mengoordinasikan pengiriman"],
  outcome:"Dukungan supply yang terstruktur untuk peralatan medis dan laboratorium manusia.",
  tags:["Medis","Laboratorium","Supply"],
 },
 "aviation-supply":{
  title:"Aircraft & Non-Aircraft Aviation Supply",
  sector:"Aviation",
  label:"Konsep portofolio sementara",
  challenge:"Klien penerbangan mungkin membutuhkan komponen pesawat, peralatan, ground-support atau produk non-pesawat lain tergantung operasinya.",
  approach:["Menerima kebutuhan spesifik klien","Memperjelas part number, spesifikasi, kuantitas dan dokumentasi","Mencari supplier yang sesuai","Mengoordinasikan penawaran, pengadaan dan pengiriman"],
  outcome:"Dukungan pengadaan penerbangan yang fleksibel tanpa membatasi situs pada katalog produk yang prematur.",
  tags:["Pesawat","Non-pesawat","Penerbangan"],
 },
};

// ===== INSIGHTS =====
export const INSIGHTS_ID:Record<string,{cat:string;title:string;summary:string;intro:string;body:string[]}>={
 "construction-requirements-before-procurement":{
  cat:"Construction",
  title:"Mengapa kebutuhan konstruksi harus jelas sebelum pengadaan dimulai",
  summary:"Ruang lingkup, kuantitas, spesifikasi, kondisi lokasi dan tanggal pengiriman membentuk kualitas proses pengadaan konstruksi.",
  intro:"Kualitas pengadaan dimulai dari kebutuhan yang bisa dipahami, dihitung harganya, dijadwalkan dan dipenuhi.",
  body:[
   "Kebutuhan konstruksi sering menggabungkan gambar atau spesifikasi, kuantitas, kondisi lokasi, urutan pekerjaan dan tanggal penyelesaian yang diperlukan. Ketika elemen-elemen ini tidak jelas, perbandingan antar-supplier menjadi sulit dan risiko proyek meningkat.",
   "Proses pengadaan yang praktis dimulai dengan memecah kebutuhan menjadi paket pekerjaan dan kategori material. Ini menciptakan dasar yang sama untuk penawaran supplier dan membantu tim proyek membandingkan hal yang setara.",
   "Hasilnya bukan sekadar harga beli yang lebih baik. Ini adalah rencana pelaksanaan yang lebih jelas dengan lebih sedikit celah yang bisa dihindari antara spesifikasi, supplier, pengiriman dan pekerjaan di lapangan.",
  ],
 },
 "material-specification-procurement":{
  cat:"Procurement",
  title:"Apa yang diubah oleh spesifikasi material yang baik dalam pengadaan",
  summary:"Spesifikasi yang jelas mengurangi ambiguitas, memperbaiki perbandingan antar-supplier dan membuat keputusan komersial lebih mudah dipertanggungjawabkan.",
  intro:"Spesifikasi adalah jembatan antara kebutuhan proyek dan penawaran supplier yang bisa dibandingkan.",
  body:[
   "Permintaan material harus memperjelas apa yang sebenarnya dibutuhkan proyek: jenis, grade, ukuran, kuantitas, aplikasi, titik pengiriman dan waktunya. Tingkat detail tergantung pada material dan konsekuensi jika salah produk.",
   "Dengan spesifikasi yang jelas, supplier dapat merespons lebih akurat dan tim pengadaan dapat membandingkan ketersediaan, lead time, harga dan syarat komersial tanpa kehilangan konteks teknis.",
   "Untuk material yang berulang, spesifikasi ini juga bisa menjadi standar pengadaan yang dapat dipakai ulang untuk meningkatkan konsistensi antar-proyek.",
  ],
 },
 "building-maintenance-planning":{
  cat:"Facilities",
  title:"Dari perbaikan reaktif menuju pemeliharaan bangunan yang terstruktur",
  summary:"Rencana pemeliharaan sederhana dapat menghubungkan perbaikan berulang, material, kontraktor dan prioritas lokasi menjadi ritme operasi yang lebih dapat diprediksi.",
  intro:"Pemeliharaan bangunan menjadi lebih dapat diprediksi ketika kebutuhan berulang terlihat sebelum menjadi mendesak.",
  body:[
   "Register pemeliharaan sederhana dapat mencatat aset, kerusakan berulang, pekerjaan yang direncanakan, kebutuhan material, kebutuhan kontraktor dan target tanggal penyelesaian.",
   "Informasi ini membantu tim fasilitas memprioritaskan pekerjaan, mengoordinasikan supplier dan menyiapkan material sebelum masalah kecil menjadi gangguan yang lebih besar.",
   "Disiplin yang sama juga dapat mendukung pekerjaan renovasi dan finishing dengan membuat ruang lingkup, material dan koordinasi lokasi terlihat dalam satu rencana.",
  ],
 },
 "specialized-equipment-sourcing":{
  cat:"Technical Supply",
  title:"Disiplin di balik pengadaan peralatan khusus",
  summary:"Kebutuhan peralatan dan suku cadang membutuhkan ketepatan spesifikasi, kanal pengadaan yang sesuai, dokumentasi dan tindak lanjut pengiriman.",
  intro:"Supply khusus bukan sekadar menemukan nama produk, melainkan mencocokkan kebutuhan yang tepat dengan jalur pengadaan yang sesuai.",
  body:[
   "Permintaan peralatan dan suku cadang sering bergantung pada model, spesifikasi, kompatibilitas, kuantitas, sertifikasi, dokumentasi dan persyaratan pengiriman.",
   "Proses pengadaan yang disiplin mencatat detail-detail tersebut terlebih dahulu, lalu membandingkan produsen, distributor dan supplier yang sesuai berdasarkan kriteria teknis dan komersial.",
   "Untuk kategori yang teregulasi atau khusus, proses pengadaan juga harus menjaga dokumentasi dan persetujuan yang diperlukan untuk transaksi tersebut.",
  ],
 },
};
