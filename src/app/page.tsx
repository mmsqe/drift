"use client";

import { useAccount, useReadContract } from "wagmi";
import { WalletButton } from "@/components/WalletButton";
import { CastMessage } from "@/components/CastMessage";
import { FindBottle } from "@/components/FindBottle";
import { BottleIcon } from "@/components/BottleIcon";
import { DRIFT_ABI, DRIFT_ADDRESS } from "@/lib/contract";

export default function Home() {
  const { isConnected } = useAccount();

  const { data: messageCount } = useReadContract({
    address: DRIFT_ADDRESS,
    abi: DRIFT_ABI,
    functionName: "getMessageCount",
  });

  return (
    <div className="min-h-screen flex flex-col bg-grid relative">
      {/* Ocean waves background */}
      <div className="ocean-waves">
        <div className="wave wave-1" />
        <div className="wave wave-2" />
        <div className="wave wave-3" />
      </div>
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-4 sm:px-6 border-b border-theme">
        <div className="flex items-center gap-2">
          <BottleIcon className="w-8 h-8 sm:w-10 sm:h-10" />
          <h1 className="text-lg sm:text-xl font-mono font-medium tracking-tight">
            <span className="text-gradient">DRIFT</span>
          </h1>
        </div>
        <WalletButton />
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:px-6 sm:py-16">
        <div className="max-w-xl w-full space-y-8 sm:space-y-12">
          {/* Hero */}
          <div className="text-center space-y-4 sm:space-y-6">
            <BottleIcon className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 animate-float" />
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-mono font-medium leading-tight tracking-tight px-2">
              Messages adrift in the{" "}
              <span className="text-gradient">digital ocean</span>
            </h2>
            <p className="text-muted text-sm sm:text-lg font-mono px-4">
              Cast your thoughts into the void. Discover bottles from strangers.
            </p>
          </div>

          {/* Actions */}
          {isConnected ? (
            <div className="space-y-6 sm:space-y-8">
              <CastMessage />
              <div className="flex items-center gap-3 sm:gap-4 px-4">
                <div className="flex-1 h-px bg-divider" />
                <span className="text-dim text-xs sm:text-sm font-mono">OR</span>
                <div className="flex-1 h-px bg-divider" />
              </div>
              <FindBottle />
            </div>
          ) : (
            <div className="text-center px-4">
              <p className="text-dim mb-6 font-mono text-xs sm:text-sm">
                Connect your wallet to cast messages and find bottles
              </p>
              <WalletButton />
            </div>
          )}

          {/* Message count */}
          {messageCount !== undefined && (
            <div className="text-center pt-4 sm:pt-8">
              <p className="text-xs sm:text-sm text-dim font-mono">
                <span className="text-gradient font-medium">{messageCount.toString()}</span>
                {" "}message{messageCount !== 1n ? "s" : ""} adrift
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 sm:px-6 text-center border-t border-theme">
        <p className="text-xs sm:text-sm text-dim font-mono">
          Made with care for strangers everywhere
        </p>
        <p className="mt-1 text-xs text-faint font-mono">
          Onchain and eternal
        </p>
      </footer>
    </div>
  );
}
