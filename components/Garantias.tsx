import Link from "next/link";
import { Icone, type NomeIcone } from "./Icones";

/**
 * O que a fábrica cumpre de fato, numa faixa de giz logo depois do
 * gramado: sublimação digital, envio para todo o país, do amador ao
 * profissional (todos ditos nas artes do feed) e orçamento pelo
 * WhatsApp (a bio). Nada de prazo, pedido mínimo ou preço.
 */
const ITENS: { icone: NomeIcone; titulo: string; texto: string; href: string; externa?: boolean }[] = [
  { icone: "sublimacao", titulo: "Sublimação digital", texto: "cores vivas, estampa que não desbota", href: "/#monte" },
  { icone: "caminhao", titulo: "Enviamos para todo o país", texto: "de Santos ao Maranhão", href: "/#em-campo" },
  { icone: "taca", titulo: "Do amador ao profissional", texto: "o padrão é o mesmo", href: "/catalogo" },
  { icone: "conversa", titulo: "Orçamento pelo WhatsApp", texto: "sem compromisso, com a arte junto", href: "", externa: true },
];

export function Garantias({ linkWhats }: { linkWhats: string }) {
  return (
    <section aria-label="Como a fábrica trabalha" className="areia">
      <ul className="miolo garantias">
        {ITENS.map((i) => {
          const href = i.href || linkWhats;
          const conteudo = (
            <>
              <span className="garantia-icone">
                <Icone nome={i.icone} className="h-6 w-6" peso={1.6} />
              </span>
              <span className="min-w-0">
                <span className="garantia-titulo">{i.titulo}</span>
                <span className="block text-[0.8125rem] leading-snug text-tinta-fraca">{i.texto}</span>
              </span>
            </>
          );
          return (
            <li key={i.titulo}>
              {i.externa ? (
                <a href={href} target="_blank" rel="noreferrer" className="garantia">
                  {conteudo}
                </a>
              ) : (
                <Link href={href} className="garantia">
                  {conteudo}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
