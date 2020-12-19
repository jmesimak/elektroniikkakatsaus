import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import Link from 'next/link'
import Image from 'next/image'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import styled from "styled-components";
import "../styles/globals.css";

const TopContainer = styled(Grid)`
  position: sticky;
  top: 0;
  background-color: #9146ff;
`

const Top = styled.div`
  width: 1080px;
  padding: 0 0 0 20px;
  max-height: 36px;
  color: white;
`;

const Title = styled.h1`
  display: inline-block;
  font-size: 16px;
  overflow: auto;
`

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h2: {
        fontFamily: "Helvetica",
        fontSize: "2rem",
        fontWeight: 500,
      },
      h3: {
        fontFamily: "Helvetica",
        fontSize: "1.5rem",
      },
      body1: {
        fontFamily: "Helvetica",
        fontWeight: 300,
      },
    },
  },
});

const MainArea = styled(Grid)`
  max-width: 1080px;
`;

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <TopContainer container justify="center">
        <Top item xs={12}>
          <Title>
            <Link as={`/`} href="/">
              <a>Elektroniikkakatsaus</a>
            </Link>
          </Title>
        </Top>
      </TopContainer>
      <Grid container justify="center" style={{ padding: "0 8px 0 8px" }}>
        <MainArea container spacing={1}>
          <Component {...pageProps} />
        </MainArea>
      </Grid>
    </ThemeProvider>
  );
}

export default MyApp;
