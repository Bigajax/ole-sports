"use client";

import { useState } from "react";
import { Camisa } from "./Camisa";
import { Campo } from "./Campo";
import { Icone } from "./Icones";
import { linkWhatsApp } from "@/lib/whatsapp";

/**
 * O configurador: quem chega escolhe a modalidade, as duas cores, a
 * manga, escreve o nome e o número e vê a camisa mudar na hora, frente
 * e costas. O botão manda tudo isso numa mensagem estruturada para o
 * WhatsApp da fábrica. Não é um pedido fechado: é o orçamento que a
 * bio pede ("faça seu orçamento sem compromisso") já começado.
 */
const MODALIDADES = ["Futebol", "Futsal", "Camisa do Brasil", "Pesca (manga longa)", "Corrida", "Ciclismo", "Vôlei e handebol", "Casual e empresa"];

const CORES: { nome: string; hex: string }[] = [
  { nome: "Vermelho", hex: "#e11d2a" },
  { nome: "Preto", hex: "#111111" },
  { nome: "Branco", hex: "#ffffff" },
  { nome: "Azul royal", hex: "#1d4ed8" },
  { nome: "Azul celeste", hex: "#38bdf8" },
  { nome: "Verde", hex: "#15803d" },
  { nome: "Amarelo", hex: "#facc15" },
  { nome: "Laranja", hex: "#f97316" },
  { nome: "Rosa", hex: "#ec4899" },
  { nome: "Roxo", hex: "#7c3aed" },
  { nome: "Dourado", hex: "#d4a017" },
  { nome: "Cinza", hex: "#6b7280" },
];

function Amostras({ rotulo, valor, aoEscolher }: { rotulo: string; valor: string; aoEscolher: (hex: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-[0.75rem] font-extrabold text-white/80">{rotulo}</legend>
      <div className="flex flex-wrap gap-2">
        {CORES.map((c) => (
          <button key={c.hex} type="button" className="amostra" style={{ background: c.hex }} aria-label={c.nome} title={c.nome} aria-pressed={valor === c.hex} onClick={() => aoEscolher(c.hex)} />
        ))}
      </div>
    </fieldset>
  );
}

export function MonteSuaCamisa({ whatsapp }: { whatsapp: string }) {
  const [modalidade, setModalidade] = useState(MODALIDADES[0]);
  const [principal, setPrincipal] = useState("#e11d2a");
  const [detalhe, setDetalhe] = useState("#111111");
  const [mangaLonga, setMangaLonga] = useState(false);
  const [nome, setNome] = useState("");
  const [numero, setNumero] = useState("");
  const [quantidade, setQuantidade] = useState("");

  const nomeCor = (hex: string) => CORES.find((c) => c.hex === hex)?.nome ?? hex;
  const linhas = [
    "Oi! Montei uma camisa no site da Olé Sports e quero um orçamento:",
    `• Modalidade: ${modalidade}`,
    `• Cor principal: ${nomeCor(principal)}`,
    `• Cor de detalhe: ${nomeCor(detalhe)}`,
    `• Manga: ${mangaLonga ? "longa" : "curta"}`,
    nome.trim() ? `• Nome nas costas: ${nome.trim()}` : null,
    numero.trim() ? `• Número: ${numero.trim()}` : null,
    quantidade.trim() ? `• Quantidade: ${quantidade.trim()}` : "• Quantidade: a definir",
    "Pode me passar valores e prazo?",
  ].filter(Boolean);
  const link = linkWhatsApp(linhas.join("\n"), whatsapp);

  return (
    <section id="monte" aria-labelledby="titulo-monte" className="gramado relative mt-14 scroll-mt-24 overflow-hidden lg:mt-20">
      <Campo />
      <div className="miolo relative grid gap-10 py-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:items-center lg:gap-16 lg:py-20">
        <div className="min-w-0">
          <h2 id="titulo-monte" className="manchete max-w-[14ch] text-[clamp(2.25rem,6vw,3.25rem)] text-branco">
            Monte a sua camisa.
          </h2>
          <p className="falada mt-4 max-w-[46ch] text-[1.0625rem] text-white/85">
            Escolhe a modalidade, as cores, o nome e o número. A camisa muda na hora e o pedido de orçamento já sai pronto no WhatsApp. Escudo, patrocínios e estampa a Olé desenha com você.
          </p>

          <div className="mt-8 grid gap-5">
            <label className="campo-flutuante">
              <span>Modalidade</span>
              <select value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
                {MODALIDADES.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </label>

            <Amostras rotulo="Cor principal" valor={principal} aoEscolher={setPrincipal} />
            <Amostras rotulo="Cor de detalhe (mangas, gola e barra)" valor={detalhe} aoEscolher={setDetalhe} />

            <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_6rem_7rem]">
              <label className="campo-flutuante">
                <span>Nome nas costas</span>
                <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Ex.: RAFAEL" maxLength={12} />
              </label>
              <label className="campo-flutuante">
                <span>Número</span>
                <input value={numero} onChange={(e) => setNumero(e.target.value.replace(/\D/g, "").slice(0, 2))} inputMode="numeric" placeholder="10" maxLength={2} />
              </label>
              <label className="campo-flutuante">
                <span>Quantidade</span>
                <input value={quantidade} onChange={(e) => setQuantidade(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="Ex.: 22" maxLength={4} />
              </label>
            </div>

            <div className="flex flex-wrap gap-2">
              <button type="button" className="chip !border-white/60 !text-branco aria-pressed:!bg-branco aria-pressed:!text-preto" aria-pressed={!mangaLonga} onClick={() => setMangaLonga(false)}>
                Manga curta
              </button>
              <button type="button" className="chip !border-white/60 !text-branco aria-pressed:!bg-branco aria-pressed:!text-preto" aria-pressed={mangaLonga} onClick={() => setMangaLonga(true)}>
                Manga longa
              </button>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <a href={link} target="_blank" rel="noreferrer" className="btn btn--vermelho">
                <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
                Pedir orçamento no WhatsApp
              </a>
              <p className="miudo !text-white/70">Sem compromisso. A Olé responde com valores, prazo e a arte.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          <figure className="rounded-[var(--raio)] bg-white/10 p-4 backdrop-blur-sm sm:p-6">
            <Camisa principal={principal} detalhe={detalhe} mangaLonga={mangaLonga} className="h-auto w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]" />
            <figcaption className="romana mt-3 text-center text-[0.9375rem] text-white/80">Frente</figcaption>
          </figure>
          <figure className="rounded-[var(--raio)] bg-white/10 p-4 backdrop-blur-sm sm:p-6">
            <Camisa principal={principal} detalhe={detalhe} mangaLonga={mangaLonga} nome={nome} numero={numero} costas className="h-auto w-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]" />
            <figcaption className="romana mt-3 text-center text-[0.9375rem] text-white/80">Costas</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
