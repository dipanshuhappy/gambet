import { type NextRequest } from 'next/server'
import { GameCallbackType } from "@/lib/types";


export async function GET(req: NextRequest,{ params }: { params: { id: string } }) {
    console.log("params",params,"Jaljflajfklasfj;la")
    const data: GameCallbackType = await (await fetch(`https://www.chess.com/service/play/games/${params.id}`, {
        method:'GET'
    })).json();

    console.log({data},"Jsfkljklsdjlkfj")
    
    return Response.json({ ...data })
}