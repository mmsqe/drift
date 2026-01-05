export const DRIFT_ABI = [
  {
    type: "function",
    name: "castMessage",
    inputs: [{ name: "content", type: "string" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "findBottle",
    inputs: [{ name: "seed", type: "uint256" }],
    outputs: [
      { name: "content", type: "string" },
      { name: "timestamp", type: "uint256" },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getMessageCount",
    inputs: [],
    outputs: [{ name: "", type: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "MessageCast",
    inputs: [
      { name: "id", type: "uint256", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
  },
  { type: "error", name: "EmptyMessage", inputs: [] },
  { type: "error", name: "NoMessages", inputs: [] },
] as const;

// Local Anvil deployment address (update after deploying)
export const DRIFT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3" as const;
