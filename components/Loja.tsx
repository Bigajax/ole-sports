import { Icone } from "./Icones";
import { site } from "@/data/site.config";

/**
 * A fábrica, em giz claro: endereço em Birigui, WhatsApp, fixo e
 * e-mail (tudo das artes do feed), o atendimento por região (do link
 * da bio: Birigui, Rio Preto, Paraná e Oeste Paulista) e o mapa do
 * Google embutido. É o que faz "fabricante" ser uma promessa.
 */
export function Loja({ linkWhats, horario }: { linkWhats: string; horario?: string }) {
  return (
    <section id="fabrica" aria-labelledby="fabrica-titulo" className="areia mt-14 scroll-mt-24 lg:mt-20">
      <div className="miolo grid gap-8 py-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-center lg:py-16">
        <div>
          <h2 id="fabrica-titulo" className="secao">
            A fábrica fica em Birigui
          </h2>
          <p className="falada mt-4 max-w-[52ch] text-[1.0625rem] text-tinta-fraca">
            A Olé Sports fabrica os uniformes em Birigui, no interior de São Paulo, e atende por região: Birigui, Rio Preto, Oeste Paulista e Paraná, com envio para todo o país. Você manda o orçamento, a Olé responde com valores, prazo e a arte.
          </p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex gap-3">
              <Icone nome="pino" className="mt-0.5 h-6 w-6 shrink-0 text-gramado" peso={1.6} />
              <div>
                <dt className="text-[0.75rem] font-extrabold text-tinta-fraca">Endereço</dt>
                <dd className="mt-0.5 text-[0.9375rem] text-tinta">{site.endereco}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Icone nome="conversa" className="mt-0.5 h-6 w-6 shrink-0 text-gramado" peso={1.6} />
              <div>
                <dt className="text-[0.75rem] font-extrabold text-tinta-fraca">WhatsApp</dt>
                <dd className="mt-0.5 text-[0.9375rem] text-tinta">(18) 99732-3453</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Icone nome="telefone" className="mt-0.5 h-6 w-6 shrink-0 text-gramado" peso={1.6} />
              <div>
                <dt className="text-[0.75rem] font-extrabold text-tinta-fraca">Fixo</dt>
                <dd className="mt-0.5 text-[0.9375rem] text-tinta">{site.telefoneFixo}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Icone nome="email" className="mt-0.5 h-6 w-6 shrink-0 text-gramado" peso={1.6} />
              <div>
                <dt className="text-[0.75rem] font-extrabold text-tinta-fraca">E-mail</dt>
                <dd className="mt-0.5 break-all text-[0.9375rem] text-tinta">{site.email}</dd>
              </div>
            </div>
            {horario ? (
              <div className="flex gap-3 sm:col-span-2">
                <Icone nome="loja" className="mt-0.5 h-6 w-6 shrink-0 text-gramado" peso={1.6} />
                <div>
                  <dt className="text-[0.75rem] font-extrabold text-tinta-fraca">Horário</dt>
                  <dd className="mt-0.5 text-[0.9375rem] text-tinta">{horario}</dd>
                </div>
              </div>
            ) : null}
          </dl>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--vermelho">
              <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
              Falar com a fábrica
            </a>
            <a href={site.maps} target="_blank" rel="noreferrer" className="btn btn--linha">
              Como chegar
            </a>
          </div>
        </div>
        <div className="cartao overflow-hidden">
          <iframe title="Mapa: Olé Sports, Birigui" src={`https://www.google.com/maps?q=${encodeURIComponent("Av. Henrique Fernandes, 108, Novo Parque São Vicente, Birigui - SP")}&output=embed`} width="100%" height="320" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block w-full" />
        </div>
      </div>
    </section>
  );
}
