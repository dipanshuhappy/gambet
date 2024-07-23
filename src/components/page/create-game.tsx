import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { Label } from "@radix-ui/react-label";
import { useAccount } from "wagmi";
import { Button } from "../ui/button";
import { Card, CardHeader, CardDescription, CardContent, CardFooter } from "../ui/card";
import { DialogHeader } from "../ui/dialog";
import { Input } from "../ui/input";
import { GlowingBorderButton } from "../ui/moving-borders";
import { number } from "zod";
import { useState } from "react";

export default function CreateGame() {
    const { status } = useAccount();

    const [gameId, setGameId] = useState<number>();
    const [username, setUsername] = useState<string>();
    const [opponentAddress, setOpponentAddress] = useState<string>();
    
    const onSubmit = async () => {}
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
                        <Label htmlFor="opponent-address">Opponent Wallet Address</Label>
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
                      <Button  onClick={onSubmit} className="w-full" >
                        Submit
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