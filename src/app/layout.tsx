import type { Metadata } from "next";
import { Footer } from "@/components/footer";
import { ClarityProvider } from "@/components/clarity-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Privacy UI Patterns",
  description: "A catalog of privacy-focused UI design patterns",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col antialiased" suppressHydrationWarning>
        <ClarityProvider>
          {children}
          <Footer />
        </ClarityProvider>
      </body>
    </html>
  );
}

