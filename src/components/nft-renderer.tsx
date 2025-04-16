// import { getContract } from "thirdweb";
// import { ethereum } from "thirdweb/chains";
// import { MediaRenderer, useReadContract } from "thirdweb/react";
// import { client } from "@/app/client";

// const nftContract = getContract({
//   address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
//   chain: ethereum,
//   client: client,
// });

// function App() {
//   const { data } = useReadContract(getNFT, {
//     contract: nftContract,
//     tokenId: 458n,
//   });

//   return <MediaRenderer client={client} src={data?.metadata.image} />;
// }
// export default App;