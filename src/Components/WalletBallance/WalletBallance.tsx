//@ts-nocheck
import React, { useEffect, useState } from "react";
import {
  getAssociatedTokenAddress,
  getAccount,
  TOKEN_PROGRAM_ID,
} from "@solana/spl-token";
import { PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import { useSolanaWallets } from "@privy-io/react-auth/solana";
import * as bigInt from "big-integer";
import { usePrivy } from "@privy-io/react-auth";
import { Spin } from "antd";
const WalletBallance = () => {
  const [solHolding, setSolHolding] = useState(0);
  const [loading, setLoading] = useState(false);
  const [armyLoading, setArmyLoading] = useState(false);
  const { connection } = useConnection();
  const { user } = usePrivy();
  const [tokenBalance, setTokenBalance] = useState(0);
  const armyAddress = "ARMYZt71GXq4vw4mtDs5LnEp4ZgwWKEE2CdMU3WNnFEC";
  const address = user?.linkedAccounts?.[1]?.address;

  const formatTokenBalance = (balance: any) => {
    if (balance === null) return "Loading...";
    if (balance >= 1_000_000) {
      return `${(balance / 1_000_000).toFixed(1)}M $ARMY`;
    } else if (balance >= 1_000) {
      return `${(balance / 1_000).toFixed(1)}K $ARMY`;
    } else {
      return `${balance.toFixed(2)} $ARMY`;
    }
  };

  useEffect(() => {
    const fetchSolBalance = () => {
      if (!connection || !address) return;
      try {
        const publicKey = new PublicKey(address); // Convert address to PublicKey
        setLoading(true);
        connection
          .getAccountInfo(publicKey)
          .then((info) => {
            setSolHolding(info ? info.lamports / LAMPORTS_PER_SOL : 0);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching account info:", error);
            setLoading(false);
          });
      } catch (error) {
        console.error("Invalid public key format:", error);
      }
    };
    fetchSolBalance();
  }, [address]);

  useEffect(() => {
    const getTokenBalance = async () => {
      if (!address) return;
      setArmyLoading(true);
      try {
        const publicKey = new PublicKey(address); // Convert address to PublicKey
        const tokenPublicKey = new PublicKey(armyAddress);
        const associatedTokenAddress = await getAssociatedTokenAddress(
          tokenPublicKey,
          publicKey
        );

        const tokenAccount = await getAccount(
          connection,
          associatedTokenAddress
        );
        const tokenAmount = bigInt(tokenAccount.amount);
        setTokenBalance(tokenAmount / 1000000);
      } catch (error) {
        console.error("Error fetching token balance", error);
        setTokenBalance(0);
      } finally {
        setArmyLoading(false);
      }
    };
    getTokenBalance();
  }, [armyAddress]);
  return (
    <div className=" w-full flex justify-end">
      {address && (
        <div className="flex gap-4 p-4">
          <div className="button-55 ">
            <p className="text-[#FFF] text-[19px] font-soli text-center">
              {loading ? <Spin /> : `${solHolding.toFixed(2)} SOL`}
            </p>
          </div>
          <div className="  button-56">
            <p className="text-[#F83726] text-[19px] font-soli">
              {loading ? (
                <Spin />
              ) : (
                `${formatTokenBalance(tokenBalance) || "0.0"} `
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WalletBallance;
