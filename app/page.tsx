"use client";

import {
  ArrowUpRight,
  BookOpenText,
  CalendarDays,
  ChevronDown,
  Cross,
  FileText,
  MapPin,
  Menu,
  Music2,
  Sparkles,
  UsersRound,
  X,
} from "lucide-react";
import { useState } from "react";

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

const teams = [
  {
    number: "01",
    icon: Music2,
    title: "Musica Liturgia",
    people: ["Alfonsus Yosef Gabriel Syamsudin"],
    accent: "violet",
  },
  {
    number: "02",
    icon: UsersRound,
    title: "Tata Gerak Liturgi",
    people: ["Bonifasius Maxien Mario", "Vinsensius Calvine Jonathan"],
    accent: "blue",
  },
  {
    number: "03",
    icon: FileText,
    title: "Misa dan Ibadat Khusus",
    people: ["Lim Valencia Salvina Philicia Teana", "Bridgia Livia Marcella"],
    accent: "coral",
  },
];

const services = [
  {
    number: "01",
    icon: Music2,
    title: "Musica Liturgia",
    text: "Partitur, katalog lagu liturgi, serta materi pendampingan untuk organis, pemazmur, dan tim koor.",
    action: "Buka folder musik",
    href: links.musica,
    accent: "violet",
  },
  {
    number: "02",
    icon: UsersRound,
    title: "Tata Gerak Liturgi",
    text: "Panduan sikap tubuh, alur prosesi, serta pelayanan misdinar dan lektor. Tim juga mendampingi latihan dan gladi resik agar perayaan berjalan tertib.",
    action: "Baca panduan",
    href: links.gerak,
    accent: "blue",
  },
  {
    number: "03",
    icon: FileText,
    title: "Misa & Ibadat Khusus",
    text: "Mengelola surat kebutuhan acara khusus dalam Misa dan ibadat khusus, agar persiapan pelayanan terkoordinasi dengan baik.",
    action: "Buka layanan surat",
    href: links.khusus,
    accent: "coral",
  },
];

function ExternalLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
    </a>
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

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#faf8f4] text-[#1c2146]">
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
          <div className="max-w-[760px]">
            <div className="eyebrow"><Sparkles size={15} aria-hidden="true" /> RUANG KERJA PELAYAN LITURGI</div>
            <h1 className="mt-7 max-w-[820px] font-serif text-[clamp(3.2rem,7vw,6.4rem)] font-semibold leading-[.95] tracking-[-.055em]">
              Liturgi yang <span className="hero-highlight">hidup.</span> Pelayanan yang sepenuh hati.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-[#e1e5ff] sm:text-lg">
              Pusat informasi &amp; manajemen Tata Laksana Perayaan dan Ibadat.
              Mewujudkan perayaan liturgi yang benar, indah, hidup dan memerdekakan.
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
          <div className="section-intro">
            <span className="section-kicker">01 / TENTANG KAMI</span>
            <h2 className="section-heading">Wajah di balik <em>pelayanan.</em></h2>
            <p>
              Seksi Liturgi menyiapkan pelayanan liturgi bersama. Satu koordinasi,
              tiga subdivisi yang berjalan setara dalam merawat perayaan iman.
            </p>
          </div>

          <div className="org-chart mt-12 sm:mt-16">
            <article className="leader-card">
              <div className="leader-icon"><Cross size={24} strokeWidth={1.7} aria-hidden="true" /></div>
              <div>
                <span className="card-eyebrow">WAKIL KETUA BIDANG 4</span>
                <h3 className="person-name">Anthony Edward Tanjaya Jason Winata</h3>
                <p>Bagian Tata Laksana, Perayaan, dan Ibadat</p>
              </div>
              <span className="leader-sparkle" aria-hidden="true">✦</span>
            </article>

            <div className="org-connector" aria-hidden="true">
              <span className="org-stem" />
              <span className="org-rail" />
            </div>

            <div className="grid gap-4 md:grid-cols-3 lg:gap-5">
              {teams.map((team) => {
                const Icon = team.icon;
                return (
                  <article key={team.title} className={`team-card accent-${team.accent}`}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="team-icon"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></div>
                      <span className="team-number">{team.number} / 03</span>
                    </div>
                    <h3 className="mt-7 font-serif text-[1.75rem] font-semibold leading-tight">
                      {team.title}
                    </h3>
                    <div className="mt-7 border-t border-current/10 pt-5">
                      <p className="card-eyebrow">STAF</p>
                      <ul className="mt-3 space-y-3">
                        {team.people.map((person) => (
                          <li key={person} className="person-name flex gap-2.5">
                            <span className="mt-[.48rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current" aria-hidden="true" />
                            {person}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="layanan" className="section-space services-section scroll-mt-20">
        <div className="page-shell">
          <div className="section-intro section-intro-light">
            <span className="section-kicker">02 / PILAR LAYANAN</span>
            <h2 className="section-heading">Cari yang kamu butuhkan.<br /><em>Siap melayani.</em></h2>
            <p>Tiga ruang sumber daya untuk mempersiapkan pelayanan dengan jelas, serasi, dan penuh penghayatan.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <ExternalLink key={service.title} href={service.href} className={`service-card accent-${service.accent}`}>
                  <div className="flex items-start justify-between">
                    <span className="service-icon"><Icon size={26} strokeWidth={1.8} aria-hidden="true" /></span>
                    <span className="team-number">{service.number} / 03</span>
                  </div>
                  <h3 className="mt-9 font-serif text-[2rem] font-semibold leading-tight">{service.title}</h3>
                  <p className="mt-4 leading-7 text-[#555b7a]">{service.text}</p>
                  <span className="service-action">
                    {service.action} <ArrowUpRight size={19} aria-hidden="true" />
                  </span>
                </ExternalLink>
              );
            })}
          </div>
        </div>
      </section>

      <section id="kalender" className="section-space calendar-section scroll-mt-20">
        <div className="page-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-16">
          <div>
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
              <ExternalLink key={item.year} href={item.href} className="calendar-card group">
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
        <div className="page-shell grid gap-10 md:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_1fr]">
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
