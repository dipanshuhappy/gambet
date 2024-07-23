"use client";

import {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter, DialogClose, Dialog } from "../ui/dialog";
import { Input } from "../ui/input";
import { useState } from "react";
import QRCode from "react-qr-code"
import { Reclaim } from "@reclaimprotocol/js-sdk";
import { env } from "@/env";
import { toast } from "sonner";

export default function EndButtion({
  contractAddress,
}: {
  contractAddress: string;
}) {
  const [qrCode, setQrCode] = useState<string>();
  const fetchQrCode = async () => {
    // const data: {
    //     statusUrl: string;
    //     requestUrl: string;
    // }= await (await fetch(`/api/proof/${contractAddress}`)).json()


    const reclaimClient = new Reclaim.ProofRequest(env.NEXT_PUBLIC_RECLAIM_APPLICATION) 

    await reclaimClient.buildProofRequest("41ec4915-c413-4d4a-9c21-e8639f7997c2")

    reclaimClient.setSignature(
        await reclaimClient.generateSignature(
            env.NEXT_PUBLIC_RECLAIM_SECRET
        )
    )


    const {requestUrl , statusUrl } = await reclaimClient.createVerificationRequest();

    setQrCode(requestUrl)

    await reclaimClient.startSession({
        onFailureCallback(err){
            console.log(err)
        },
        async onSuccessCallback(data){
            console.log(data)
            const sumbitHash = await (await fetch(`/api/proof/${contractAddress}/submit`,{
                method:"POST",
                body:JSON.stringify({...data[0]})
            })).json()
            toast.success(`Proof submitted and payment sent at  ${sumbitHash.hash} `,{
                duration:6000
            })
        }
    })
   


  }
  return (
    <div className="flex flex-col justify-center mx-auto">
    
        
        { qrCode && <QRCode value={qrCode}/>}
        
        
           
          
      
       { !qrCode && <button onClick={fetchQrCode}  className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
          End Game
        </button> }


       { qrCode && <Button type="button" variant="secondary" onClick={()=>setQrCode(undefined)}>
              Close
            </Button> }

      {/* <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Scan this to end</DialogTitle>
          <DialogDescription>
            This will create a proof which will be used to end the game
          </DialogDescription>
        </DialogHeader>
        { qrCode && <QRCode value={qrCode}/>}
        
        <DialogFooter>
        <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent> */}
    </div>
  );
}
