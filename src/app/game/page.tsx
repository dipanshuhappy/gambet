"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";


const ChessRedirectForm = () => {
  const [inputText, setInputText] = useState("");
  const router = useRouter();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (inputText.trim()) {
      const url = `https://www.chess.com/callback/live/game/${inputText}`;
      router.push(url);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="p-6 bg-white shadow-md rounded-md w-full max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter game ID"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <Button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-md">
            Go to Game
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ChessRedirectForm;
