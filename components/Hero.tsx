import Image from "next/image";
import Link from "next/link";
import { Campo } from "./Campo";
import { Icone } from "./Icones";
import type { Produto } from "@/lib/tipos";

/**
 * A abertura, no gramado: as linhas de giz do campo atrás, à esquerda
 * a manchete em Anton (a frase do painel, "Seu time entra em campo
 * fardado."), a linha de apoio e os dois botões (vermelho para montar
 * a camisa, contorno para os modelos). À direita, o modelo da vez numa
 * foto grande com a placa da modalidade, e embaixo os outros destaques
 * em quadradinhos, como o banco de reservas.
 */
export function Hero({ frase, estrelas, linkWhats, totais }: { frase: string; estrelas: Produto[]; linkWhats: string; totais: { produtos: number; categorias: number } }) {
  const principal = estrelas[0];
  const capa = principal?.imagens[0];
  const outras = estrelas.slice(1, 6);

  return (
    <section aria-labelledby="titulo-hero" className="gramado relative overflow-hidden">
      <Campo />
      <div className="miolo relative grid min-w-0 gap-10 py-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-16 lg:py-20">
        <div className="min-w-0">
          <h1 id="titulo-hero" className="manchete max-w-[12ch] text-[clamp(3rem,11vw,4.5rem)] text-branco lg:text-[clamp(3.75rem,6.4vw,6.25rem)]">
            {frase}
          </h1>
          <p className="falada mt-6 max-w-[44ch] text-[1.0625rem] text-white/85 lg:text-[1.125rem]">
            Fabricante de uniformes esportivos em Birigui, com sublimação digital e envio para todo o país. {totais.produtos} modelos em {totais.categorias} modalidades, do amador ao profissional. Escudo, patrocínio, nome e número do seu jeito.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/#monte" className="btn btn--vermelho">
              <Icone nome="camisa" className="h-[1.125rem] w-[1.125rem]" peso={2} />
              Monte a sua camisa
            </Link>
            <Link href="/catalogo" className="btn btn--placa-fio">
              Ver os modelos
            </Link>
          </div>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-[0.9375rem] font-bold text-white/85 hover:text-branco">
            <Icone nome="whats" className="h-5 w-5" />
            Orçamento sem compromisso pelo WhatsApp
          </a>
        </div>

        {principal && capa ? (
          <div className="min-w-0">
            <Link href={`/produto/${principal.slug}`} className="group block">
              <span className="foto block aspect-square rounded-[var(--raio)] bg-gramado-2 shadow-[0_40px_70px_-40px_rgba(0,0,0,0.8)] sm:aspect-[4/3] lg:aspect-square">
                <Image src={capa.url} alt={capa.alt ?? principal.nome} fill priority sizes="(max-width: 1024px) 100vw, 46vw" placeholder={capa.blur ? "blur" : "empty"} blurDataURL={capa.blur ?? undefined} className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
                <span className="placa-etiqueta absolute left-4 top-4 z-[1]">Modelo da vez</span>
              </span>
              <span className="mt-3 flex items-center justify-between gap-3 text-[0.9375rem] text-white/85">
                <span>
                  Na foto: <span className="font-extrabold text-branco group-hover:underline group-hover:underline-offset-4">{principal.nome}</span>
                </span>
                <Icone nome="seta" className="h-5 w-5 shrink-0 text-branco" peso={2} />
              </span>
            </Link>

            {outras.length ? (
              <ul className="mt-4 flex flex-wrap items-center gap-2" aria-label="Outros modelos em destaque">
                {outras.map((p) => {
                  const f = p.imagens[0];
                  return (
                    <li key={p.id}>
                      <Link href={`/produto/${p.slug}`} title={p.nome} className="block h-14 w-14 overflow-hidden rounded-[var(--raio-mini)] border-2 border-white/70 bg-gramado-2 shadow-md transition-transform duration-300 hover:-translate-y-1 sm:h-16 sm:w-16">
                        {f ? <Image src={f.url} alt={p.nome} width={64} height={64} className="h-full w-full object-cover" /> : null}
                      </Link>
                    </li>
                  );
                })}
                <li className="basis-full text-[0.8125rem] font-bold text-white/75 sm:ml-1 sm:basis-auto">e mais {totais.produtos - estrelas.length} modelos no catálogo</li>
              </ul>
            ) : null}
          </div>
        ) : null}
      </div>
    </section>
  );
}
