import type { Metadata } from "next";
import { CanvasRoot } from "@/components/canvas/CanvasRoot";
import "./globals.css";

export const metadata: Metadata = {
  title: "Atelier Form — The Making of a Chair",
  description:
    "An immersive scroll-driven story of craftsmanship, from raw timber to finished form.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Mounted once, for the life of the app. Never move this into a
            page or section — see CanvasRoot's doc comment. */}
        <CanvasRoot />
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
