import Image from "next/image";

/**
 * A marca da Olé Sports é a logo do Instagram (a bola e o "Olé Sports"
 * em vermelho com o filete branco e o contorno preto), com o fundo
 * branco removido em public/marca/logo.png (644 x 450). Ela funciona
 * sobre branco, preto e gramado porque já traz o próprio filete.
 */
export function Logo({ altura = 48, className = "", prioridade = false }: { altura?: number; className?: string; prioridade?: boolean }) {
  const largura = Math.round(altura * (644 / 450));
  return <Image src="/marca/logo.png" alt="Olé Sports" width={largura} height={altura} priority={prioridade} className={`shrink-0 ${className}`} style={{ width: largura, height: altura }} />;
}

/* a assinatura do estúdio, em máscara, pintada pela cor do texto */
export function MarcaEstudio({ altura, className = "" }: { altura: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label="Rafael Razeira Estúdio"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        height: altura,
        width: Math.round(altura * (956 / 519)),
        WebkitMaskImage: "url(/marca/rafael-razeira.png)",
        maskImage: "url(/marca/rafael-razeira.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
