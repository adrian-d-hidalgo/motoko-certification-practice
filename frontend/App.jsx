import React from "react";
import logo from "./assets/dfinity.svg";

import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import {
  ConnectButton,
  ConnectDialog,
  Connect2ICProvider,
} from "@connect2ic/react";
import "@connect2ic/core/style.css";

//Import canister definitions like this:
import * as certificate from "../src/declarations/certificate";
import { IcpCertificate } from "./components/Certificate";

function App() {
  return (
    <div className="min-h-screen">
      <header className="relative flex justify-start items-center p-4 border-b border-gray-600">
        <img src={logo} width="80" alt="logo" />
        <div className="absolute top-2 right-2">
          <ConnectButton />
        </div>
      </header>
      <ConnectDialog />
      <IcpCertificate />
    </div>
  );
}

const client = createClient({
  canisters: {
    certificate,
  },
  providers: [
    new InternetIdentity({
      providerUrl:
        "http://127.0.0.1:8000/?canisterId=br5f7-7uaaa-aaaaa-qaaca-cai",
    }),
  ],
  globalProviderConfig: {
    /*
     * Disables dev mode in production
     * Should be enabled when using local canisters
     */
    dev: true,
  },
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
