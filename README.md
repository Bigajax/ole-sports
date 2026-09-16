# Vitrine da Olé Sports

Prévia da vitrine digital da **Olé Sports Uniformes Esportivos**
(@ole_sports, Birigui-SP). Next 15 + Tailwind v4, em modo local: os
modelos vêm de `data/catalogo.json` e as fotos de `public/produtos/*.webp`,
exportados da oficina do estúdio.

    npx next dev -p 3120
    npm run build

## De onde vêm os dados

- **Modelos**: 53 mídias colhidas do Instagram pela oficina (Business
  Discovery), lidas na conversa e reduzidas a 25 modelos em 7 modalidades.
  Exportado por
  `scripts/exportar-vitrine.ts ole_sports ~/Desktop/ole-sports --codigo OS --ordem "..."`
  no repo do estúdio.
- **Marca**: a logo do avatar com o fundo branco removido, em
  `public/marca/logo.png`.
- **Fotos de campo** (Ronaldo, César Sampaio, Resenha da Pérola, Último
  Zagueiro, a sublimação): `public/marca/*.webp`, também do feed.
- **Configurador** (`components/MonteSuaCamisa.tsx` + `Camisa.tsx`): a
  camisa em SVG muda de cor, nome e número na hora e monta a mensagem
  de orçamento para o WhatsApp.
- Favicon e OG: `node scripts/gerar-icones.mjs`.

## O que a fábrica NÃO disse (não inventar)

Preço de nenhum modelo (tudo é orçamento), prazo de produção, pedido
mínimo, formas de pagamento, tabela de tamanhos. O que as artes dizem:
endereço (Av. Henrique Fernandes, 108, Novo Parque São Vicente, Birigui),
WhatsApp (18) 99732-3453, fixo (18) 3021-1380, e-mail
oleuniformes@outlook.com, sublimação digital, envio para todo o país,
atendimento por região (Birigui, Rio Preto, Paraná e Oeste Paulista).

## Modo prévia

`PREVIA` em `data/site.config.ts` manda todo botão de WhatsApp para o
estúdio. Ao contratar: `PREVIA = null`, e o número das artes já está em
`site.whatsapp`.
