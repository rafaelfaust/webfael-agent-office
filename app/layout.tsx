import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Webfael Agent Office",
  description: "Painel 2D dos agentes operacionais da Webfael",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
