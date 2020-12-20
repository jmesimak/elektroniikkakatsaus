import axios from "axios";
import Link from "next/link";
import get from "lodash/get";
import styled from "styled-components";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import ArticleSerializer from "../../components/article-serializer";
import config from "../../config";
import { Typography } from "@material-ui/core";

const PaddedPaper = styled(Paper)`
  padding: 8px 16px;
`;

const ArticleTitle = styled(Typography)`
  font-size: 2rem;
`;

const Top = styled(Grid)`
  min-height: 24px;
  background-color: #9146ff;
`;

export default function Article({ article }) {
  const title = get(article, "fields.title", "");
  return (
    <>
      <Grid item xs={12} lg={8}>
        <PaddedPaper elevation={2}>
          <ArticleTitle variant="h2">{title}</ArticleTitle>
          <ArticleSerializer article={article} />
        </PaddedPaper>
      </Grid>
      <Grid item lg={4}>
        <PaddedPaper elevation={2}>
          <Typography>Moro</Typography>
        </PaddedPaper>
      </Grid>
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

  const imageBlocks = get(article, "fields.content.content", []).filter(
    (block) => block.nodeType === "embedded-asset-block"
  );

  let images = {};

  for (const imgBlock of imageBlocks) {
    const imgId = imgBlock.data.target.sys.id;
    const { data } = await axios.get(
      `https://cdn.contentful.com/spaces/${config.CONTENTFUL_SPACE_ID}/environments/master/assets/${imgId}?access_token=${config.CONTENTFUL_DELIVERY_TOKEN}`
    );
    images[imgId] = `https:${data.fields.file.url}`;
  }

  return {
    props: {
      article: {
        ...article,
        images,
      },
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

  const topHeadlineIds = frontPage.fields.article.map(
    (topListArticle) => topListArticle.sys.id
  );

  return {
    paths: topHeadlineIds.map((id) => `/articles/${id}`),
    fallback: true,
  };
}
