import React from 'react'
import { ConnectButton } from "thirdweb/react";
import { client } from "../app/client";
const Connect = () => {
  return (
    <div>
      <ConnectButton
        theme={"light"}
        client={client}
        appMetadata={{
          name: "Example App",
          url: "https://example.com",
        }}
      />
    </div>
  );
}

export default Connect