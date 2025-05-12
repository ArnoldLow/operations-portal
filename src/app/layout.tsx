import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operations Portal",
  description: "Fora Operations Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
