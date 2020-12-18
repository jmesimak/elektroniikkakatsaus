import axios from "axios";
import Link from 'next/link'
import ArticleSerializer from "../../components/article-serializer";
import config from "../../config";

export default function Article({ article }) {
  const title = article.fields.title;
  return (
    <>
      <h1>
        <Link as={`/`} href="/">
          <a>Elektroniikkakatsaus</a>
        </Link>
      </h1>
      <h2>{title}</h2>
      <ArticleSerializer article={article} />
    </>
  );
}

export async function getStaticProps({ params }) {
  const { data } = await axios.get(
    `https://cdn.contentful.com/spaces/${config.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${config.CONTENTFUL_DELIVERY_TOKEN}`
  );

  const article = data.items.find(
    (contentfulItem) => contentfulItem.sys.id === params.id
  );
  return {
    props: {
      article,
    },
  };
}

export async function getStaticPaths() {
  console.log(config)
  
  const { data } = await axios.get(
    `https://cdn.contentful.com/spaces/${config.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${config.CONTENTFUL_DELIVERY_TOKEN}`
  );

  console.log(JSON.stringify(data))

  const frontPage = data.items.find(
    ({ sys: contentfulItem }) =>
      contentfulItem.contentType.sys.id === "frontPage"
  );
  const topHeadlineIds = frontPage.fields.topList.map(
    (topListArticle) => topListArticle.sys.id
  );

  return {
    paths: topHeadlineIds.map((id) => `/articles/${id}`),
    fallback: true,
  };
}
