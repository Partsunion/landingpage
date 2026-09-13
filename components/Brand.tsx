export function Brand({ light = false }: { light?: boolean }) {
  return (
    <span className={`brand-lockup${light ? " brand-lockup-light" : ""}`} aria-label="Partsunion">
      <svg className="brand-mark" viewBox="20 175 460 150" aria-hidden="true">
        <image href="/brand/partsunion-logo.png" width="500" height="500" />
      </svg>
    </span>
  );
}
