import { env } from "@/env";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import { NextRequest } from "next/server";
import { createWalletClient, http } from "viem";
import { polygonAmoy, polygonZkEvmCardona } from "viem/chains";
import {privateKeyToAccount} from "viem/accounts"
import { GAMBET_ABI, RECLAIM_PROTOCOL_ABI } from "@/lib/constants";
import { readContract } from "viem/actions";

export async function POST(req: NextRequest,{ params }: { params: { contract_address: string } }){
    const body = req.body
    if(!body){
        return Response.error()
    }
    console.log({body})
    const proof = await req.json()
    console.log({proof})    

    const isProofVerified = await Reclaim.verifySignedProof(proof)

    if (!isProofVerified) {
        return Response.json({message:'Proof verification failed'},{
            status: 400
        })
    }

    const account = privateKeyToAccount(env.KEY as `0x${string}`)
    const client = createWalletClient({
        account:account,
        chain:polygonAmoy,
        transport:http('https://polygon-amoy.g.alchemy.com/v2/gBSyIYGYpdyLXOhmHJlWmHSbGUGKQLVt')
    })
    const onChainProof = Reclaim.transformForOnchain(proof);
    console.log({onChainProof})
    const hashString = await readContract(client,{
         abi:RECLAIM_PROTOCOL_ABI,
         functionName:"verifyProof",
         args:[{
            claimInfo: onChainProof.claimInfo as any,
            signedClaim: onChainProof.signedClaim as any,
        }],
        address:"0xcd94A4f7F85dFF1523269C52D0Ab6b85e9B22866" as `0x${string}`
    })
    console.log({hashString})

    console.log(onChainProof)
    const hash = await client.writeContract({
        abi:GAMBET_ABI,
        functionName:"end",
        address:params.contract_address as `0x${string}`,
        args:[{
                        claimInfo: onChainProof.claimInfo as any,
                        signedClaim: onChainProof.signedClaim as any,
        }]
    })

    console.log({hash})

    return Response.json({
        hash
    })

    
}


