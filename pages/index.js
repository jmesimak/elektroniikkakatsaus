import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import config from "../config";
import styled from "styled-components";
import { Typography } from "@material-ui/core";

export default function Home({ frontPage }) {
  const { topHeadlines } = frontPage;
  const topHeadlineTitles = topHeadlines.map((topHeadline) => {
    return (
      <Typography variant="h3">
        <Link
          as={`/articles/${topHeadline.sys.id}`}
          href="/articles/[id]"
          key={topHeadline.sys.id}
        >
          <a>{topHeadline.fields.title}</a>
        </Link>
      </Typography>
    );
  });
  return (
    <>
      <Head>
        <title>Elektroniikkakatsaus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid item xs={12} lg={8}>
        <Paper style={{ paddingLeft: '16px'}}>
          {topHeadlineTitles}
        </Paper>
      </Grid>
      <Grid item lg={4}>
        <Paper>
          Foo
        </Paper>
      </Grid>
    </>
  );
}

export async function getStaticProps() {
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

  console.log(topHeadlineIds)

  const topHeadlines = data.items.filter((contentfulItem) =>
    topHeadlineIds.includes(contentfulItem.sys.id)
  );

  return {
    props: {
      frontPage: {
        topHeadlines,
      },
    },
  };
}
