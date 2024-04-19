import { Web3Modal } from "@web3modal/ethers";
import { chains, providers } from "@web3modal/ethereum";
import { config } from "process";

const modalConfig = {
  theam: "dark",
  accentColor: "default",
  ehtereum: {
    appName: "visitorWeb",
    chains: [chains.ethereum],
    providers: [
      providers.walletConnectProvider({
        projectId: "5c879ebb5bf84837b7c5cd57d787f060",
      }),
    ],
    autoConnect: true,
  },
  projectId: "5c879ebb5bf84837b7c5cd57d787f060",
};

export default function MyApp({ component, pageProps }: any) {
  return (
    <>
      <component {...pageProps} />
      <Web3Modal config={modalConfig} />
    </>
  );
}
