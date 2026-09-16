import Link from "next/link";
import { Logo, MarcaEstudio } from "./Marca";
import { Icone } from "./Icones";
import { PREVIA, site } from "@/data/site.config";
import type { Categoria } from "@/lib/tipos";

/**
 * O rodapé preto em colunas: a marca, as modalidades, o orçamento e a
 * fábrica. No celular cada coluna vira uma sanfona (details, sem JS).
 * A faixa de baixo leva o ©, o aviso de prévia e a assinatura do
 * estúdio.
 */
function Bloco({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <>
      <details className="rodape-sanfona border-t border-white/10 sm:hidden">
        <summary className="romana flex cursor-pointer list-none items-center justify-between py-4 text-[1.125rem] text-branco [&::-webkit-details-marker]:hidden">
          {titulo}
          <Icone nome="seta" className="rodape-seta h-4 w-4 text-marfim-fraco" />
        </summary>
        <div className="pb-5">{children}</div>
      </details>
      <div className="hidden sm:block">
        <h2 className="romana text-[1.125rem] text-branco">{titulo}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </>
  );
}

export function Rodape({ linkWhats, instagram, categorias = [], horario }: { linkWhats: string; instagram: string; categorias?: Categoria[]; horario?: string; creditos?: number }) {
  return (
    <footer className="escuro mt-16 lg:mt-20">
      <div className="h-1.5 w-full bg-vermelho" aria-hidden="true" />
      <div className="miolo grid gap-0 py-10 sm:grid-cols-2 sm:gap-10 sm:py-12 lg:grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] lg:gap-8 lg:py-16">
        <div className="pb-8 sm:pb-0">
          <Link href="/" aria-label="Olé Sports, página inicial" className="inline-flex rounded-[var(--raio)] bg-branco px-3 py-2">
            <Logo altura={44} />
          </Link>
          <p className="mt-4 max-w-[32ch] text-[0.9375rem] text-marfim-fraco">{site.posicionamento}. Fabricante em Birigui-SP.</p>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--vermelho btn--pequeno mt-5">
            <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
            (18) 99732-3453
          </a>
        </div>

        <Bloco titulo="Modalidades">
          <ul className="flex flex-col gap-2 text-[0.9375rem]">
            <li>
              <Link href="/catalogo" className="font-extrabold text-branco hover:text-vermelho">
                Todos os modelos
              </Link>
            </li>
            {categorias.map((c) => (
              <li key={c.slug}>
                <Link href={`/catalogo/${c.slug}`} className="text-marfim-fraco hover:text-branco">
                  {c.nome}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/#monte" className="font-extrabold text-branco hover:text-vermelho">
                Monte a sua camisa
              </Link>
            </li>
          </ul>
        </Bloco>

        <Bloco titulo="Orçamento">
          <ul className="flex flex-col gap-2 text-[0.9375rem]">
            <li>
              <a href={linkWhats} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 font-extrabold text-branco hover:text-vermelho">
                <Icone nome="whats" className="h-4 w-4 text-vermelho" />
                Pelo WhatsApp, sem compromisso
              </a>
            </li>
            <li className="text-marfim-fraco">Fixo {site.telefoneFixo}</li>
            <li className="text-marfim-fraco">{site.email}</li>
            <li className="text-marfim-fraco">Enviamos para todo o país.</li>
            {horario ? <li className="text-marfim-fraco">{horario}</li> : null}
          </ul>
        </Bloco>

        <Bloco titulo="A fábrica">
          <ul className="flex flex-col gap-2 text-[0.9375rem]">
            <li className="text-marfim-fraco">{site.endereco}</li>
            <li>
              <a href={site.maps} target="_blank" rel="noreferrer" className="text-branco hover:text-vermelho">
                Como chegar
              </a>
            </li>
            <li>
              <Link href="/#em-campo" className="text-branco hover:text-vermelho">
                A Olé em campo
              </Link>
            </li>
            {instagram ? (
              <li>
                <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-branco hover:text-vermelho">
                  <Icone nome="instagram" className="h-4 w-4" />@{instagram}
                </a>
              </li>
            ) : null}
          </ul>
        </Bloco>
      </div>

      <div className="border-t border-white/10 bg-preto-2">
        <div className="miolo flex flex-col items-center gap-4 py-5 text-center lg:flex-row lg:justify-between lg:text-left">
          <p className="max-w-[70ch] text-[0.8125rem] text-marfim-fraco">
            © {new Date().getFullYear()} Olé Sports Uniformes Esportivos, Birigui. {PREVIA ? "Prévia da vitrine, ainda não é a loja: as fotos são do Instagram da fábrica." : ""}
          </p>
          <a href="https://rafaelrazeira.com.br/landing-page" target="_blank" rel="noreferrer" aria-label="Vitrine feita por Rafael Razeira Estúdio" className="flex shrink-0 items-center gap-3 text-marfim-fraco transition-colors hover:text-branco">
            <span className="text-[0.75rem]">vitrine por</span>
            <MarcaEstudio altura={36} />
          </a>
        </div>
      </div>
    </footer>
  );
}
