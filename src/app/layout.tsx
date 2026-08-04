import type { Metadata } from "next";
import { SequenceCanvas } from "@/components/sequence/SequenceCanvas";
import { ProgressScrubber } from "@/components/dev/ProgressScrubber";
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
        {/* Mounted once, for the life of the app — see SequenceCanvas's
            doc comment. Replaces the WebGL CanvasRoot used through
            Commit #8; same persistence principle, 2D canvas instead. */}
        <SequenceCanvas />
        {process.env.NODE_ENV === "development" && <ProgressScrubber />}
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
