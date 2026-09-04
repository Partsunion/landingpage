import { ImageResponse } from 'next/og';
export const runtime = 'nodejs';
export const dynamic = 'force-static';
export const alt = 'Partsunion – die All-in-One-Plattform für Autoteilehändler';
export const size = { width: 1200, height: 630 } as const;
export const contentType = 'image/png';
export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        background: '#09233d',
        color: '#fff',
        padding: '52px 65px',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 29, fontWeight: 700 }}>partsunion</span>
        <span style={{ fontSize: 17, color: '#b9cfe3' }}>Software für den Autoteilehandel</span>
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 45 }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 61,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-2px',
          }}
        >
          <span>Alles verbunden.</span>
          <span style={{ color: '#8cbaff' }}>Alles verbunden.</span>
          <span style={{ color: '#8cbaff' }}>Ein System.</span>
        </div>
        <div style={{ width: 330, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              padding: '21px 23px',
              borderRadius: 12,
              background: '#d8f1e2',
              color: '#153e31',
              fontSize: 20,
            }}
          >
            Fahrzeugschein → VIN
          </div>
          <div
            style={{ display: 'flex', justifyContent: 'center', fontSize: 28, color: '#92baff' }}
          >
            ↓
          </div>
          <div
            style={{
              display: 'flex',
              padding: '21px 23px',
              borderRadius: 12,
              background: '#fff',
              color: '#19394f',
              fontSize: 20,
            }}
          >
            Automatische OE-Ermittlung
          </div>
          <div style={{ display: 'flex', fontSize: 15, color: '#c5d7e7', lineHeight: 1.6 }}>
            Angebot · Auftrag · Lager · Zahlung
          </div>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingTop: 23,
          borderTop: '1px solid #ffffff30',
          fontSize: 18,
          color: '#c4d6e7',
        }}
      >
        <span>ERP · WaWi · Kasse · OE-Ermittlung · WhatsApp-Bot</span>
        <span>partsunion.de</span>
      </div>
    </div>,
    size,
  );
}
