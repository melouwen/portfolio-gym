import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers";
import { ScrollToTopButton } from "@/components/ui/ScrollToTopButton";
import { SiteBackground } from "@/components/ui/SiteBackground";

export const metadata: Metadata = {
  title: "Strong Muscle Gym (SMG)",
  description: "Premium fitness club. Strength. Technology. Results.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className="min-h-dvh text-[var(--smg-text)] antialiased">
        <AppProviders>
          <SiteBackground />
          {children}
          <ScrollToTopButton />
        </AppProviders>
      </body>
    </html>
  );
}