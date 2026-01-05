"use client";

import { useState } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { DRIFT_ABI, DRIFT_ADDRESS } from "@/lib/contract";

export function CastMessage() {
  const [message, setMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { writeContract, data: hash, isPending, error } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    writeContract({
      address: DRIFT_ADDRESS,
      abi: DRIFT_ABI,
      functionName: "castMessage",
      args: [message],
    });
  };

  if (isSuccess) {
    return (
      <div className="card-notch p-6 sm:p-8 text-center space-y-4 glow-purple mx-2 sm:mx-0">
        <p className="text-base sm:text-lg text-muted font-mono">
          Your message drifts into the digital ocean...
        </p>
        <button
          onClick={() => {
            setMessage("");
            setIsOpen(false);
          }}
          className="text-sm text-dim hover:text-muted font-mono underline underline-offset-4 py-2"
        >
          Cast another
        </button>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-notch w-full py-4 sm:py-5 px-6 text-base sm:text-lg font-mono text-muted hover:text-foreground mx-2 sm:mx-0"
        style={{ width: "calc(100% - 16px)", marginLeft: "8px", marginRight: "8px" }}
      >
        Cast a Message
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card-notch p-4 sm:p-6 space-y-4 mx-2 sm:mx-0">
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message to a stranger..."
        className="w-full h-28 sm:h-32 p-3 sm:p-4 bg-background border border-theme rounded resize-none focus:outline-none focus:border-gray-light font-mono text-sm"
        disabled={isPending || isConfirming}
        maxLength={280}
        autoFocus
      />
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <span className="text-xs sm:text-sm text-dim font-mono order-2 sm:order-1 text-center sm:text-left">
          {message.length}/280
        </span>
        <div className="flex gap-2 sm:gap-3 order-1 sm:order-2">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex-1 sm:flex-none px-4 py-3 sm:py-2 text-dim hover:text-muted font-mono text-sm border border-theme rounded sm:border-0"
            disabled={isPending || isConfirming}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!message.trim() || isPending || isConfirming}
            className="flex-1 sm:flex-none btn-notch btn-notch-primary px-4 sm:px-6 py-3 sm:py-2 font-mono text-sm font-medium text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending
              ? "Waiting..."
              : isConfirming
              ? "Casting..."
              : "Cast"}
          </button>
        </div>
      </div>
      {error && (
        <p className="text-xs sm:text-sm text-red-400 font-mono text-center sm:text-left">
          {error.message.includes("User rejected")
            ? "Transaction cancelled"
            : "Something went wrong"}
        </p>
      )}
    </form>
  );
}
