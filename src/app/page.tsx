"use client";

import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";
// import { GambetAbi } from "@/constants/gambet-abi";
import { env } from "@/env";
import { getConfig } from "@/wagmi";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import Link from "next/link";
import { writeContract } from "viem/actions";
import { useAccount, useChainId, useChains, useConnect, useDisconnect, useWalletClient } from "wagmi";
import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { If, Then } from "react-if";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FlipWords } from "@/components/ui/flip-words";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GlowingBorderButton } from "@/components/ui/moving-borders";
import { cn, shortenAddress, supabase } from "@/lib/utils";
import { Label } from "@radix-ui/react-label";

// import CreateGame from "@/components/page/create-game";
import { useState } from "react";
import {
  GAMBET_ABI,
  GAMBET_FACTORY_ABI,
  GAMBET_FACTORY_ADDRESS,
} from "@/lib/constants";

import {
  prepareTransactionRequest,
  waitForTransactionReceipt,
} from "wagmi/actions";
import { GameCallbackType } from "@/lib/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


function WalletConnect() {
  const account = useAccount();
  const { connectors, connect} = useConnect();

  return (
    <>
      {account.status === "disconnected" && (
        <Dialog>
          <DialogTrigger className="px-4 py-2 rounded-md  text-center relative overflow-hidden bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
            <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
              Connect Wallet
            </span>

            <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width={15}
                height={15}
                stroke="#000"
                viewBox="0 0 458.531 458.531"
              >
                <path d="M336.688 343.962c-21.972-.001-39.848-17.876-39.848-39.848v-66.176c0-21.972 17.876-39.847 39.848-39.847h103.83c.629 0 1.254.019 1.876.047v-65.922c0-16.969-13.756-30.725-30.725-30.725H30.726C13.756 101.49 0 115.246 0 132.215v277.621c0 16.969 13.756 30.726 30.726 30.726h380.943c16.969 0 30.725-13.756 30.725-30.726v-65.922c-.622.029-1.247.048-1.876.048h-103.83z" />
                <path d="M440.518 219.925h-103.83c-9.948 0-18.013 8.065-18.013 18.013v66.176c0 9.948 8.065 18.013 18.013 18.013h103.83c9.948 0 18.013-8.064 18.013-18.013v-66.176c0-9.949-8.065-18.013-18.013-18.013zm-68.052 77.099c-14.359 0-25.999-11.64-25.999-25.999s11.64-25.999 25.999-25.999c14.359 0 25.999 11.64 25.999 25.999 0 14.359-11.64 25.999-25.999 25.999zM358.169 45.209c-6.874-20.806-29.313-32.1-50.118-25.226L151.958 71.552h214.914l-8.703-26.343z" />
              </svg>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">Select Wallet</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <div className="flex justify-evenly items-center my-4">
                {connectors.map((connector) => (
                  <Button
                    key={connector.uid}
                    onClick={() => {
                      connect({ connector })
                    
                    }}
                  >
                    {connector.name}
                  </Button>
                ))}
              </div>
            </DialogDescription>
          </DialogContent>
        </Dialog>
      )}
      {account.status === "connecting" && (
        <div className="px-4 py-2 rounded-md  text-center relative overflow-hidden bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="text-center">Loading...</span>
        </div>
      )}
    </>
  );
}
function CreateGame() {
  const { status, address } = useAccount();

  const router = useRouter()
  const [gameId, setGameId] = useState<number>();
  const [username, setUsername] = useState<string>();
  const [opponentAddress, setOpponentAddress] = useState<string>();

  const {data:client} = useWalletClient();
  const chain = useChains();

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    const url = "https://www.chess.com/callback/live/game/108251195588";

    if (!gameId) {
      toast.error("Game ID is required");
      return;
    }
    if (!username) {
      toast.error("Username is required");
      return;
    }
    if (!opponentAddress) {
      toast.error("Opponent Address is required");
      return;
    }
    if (!address) {
      toast.error("Please connect your wallet");
      return;
    }
    if(!client){
      toast.error("Client not found")
      return;
    }

    try {
      setLoading(true);
      // const url = "https://api-prod.pactsmith.com/api/price/usd_to_eth"
      const gameData: GameCallbackType = await (
        await fetch(`/api/game/${gameId}/details`, {
          method: "GET",
        })
      )
        .json()
        .catch((err) => console.log(err));

      const config = getConfig();

      const areYouWhitePlayer = gameData.game.pgnHeaders.White === username;

      const hash = await writeContract(client, {
        abi: GAMBET_FACTORY_ABI,
        functionName: "deployGambet",
        address: GAMBET_FACTORY_ADDRESS,
        args: [
          areYouWhitePlayer ? address : (opponentAddress as `0x${string}`),
          areYouWhitePlayer ? (opponentAddress as `0x${string}`) : address,
          `0x8b5E4bA136D3a483aC9988C20CBF0018cC687E6f` as `0x${string}`,
          gameData.game.pgnHeaders.White,
          gameData.game.pgnHeaders.Black,
          "0xcd94A4f7F85dFF1523269C52D0Ab6b85e9B22866",
          gameId.toString(),
        ],
        chain:chain[0]
      });

      const reciept = await waitForTransactionReceipt(config, {
        hash: hash,
        confirmations: 1,
      });
      const contractAddress = `0x${reciept.logs[0].topics[1]?.slice(-40)}`;

      await supabase.from("gambet").insert({
        contract_address: contractAddress,
        game_id: gameId.toString(),
        username_a: gameData.game.pgnHeaders.White,
        username_b: gameData.game.pgnHeaders.Black,
      });

      router.push('/games/'+gameId)
      toast.success("Gambet created");
    } catch (err) {
      console.log(err);
      toast.error("Error creating gambet : " + err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      {status === "connected" && (
        <Dialog>
          <DialogTrigger>
            <GlowingBorderButton
              borderRadius="2rem"
              className="bg-white font-bold dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              Create Game
            </GlowingBorderButton>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-center">
                Chess Game Details
              </DialogTitle>
              <DialogDescription>
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardDescription>
                      Enter the details of your chess game.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="game-id">Game ID</Label>
                      <Input
                        id="game-id"
                        type="number"
                        pattern="d{9}"
                        placeholder="123456789"
                        required
                        value={gameId}
                        onChange={(e) => setGameId(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="JohnDoe"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="opponent-address">
                        Opponent Wallet Address
                      </Label>
                      <Input
                        id="opponent-address"
                        type="text"
                        placeholder="0x1234567890abcdef"
                        required
                        value={opponentAddress}
                        onChange={(e) => setOpponentAddress(e.target.value)}
                      />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={onSubmit} className="w-full">
                      {loading ? "Loading..." : "Create Game"}
                    </Button>
                  </CardFooter>
                </Card>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
function ListGames() {
  const { isConnected } = useAccount();
  return (
    <If condition={isConnected}>
      <Then>
        <button className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          List Games
        </button>
      </Then>
    </If>
  );
}

function App() {
  const account = useAccount();




  // async function generateVerificationRequest() {
  //   const providerId = "41ec4915-c413-4d4a-9c21-e8639f7997c2";
  //   await reclaimClient.buildProofRequest(providerId);
  //   reclaimClient.setSignature(
  //     await reclaimClient.generateSignature(env.NEXT_PUBLIC_RECLAIM_SECRET)
  //   );
  //   if (!client) {
  //     throw new Error("Client not found");
  //   }
  //   const { requestUrl, statusUrl } =
  //     await reclaimClient.createVerificationRequest();
  //   await reclaimClient.startSession({
  //     onSuccessCallback: async (proof) => {
  //       console.log("Verification success", proof);
  //       const onChainProof = Reclaim.transformForOnchain(proof[0]);
  //       // const a = await writeContract(client, {
  //       //   abi: GAMBET_ABI,
  //       //   address: "0xc58a61454497523b832665326a8C9Ce84a6b1746",
  //       //   functionName: "end",
  //       //   args: [
  //       //     {
  //       //       claimInfo: onChainProof.claimInfo as any,
  //       //       signedClaim: onChainProof.signedClaim as any,
  //       //     },
  //       //   ],
  //       // });
  //       // console.log(a);
  //       // Your business logic here
  //     },
  //     onFailureCallback: (error) => {
  //       console.error("Verification failed", error);
  //       // Your business logic here to handle the error
  //     },
  //   });
  //   console.log("requestUrl", requestUrl);
  //   console.log("statusUrl", statusUrl);
  //   //TODO: replace with your provider ids you had selected while creating the application
  // }

  return (
    <>
      {/* <div>
        <Navbar className="top-2" />
      </div> */}
      <BackgroundBeams />

      <CardContainer className="inter-var my-7">
        <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] py-4 dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-4xl text-center mx-auto font-bold my-2 text-neutral-600 dark:text-white"
          >
            <FlipWords duration={1000} words={["Play", "Bet", "Win"]} /> at
            chess.com
            <p>using</p>
            Gambet
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-center mx-auto text-xl max-w-sm mt-2 dark:text-neutral-300"
          >
            The first decentralized chess betting platform, works with chess.com
            games
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExeDBueW44Y2htMjc2aHpudDd5bWQ2eXE2ZzVod3Z0dXB0MXhrOWUyayZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/lPDkMyvjPgwNA5XSiw/giphy.gif"
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div
            className={`flex ${account.isConnected ? "justify-between" : "justify-center"}  items-center mt-20`}
          >
            <WalletConnect/>
            <CreateGame />
            {/* <ListGames /> */}
          </div>
        </CardBody>
      </CardContainer>
    </>
  );
}

export default App;
