import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import CodeBlock from '@theme/CodeBlock';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Type Safe</>,
    description: (
      <>
        Define your arguments and then execute your main function
        with a strongly-typed <code>args</code> object that takes into
        account the types of arguments and their optionality.
        <br /><br />
        <CodeBlock type="typescript">
          {`args: {
  filename: string;
  count: number | null;
  force: boolean;
  quiet: boolean;
}`}
        </CodeBlock>
      </>
    ),
  },
  {
    title: <>Automatic Help Text Generation</>,
    description: (
      <>
        <CodeBlock>
          {`\
$ ts-node main.ts -h
Usage: main.ts [options] <filename> [extraFilename]

My awesome program.

Options:
  --count, -c [count]
  --requiredCount [requiredCount]`}
        </CodeBlock>
      </>
    ),
  },
  {
    title: <>Feature Packed</>,
    description: (
      <>
        Enjoy the features of a modern CLI-parsing library.
        <br /><br />
        <ul>
          <li>
            Required and optional positional arguments.
          </li>
          <li>
            Boolean flags, including inverted flags like <tt>--no-verbose</tt>.
          </li>
          <li>
            Valued flags, with type conversions to integers, floats, etc.
          </li>
          <li>
            Default values.
          </li>
          <li>
            Validation that required arguments are provided.
          </li>
          <li>
            Help-text generation.
          </li>
          <li>
            Subcommands.
          </li>
        </ul>
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Program Builder`}
      description="A TypeScript library for building command-line interfaces">
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/getting-started')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
