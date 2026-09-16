import { Icone } from "./Icones";

/**
 * A faixa preta do WhatsApp: como o orçamento acontece, em três passos
 * numerados porque é uma sequência de fato, e o botão vermelho que
 * fecha. Nada de prazo nem de preço: quem responde é a fábrica.
 */
const PASSOS = [
  { n: "1", texto: "Escolhe um modelo ou monta a sua camisa" },
  { n: "2", texto: "Manda a mensagem que o botão já monta, com quantidade e cores" },
  { n: "3", texto: "A Olé responde com valores, prazo e a arte para aprovar" },
];

export function FaixaWhats({ linkWhats }: { linkWhats: string }) {
  return (
    <section aria-labelledby="titulo-faixa" className="miolo pt-12 lg:pt-16">
      <div className="escuro bloco grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,5fr)_1px_minmax(0,6fr)] lg:items-center lg:gap-12 lg:p-12">
        <div className="flex items-center gap-5">
          <Icone nome="apito" className="h-12 w-12 shrink-0 text-vermelho sm:h-14 sm:w-14" peso={1.6} />
          <div>
            <h2 id="titulo-faixa" className="manchete text-[clamp(1.75rem,3.4vw,2.5rem)] text-branco">
              Fechou o time? Pede o orçamento.
            </h2>
            <p className="mt-1 text-[0.9375rem] text-marfim-fraco">Sem compromisso: quem responde é a fábrica.</p>
          </div>
        </div>

        <div className="hidden h-full bg-white/15 lg:block" aria-hidden="true" />

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between lg:gap-8">
          <ol className="flex flex-col gap-2.5">
            {PASSOS.map((p) => (
              <li key={p.n} className="flex items-baseline gap-3 text-[0.9375rem] text-branco">
                <span className="romana grid h-7 w-7 shrink-0 place-items-center rounded-[var(--raio-mini)] bg-vermelho text-[0.9375rem] text-branco">{p.n}</span>
                {p.texto}
              </li>
            ))}
          </ol>
          <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--vermelho shrink-0">
            <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
            Chamar agora
          </a>
        </div>
      </div>
    </section>
  );
}
