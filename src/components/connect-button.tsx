import React from 'react'
import { ConnectButton } from "thirdweb/react";
import { client } from "../app/client";
import { chain } from '@/app/chain';
const Connect = () => {
  return (
    <div>
      <ConnectButton
        theme={"light"}
        client={client}
        chain={chain}
        appMetadata={{
          name: "Example App",
          url: "https://example.com",
        }}
      />
    </div>
  );
}

export default Connect