/**
 * Dados fixos do negócio. O que a fábrica edita no dia a dia (aviso do
 * topo, frase do hero, WhatsApp, horário) vive na tabela `config` e é
 * editável em /painel/config — não aqui.
 */

function resolverUrl(): string {
  const candidatos = [
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.NEXT_PUBLIC_VERCEL_URL,
    process.env.VERCEL_URL,
  ];

  for (const bruto of candidatos) {
    const valor = bruto?.trim();
    if (!valor) continue;
    const comProtocolo = /^https?:\/\//i.test(valor) ? valor : `https://${valor}`;
    try {
      return new URL(comProtocolo).origin;
    } catch {
      // valor malformado: tenta o próximo em vez de derrubar o build
    }
  }

  return "http://localhost:3000";
}

export const site = {
  nome: "Olé Sports",
  marca: "Olé Sports",
  posicionamento: "Uniformes esportivos personalizados, com sublimação digital, do amador ao profissional",
  cidade: "Birigui | SP",
  /* o WhatsApp das artes do feed. Na prévia ele não é usado: ver PREVIA. */
  whatsapp: "5518997323453",
  telefoneFixo: "(18) 3021-1380",
  email: "oleuniformes@outlook.com",
  instagram: "ole_sports",
  url: resolverUrl(),
  /* o endereço das artes do feed */
  endereco: "Av. Henrique Fernandes, 108, Novo Parque São Vicente, Birigui - SP",
  maps: "https://www.google.com/maps/search/?api=1&query=Av.+Henrique+Fernandes+108+Birigui+SP",
} as const;

/**
 * MODO PRÉVIA. Enquanto a vitrine é uma amostra, TODO botão de WhatsApp
 * aponta para o estúdio com a mesma mensagem. Quando a fábrica contratar:
 * PREVIA = null e o número acima passa a valer.
 */
export const PREVIA: { whatsapp: string; mensagem: string } | null = {
  whatsapp: "5544999997219",
  mensagem: "Oi! Vi a prévia da vitrine da Olé Sports e quero colocar no ar.",
};

/** Valores iniciais da tabela `config`. Sobrescritos pelo banco quando existirem. */
export const configPadrao: Record<string, string> = {
  whatsapp: site.whatsapp,
  instagram: site.instagram,
  cidade: site.cidade,
  /* frases separadas por "|": o cabeçalho reveza uma de cada vez */
  aviso_topo: "Fabricante de uniformes esportivos em Birigui | Enviamos para todo o país | Sublimação digital, do amador ao profissional | Orçamento sem compromisso pelo WhatsApp",
  frase_hero: "Seu time entra em campo fardado.",
  endereco: site.endereco,
  horario: "",
};
