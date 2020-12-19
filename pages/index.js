import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import config from "../config";
import styled from "styled-components";

const MainArea = styled(Paper)`
  height: 100%;
`;

const Title = styled.h1`
  margin: 0 0 8px 8px;
  font-weight: 400;
  letter-spacing: 1px;
`;

const Nav = styled.div`
  width: 100%;
  background-color: black;
  color: white;
`;

const NavLink = styled.a`
  margin: 8px 0 8px 8px;
`;

export default function Home({ frontPage }) {
  const { topHeadlines } = frontPage;
  const topHeadlineTitles = topHeadlines.map((topHeadline) => {
    return (
      <h3>
        <Link
          as={`/articles/${topHeadline.sys.id}`}
          href="/articles/[id]"
          key={topHeadline.sys.id}
        >
          <a>{topHeadline.fields.title}</a>
        </Link>
      </h3>
    );
  });
  return (
    <>
      <Head>
        <title>Elektroniikkakatsaus</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid item xs={12} lg={8}>
        <MainArea>
          <Title>Elektroniikkakatsaus</Title>
          <Nav>
            <Link href="#">
              <NavLink>Artikkelit</NavLink>
            </Link>
          </Nav>

          {topHeadlineTitles}
        </MainArea>
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
  const topHeadlineIds = frontPage.fields.topList.map(
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
