'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type ReactNode, useState } from 'react'
import { type State, useAccount, useDisconnect, WagmiProvider } from 'wagmi'

import { getConfig } from '@/wagmi'
import { Button } from '@/components/ui/button'
import { cn, shortenAddress } from '@/lib/utils'
import { If, Then } from 'react-if'
function Navbar({ className }: { className?: string }) {
  const account = useAccount();
  const { disconnect } = useDisconnect();

  return (
    <If condition={account && account.isConnected}>
      <Then>
        <div className={cn("fixed top-10 inset-x-0 w-fit mx-auto z-50")}>
          <div className="flex items-center gap-4">
            <div className="bg-muted rounded-md px-3 py-2 text-muted-foreground">
              {shortenAddress(account.address ?? "")}
            </div>
            <Button
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              onClick={() => disconnect()}
            >
              Disconnect
            </Button>
          </div>
        </div>
      </Then>
    </If>
  );
}
export function Providers(props: {
  children: ReactNode
  initialState?: State
}) {
  const [config] = useState(() => getConfig())
  const [queryClient] = useState(() => new QueryClient())

  return (
    <WagmiProvider config={config} initialState={props.initialState}>
      <QueryClientProvider client={queryClient}>
        <Navbar  className="top-2" />
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
