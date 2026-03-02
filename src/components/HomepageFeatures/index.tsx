import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  img: string;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: "E-book Vivo 📖",
    img: require("@site/static/img/card1.jpg").default,
    description: (
      <>
        Chega de PDFs estáticos. Leia a teoria e altere o código nos simuladores
        integrados em cada capítulo.
      </>
    ),
  },
  {
    title: "Roteiro Guiado 📅",
    img: require("@site/static/img/card2.jpg").default,
    description: (
      <>
        15 semanas planejadas passo a passo, do 'Hello World' até o domínio dos
        conceitos fundamentais do React Native com Expo.
      </>
    ),
  },
  {
    title: "Aprenda na Prática ⚙️",
    img: require("@site/static/img/card3.jpg").default,
    description: (
      <>
        Aprenda resolvendo problemas reais do ecossistema mobile. Teste suas
        habilidades em desafios interativos consolidando a teoria de cada aula.
      </>
    ),
  },
];

function Feature({ title, img, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img className={styles.featureSvg} src={img} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
