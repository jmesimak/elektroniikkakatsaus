import styled from 'styled-components'
import '../styles/globals.css'

const Content = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`

function MyApp({ Component, pageProps }) {
  return <Content><Component {...pageProps} /></Content>
}

export default MyApp
