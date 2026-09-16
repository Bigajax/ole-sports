import Image from "next/image";
import Link from "next/link";
import type { Produto } from "@/lib/tipos";

export type Vitrine = {
  titulo: string;
  texto: string;
  href: string;
  peca: Produto;
  acao?: string;
  /* a placa de baixo: gramado ou preto */
  tom?: "gramado" | "escuro";
};

/**
 * Duas vitrines grandes lado a lado, como os banners de campanha: a
 * foto ocupa o cartão, e embaixo dela uma placa (gramado ou preto)
 * leva o título em Anton, a linha de apoio e o botão.
 */
export function Vitrines({ vitrines }: { vitrines: Vitrine[] }) {
  if (!vitrines.length) return null;
  return (
    <section aria-label="Destaques" className="miolo pt-14 lg:pt-20">
      <ul className="grid gap-4 md:grid-cols-2 lg:gap-6">
        {vitrines.map((v) => {
          const capa = v.peca.imagens[0];
          const tom = v.tom ?? "gramado";
          return (
            <li key={v.titulo}>
              <Link href={v.href} className="bloco group block shadow-[0_24px_50px_-30px_rgba(0,0,0,0.5)]">
                <span className="foto block aspect-[16/10] rounded-b-none">
                  {capa ? (
                    <Image
                      src={capa.url}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw, 36rem"
                      placeholder={capa.blur ? "blur" : "empty"}
                      blurDataURL={capa.blur ?? undefined}
                      className="object-cover object-[center_30%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  ) : null}
                </span>
                <span className={`${tom} flex items-center justify-between gap-4 p-5 sm:p-6`}>
                  <span className="min-w-0">
                    <span className="manchete block text-[clamp(1.375rem,2.4vw,1.875rem)]">{v.titulo}</span>
                    <span className="mt-1 block text-[0.875rem] opacity-85">{v.texto}</span>
                  </span>
                  <span className="btn btn--placa-fio shrink-0">{v.acao ?? "Conferir"}</span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
