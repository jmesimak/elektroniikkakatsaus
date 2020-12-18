import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import config from '../config'
import styles from '../styles/Home.module.css';

export default function Home({ frontPage }) {
  const { topHeadlines } = frontPage
  const topHeadlineTitles = topHeadlines.map(topHeadline => {
    return (
      <Link as={`/articles/${topHeadline.sys.id}`} href="/articles/[id]" key={topHeadline.sys.id}>
        <a>{topHeadline.fields.title}</a>
      </Link>
    )
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Elektroniikkakatsaus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Elektroniikkakatsaus</h1>
      <h2>Artikkelit</h2>
      { topHeadlineTitles }
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await axios.get(`https://cdn.contentful.com/spaces/${config.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${config.CONTENTFUL_DELIVERY_TOKEN}`);
  
  const frontPage = data.items.find(({ sys: contentfulItem }) => contentfulItem.contentType.sys.id === 'frontPage')
  const topHeadlineIds = frontPage.fields.topList.map(topListArticle => topListArticle.sys.id)

  const topHeadlines = data.items.filter(contentfulItem => topHeadlineIds.includes(contentfulItem.sys.id))

  return {
    props: {
      frontPage: {
        topHeadlines
      }
    },
  };
}
