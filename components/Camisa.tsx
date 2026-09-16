/**
 * A camisa desenhada em SVG, frente e costas, que o configurador pinta
 * na hora: o corpo na cor principal, as mangas e a gola na cor de
 * detalhe, e nas costas o nome e o número em Anton. O texto escolhe
 * preto ou branco pela luminosidade da cor principal, para ler em
 * qualquer camisa.
 */
export function contraste(hex: string): string {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.6 ? "#111111" : "#ffffff";
}

const CORPO = "M64 34 L92 20 Q100 34 108 20 L136 34 L170 62 L146 84 L138 76 L138 208 L62 208 L62 76 L54 84 L30 62 Z";
const MANGA_E = "M64 34 L30 62 L54 84 L62 76 L62 56 Z";
const MANGA_D = "M136 34 L170 62 L146 84 L138 76 L138 56 Z";

export function Camisa({ principal, detalhe, nome, numero, costas = false, mangaLonga = false, className = "" }: { principal: string; detalhe: string; nome?: string; numero?: string; costas?: boolean; mangaLonga?: boolean; className?: string }) {
  const texto = contraste(principal);
  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label={costas ? `Costas da camisa${nome ? `, ${nome}` : ""}${numero ? `, número ${numero}` : ""}` : "Frente da camisa"}>
      {/* a sombra da camisa no chão */}
      <ellipse cx="100" cy="212" rx="60" ry="5" fill="rgba(0,0,0,0.18)" />
      <path d={CORPO} fill={principal} stroke="rgba(0,0,0,0.35)" strokeWidth="2" strokeLinejoin="round" />
      <path d={MANGA_E} fill={detalhe} stroke="rgba(0,0,0,0.35)" strokeWidth="2" strokeLinejoin="round" />
      <path d={MANGA_D} fill={detalhe} stroke="rgba(0,0,0,0.35)" strokeWidth="2" strokeLinejoin="round" />
      {mangaLonga ? (
        <>
          <path d="M30 62 L14 120 L40 128 L54 84 Z" fill={detalhe} stroke="rgba(0,0,0,0.35)" strokeWidth="2" strokeLinejoin="round" />
          <path d="M170 62 L186 120 L160 128 L146 84 Z" fill={detalhe} stroke="rgba(0,0,0,0.35)" strokeWidth="2" strokeLinejoin="round" />
        </>
      ) : null}
      {/* a gola */}
      {costas ? (
        <path d="M92 20 Q100 26 108 20 Q100 30 92 20 Z" fill={detalhe} stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
      ) : (
        <path d="M88 22 Q100 44 112 22 Q100 30 88 22 Z" fill={detalhe} stroke="rgba(0,0,0,0.35)" strokeWidth="2" />
      )}
      {/* a faixa de detalhe na barra */}
      <rect x="62" y="200" width="76" height="8" fill={detalhe} opacity="0.9" />
      {costas ? (
        <>
          <text x="100" y="98" textAnchor="middle" fill={texto} fontFamily="var(--font-display)" fontSize="15" letterSpacing="1.5">
            {(nome || "NOME").toUpperCase().slice(0, 12)}
          </text>
          <text x="100" y="172" textAnchor="middle" fill={texto} fontFamily="var(--font-display)" fontSize="74" className="camisa-numero">
            {(numero || "10").slice(0, 2)}
          </text>
        </>
      ) : (
        <>
          {/* o escudo e o patrocínio, como marcação de posição */}
          <circle cx="78" cy="66" r="7" fill="none" stroke={texto} strokeWidth="1.5" opacity="0.7" />
          <rect x="74" y="112" width="52" height="22" rx="2" fill="none" stroke={texto} strokeWidth="1.5" strokeDasharray="3 3" opacity="0.6" />
          <text x="100" y="126" textAnchor="middle" fill={texto} fontFamily="var(--font-corpo)" fontSize="8" fontWeight="700" opacity="0.7">
            PATROCÍNIO
          </text>
        </>
      )}
    </svg>
  );
}
