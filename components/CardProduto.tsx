import Image from "next/image";
import Link from "next/link";
import { Icone } from "./Icones";
import { precoBRL } from "@/lib/formato";
import { temDesconto } from "@/lib/filtro";
import { linkPeca } from "@/lib/whatsapp";
import type { Categoria, Produto } from "@/lib/tipos";

/**
 * O cartão de modelo: foto quadrada, a modalidade em linha miúda, o
 * nome em duas linhas, uma linha da descrição e o botão "Pedir
 * orçamento" preso no pé, com a mensagem já montada. Preço nunca
 * aparece (tudo é orçamento); se um dia entrar, vira a placa vermelha.
 */
export function CardProduto({
  produto,
  categoria,
  prioridade = false,
  tamanhos = "(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 22vw",
}: {
  produto: Produto;
  categoria?: Categoria | null;
  prioridade?: boolean;
  tamanhos?: string;
}) {
  const capa = produto.imagens[0];
  const promo = temDesconto(produto);
  const cheio = precoBRL(produto.preco);
  const vigenteNumero = produto.preco_promocional ?? produto.preco;
  const vigente = precoBRL(vigenteNumero);
  const href = `/produto/${produto.slug}`;
  const pedir = linkPeca(produto, { preco: vigenteNumero ?? null });

  return (
    <article className="cartao group flex h-full flex-col">
      <Link href={href} className="foto block aspect-square rounded-b-none" aria-label={produto.nome}>
        {vigente ? (
          <span className="placa-etiqueta absolute left-3 top-3 z-[1] !flex items-baseline gap-2">
            <span className="preco">{vigente}</span>
            {promo && cheio ? <span className="text-[0.75rem] font-normal normal-case tracking-normal line-through opacity-70">{cheio}</span> : null}
          </span>
        ) : null}
        {capa ? (
          <Image src={capa.url} alt={capa.alt ?? produto.nome} fill sizes={tamanhos} placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} priority={prioridade} className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
        ) : null}
      </Link>

      <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
        <p className="etiqueta min-h-[1em]">{categoria?.nome ?? ""}</p>
        <h3 className="titulo-cartao mt-1 line-clamp-2 text-tinta">
          <Link href={href} className="hover:underline hover:decoration-vermelho hover:underline-offset-4">
            {produto.nome}
          </Link>
        </h3>
        <p className="mt-1 line-clamp-2 min-h-[1.25rem] text-[0.8125rem] leading-snug text-tinta-fraca">{produto.descricao ?? ""}</p>

        <div className="mt-auto pt-3">
          <a href={pedir} target="_blank" rel="noreferrer" className="btn btn--preto btn--pequeno w-full">
            <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
            Pedir orçamento
          </a>
        </div>
      </div>
    </article>
  );
}
