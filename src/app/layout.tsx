import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider, THEME_INIT_SCRIPT } from "@/components/theme/ThemeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AnytimeHire — Hire at the speed of AI",
  description:
    "AI-led interviews that surface the right candidates — without the bias, the backlog, or the back-and-forth. Try the self-demo.",
  openGraph: {
    title: "AnytimeHire — Hire at the speed of AI",
    description:
      "AI-led interviews that surface the right candidates — without the bias, the backlog, or the back-and-forth.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
