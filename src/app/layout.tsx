// src/app/layout.tsx
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Improved default metadata
export const metadata: Metadata = {
  metadataBase: new URL("https://ivyapp.health"), // Assuming this will be the final domain
  title: {
    default: "IVY App: Evidence-Based IV Medication Management",
    template: "%s | IVY App",
  },
  description: "The gold standard resource for healthcare professionals seeking evidence-based information on IV medication administration, extravasation management, antidotes, and line requirements.",
  keywords: ["IV medication", "intravenous therapy", "extravasation", "antidotes", "vesicant", "irritant", "drug administration", "nursing", "pharmacy", "critical care", "oncology", "healthcare professional"],
  authors: [{ name: "IVY App Team" }], // Replace with actual author/org name
  openGraph: {
    title: "IVY App: Evidence-Based IV Medication Management",
    description: "Comprehensive IV medication resource for clinicians.",
    url: "https://ivyapp.health",
    siteName: "IVY App",
    // images: [ // Add a relevant OG image URL later
    //   {
    //     url: "/og-image.png", 
    //     width: 1200,
    //     height: 630,
    //   },
    // ],
    locale: "en_US",
    type: "website",
  },
  // twitter: { // Add Twitter specific card details later if needed
  //   card: "summary_large_image",
  //   title: "IVY App: Evidence-Based IV Medication Management",
  //   description: "Comprehensive IV medication resource for clinicians.",
  //   // images: ["/twitter-image.png"], 
  // },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true, // Assuming images aren't primary content for indexing
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Add icons/manifest later
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning> {/* Added suppressHydrationWarning for dark mode */} 
      <body 
        className={`${GeistSans.variable} ${GeistMono.variable} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col min-h-screen`}
      >
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

