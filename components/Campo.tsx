/**
 * As linhas de giz do campo, vistas de cima: a linha do meio, o
 * círculo central, as duas grandes áreas com a pequena área e a
 * meia-lua. Vai atrás do hero e do configurador, em traço branco
 * translúcido, sem preencher nada. preserveAspectRatio "xMidYMid
 * slice" faz o campo cobrir o bloco inteiro, cortando as pontas.
 */
export function Campo({ className = "" }: { className?: string }) {
  return (
    <svg className={`campo-fundo ${className}`} viewBox="0 0 1050 680" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="3">
      <rect x="20" y="20" width="1010" height="640" />
      <line x1="525" y1="20" x2="525" y2="660" />
      <circle cx="525" cy="340" r="91.5" />
      <circle cx="525" cy="340" r="4" fill="currentColor" stroke="none" />
      {/* grande área e pequena área, esquerda */}
      <rect x="20" y="138" width="165" height="404" />
      <rect x="20" y="248" width="55" height="184" />
      <circle cx="130" cy="340" r="4" fill="currentColor" stroke="none" />
      <path d="M185 268a91.5 91.5 0 0 1 0 144" />
      {/* direita */}
      <rect x="865" y="138" width="165" height="404" />
      <rect x="975" y="248" width="55" height="184" />
      <circle cx="920" cy="340" r="4" fill="currentColor" stroke="none" />
      <path d="M865 412a91.5 91.5 0 0 1 0-144" />
      {/* os cantos */}
      <path d="M20 40a20 20 0 0 0 20-20M1010 20a20 20 0 0 0 20 20M40 660a20 20 0 0 0-20-20M1030 640a20 20 0 0 0-20 20" />
    </svg>
  );
}
