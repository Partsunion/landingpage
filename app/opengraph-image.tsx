import { ImageResponse } from "next/og";

export const alt = "Partsunion Plattform für Autoteilehändler";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

export default function Image() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, color: "white", background: "linear-gradient(135deg,#071b22,#0b3554 55%,#2563eb)" }}>
      <div style={{ display: "flex", fontSize: 42, fontWeight: 800 }}>partsunion</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}><div style={{ color: "#67e8f9", fontSize: 22, fontWeight: 700, letterSpacing: 4 }}>FÜR AUTOTEILEHÄNDLER</div><div style={{ display: "flex", maxWidth: 900, fontSize: 64, lineHeight: 1.08, fontWeight: 650 }}>Dein Teilehandel. Alles verbunden. Ein System.</div></div>
    </div>,
    size,
  );
}
