import type { Metadata } from "next";
import { Anton, Manrope } from "next/font/google";
import { site } from "@/data/site.config";
import "./globals.css";

/* A Anton, alta e pesada em caixa alta, faz a manchete, os títulos e o
   número da camisa: é a letra das artes da Olé. A Manrope faz o corpo,
   os nomes dos modelos e os botões. */
const display = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--fonte-display",
  display: "swap",
});

const corpo = Manrope({
  subsets: ["latin"],
  weight: "variable",
  variable: "--fonte-corpo",
  display: "swap",
});

const TITULO = "Olé Sports: uniformes esportivos personalizados em Birigui, para todo o Brasil";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: TITULO,
    template: "%s · Olé Sports",
  },
  description: "Fabricante de uniformes esportivos com sublimação digital: futebol, futsal, camisa do Brasil personalizada, pesca, agasalhos e quadra. Monte a sua camisa com nome e número e peça o orçamento pelo WhatsApp.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Olé Sports",
    url: site.url,
    title: TITULO,
    description: site.posicionamento,
    images: [{ url: "/og/site.jpg", width: 1200, height: 630, alt: "Olé Sports" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITULO,
    description: site.posicionamento,
    images: ["/og/site.jpg"],
  },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${corpo.variable} antialiased`}>{children}</body>
    </html>
  );
}
