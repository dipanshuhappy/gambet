import BetForm from "@/components/page/bet-form";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { GAMBET_ABI } from "@/lib/constants";
import { cn, supabase } from "@/lib/utils";
import { getConfig } from "@/wagmi";
import { formatEther, parseEther } from "viem";
import { readContract } from "wagmi/actions";

export default async function Game({ params }: { params: { id: string } }) {

    const supabaseGame = await supabase.from('gambet').select('*').eq('game_id', params.id);

    

    if(supabaseGame.error){
        return <div>error</div>
    }


    const userA = await readContract(getConfig(),{
        abi:GAMBET_ABI,
        functionName:"userA",
        address:supabaseGame.data[0].contract_address as `0x${string}`,
    })

    const userB = await readContract(getConfig(),{
        abi:GAMBET_ABI,
        functionName:"userB",
        address:supabaseGame.data[0].contract_address as `0x${string}`,
    })

    const totalWager = await readContract(getConfig(),{
        abi:GAMBET_ABI,
        functionName:"totalWager",
        address:supabaseGame.data[0].contract_address as `0x${string}`,
    })

    // const gameDetails : GameCallbackType = await (await fetch(`https://www.chess.com/callback/live/game/${params.id}`,{
    //   method:"GET",
    // })).json()

    // console.log({gameDetails})
    console.log({userA})
    console.log({userB})
    console.log({totalWager})

    return (  <>  <BackgroundBeams/><Card className={cn("w-[380px] inter-var my-40 mx-auto relative z-30")} >
        {/* <Meteors/> */}
    <CardHeader>
      <CardTitle>{`Send crypto  to this address ${supabaseGame.data[0].contract_address}`}</CardTitle>
      <CardDescription>{supabaseGame.data[0].username_a} VS {supabaseGame.data[0].username_b}</CardDescription>
      <CardDescription>Total Wager is {formatEther(totalWager)} Matic</CardDescription>
    </CardHeader>
    <CardContent className="grid gap-4">
      <div>
        <h3 className="text-sm font-semibold">White</h3>
        <p className="text-xs">Address: {userA[0]}</p>
        <p className="text-xs">Username: {supabaseGame.data[0].username_a}</p>
      </div>
      <div>
        <h3 className="text-sm font-semibold">Black</h3>
        <p className="text-xs">Address: {userB[0]}</p>
        <p className="text-xs">Username: {supabaseGame.data[0].username_b}</p>
      </div>
    </CardContent>
    <CardFooter>
       
       
          
     <BetForm contractAddress={supabaseGame.data[0].contract_address}/> 

       
       
    </CardFooter>
  </Card></>)
}