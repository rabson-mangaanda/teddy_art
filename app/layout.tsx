import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Teddy Mzumara Arts | Contemporary & Traditional Zambian Art",
    template: "%s | Teddy Mzumara Arts",
  },
  description:
    "Teddy Mzumara Arts — original paintings, sculptures, and custom commissions celebrating Zambian heritage. Based in Livingstone, Zambia.",
  keywords: [
    "Zambian art",
    "African art",
    "contemporary art",
    "paintings",
    "sculptures",
    "custom commissions",
    "Livingstone Zambia",
    "Teddy Mzumara",
  ],
  authors: [{ name: "Teddy Mzumara Arts" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://teddymzumaraarts.com",
    siteName: "Teddy Mzumara Arts",
    title: "Teddy Mzumara Arts | Contemporary & Traditional Zambian Art",
    description:
      "Celebrating heritage through authentic artworks. Custom commissions, exhibitions, and cultural crafts.",
    images: [
      {
        url: "https://imgur.com/I7jSXjr.jpg",
        width: 1200,
        height: 630,
        alt: "Teddy Mzumara Arts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teddy Mzumara Arts | Contemporary & Traditional Zambian Art",
    description:
      "Celebrating heritage through authentic artworks. Custom commissions, exhibitions, and cultural crafts.",
    images: ["https://imgur.com/I7jSXjr.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: {
    canonical: "https://teddymzumaraarts.com",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col font-sans antialiased bg-cream text-charcoal">
        {children}
      </body>
    </html>
  );
}
