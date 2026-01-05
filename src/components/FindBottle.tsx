"use client";

import { useState, useMemo } from "react";
import { useReadContract } from "wagmi";
import { DRIFT_ABI, DRIFT_ADDRESS } from "@/lib/contract";
import { BottleIcon } from "./BottleIcon";

const OPENING_MESSAGES = [
  "Searching the ocean...",
  "A bottle washes ashore...",
  "Something drifts your way...",
  "The tide brings a gift...",
  "A message from afar...",
  "Waves carry a secret...",
  "The sea reveals a bottle...",
  "Destiny delivers...",
];

export function FindBottle() {
  const [seed, setSeed] = useState<bigint | null>(null);
  const [isRevealing, setIsRevealing] = useState(false);
  const [openingMessage, setOpeningMessage] = useState(OPENING_MESSAGES[0]);

  const { data: messageCount } = useReadContract({
    address: DRIFT_ADDRESS,
    abi: DRIFT_ABI,
    functionName: "getMessageCount",
  });

  const { data: bottle, isLoading } = useReadContract({
    address: DRIFT_ADDRESS,
    abi: DRIFT_ABI,
    functionName: "findBottle",
    args: seed !== null ? [seed] : undefined,
    query: {
      enabled: seed !== null,
    },
  });

  const handleFind = () => {
    setIsRevealing(true);
    setOpeningMessage(OPENING_MESSAGES[Math.floor(Math.random() * OPENING_MESSAGES.length)]);
    const newSeed = BigInt(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER));
    setSeed(newSeed);
    setTimeout(() => setIsRevealing(false), 500);
  };

  const handleFindAnother = () => {
    setSeed(null);
    setTimeout(handleFind, 100);
  };

  const formatDate = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const hasMessages = messageCount && messageCount > 0n;

  if (!hasMessages) {
    return (
      <div className="card-notch p-6 sm:p-8 text-center mx-2 sm:mx-0">
        <BottleIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-dim font-mono text-sm sm:text-base">
          The ocean is empty. Be the first to cast a message.
        </p>
      </div>
    );
  }

  if (bottle && !isLoading && !isRevealing) {
    const [content, timestamp] = bottle;
    return (
      <div className="space-y-4 sm:space-y-6 mx-2 sm:mx-0">
        <div className="card-notch p-5 sm:p-8 glow-cyan">
          <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
            <BottleIcon className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0 mt-1 animate-float" />
            <p className="text-base sm:text-lg leading-relaxed font-mono">
              {content}
            </p>
          </div>
          <p className="text-xs sm:text-sm text-dim font-mono">
            Cast on {formatDate(timestamp)}
          </p>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleFindAnother}
            className="text-sm text-dim hover:text-muted font-mono underline underline-offset-4 py-2"
          >
            Find another bottle
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleFind}
      disabled={isLoading || isRevealing}
      className="btn-notch w-full py-4 sm:py-5 px-6 text-base sm:text-lg font-mono text-muted hover:text-foreground disabled:opacity-50 mx-2 sm:mx-0"
      style={{ width: "calc(100% - 16px)", marginLeft: "8px", marginRight: "8px" }}
    >
      {isLoading || isRevealing ? (
        <span className="flex items-center justify-center gap-2">
          <BottleIcon className="w-5 h-5 animate-float" />
          {openingMessage}
        </span>
      ) : (
        "Find a Bottle"
      )}
    </button>
  );
}
