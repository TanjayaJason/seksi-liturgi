import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets:["latin"], variable:"--font-manrope", display:"swap" });
const cormorant = Cormorant_Garamond({ subsets:["latin"], variable:"--font-cormorant", display:"swap", weight:["400","500","600","700"] });

export const metadata:Metadata = { title:"Seksi Liturgi | Paroki Mangga Besar", description:"Pusat informasi dan manajemen pelayanan Seksi Liturgi Gereja St. Petrus & Paulus, Paroki Mangga Besar.", icons:{ icon:"/favicon.ico", shortcut:"/favicon.ico" } };

export default function RootLayout({ children }:Readonly<{ children:React.ReactNode }>) {
  return <html lang="id" suppressHydrationWarning>
    <head>
      <script dangerouslySetInnerHTML={{ __html: 'try{if(sessionStorage.getItem("liturgi-splash-seen")==="1"||matchMedia("(prefers-reduced-motion: reduce)").matches)document.documentElement.classList.add("splash-bypass")}catch(e){}' }} />
    </head>
    <body className={`${manrope.variable} ${cormorant.variable} antialiased`}>{children}</body>
  </html>;
}
