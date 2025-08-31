import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "List App",
  description: "Chat application",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">{children}</body>
    </html>
  );
}
