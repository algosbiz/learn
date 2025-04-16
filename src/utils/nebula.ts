import { Nebula } from "thirdweb/ai";
import type { Chain, ThirdwebClient } from "thirdweb";
import { client  } from "@/app/client";
import { ethereum, sepolia } from "thirdweb/chains";

export const askNebula = async (
  client: ThirdwebClient,
  prompt: string,
  chain?: Chain
) => {
  const response = await Nebula.chat({
    client: client,
    message: prompt,
    contextFilter: {
      chains: [sepolia],
    },
  });

  return response;
};
