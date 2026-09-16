/**
 * Ícones de linha da fábrica, um traço só: a bola de futebol, a bola
 * de futsal (menor, com a quadra), a estrela da seleção, o anzol da
 * pesca, o agasalho, a bola de handebol, a polo casual, a camisa em si,
 * a impressora da sublimação, o caminhão, a taça. Os outros são os de
 * sempre. Herdam a cor do texto; o tamanho vem da className.
 */
export type NomeIcone =
  | "novidade"
  | "futebol"
  | "futsal"
  | "selecao"
  | "pesca"
  | "agasalho"
  | "quadra"
  | "casual"
  | "camisa"
  | "sublimacao"
  | "caminhao"
  | "taca"
  | "apito"
  | "loja"
  | "lupa"
  | "whats"
  | "conversa"
  | "etiqueta"
  | "cartao"
  | "pino"
  | "telefone"
  | "email"
  | "instagram"
  | "check"
  | "seta"
  | "seta-esq"
  | "fechar";

const TRACOS: Record<Exclude<NomeIcone, "whats">, React.ReactNode> = {
  novidade: <path d="M12 3.4l2.5 5.6 6.1.6-4.6 4.1 1.4 6L12 16.6l-5.4 3.1 1.4-6-4.6-4.1 6.1-.6z" />,
  /* a bola de futebol: o círculo com o pentágono e os raios */
  futebol: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5l4 2.9-1.5 4.7h-5L8 10.4z" />
      <path d="M12 7.5V3.2M16 10.4l4-1.3M14.5 15.1l2.5 3.5M9.5 15.1L7 18.6M8 10.4L4 9.1" />
    </>
  ),
  /* a quadra do futsal: o retângulo com a bola no meio */
  futsal: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="1.5" />
      <path d="M12 5v14M2.5 9.5h3v5h-3M21.5 9.5h-3v5h3" />
      <circle cx="12" cy="12" r="2.2" />
    </>
  ),
  /* a estrela da seleção */
  selecao: (
    <>
      <path d="M12 3.4l2.5 5.6 6.1.6-4.6 4.1 1.4 6L12 16.6l-5.4 3.1 1.4-6-4.6-4.1 6.1-.6z" />
      <path d="M9.5 12h5" />
    </>
  ),
  /* o anzol da pesca */
  pesca: (
    <>
      <path d="M14 3v10.5a4 4 0 0 1-8 0v-1" />
      <path d="M4 12.5l2-2 2 2" />
      <path d="M14 3h2.5M12.5 5.5L14 3l1.5 2.5" />
    </>
  ),
  /* o agasalho: o zíper no meio */
  agasalho: (
    <>
      <path d="M8.6 3.8c.5 1.5 1.8 2.4 3.4 2.4s2.9-.9 3.4-2.4l5 2.2 1.1 4.3-3.3 1.1v9.1H5.8v-9.1L2.5 10.3l1.1-4.3z" />
      <path d="M12 6.2v14.3M10.5 9h3M10.5 12h3M10.5 15h3" />
    </>
  ),
  /* a bola de handebol na mão: a quadra vale para vôlei e basquete */
  quadra: (
    <>
      <circle cx="12" cy="10" r="6.5" />
      <path d="M5.8 8c3 1 6 1.6 9.4 1.2M7 14.5c2.5-2 5.2-2.8 9-2.6M12 3.5c-1.5 3-1.5 9 0 13" />
      <path d="M8 20.5h8" />
    </>
  ),
  /* a polo: a gola com botão */
  casual: (
    <>
      <path d="M8.6 3.8c.5 1.5 1.8 2.4 3.4 2.4s2.9-.9 3.4-2.4l5 2.2 1.1 4.3-3.3 1.1v9.1H5.8v-9.1L2.5 10.3l1.1-4.3z" />
      <path d="M9.5 3.8l2.5 5 2.5-5M12 10.5v1.5" />
    </>
  ),
  /* a camisa de jogo, com o número */
  camisa: (
    <>
      <path d="M8.6 3.8c.5 1.5 1.8 2.4 3.4 2.4s2.9-.9 3.4-2.4l5 2.2 1.1 4.3-3.3 1.1v9.1H5.8v-9.1L2.5 10.3l1.1-4.3z" />
      <path d="M10.5 11.5l1.5-1v6" />
    </>
  ),
  /* a impressora da sublimação */
  sublimacao: (
    <>
      <path d="M7 8V3.5h10V8" />
      <rect x="3" y="8" width="18" height="8" rx="2" />
      <path d="M7 13.5h10v7H7z" />
      <path d="M17.5 11h.01" />
    </>
  ),
  caminhao: (
    <>
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 9.5h4l3 3.5v2.5h-7z" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="17" cy="17.5" r="1.8" />
    </>
  ),
  /* a taça */
  taca: (
    <>
      <path d="M7 4h10v5a5 5 0 0 1-10 0z" />
      <path d="M7 6H4a3 3 0 0 0 3 3.5M17 6h3a3 3 0 0 1-3 3.5" />
      <path d="M12 14v3M8.5 20.5h7M9.5 17h5v3.5h-5z" />
    </>
  ),
  apito: (
    <>
      <path d="M13 8h6.5a1.5 1.5 0 0 1 1.5 1.5V12l-7 2" />
      <circle cx="9" cy="14" r="5" />
      <path d="M13 8V6" />
    </>
  ),
  loja: (
    <>
      <path d="M3.5 9.5 5 4.5h14l1.5 5" />
      <path d="M3.5 9.5a2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0 2.1 2.1 0 0 0 4.25 0" />
      <path d="M5 11.5v8h14v-8" />
      <path d="M10 19.5v-4.5h4v4.5" />
    </>
  ),
  lupa: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="M20 20l-4.2-4.2" />
    </>
  ),
  conversa: (
    <>
      <path d="M4 5.5h16v10H9l-4 3.5z" />
      <path d="M8 9.5h8M8 12.5h5" />
    </>
  ),
  etiqueta: (
    <>
      <path d="M3.5 12.5v-8h8l9 9-8 8z" />
      <circle cx="7.5" cy="8.5" r="1.3" />
    </>
  ),
  cartao: (
    <>
      <rect x="2.5" y="5.5" width="19" height="13" rx="2" />
      <path d="M2.5 10h19M6.5 14.5h4" />
    </>
  ),
  pino: (
    <>
      <path d="M12 21s-6-5.5-6-11a6 6 0 0 1 12 0c0 5.5-6 11-6 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </>
  ),
  telefone: (
    <>
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="M3 8l9 6 9-6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.2 6.8h.01" />
    </>
  ),
  check: <path d="M5 12.5l4.5 4.5L19 7.5" />,
  seta: <path d="M9.5 6l6 6-6 6" />,
  "seta-esq": <path d="M14.5 6l-6 6 6 6" />,
  fechar: <path d="M6 6l12 12M18 6L6 18" />,
};

export function Icone({ nome, className = "h-6 w-6", peso = 1.5 }: { nome: NomeIcone; className?: string; peso?: number }) {
  if (nome === "whats") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="currentColor">
        <path d="M12 2.2a9.8 9.8 0 0 0-8.4 14.8L2.2 21.8l4.9-1.3A9.8 9.8 0 1 0 12 2.2zm0 17.9c-1.5 0-3-.4-4.2-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.1 8.1 0 1 1 12 20.1zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.3-.4.3-.4.8-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.9 11.9 0 0 0 4.5 4c1.7.7 2.3.8 3.1.6a2.7 2.7 0 0 0 1.8-1.2c.2-.6.2-1.1.2-1.2-.1-.2-.3-.3-.5-.4z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth={peso} strokeLinecap="round" strokeLinejoin="round">
      {TRACOS[nome]}
    </svg>
  );
}
