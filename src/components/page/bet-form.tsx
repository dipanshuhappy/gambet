"use client";
import { useAccount, useSendTransaction } from "wagmi";
import { Input } from "../ui/input"
import { GlowingBorderButton } from "../ui/moving-borders"
import { useState } from "react";
import { getBalance } from "wagmi/actions";
import { getConfig } from "@/wagmi";
import { toast } from "sonner";
import {parseEther} from "viem/utils"
export default function BetForm({contractAddress}:{contractAddress:string}) {
    const account = useAccount();
    const {sendTransactionAsync,isPending}  = useSendTransaction();
    const [value, setValue] = useState(0);
    const onSubmit = async ()=>{
        console.log("bet")
        if(!account.address){
            toast.error("Please connect your wallet")
            return;
        }
        const balance = await getBalance(getConfig(),{
            address:account.address
        })
        const valueInEther = parseEther(value.toString())

        console.log({balance})  
        console.log({valueInEther})
        if(parseInt(balance.value.toString()) < parseInt(valueInEther.toString())){
            toast.error("Insufficient balance")
            return;
        }

        const hash = await sendTransactionAsync({
            to:contractAddress as `0x${string}`,
            value:valueInEther,
            data:"0x",
        })
        toast.success(`Transaction sent ${hash}`,{
            duration:6000
        })


    }
    return (
        <div className="flex w-full justify-between items-center">
        <Input type="number" min={0}  value={value} step={0.00000000001} onChange={(e)=>setValue(parseFloat(e.target.value))} />
        <GlowingBorderButton   containerClassName="h-fit py-19 ml-8"
              className="bg-white font-bold dark:bg-slate-900 my- text-black dark:text-white border-neutral-200 dark:border-slate-800 text-2xl">
          <span onClick={async ()=>{
            console.log("bet")
            await onSubmit()
            
          }}>{isPending ? "Loading": "Bet" }</span>
        </GlowingBorderButton>


        </div>
    )
}