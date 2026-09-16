import Image from "next/image";
import { Icone } from "./Icones";

/**
 * A Olé em campo, no preto: quem já vestiu a marca, tudo do feed. A
 * camisa do Brasil nas mãos do Ronaldo, o recado do César Sampaio, o
 * programa Resenha da Pérola que a Olé patrocina e o Último Zagueiro
 * FC, de Santos, em campo com o uniforme. É a prova social da fábrica,
 * sem inventar nada além das legendas.
 */
const MOMENTOS = [
  { src: "/marca/ronaldo.webp", alt: "Ronaldo segurando a camisa do Brasil feita pela Olé Sports", titulo: "A camisa do Brasil chegou ao Ronaldo", texto: "a camisa especial da Olé nas mãos de um dos maiores nomes do futebol" },
  { src: "/marca/cesar-sampaio.webp", alt: "César Sampaio gravando um recado", titulo: "O recado do César Sampaio", texto: "o ex-jogador destacou a importância de vestir uma marca que entende do jogo" },
  { src: "/marca/resenha.webp", alt: "Douradinho e Lincon Pires com as camisas da Olé", titulo: "Resenha da Pérola 98.9", texto: "a Olé patrocina o programa, de segunda a sexta, das 7h30 às 8h" },
  { src: "/marca/ultimo-zagueiro.webp", alt: "Jogadores do Último Zagueiro FC com o uniforme da Olé", titulo: "Último Zagueiro FC, Santos", texto: "o time em campo com o uniforme completo, de Birigui até o litoral" },
];

export function EmCampo({ linkWhats }: { linkWhats: string }) {
  return (
    <section id="em-campo" aria-labelledby="titulo-em-campo" className="escuro mt-14 scroll-mt-24 lg:mt-20">
      <div className="miolo py-12 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-end lg:gap-16">
          <div>
            <h2 id="titulo-em-campo" className="manchete max-w-[12ch] text-[clamp(2rem,4.5vw,3.25rem)] text-branco">
              A Olé em campo.
            </h2>
            <p className="falada mt-4 max-w-[42ch] text-[1.0625rem] text-white/80">
              Mais do que fabricar uniformes, a Olé veste histórias: times de várzea e profissionais, escolinhas, empresas, equipes de pesca e de luta, de Santos a São Mateus do Maranhão. Quem vive o futebol reconhece.
            </p>
            <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--vermelho mt-6">
              <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
              Quero o meu time aqui
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
            {MOMENTOS.map((m) => (
              <li key={m.src} className="min-w-0">
                <span className="foto veu block aspect-[3/4] rounded-[var(--raio)] bg-preto-2">
                  <Image src={m.src} alt={m.alt} fill sizes="(max-width: 1024px) 50vw, 18vw" className="object-cover object-top" />
                  <span className="absolute inset-x-0 bottom-0 z-[1] p-3 sm:p-4">
                    <span className="romana block text-[1rem] leading-none text-branco sm:text-[1.125rem]">{m.titulo}</span>
                    <span className="mt-1.5 block text-[0.75rem] leading-snug text-white/75 sm:text-[0.8125rem]">{m.texto}</span>
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
