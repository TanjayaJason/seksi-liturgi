"use client";

import {
  ArrowUpRight,
  BookOpenText,
  Boxes,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Cross,
  FileCheck2,
  FileText,
  MapPin,
  Menu,
  MessagesSquare,
  Music2,
  PackagePlus,
  Sparkles,
  UsersRound,
  WalletCards,
  X,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const links = {
  schedule:
    "https://docs.google.com/spreadsheets/d/11TU2H5wtPWMKeM8kd-RSBw4cUgySFzmoUt0X94SodHQ/edit?usp=sharing",
  musica:
    "https://drive.google.com/drive/folders/1XIHt00IqzJQ_kDdlvgD7UxA8QqV77T-x?usp=sharing",
  gerak:
    "https://drive.google.com/file/d/1j1VIz6QUoOGYHFTlVNAwNENk_nx6C2Yy/view?usp=sharing",
  khusus: "https://surat-liturgi.vercel.app/",
  calendar2026:
    "https://docs.google.com/spreadsheets/d/1amU6jiGZHzg1GXElsSHhtAtc7_c366NA/edit?usp=sharing&ouid=111785717314206636419&rtpof=true&sd=true",
  calendar2027:
    "https://docs.google.com/spreadsheets/d/1hGakUMf1Be8ViLWT9PzcD3JgJGh5XWGy/edit?usp=sharing&ouid=111785717314206636419&rtpof=true&sd=true",
};

const navItems = [
  { label: "Beranda", href: "#beranda" },
  { label: "Tentang Kami", href: "#tentang" },
  { label: "Pilar Layanan", href: "#layanan" },
  { label: "Kalender Liturgi", href: "#kalender" },
];

type Person = { name: string; birthDate: string; region: string };
type Group = { title: string; people: Person[] };

const chair: Person = {
  name: "Eugene Sri Mulyani", birthDate: "17 November 1973", region: "Ancol",
};

const divisions: {
  number: string;
  title: string;
  shortTitle: string;
  deputy: Person;
  groups: Group[];
  accent: string;
}[] = [
  {
    number: "01", title: "Pendampingan Parsius, Santaris, dan Caeremoniarius", shortTitle: "Parsius, Santaris & Caeremoniarius", accent: "violet",
    deputy: { name: "Dionisius Matthew Reinhart Budiman", birthDate: "5 Oktober 2006", region: "Keagungan" },
    groups: [
      { title: "Ketua Subseksi Putra Altar St. Tarsisius", people: [{ name: "Benedictus Yongen Given Rombe", birthDate: "21 Juli 2012", region: "Dwiwarna" }] },
      { title: "Ketua Subseksi Putri Sakristi St. Jeanne d’Arc", people: [{ name: "Felice Perpetua Xelica Electra Verrenna", birthDate: "30 Desember 2011", region: "Kartini" }] },
      { title: "Ketua Subseksi Caeremoniarius St. Yohanes Berchmans", people: [{ name: "Alexius Rayhan Adilla Trixie", birthDate: "12 Desember 2008", region: "Kartini" }] },
    ],
  },
  {
    number: "02", title: "Pendampingan Lektor, Pemazmur, dan Pasdior", shortTitle: "Lektor, Pemazmur & Pasdior", accent: "blue",
    deputy: { name: "Maria Stephanie Indri Putri", birthDate: "2 Juli 1989", region: "Taman Sari" },
    groups: [
      { title: "Ketua Subseksi Lektor St. Hieronimus", people: [{ name: "Johanes Denny Indrawan", birthDate: "14 Desember 1981", region: "Kebon Jeruk" }] },
      { title: "Ketua Subseksi Pemazmur St. Cicilia", people: [{ name: "Alfonsus Yosef Gabriel Syamsudin", birthDate: "10 Agustus 2007", region: "Kartini" }] },
      { title: "Ketua Subseksi Pasdior St. Romanus", people: [{ name: "Natalia Netty Coa", birthDate: "11 Juli 1975", region: "Pang. Jayakarta" }] },
    ],
  },
  {
    number: "03", title: "Pendampingan Prodiakon, Kolatan, dan Dekorasi Altar", shortTitle: "Prodiakon, Kolatan & Dekorasi Altar", accent: "coral",
    deputy: { name: "Caecilia Tjen Lydia", birthDate: "12 Desember 1972", region: "Mangga Besar 1" },
    groups: [
      { title: "Ketua Subseksi Kolatan St. Zita", people: [{ name: "Clarissa Stephanie Tediana", birthDate: "4 September 1984", region: "Taman Sari" }] },
      { title: "Ketua Subseksi Prodiakon St. Petrus dan Paulus", people: [{ name: "Vinsensius Dominikus Budiono", birthDate: "24 Januari 1973", region: "Kartini" }] },
      { title: "Ketua Subseksi Dekorasi Altar", people: [] },
    ],
  },
  {
    number: "04", title: "Tata Laksana, Perayaan, dan Ibadat", shortTitle: "Tata Laksana, Perayaan & Ibadat", accent: "violet",
    deputy: { name: "Anthony Edward Tanjaya Jason Winata", birthDate: "2 April 2004", region: "Kartini" },
    groups: [
      { title: "Staff Musica Liturgia", people: [{ name: "Alfonsus Yosef Gabriel Syamsudin", birthDate: "10 Agustus 2007", region: "Kartini" }] },
      { title: "Staff Tata Gerak Liturgi", people: [
        { name: "Vinsensius Calvine Jonathan", birthDate: "8 Oktober 1999", region: "Kebon Jeruk" },
        { name: "Bonifasius Maxien Mario", birthDate: "15 Mei 2002", region: "Non-Paroki" },
      ] },
      { title: "Staff Misa dan Ibadat Khusus", people: [
        { name: "Bridgia Livia Marcella", birthDate: "10 April 2008", region: "Kartini" },
        { name: "Lim Valencia Salvina Philicia Teana", birthDate: "23 Mei 2006", region: "Pang. Jayakarta" },
      ] },
    ],
  },
  {
    number: "05", title: "Administrasi dan Komunikasi", shortTitle: "Administrasi & Komunikasi", accent: "blue",
    deputy: { name: "Florentina Aurelia Regina Sabina", birthDate: "18 Juni 2003", region: "Keagungan" },
    groups: [
      { title: "Staff Notulensi dan Desain Visual", people: [
        { name: "Timotius Vincent Halim", birthDate: "22 Mei 2004", region: "Kartini" },
      ] },
      { title: "Staff SAPA", people: [
        { name: "Fransiskus De Sales Kenneth Hendra", birthDate: "16 Oktober 2006", region: "Mangga Besar 1" },
        { name: "Evangeline Jessica Evelyn Muksin", birthDate: "5 September 2008", region: "Kartini" },
      ] },
      { title: "Staff Proposal LPJ", people: [
        { name: "Ignatius Kelvin Leonardo", birthDate: "12 Januari 1997", region: "Dwiwarna" },
        { name: "Simon Zendy", birthDate: "28 Oktober 1986", region: "Keagungan" },
      ] },
      { title: "Staff Komunikasi SLL", people: [
        { name: "Emerentiana Yanti Liani", birthDate: "1 November 1967", region: "Kartini" },
      ] },
    ],
  },
  {
    number: "06", title: "Barang Liturgi dan Benda Devosi", shortTitle: "Barang Liturgi & Benda Devosi", accent: "coral",
    deputy: { name: "Dorothea Dermawaty Purba", birthDate: "17 Maret 1963", region: "Tangki" },
    groups: [
      { title: "Staff Inventaris", people: [
        { name: "Giovana Susanna", birthDate: "7 November 1978", region: "Dwiwarna" },
        { name: "Christian Nathanael Winoto", birthDate: "22 November 2008", region: "Mangga Dua-Kota" },
      ] },
      { title: "Staff Pengadaan Barang", people: [
        { name: "Gabriela Jocelyn Nathaniel", birthDate: "18 Maret 2007", region: "Mangga Dua-Kota" },
      ] },
    ],
  },
];

function PersonDetails({ person }: { person: Person }) {
  return (
    <p className="person-details">
      <span>{person.birthDate}</span>
      <span aria-hidden="true">·</span>
      <span>Wilayah {person.region}</span>
    </p>
  );
}

type Service = {
  number: string;
  icon: LucideIcon;
  title: string;
  text: string;
  accent: string;
  href?: string;
  action?: string;
  tags?: string[];
};

const serviceGroups: { label: string; columns: string; services: Service[] }[] = [
  {
    label: "Bidang 1–3 · Pendampingan", columns: "service-grid-one",
    services: [{
      number: "01", icon: UsersRound, title: "Pendampingan Subseksi", accent: "violet",
      text: "Pembinaan dan koordinasi sembilan subseksi agar para petugas siap melayani dalam perayaan liturgi.",
      tags: ["Parsius · Santaris · Caeremoniarius", "Lektor · Pemazmur · Pasdior", "Prodiakon · Kolatan · Dekorasi Altar"],
    }],
  },
  {
    label: "Bidang 4 · Perayaan dan ibadat", columns: "service-grid-three",
    services: [
      { number: "02", icon: Music2, title: "Musica Liturgia", accent: "violet", text: "Partitur, katalog lagu liturgi, serta materi pendampingan untuk organis, pemazmur, dan tim koor.", action: "Buka folder musik", href: links.musica },
      { number: "03", icon: UsersRound, title: "Tata Gerak Liturgi", accent: "blue", text: "Panduan sikap tubuh dan alur prosesi untuk membantu persiapan serta latihan petugas liturgi.", action: "Baca panduan", href: links.gerak },
      { number: "04", icon: FileText, title: "Misa & Ibadat Khusus", accent: "coral", text: "Koordinasi kebutuhan Misa dan ibadat khusus melalui layanan surat agar persiapan perayaan lebih tertata.", action: "Buka layanan surat", href: links.khusus },
    ],
  },
  {
    label: "Bidang 5 · Administrasi dan komunikasi", columns: "service-grid-four",
    services: [
      { number: "05", icon: ClipboardList, title: "Notulensi & Desain Visual", accent: "blue", text: "Mendokumentasikan hasil rapat dan menyiapkan materi visual untuk kebutuhan Seksi Liturgi." },
      { number: "06", icon: WalletCards, title: "Input Anggaran SAPA", accent: "violet", text: "Menghimpun dan memasukkan kebutuhan anggaran pelayanan liturgi ke SAPA." },
      { number: "07", icon: FileCheck2, title: "Proposal & LPJ", accent: "coral", text: "Menyiapkan proposal kegiatan dan laporan pertanggungjawaban agar rencana serta hasilnya terdokumentasi." },
      { number: "08", icon: MessagesSquare, title: "Komunikasi SLL", accent: "blue", text: "Menjaga komunikasi Seksi Liturgi dengan pelayanan liturgi di lingkungan." },
    ],
  },
  {
    label: "Bidang 6 · Perlengkapan liturgi", columns: "service-grid-two",
    services: [
      { number: "09", icon: Boxes, title: "Inventaris", accent: "violet", text: "Mendata dan memantau perlengkapan serta benda yang digunakan dalam pelayanan liturgi." },
      { number: "10", icon: PackagePlus, title: "Pengadaan Barang", accent: "coral", text: "Mengkoordinasikan kebutuhan dan pengadaan perlengkapan untuk pelayanan liturgi." },
    ],
  },
];

function ExternalLink({
  href,
  children,
  className = "",
  reveal = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  reveal?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      data-reveal={reveal ? "card" : undefined}
    >
      {children}
    </a>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const Icon = service.icon;
  const content = (
    <>
      <div className="service-card-top">
        <span className="service-icon"><Icon size={25} strokeWidth={1.8} aria-hidden="true" /></span>
        <span className="service-number">{service.number} / 10</span>
      </div>
      <h4>{service.title}</h4>
      <p className="service-description">{service.text}</p>
      {service.tags && (
        <ul className="service-tags" aria-label="Subseksi yang didampingi">
          {service.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      )}
      {service.action && <span className="service-action">{service.action} <ArrowUpRight size={19} aria-hidden="true" /></span>}
    </>
  );
  const className = `service-card accent-${service.accent}${service.href ? " service-card-linked" : ""}`;

  return service.href ? (
    <ExternalLink href={service.href} className={className} reveal>{content}</ExternalLink>
  ) : (
    <article className={className} data-reveal="card">{content}</article>
  );
}

function BrandLogos({ large = false }: { large?: boolean }) {
  return (
    <span className={`brand-logos ${large ? "brand-logos-large" : ""}`} aria-hidden="true">
      <span className="brand-logo brand-logo-paroki">
        <img
          src="/logo-paroki-mangga-besar.png"
          alt=""
          width={468}
          height={442}
        />
      </span>
      <span className="brand-logo brand-logo-liturgi">
        <img
          src="/logo-seksi-liturgi.png"
          alt=""
          width={1080}
          height={1080}
        />
      </span>
    </span>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDivision, setActiveDivision] = useState<(typeof divisions)[number] | null>(null);
  const divisionDialog = useRef<HTMLDialogElement>(null);
  const page = useRef<HTMLElement>(null);

  useEffect(() => {
    const root = page.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");
    let frame = 0;
    const updateVisibility = () => {
      frame = 0;
      const height = window.innerHeight;
      elements.forEach((element) => {
        const { top, bottom } = element.getBoundingClientRect();
        if (top < height * 0.88 && bottom > height * 0.08) {
          element.classList.add("is-visible");
        } else if (bottom < -80 || top > height + 80) {
          element.classList.remove("is-visible");
        }
      });
    };
    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(updateVisibility);
    };

    root.classList.add("motion-ready");
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    return () => {
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      if (frame) window.cancelAnimationFrame(frame);
      root.classList.remove("motion-ready");
    };
  }, []);

  useEffect(() => {
    if (activeDivision && !divisionDialog.current?.open) divisionDialog.current?.showModal();
  }, [activeDivision]);

  return (
    <main ref={page} className="min-h-screen overflow-x-hidden bg-[#faf8f4] text-[#1c2146]">
      <header className="site-header">
        <div className="page-shell flex h-[76px] items-center justify-between gap-5">
          <a
            href="#beranda"
            className="flex shrink-0 items-center gap-3"
            aria-label="Seksi Liturgi, kembali ke beranda"
          >
            <BrandLogos />
            <span className="leading-tight">
              <span className="block text-base font-extrabold tracking-tight">Seksi Liturgi</span>
              <span className="block text-[11px] font-bold uppercase tracking-[0.15em] text-[#bac5ff]">
                Paroki Mangga Besar
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-6 xl:flex" aria-label="Navigasi utama">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="nav-link">
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-white/25 xl:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <nav
            id="mobile-menu"
            className="border-t border-white/15 bg-[#171b45] px-5 pb-5 pt-3 xl:hidden"
            aria-label="Navigasi seluler"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-semibold text-white/85 hover:bg-white/10"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      <section id="beranda" className="hero-section">
        <div className="page-shell relative z-10 grid items-center gap-12 py-20 pt-36 lg:min-h-[760px] lg:grid-cols-[1.12fr_.88fr] lg:gap-16 lg:py-24 lg:pt-32">
          <div className="hero-copy max-w-[760px]">
            <div className="eyebrow"><Sparkles size={15} aria-hidden="true" /> SEKSI LITURGI · PAROKI MANGGA BESAR</div>
            <h1 className="mt-7 max-w-[820px] font-serif text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[.95] tracking-[-.055em]">
              Liturgi yang <span className="hero-highlight">hidup.</span> Pelayanan yang sepenuh hati.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#e1e5ff] sm:text-lg">
              Ruang bersama untuk mengenal pelayanan Seksi Liturgi Paroki Mangga Besar,
              menemukan sumber daya, dan mengikuti kalender liturgi. Bersama, kita merawat
              perayaan iman yang khidmat dan bermakna.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href="#layanan" className="button button-primary justify-center">
                Eksplorasi Layanan <ChevronDown size={17} aria-hidden="true" />
              </a>
              <ExternalLink href={links.schedule} className="button button-ghost justify-center">
                <CalendarDays size={18} aria-hidden="true" /> Jadwal Petugas
                <ArrowUpRight size={16} aria-hidden="true" />
              </ExternalLink>
            </div>
          </div>

          <div className="verse-wrap">
            <img
              className="hero-art-image"
              src="/liturgical-still-life.png"
              alt="Lilin menyala di samping Kitab Suci dan lembar partitur"
              width={1536}
              height={1024}
            />
            <div className="verse-card">
              <span className="verse-label">SPIRITUS SERVITII</span>
              <blockquote className="mt-3 font-serif text-[clamp(1.65rem,2.5vw,2.6rem)] font-medium italic leading-[1.06] tracking-tight">
                Sollicitudine non pigri<br />
                Spiritu Ferventes<br />
                Domino Servientes
              </blockquote>
              <div className="verse-bottom">
                <span>Rome 12:11</span>
                <span className="h-px flex-1 bg-white/25" />
                <BookOpenText size={20} strokeWidth={1.5} aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
        <div className="hero-bottom" aria-hidden="true" />
      </section>

      <section id="tentang" className="section-space scroll-mt-20">
        <div className="page-shell">
          <div className="section-intro" data-reveal="section">
            <span className="section-kicker">01 / TENTANG KAMI</span>
            <h2 className="section-heading">Wajah di balik <em>pelayanan.</em></h2>
            <p>
              Pengurus Seksi Liturgi Paroki Mangga Besar periode 2026–2029.
              Ketua bersama enam wakil bidang dan timnya melayani perayaan iman.
            </p>
          </div>

          <div className="org-chart mt-12 sm:mt-16">
            <article className="leader-card" data-reveal="card">
              <div className="leader-icon"><Cross size={24} strokeWidth={1.7} aria-hidden="true" /></div>
              <div>
                <span className="card-eyebrow">KETUA SEKSI LITURGI</span>
                <h3 className="person-name">{chair.name}</h3>
                <PersonDetails person={chair} />
              </div>
              <span className="leader-sparkle" aria-hidden="true">✦</span>
            </article>

            <div className="org-connector" aria-hidden="true">
              <span className="org-stem" />
              <span className="org-rail" />
            </div>

            <div className="division-grid">
              {divisions.map((division) => (
                <button
                  key={division.number}
                  type="button"
                  className={`division-summary accent-${division.accent}`}
                  data-reveal="card"
                  onClick={() => setActiveDivision(division)}
                  aria-label={`Lihat pengurus Bidang ${Number(division.number)}: ${division.title}`}
                >
                  <span className="division-summary-number">BIDANG {division.number}</span>
                  <span className="division-summary-title">{division.shortTitle}</span>
                  <span className="division-summary-action">Lihat pengurus <ArrowUpRight size={17} aria-hidden="true" /></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <dialog
        ref={divisionDialog}
        className={`division-dialog accent-${activeDivision?.accent ?? "violet"}`}
        aria-labelledby="division-dialog-title"
        onClose={() => setActiveDivision(null)}
        onClick={(event) => { if (event.target === event.currentTarget) divisionDialog.current?.close(); }}
      >
        {activeDivision && (
          <div className="division-detail">
            <div className="division-dialog-header">
              <div>
                <span className="division-number">BIDANG {activeDivision.number} / 06</span>
                <h2 id="division-dialog-title">{activeDivision.title}</h2>
              </div>
              <button type="button" className="division-dialog-close" onClick={() => divisionDialog.current?.close()} aria-label="Tutup detail bidang">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="division-deputy">
              <p className="card-eyebrow">WAKIL {Number(activeDivision.number)}</p>
              <p className="person-name">{activeDivision.deputy.name}</p>
              <PersonDetails person={activeDivision.deputy} />
            </div>
            <div className="division-groups">
              {activeDivision.groups.map((group) => (
                <div className="division-group" key={group.title}>
                  <h3>{group.title}</h3>
                  {group.people.length ? (
                    <ul>
                      {group.people.map((person) => (
                        <li key={person.name}>
                          <p className="person-name">{person.name}</p>
                          <PersonDetails person={person} />
                        </li>
                      ))}
                    </ul>
                  ) : <p className="vacant-role">-</p>}
                </div>
              ))}
            </div>
          </div>
        )}
      </dialog>

      <section id="layanan" className="section-space services-section scroll-mt-20">
        <div className="page-shell">
          <div className="section-intro section-intro-light" data-reveal="section">
            <span className="section-kicker">02 / PILAR LAYANAN</span>
            <h2 className="section-heading">Cari yang kamu butuhkan.<br /><em>Siap melayani.</em></h2>
            <p>Sepuluh bentuk pelayanan yang saling melengkapi, dari pendampingan petugas hingga perlengkapan perayaan.</p>
          </div>
          <div className="service-groups">
            {serviceGroups.map((group) => (
              <div className="service-group" key={group.label}>
                <h3 data-reveal="section">{group.label}</h3>
                <div className={`service-grid ${group.columns}`}>
                  {group.services.map((service) => <ServiceCard key={service.number} service={service} />)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="kalender" className="section-space calendar-section scroll-mt-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-16">
          <div data-reveal="section">
            <span className="section-kicker">03 / KALENDER LITURGI</span>
            <h2 className="section-heading mt-5">Menjalani tahun<br /><em>bersama Gereja.</em></h2>
            <p className="mt-5 max-w-lg text-base leading-8 text-[#626784]">
              Lihat penanggalan liturgi sebagai acuan menyiapkan nyanyian, bacaan,
              warna liturgi, dan pelayanan setiap perayaan.
            </p>
            <div className="mt-7 flex items-center gap-3 text-sm font-semibold text-[#4f5bc6]">
              <CalendarDays size={18} aria-hidden="true" />
              Pilih tahun untuk membuka kalender
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { year: "2026", href: links.calendar2026, index: "01" },
              { year: "2027", href: links.calendar2027, index: "02" },
            ].map((item) => (
              <ExternalLink key={item.year} href={item.href} className="calendar-card group" reveal>
                <span className="flex items-center justify-between text-sm font-bold text-[#676e98]">
                  KALENDER LITURGI <span>{item.index} / 02</span>
                </span>
                <span className="mt-12 block font-serif text-[clamp(4rem,9vw,6.5rem)] font-semibold leading-none tracking-tight">
                  {item.year}
                </span>
                <span className="mt-8 flex items-center justify-between border-t border-[#1c2146]/15 pt-5 text-sm font-bold">
                  Buka kalender <ArrowUpRight size={20} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </ExternalLink>
            ))}
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="page-shell grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_1fr]" data-reveal="section">
          <div>
            <div className="flex items-center gap-4"><BrandLogos large /><div><p className="text-base font-extrabold">Seksi Liturgi</p><p className="text-xs font-bold uppercase tracking-[.15em] text-[#b8c2ff]">Paroki Mangga Besar</p></div></div>
            <p className="mt-6 max-w-sm text-sm leading-7 text-[#c3c9e4]">
              Melayani bersama agar perayaan liturgi menjadi ruang perjumpaan yang benar, indah, hidup dan memerdekakan.
            </p>
          </div>
          <div>
            <h3 className="footer-heading">Jelajahi</h3>
            <div className="mt-5 flex flex-col gap-3">
              {navItems.slice(1).map((item) => (
                <a key={item.href} href={item.href} className="footer-link">{item.label}</a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="footer-heading">Alamat Gereja</h3>
            <div className="mt-5 flex gap-3 text-sm leading-7 text-[#c3c9e4]">
              <MapPin size={20} className="mt-1 shrink-0 text-[#e9c778]" aria-hidden="true" />
              <address className="not-italic">
                Jl. Raya Mangga Besar No.55 1, RT.1/RW.3, Tangki,
                Kec. Taman Sari, Kota Jakarta Barat,
                Daerah Khusus Ibukota Jakarta 11170
              </address>
            </div>
          </div>
        </div>
        <div className="page-shell mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-xs text-[#9da6d0] sm:flex-row sm:justify-between">
          <p>© 2026 Seksi Liturgi Paroki Mangga Besar. Seluruh hak cipta dilindungi.</p>
          <p>Ad Maiorem Dei Gloriam</p>
        </div>
      </footer>
    </main>
  );
}
