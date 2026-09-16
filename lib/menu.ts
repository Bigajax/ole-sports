import type { Produto } from "./tipos";

/**
 * O menu das portas, montado do catálogo: cada porta do cabeçalho é
 * uma modalidade e abre uma aba ao passar o mouse, e o que está na aba
 * vem dos modelos (os atalhos por cor só aparecem se acham algo). Assim
 * a aba nunca promete o que a vitrine não tem.
 */
export type NomeIconeMenu = "novidade" | "futebol" | "futsal" | "selecao" | "pesca" | "agasalho" | "quadra" | "casual" | "camisa" | "sublimacao" | "caminhao" | "taca" | "loja" | "pino" | "conversa" | "instagram";

export type ItemMenu = {
  nome: string;
  href: string;
  icone?: NomeIconeMenu;
  nota?: string;
  externa?: boolean;
};

export type Aba = {
  chave: string;
  nome: string;
  href: string;
  icone: NomeIconeMenu;
  externa?: boolean;
  titulo?: string;
  itens: ItemMenu[];
  colunas: 1 | 2 | 3 | 4;
  /* o número ao lado do nome na fila de portas */
  total?: number;
  /* a linha miúda embaixo do nome, só na porta da fábrica */
  nota?: string;
};

/* a ordem das modalidades e o que cada uma diz de si; os slugs são os
   das categorias exportadas da oficina */
export const PORTAS: { slug: string; nome: string; curto: string; tudo: string; icone: NomeIconeMenu; linha: string }[] = [
  { slug: "futebol", nome: "Futebol", curto: "Futebol", tudo: "Todos os de futebol", icone: "futebol", linha: "camisa, calção e meião, com escudo, nome e número" },
  { slug: "futsal", nome: "Futsal", curto: "Futsal", tudo: "Todos os de futsal", icone: "futsal", linha: "o uniforme de quadra do seu time" },
  { slug: "selecao-brasileira", nome: "Camisa do Brasil", curto: "Brasil", tudo: "Tudo da seleção", icone: "selecao", linha: "a camisa da seleção com o seu nome e número" },
  { slug: "manga-longa-e-pesca", nome: "Manga longa e pesca", curto: "Pesca", tudo: "Todas as manga longa", icone: "pesca", linha: "camisa e jaqueta de pesca, equipe de luta, proteção para o sol" },
  { slug: "agasalhos", nome: "Agasalhos", curto: "Agasalhos", tudo: "Todos os agasalhos", icone: "agasalho", linha: "jaqueta e calça para o banco, o time e a empresa" },
  { slug: "quadra", nome: "Quadra", curto: "Quadra", tudo: "Tudo de quadra", icone: "quadra", linha: "handebol, vôlei e basquete" },
  { slug: "casual", nome: "Casual e empresas", curto: "Casual", tudo: "Todos os casuais", icone: "casual", linha: "camisa, polo, regata e camiseta para o dia a dia e para a empresa" },
];

/* as cores que viram atalho dentro de cada porta */
const CORES = ["Preto", "Vermelho", "Azul", "Amarelo", "Verde", "Branco", "Dourado", "Rosa", "Laranja"];

export function montarMenu(produtos: Produto[], linkWhats: string): Aba[] {
  const ativos = produtos.filter((p) => p.ativo);
  const conta = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).length;
  const busca = (cat: string, termo: string) => `/catalogo/${cat}?busca=${encodeURIComponent(termo)}`;
  const existe = (cat: string, termo: string) => ativos.some((p) => p.categoria_slug === cat && `${p.nome} ${p.cores.join(" ")}`.toLowerCase().includes(termo.toLowerCase()));

  return [
    ...PORTAS.filter((p) => conta(p.slug) > 0).map((porta): Aba => {
      const total = conta(porta.slug);
      return {
        chave: porta.slug,
        nome: porta.curto,
        href: `/catalogo/${porta.slug}`,
        icone: porta.icone,
        total,
        titulo: `${total} ${total === 1 ? "modelo" : "modelos"}: ${porta.linha}`,
        colunas: 2,
        itens: [
          ...CORES.filter((c) => existe(porta.slug, c)).map((c) => ({ nome: c, href: busca(porta.slug, c) })),
          { nome: porta.tudo, href: `/catalogo/${porta.slug}`, icone: porta.icone },
        ],
      };
    }),
    {
      chave: "fabrica",
      nome: "Monte a sua",
      href: "/#monte",
      icone: "camisa",
      nota: "nome, número e cores",
      colunas: 1,
      itens: [
        { nome: "Monte a sua camisa", href: "/#monte", icone: "camisa", nota: "escolhe cores, nome e número e pede o orçamento" },
        { nome: "A Olé em campo", href: "/#em-campo", icone: "taca", nota: "quem já vestiu a marca" },
        { nome: "A fábrica em Birigui", href: "/#fabrica", icone: "loja", nota: "endereço, telefones e atendimento por região" },
        { nome: "Orçamento pelo WhatsApp", href: linkWhats, icone: "conversa", nota: "sem compromisso", externa: true },
      ],
    },
  ];
}
