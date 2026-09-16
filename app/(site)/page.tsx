import { EmCampo } from "@/components/EmCampo";
import { FaixaWhats } from "@/components/FaixaWhats";
import { Garantias } from "@/components/Garantias";
import { Hero } from "@/components/Hero";
import { Loja } from "@/components/Loja";
import { MonteSuaCamisa } from "@/components/MonteSuaCamisa";
import { Portas } from "@/components/Portas";
import { Prateleira } from "@/components/Prateleira";
import { Vitrines } from "@/components/Vitrines";
import { carregarCatalogo, obterConfig } from "@/lib/dados";
import { PORTAS } from "@/lib/menu";
import { linkGeral } from "@/lib/whatsapp";
import { configPadrao, site } from "@/data/site.config";

/* as modalidades que ganham prateleira na home (as outras ficam no catálogo) */
const PRATELEIRAS_HOME = ["futebol", "manga-longa-e-pesca"];

/**
 * A home: o hero no gramado com o modelo da vez, a faixa de giz com o
 * que a fábrica cumpre, as modalidades, o configurador "Monte a sua
 * camisa" (a seção dedicada às camisas personalizadas), os modelos que
 * mais saem, as duas vitrines (futebol e a camisa do Brasil), as
 * prateleiras, a Olé em campo, a fábrica e a faixa do WhatsApp. Tudo
 * montado do catálogo.
 */
export default async function Home() {
  const [{ categorias, produtos, hero }, config] = await Promise.all([carregarCatalogo(), obterConfig()]);

  const whats = linkGeral(config.whatsapp);
  const ativos = produtos.filter((p) => p.ativo);
  const ativas = categorias.filter((c) => c.ativo);
  const porSlug = new Map(ativas.map((c) => [c.slug, c]));
  const da = (slug: string) => ativos.filter((p) => p.categoria_slug === slug).sort((a, b) => a.ordem - b.ordem);

  const destaques = hero
    .map((h) => ativos.find((p) => p.slug === h.slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 8);
  const estrelaDe = (slug: string) => destaques.find((p) => p.categoria_slug === slug) ?? da(slug)[0] ?? null;
  const peca = (slug: string) => ativos.find((p) => p.slug === slug) ?? null;

  /* cada prateleira mostra primeiro o que NÃO está nos destaques, para a home não repetir foto */
  const inedito = (lista: typeof ativos) => [...lista.filter((p) => !destaques.includes(p)), ...lista.filter((p) => destaques.includes(p))];
  const prateleiras = PORTAS.filter((p) => PRATELEIRAS_HOME.includes(p.slug))
    .map((p) => ({ ...p, produtos: inedito(da(p.slug)) }))
    .filter((p) => p.produtos.length > 0);

  return (
    <>
      <Hero frase={config.frase_hero || configPadrao.frase_hero} estrelas={destaques} linkWhats={whats} totais={{ produtos: ativos.length, categorias: ativas.length }} />

      <Garantias linkWhats={whats} />

      <Portas portas={PORTAS.filter((p) => da(p.slug).length > 0).map((p) => ({ nome: p.nome, href: `/catalogo/${p.slug}`, icone: p.icone, peca: estrelaDe(p.slug), total: da(p.slug).length, linha: p.linha }))} />

      <MonteSuaCamisa whatsapp={config.whatsapp} />

      <Prateleira id="destaques" titulo="Os modelos que mais saem" subtitulo="Do kit completo à camisa do Brasil: o que os times mais pedem." href="/catalogo" verTudo="Ver todos" produtos={destaques} categorias={porSlug} prioridade limite={4} total={ativos.length} nomeDaPorta="modelos" />

      <Vitrines
        vitrines={[
          { titulo: "Uniforme completo", texto: "Camisa, calção e meião com escudo, patrocínio, nome e número. Do amador ao profissional.", href: "/catalogo/futebol", peca: peca("kit-jw-shots-preto-e-vermelho") ?? estrelaDe("futebol"), acao: "Ver futebol", tom: "gramado" as const },
          { titulo: "Camisa do Brasil", texto: "A camisa da seleção com o seu nome e o seu número, para torcer e para dar de presente.", href: "/catalogo/selecao-brasileira", peca: peca("camisa-do-brasil-personalizada") ?? estrelaDe("selecao-brasileira"), acao: "Ver a camisa", tom: "escuro" as const },
        ].filter((v): v is typeof v & { peca: NonNullable<typeof v.peca> } => Boolean(v.peca))}
      />

      {prateleiras.map((p) => (
        <Prateleira key={p.slug} id={`prateleira-${p.slug}`} titulo={p.nome} subtitulo={p.linha[0].toUpperCase() + p.linha.slice(1) + "."} href={`/catalogo/${p.slug}`} verTudo={`Ver os ${p.produtos.length}`} produtos={p.produtos} categorias={porSlug} nomeDaPorta="modelos" />
      ))}

      <EmCampo linkWhats={whats} />

      <Loja linkWhats={whats} horario={config.horario} />

      <FaixaWhats linkWhats={whats} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SportingGoodsStore",
            name: "Olé Sports Uniformes Esportivos",
            telephone: "+55 18 99732-3453",
            email: site.email,
            url: site.url,
            address: { "@type": "PostalAddress", streetAddress: "Av. Henrique Fernandes, 108, Novo Parque São Vicente", addressLocality: "Birigui", addressRegion: "SP", addressCountry: "BR" },
            sameAs: [`https://instagram.com/${site.instagram}`],
          }),
        }}
      />
    </>
  );
}
