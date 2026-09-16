"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "./Marca";
import { Icone } from "./Icones";
import type { Aba } from "@/lib/menu";
import type { Categoria } from "@/lib/tipos";

/**
 * O cabeçalho em branco, como a placa do estádio: o aviso preto no
 * alto (frases do painel separadas por "|", que se revezam), a linha da
 * marca (a logo à esquerda, a busca no meio, o WhatsApp vermelho à
 * direita) e a fila de modalidades, com o desenho, o nome em Anton e a
 * contagem. No desktop, passar o mouse numa porta abre a aba dela; o
 * clique abre a página. O botão Menu abre uma gaveta preta pela
 * direita. No celular: menu à esquerda, marca no meio, WhatsApp à
 * direita, a busca larga logo abaixo e a fila rolando de lado.
 */
export function Cabecalho({ linkWhats, aviso, menu }: { categorias?: Categoria[]; linkWhats: string; aviso?: string; menu: Aba[] }) {
  const [aberto, setAberto] = useState(false);
  const [termo, setTermo] = useState("");
  const router = useRouter();
  const caminho = usePathname();
  const base = (aviso ?? "").split("|").map((f) => f.trim()).filter(Boolean);
  const frases = base.length ? Array.from({ length: 4 }, (_, i) => base[i % base.length]) : [];

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    window.addEventListener("keydown", fechar);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fechar);
      document.body.style.overflow = "";
    };
  }, [aberto]);

  function buscar(e: React.FormEvent) {
    e.preventDefault();
    const q = termo.trim();
    setAberto(false);
    router.push(q ? `/catalogo?busca=${encodeURIComponent(q)}` : "/catalogo");
  }

  const atual = (href: string) => href.startsWith("/catalogo/") && caminho.startsWith(href.split("?")[0]);

  const busca = (id: string, placeholder: string) => (
    <label className="busca-cabecalho">
      <span className="sr-only">Buscar um modelo</span>
      <input id={id} value={termo} onChange={(e) => setTermo(e.target.value)} placeholder={placeholder} />
      <button type="submit" aria-label="Buscar">
        <Icone nome="lupa" className="h-5 w-5" peso={2} />
      </button>
    </label>
  );

  return (
    <header className="relative z-50 bg-branco [overflow-x:clip]">
      {frases.length ? (
        <p className="escuro aviso hidden text-[0.8125rem] font-extrabold lg:block" aria-live="off">
          {frases.map((f, i) => (
            <span key={i} className="aviso-item" style={{ "--i": i } as React.CSSProperties}>
              {f}
            </span>
          ))}
        </p>
      ) : null}

      <div>
        <div className="miolo flex h-[4.5rem] items-center justify-between gap-3 lg:grid lg:h-[5.75rem] lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-10">
          <button type="button" onClick={() => setAberto(true)} aria-expanded={aberto} aria-controls="menu-categorias" aria-label="Abrir o menu" className="flex h-10 w-10 items-center justify-center lg:hidden">
            <span aria-hidden="true" className="flex flex-col gap-[5px]">
              <span className="block h-[2px] w-6 bg-preto" />
              <span className="block h-[2px] w-6 bg-preto" />
              <span className="block h-[2px] w-6 bg-preto" />
            </span>
          </button>

          <Link href="/" aria-label="Olé Sports, página inicial" className="flex shrink-0 items-center">
            <Logo altura={40} prioridade className="lg:hidden" />
            <span className="hidden lg:inline-flex">
              <Logo altura={54} prioridade />
            </span>
          </Link>

          <form onSubmit={buscar} role="search" className="mx-auto hidden w-full max-w-[30rem] lg:block">
            {busca("busca-topo", "Futebol, camisa do Brasil, pesca, agasalho...")}
          </form>

          <div className="flex items-center gap-2 lg:gap-4">
            {/* o .btn define display e vence o hidden: esconder no pai */}
            <span className="hidden lg:inline-flex">
              <a href={linkWhats} target="_blank" rel="noreferrer" className="btn btn--vermelho btn--pequeno">
                <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
                Pedir orçamento
              </a>
            </span>
            <a href={linkWhats} target="_blank" rel="noreferrer" aria-label="Pedir orçamento no WhatsApp" className="flex h-10 w-10 items-center justify-center rounded-[var(--raio-mini)] bg-vermelho text-branco lg:hidden">
              <Icone nome="whats" className="h-6 w-6" />
            </a>
            <button type="button" onClick={() => setAberto((v) => !v)} aria-expanded={aberto} aria-controls="menu-categorias" className="romana hidden items-center gap-2 text-[1.0625rem] text-preto hover:text-vermelho lg:flex">
              <span aria-hidden="true" className="flex flex-col gap-[4px]">
                <span className="block h-[2px] w-5 bg-current" />
                <span className="block h-[2px] w-5 bg-current" />
                <span className="block h-[2px] w-5 bg-current" />
              </span>
              Menu
            </button>
          </div>
        </div>

        <form onSubmit={buscar} role="search" className="miolo pb-3 lg:hidden">
          {busca("busca-celular", "Futebol, Brasil, pesca, agasalho...")}
        </form>
      </div>

      <nav aria-label="Modalidades" className="border-t border-linha">
        <ul className="miolo faixa-scroll flex overflow-x-auto lg:overflow-visible">
          {menu.map((aba, i) => {
            const ultima = i === menu.length - 1;
            const rotulo = (
              <>
                <Icone nome={aba.icone} className="h-8 w-8 shrink-0" peso={1.5} />
                <span className="flex flex-col items-center leading-tight lg:items-start">
                  <span>{aba.nome}</span>
                  {aba.nota ? <span className="porta-nota">{aba.nota}</span> : null}
                </span>
                {aba.total ? <span className="porta-numero">{aba.total}</span> : null}
              </>
            );
            return (
              <li key={aba.chave} className={`porta ${i > 0 ? "lg:border-l lg:border-linha" : ""} ${ultima ? "lg:ml-auto lg:border-r lg:border-linha" : ""}`}>
                {aba.externa ? (
                  <a href={aba.href} target="_blank" rel="noreferrer" className="porta-link">
                    {rotulo}
                  </a>
                ) : (
                  <Link href={aba.href} className="porta-link" aria-current={atual(aba.href) ? "page" : undefined}>
                    {rotulo}
                  </Link>
                )}

                <div className={`porta-aba ${i >= menu.length / 2 ? "porta-aba--direita" : ""}`} aria-label={`${aba.nome}: atalhos`}>
                  {aba.titulo ? <p className="mb-3 text-[0.8125rem] font-bold text-tinta-fraca">{aba.titulo}</p> : null}
                  <ul className={`grid gap-x-8 gap-y-1 ${aba.colunas === 4 ? "grid-cols-4" : aba.colunas === 3 ? "grid-cols-3" : aba.colunas === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {aba.itens.map((item) => {
                      const conteudo = (
                        <>
                          {item.icone ? <Icone nome={item.icone} className="h-6 w-6 shrink-0 text-gramado" peso={1.5} /> : null}
                          <span className="min-w-0">
                            <span className="block text-[0.9375rem] font-bold text-tinta">{item.nome}</span>
                            {item.nota && item.icone ? <span className="block text-[0.75rem] text-tinta-fraca">{item.nota}</span> : null}
                          </span>
                          {item.nota && !item.icone ? <span className="ml-auto text-[0.75rem] font-bold text-tinta-fraca">{item.nota}</span> : null}
                        </>
                      );
                      return (
                        <li key={item.nome + item.href}>
                          {item.externa ? (
                            <a href={item.href} target="_blank" rel="noreferrer" className="porta-item group">
                              {conteudo}
                            </a>
                          ) : (
                            <Link href={item.href} className="porta-item group">
                              {conteudo}
                            </Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </nav>

      {aberto ? (
        <>
          <button type="button" aria-label="Fechar o menu" onClick={() => setAberto(false)} className="gaveta-veu" />
          <nav id="menu-categorias" aria-label="Menu" className="escuro gaveta">
            <div className="flex items-center justify-between px-5 pt-5">
              <span className="inline-flex rounded-[var(--raio)] bg-branco px-2 py-1">
                <Logo altura={36} />
              </span>
              <button type="button" onClick={() => setAberto(false)} aria-label="Fechar o menu" className="grid h-10 w-10 place-items-center rounded-[var(--raio-mini)] border border-white/20 text-branco hover:border-vermelho hover:text-vermelho">
                <Icone nome="fechar" className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={buscar} role="search" className="px-5 pt-4">
              {busca("busca-gaveta", "Futebol, Brasil, pesca, agasalho...")}
            </form>

            <ul className="mt-3 flex-1 overflow-y-auto px-3 pb-4">
              {menu.map((aba) => {
                const conteudo = (
                  <>
                    <Icone nome={aba.icone} className="h-8 w-8 shrink-0 text-vermelho" peso={1.5} />
                    <span className="romana text-[1.25rem] text-branco">{aba.nome}</span>
                    {aba.total ? <span className="ml-auto text-[0.8125rem] font-bold text-marfim-fraco">{aba.total}</span> : null}
                  </>
                );
                return (
                  <li key={aba.chave} className="border-b border-white/10 last:border-b-0">
                    {aba.externa ? (
                      <a href={aba.href} target="_blank" rel="noreferrer" onClick={() => setAberto(false)} className="gaveta-porta">
                        {conteudo}
                      </a>
                    ) : (
                      <Link href={aba.href} onClick={() => setAberto(false)} className="gaveta-porta">
                        {conteudo}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="border-t border-white/10 px-5 py-5">
              <a href={linkWhats} target="_blank" rel="noreferrer" onClick={() => setAberto(false)} className="btn btn--vermelho w-full">
                <Icone nome="whats" className="h-[1.125rem] w-[1.125rem]" />
                Pedir orçamento no WhatsApp
              </a>
            </div>
          </nav>
        </>
      ) : null}
    </header>
  );
}
