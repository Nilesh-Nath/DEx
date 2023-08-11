import "@/styles/globals.css";
import Head from "next/head";
//Internal Import
import { SwapTokenContextProvider } from "../../context/SwapContext";

import { NavBar } from "../../Components";

const MyApp = ({ Component, pageProps }) => (
  <div>
    <Head>
      <title>Uniswap Clone</title>
    </Head>
    <SwapTokenContextProvider>
      <NavBar />
      <Component {...pageProps} />
    </SwapTokenContextProvider>
  </div>
);

export default MyApp;
