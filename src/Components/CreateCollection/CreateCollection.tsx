import React, { useEffect } from "react";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createNft,
  TokenStandard,
  verifyCollectionV1,
  findMetadataPda,
} from "@metaplex-foundation/mpl-token-metadata";
import { create, addConfigLines } from "@metaplex-foundation/mpl-candy-machine";
import {
  createSignerFromKeypair,
  generateSigner,
  isKeypairSigner,
  keypairIdentity,
  percentAmount,
  TransactionBuilder,
} from "@metaplex-foundation/umi";
import { mplCandyMachine } from "@metaplex-foundation/mpl-candy-machine";

import { getExplorerLink } from "@solana-developers/helpers";
import { publicKey } from "@metaplex-foundation/umi";
import { some, none } from "@metaplex-foundation/umi";
import {
  fetchCandyMachine,
  fetchCandyGuard,
  createCandyGuard,
} from "@metaplex-foundation/mpl-candy-machine";
import {
  Keypair,
  Connection,
  sendAndConfirmTransaction,
  PublicKey,
} from "@solana/web3.js";
import { promises as fs } from "fs";
import * as path from "path";
function CreateCollection() {
  const umi = createUmi(
    `https://special-powerful-bridge.solana-devnet.quiknode.pro/${process.env.REACT_APP_QUICKNODE_KEY}`
  ).use(mplCandyMachine());

  const connection = new Connection(
    `https://special-powerful-bridge.solana-devnet.quiknode.pro/${process.env.REACT_APP_QUICKNODE_KEY}`
  );
  const privateKeyString = process.env.REACT_APP_PRIVATE_KEY;
  //@ts-ignore
  const privateKeyArray = Uint8Array.from(JSON.parse(privateKeyString));
  const signerKeypair = umi.eddsa.createKeypairFromSecretKey(privateKeyArray);
  //@ts-ignore
  const signer = createSignerFromKeypair(umi, signerKeypair);
  umi.use(keypairIdentity(signer));
  //const candyMachinePublicKey = publicKey("...");

  const collectionMint = generateSigner(umi);
  const createCollection = async () => {
    try {
      //Create the NFT for the collection.
      // await createNft(umi, {
      //   mint: collectionMint,
      //   authority: signer,
      //   name: "Major General Collection",
      //   uri: "https://ipfs.io/ipfs/QmXM2zb8sjEgax188gCUtLCy451Hp9WRYz8GamPtPZwNZ8",
      //   sellerFeeBasisPoints: percentAmount(9.99, 2), // 9.99%
      //   symbol: "ARMYG",
      //   isCollection: true,
      //   creators: [
      //     {
      //       address: signer.publicKey,
      //       share: 100,
      //       verified: false,
      //     },
      //   ],
      // }).sendAndConfirm(umi, { send: { commitment: "finalized" } });

      // console.log(`Collection NFT:  ${collectionMint.publicKey}`);
      // console.log(`Collection NFT address is:`, collectionMint.publicKey);
      // console.log("✅ Finished successfully!");

      //Create the NFT to be inside the collection
      //const mint = generateSigner(umi);

      const collectionAddress = publicKey(
        "EYtupi6iS2k8AsRExMCnzABXrW5jSLZbTtStgnGTcTDB"
      );
      const nftAddress = publicKey(
        "5emkCFjKbiBNGrTvfUF1hrPosHyjDpz8P4qVe5xba2ok"
      );
      // await createNft(umi, {
      //   mint,
      //   name: "MC #0",
      //   symbol: "MC",
      //   uri: "https://ipfs.io/ipfs/QmUxR4mLnpd36raM524753JhTJ6MHpCaQeawDe6tkXWZSn",
      //   updateAuthority: signer,
      //   sellerFeeBasisPoints: percentAmount(5),
      //   collection: {
      //     key: collectionAddress,
      //     verified: false,
      //   },
      // }).sendAndConfirm(umi, { send: { commitment: "finalized" } });

      // console.log(`NFT Mint:  ${mint.publicKey}`);
      // console.log(`Collection NFT address is:`, collectionAddress);
      // console.log(`Created NFT Address:`, mint.publicKey);
      // console.log("✅ Finished successfully!");

      //Verify collection as a Certified Collection

      const metadata = findMetadataPda(umi, { mint: nftAddress });
      await verifyCollectionV1(umi, {
        metadata,
        collectionMint: collectionAddress,
        authority: signer,
      }).sendAndConfirm(umi);
      console.log(`verified collection:  ${nftAddress}`);
      console.log("✅ Finished successfully!");
      //const latestCandyMachine = publicKey(
      // "9oWBWLib9YkVJx1MJkrrag5fk4dZjfo7sdoX3w9x2WTY"
      //);

      //const collectionMintPublicKey = publicKey(
      //"EYtupi6iS2k8AsRExMCnzABXrW5jSLZbTtStgnGTcTDB"
      //);

      // Create the Candy Machine.
      // const candyMachine = generateSigner(umi);
      // const candyMachineBuilder = await create(umi, {
      //   candyMachine,
      //   collectionMint: collectionMintPublicKey,
      //   collectionUpdateAuthority: signer,
      //   tokenStandard: TokenStandard.NonFungible,
      //   sellerFeeBasisPoints: percentAmount(9.99, 2), // 9.99%
      //   itemsAvailable: 10,
      //   creators: [
      //     {
      //       address: signer.publicKey,
      //       verified: true,
      //       percentageShare: 100,
      //     },
      //   ],
      //   hiddenSettings: none(),
      //   configLineSettings: some({
      //     prefixName: `ARMYG #$ID+1$`,
      //     nameLength: 10,
      //     prefixUri: "https://ipfs.io/ipfs/",
      //     uriLength: 100,
      //     isSequential: false,
      //   }),
      // });

      // const transaction = new TransactionBuilder().add(candyMachineBuilder);
      // await transaction.sendAndConfirm(umi);
      // console.log("Candy Machine and Collection NFT created successfully");
      // console.log(transaction);

      // await addConfigLines(umi, {
      //   candyMachine: latestCandyMachine,
      //   index: 0,
      //   configLines: [
      //     {
      //       name: "ARMYG #1",
      //       uri: "https://ipfs.io/ipfs/QmUGTFRyQqxa8tNuQe7yuWZubkg3omeLgHj3auxNC1DxsR/1.json",
      //     },
      //     {
      //       name: "ARMYG #2",
      //       uri: "https://ipfs.io/ipfs/QmUGTFRyQqxa8tNuQe7yuWZubkg3omeLgHj3auxNC1DxsR/2.png",
      //     },
      //     {
      //       name: "ARMYG #3",
      //       uri: "https://ipfs.io/ipfs/QmUGTFRyQqxa8tNuQe7yuWZubkg3omeLgHj3auxNC1DxsR/3.png",
      //     },
      //     {
      //       name: "ARMYG #4",
      //       uri: "https://ipfs.io/ipfs/QmUGTFRyQqxa8tNuQe7yuWZubkg3omeLgHj3auxNC1DxsR/4.png",
      //     },
      //     {
      //       name: "ARMYG #5",
      //       uri: "https://ipfs.io/ipfs/QmUGTFRyQqxa8tNuQe7yuWZubkg3omeLgHj3auxNC1DxsR/5.png",
      //     },
      //     {
      //       name: "ARMYG #6",
      //       uri: "https://ipfs.io/ipfs/QmUGTFRyQqxa8tNuQe7yuWZubkg3omeLgHj3auxNC1DxsR/6.png",
      //     },
      //     {
      //       name: "ARMYG #7",
      //       uri: "https://ipfs.io/ipfs/QmUGTFRyQqxa8tNuQe7yuWZubkg3omeLgHj3auxNC1DxsR/7.png",
      //     },
      //     {
      //       name: "ARMYG #8",
      //       uri: "https://ipfs.io/ipfs/QmUGTFRyQqxa8tNuQe7yuWZubkg3omeLgHj3auxNC1DxsR/8.png",
      //     },
      //     {
      //       name: "ARMYG #9",
      //       uri: "https://ipfs.io/ipfs/QmUGTFRyQqxa8tNuQe7yuWZubkg3omeLgHj3auxNC1DxsR/9.png",
      //     },
      //   ],
      // }).sendAndConfirm(umi);

      // console.log("Config Lines Added Successfully");

      //const candyMachineDetails = await fetchCandyMachine(
      //umi,
      //latestCandyMachine
      //);
      //console.log("Candy Machine fetched:", candyMachineDetails);

      // Optionally fetch Candy Guard after creation if needed.
      //console.log(candyMachine.publicKey)
      // const fetchCandy = await fetchCandyMachine(
      //   umi,
      //   publicKey("9oWBWLib9YkVJx1MJkrrag5fk4dZjfo7sdoX3w9x2WTY")
      // );
      // console.log("Candy Machine fetched:", fetchCandy);
    } catch (error) {
      console.error("Error creating collection or Candy Machine:", error);
    }
  };

  // useEffect(() => {
  //   console.log(isKeypairSigner(signer));
  //   // console.log(signer);
  // }, []);

  return (
    <div>
      <button onClick={createCollection}>Create Collection</button>
    </div>
  );
}

export default CreateCollection;
