import type { Metadata } from "next";
import { Epilogue, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const epilogue = Epilogue({
  subsets: ["latin"],
  weight: ["700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-epilogue-raw",
  display: "swap",
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-hanken-raw",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--font-jetbrains-raw",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Black Dog Billar Bar | Cocktails, Beer & Vintage Cue Club",
  description:
    "Black Dog Billar Bar: 4 mesas maestras con paño beige Simonis, bar y coctelería de autor y alma de rock clásico.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      className={`dark ${epilogue.variable} ${hankenGrotesk.variable} ${jetBrainsMono.variable}`}
      lang="es"
    >
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link crossOrigin="" href="https://fonts.gstatic.com" rel="preconnect" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-background font-body-md text-on-surface antialiased selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
