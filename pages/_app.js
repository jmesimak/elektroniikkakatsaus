import Head from "next/head";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import styled from "styled-components";
import "../styles/globals.css";

const theme = createMuiTheme({
  overrides: {
    MuiTypography: {
      h2: {
        fontSize: "2rem",
        fontWeight: 500,
      },
      h3: {
        fontSize: "1.5rem",
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
      <Grid container justify="center" style={{padding: '8px'}}>
        <MainArea container spacing={1}>
          <Component {...pageProps} />
        </MainArea>
      </Grid>
    </ThemeProvider>
  );
}

export default MyApp;
