import axios from "axios";
import Link from "next/link";
import get from "lodash/get";
import ArticleSerializer from "../../components/article-serializer";
import config from "../../config";

export default function Article({ article }) {
  const title = get(article, 'fields.title', '')
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

  const imageBlocks = get(article, 'fields.content.content', []).filter(block => block.nodeType === 'embedded-asset-block')
  let images = {}

  for (const imgBlock of imageBlocks) {
    const imgId = imgBlock.data.target.sys.id
    const { data } = await axios.get(`https://cdn.contentful.com/spaces/${config.CONTENTFUL_SPACE_ID}/environments/master/assets/${imgId}?access_token=${config.CONTENTFUL_DELIVERY_TOKEN}`)
    images[imageBlocks[0].data.target.sys.id] = `https:${data.fields.file.url}`
  }

  return {
    props: {
      article: {
        ...article,
        images
      }
    },
  };
}

export async function getStaticPaths() {
  const { data } = await axios.get(
    `https://cdn.contentful.com/spaces/${config.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${config.CONTENTFUL_DELIVERY_TOKEN}`
  );

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
