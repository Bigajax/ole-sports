import { PREVIA, site } from "@/data/site.config";
import type { Produto } from "./tipos";

function numero(whatsapp?: string) {
  return (whatsapp ?? site.whatsapp).replace(/\D/g, "");
}

export function linkWhatsApp(texto: string, whatsapp?: string): string {
  /* na prévia, o destino e a mensagem são fixos: ver PREVIA em site.config */
  if (PREVIA) return `https://wa.me/${PREVIA.whatsapp}?text=${encodeURIComponent(PREVIA.mensagem)}`;
  return `https://wa.me/${numero(whatsapp)}?text=${encodeURIComponent(texto)}`;
}

const BRL = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

export type Pedido = {
  whatsapp?: string;
  base?: string;
  tamanho?: string;
  cor?: string;
  quantidade?: number;
  observacao?: string;
  preco?: number | null;
};

/**
 * CTA de modelo: é um pedido de ORÇAMENTO, não de compra. A mensagem
 * chega estruturada, uma linha por coisa, para quem atende não precisar
 * perguntar o básico. O que a pessoa não preencheu não aparece.
 */
export function linkPeca(produto: Pick<Produto, "codigo" | "nome" | "slug">, opcoes: Pedido = {}): string {
  const base = opcoes.base ?? site.url;
  const url = `${base.replace(/\/$/, "")}/produto/${produto.slug}`;
  const quantidade = opcoes.quantidade && opcoes.quantidade > 0 ? opcoes.quantidade : null;
  const preco = opcoes.preco ?? null;

  const linhas = [
    "Oi! Vi no site da Olé Sports e quero um orçamento deste modelo:",
    `• ${produto.nome} (${produto.codigo})`,
    quantidade ? `• Quantidade: ${quantidade} peças` : "• Quantidade: a definir",
    opcoes.cor ? `• Cores: ${opcoes.cor}` : null,
    opcoes.tamanho ? `• Tamanhos: ${opcoes.tamanho}` : null,
    opcoes.observacao?.trim() ? `• Obs.: ${opcoes.observacao.trim()}` : null,
    preco !== null ? `• Referência no site: ${BRL.format(preco)}` : null,
    "Pode me passar valores e prazo?",
    url,
  ].filter(Boolean);

  return linkWhatsApp(linhas.join("\n"), opcoes.whatsapp);
}

/** CTA de conversa aberta: para quem só quer perguntar. */
export function linkAgendar(nome: string, whatsapp?: string): string {
  return linkWhatsApp(`Oi! Vi no site da Olé Sports e queria falar sobre: ${nome}.`, whatsapp);
}

export function linkGeral(whatsapp?: string): string {
  return linkWhatsApp("Oi! Vim pelo site da Olé Sports e quero fazer um orçamento.", whatsapp);
}
