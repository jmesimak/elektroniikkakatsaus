import Head from "next/head";
import Grid from "@material-ui/core/Grid";

import styled from "styled-components";
import "../styles/globals.css";

const MainArea = styled(Grid)`
  max-width: 1080px;
  margin: 0 auto;
  padding: 8px;
`

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <MainArea container>
        <Component {...pageProps} />
      </MainArea>
    </>
  );
}

export default MyApp;
