/** Original technical vector illustration; no simulated product interface. */
export function PartsIllustration() {
  return (
    <figure
      className="mk-engineering"
      aria-label="Teilegrafik: Anfrage, Teileprüfung und Auftrag gehören zusammen."
    >
      <svg viewBox="0 0 560 470" fill="none" aria-hidden="true">
        <defs>
          <pattern
            id="rotor-hatch"
            width="8"
            height="8"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <path d="M0 0V8" stroke="#becbd0" />
          </pattern>
        </defs>
        <path d="M37 60H520M37 409H520M72 30V441M488 30V441" stroke="#dae0dc" />
        <path d="M56 60H88M72 44V76M472 409H504M488 393V425" stroke="#8fa0a5" />
        <g transform="translate(269 231) rotate(-25)">
          <circle cx="15" cy="18" r="158" fill="#e0e5e0" stroke="#163344" strokeWidth="1.6" />
          <path
            d="M-127 112L-112 130M-147 63L-132 81M-153 13L-138 31M-137-64L-122-46M67 143L82 161M122 101L137 119M149 43L164 61"
            stroke="#526b78"
          />
          <circle r="158" fill="#eef0e9" stroke="#163344" strokeWidth="2" />
          <circle r="145" stroke="#899b9f" />
          <circle r="133" stroke="#c1cbc7" />
          <circle r="107" stroke="#c1cbc7" />
          <circle r="94" fill="url(#rotor-hatch)" stroke="#163344" strokeWidth="1.5" />
          <circle r="72" fill="#dce7ec" stroke="#163344" strokeWidth="1.7" />
          <circle r="60" stroke="#768e9a" strokeDasharray="3 5" />
          <circle r="33" fill="#17374a" />
          <circle r="24" fill="#f5f5f0" stroke="#9aaab1" />
          {[0, 72, 144, 216, 288].map((angle) => (
            <g key={angle} transform={`rotate(${angle})`}>
              <circle cy="-51" r="7" fill="#f5f5f0" stroke="#17374a" strokeWidth="1.5" />
              <path
                d="M-13-114L14-128M-13-131L14-145"
                stroke="#849a9f"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          ))}
          <path d="M-177 0H177M0-177V177" stroke="#627e92" strokeDasharray="7 6" opacity=".55" />
        </g>
        <path d="M177 109L133 66H38" stroke="#175cda" strokeWidth="1.5" />
        <circle cx="177" cy="109" r="4" fill="#175cda" />
        <rect x="24" y="29" width="149" height="40" rx="3" fill="#fff" stroke="#cad4d3" />
        <text
          x="38"
          y="54"
          fontSize="13"
          fontFamily="var(--font-geist-sans),sans-serif"
          fill="#52616b"
        >
          01
        </text>
        <text
          x="65"
          y="54"
          fontSize="15"
          fontFamily="var(--font-geist-sans),sans-serif"
          fill="#122b3b"
        >
          Teileanfrage
        </text>
        <path d="M310 230H465V180" stroke="#175cda" strokeWidth="1.5" />
        <circle cx="310" cy="230" r="4" fill="#175cda" />
        <rect x="382" y="139" width="156" height="42" rx="3" fill="#175cda" />
        <text
          x="396"
          y="165"
          fontSize="13"
          fontFamily="var(--font-geist-sans),sans-serif"
          fill="#fff"
        >
          02
        </text>
        <text
          x="423"
          y="165"
          fontSize="15"
          fontFamily="var(--font-geist-sans),sans-serif"
          fill="#fff"
        >
          Teileprüfung
        </text>
        <path d="M348 358L399 406H520" stroke="#175cda" strokeWidth="1.5" />
        <circle cx="348" cy="358" r="4" fill="#175cda" />
        <rect x="391" y="385" width="146" height="42" rx="3" fill="#fff" stroke="#cad4d3" />
        <text
          x="405"
          y="411"
          fontSize="13"
          fontFamily="var(--font-geist-sans),sans-serif"
          fill="#52616b"
        >
          03
        </text>
        <text
          x="432"
          y="411"
          fontSize="15"
          fontFamily="var(--font-geist-sans),sans-serif"
          fill="#122b3b"
        >
          Auftrag
        </text>
        <path d="M40 333V372H79" stroke="#8fa0a5" />
        <text x="40" y="395" fontSize="11" fontFamily="monospace" fill="#52616b">
          PARTS / CONNECTED
        </text>
      </svg>
      <figcaption className="mk-engineering-caption">
        <b>Jedes Teil. Ein durchgängiger Ablauf.</b>
        <span>Partsunion / Warenwirtschaft</span>
      </figcaption>
    </figure>
  );
}
