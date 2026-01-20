import type { Metadata } from "next";
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
      <body className="min-h-screen antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}

