import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@radix-ui/react-dialog";
import { useAccount, useConnect } from "wagmi";
import { Button } from "../ui/button";
import { DialogHeader } from "../ui/dialog";

export default function WalletConnect() {
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