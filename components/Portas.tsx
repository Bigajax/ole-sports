import Image from "next/image";
import Link from "next/link";
import { Icone, type NomeIcone } from "./Icones";
import type { Produto } from "@/lib/tipos";

export type Porta = {
  nome: string;
  href: string;
  icone: NomeIcone;
  peca?: Produto | null;
  total: number;
  linha: string;
};

/**
 * As modalidades: cada porta é a foto do modelo da vez com uma placa
 * preta no pé, o desenho da modalidade, o nome em Anton e a contagem.
 * No hover a foto cresce e a placa vira vermelha. No celular rolam de
 * lado, duas por tela.
 */
export function Portas({ portas }: { portas: Porta[] }) {
  return (
    <section aria-labelledby="titulo-portas" className="miolo pt-12 lg:pt-16">
      <div className="regua">
        <h2 id="titulo-portas" className="secao">
          Qual é a sua modalidade?
        </h2>
        <Link href="/catalogo" className="btn btn--texto shrink-0">
          Ver todos os modelos
        </Link>
      </div>
      <ul className="faixa-scroll sangra mt-6 flex gap-3 overflow-x-auto pb-2 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible lg:px-0">
        {portas.map((p) => {
          const capa = p.peca?.imagens[0];
          return (
            <li key={p.nome} className="w-[46vw] shrink-0 sm:w-[15rem] lg:w-auto">
              <Link href={p.href} className="modalidade group">
                <span className="foto block aspect-[4/5] rounded-none">
                  {capa ? (
                    <Image src={capa.url} alt="" fill sizes="(max-width: 640px) 46vw, (max-width: 1024px) 30vw, 24vw" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]" />
                  ) : null}
                </span>
                <span className="modalidade-placa">
                  <span className="flex min-w-0 items-center gap-2.5">
                    <Icone nome={p.icone} className="h-6 w-6 shrink-0" peso={1.6} />
                    <span className="romana text-[1.0625rem] leading-none lg:text-[1.25rem]">{p.nome}</span>
                  </span>
                  <span className="shrink-0 text-[0.8125rem] font-extrabold opacity-80">{p.total}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
