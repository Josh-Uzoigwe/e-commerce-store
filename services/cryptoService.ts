// -------------------------------
// IMPORTS (Ethers v6 style)
// -------------------------------
import {
  BrowserProvider,
  Contract,
  formatEther,
  parseEther
} from "ethers";

// Allow usage of `window.ethereum` in TypeScript without errors
declare global {
  interface Window {
    ethereum?: any;
  }
}
// -------------------------------
// TYPES
// -------------------------------
export interface WalletState {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
}

// -------------------------------
// SMART CONTRACT SETUP
// -------------------------------
const CONTRACT_ADDRESS = "0xfD1fAf7804Ad5b2F8feAcfa50BaB4d9EB45c4F68";

const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "orderId",
        "type": "string"
      }
    ],
    "name": "pay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "payer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "orderId",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "timestamp",
        "type": "uint256"
      }
    ],
    "name": "PaymentReceived",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// -------------------------------
// CONNECT WALLET
// -------------------------------
export const connectWallet = async (): Promise<WalletState> => {
  if (!window.ethereum) {
    throw new Error("MetaMask or another Web3 wallet is not installed");
  }

  try {
    const provider = new BrowserProvider(window.ethereum);

    // Request accounts from the wallet to ensure the user authorizes access
    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const balanceBigInt = await provider.getBalance(address);
    const balance = formatEther(balanceBigInt);

    return {
      address,
      balance,
      isConnected: true
    };
  } catch (err: any) {
    console.error("Wallet connection failed", err);
    // Normalize and rethrow error for callers
    throw new Error(err?.message || "Wallet connection failed");
  }
};

// -------------------------------
// LIVE ETH PRICE (CoinGecko)
// - Caches the price for a short TTL to avoid frequent requests
// - Falls back to a safe default on error
// -------------------------------
let _cachedEthPrice: number | null = null;
let _cachedAt = 0;
const ETH_PRICE_TTL = 60_000; // 60 seconds

export const getEthPrice = async (): Promise<number> => {
  const now = Date.now();
  if (_cachedEthPrice !== null && now - _cachedAt < ETH_PRICE_TTL) {
    return _cachedEthPrice;
  }

  try {
    const res = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );

    if (!res.ok) throw new Error(`CoinGecko responded ${res.status}`);

    const data = await res.json();
    const price = data?.ethereum?.usd;

    if (typeof price !== "number") {
      throw new Error("Unexpected CoinGecko response shape");
    }

    _cachedEthPrice = price;
    _cachedAt = now;
    return price;
  } catch (err) {
    console.error("Failed to fetch ETH price from CoinGecko", err);
    // Fallback to a sensible default so the app remains usable
    return 3500;
  }
};

// -------------------------------
// SEND PAYMENT TO CONTRACT
// -------------------------------
export const sendPayment = async (
  amountUSD: number,
  orderId: string
): Promise<{ hash: string; receipt: any; success: boolean }> => {
  if (!window.ethereum) {
    throw new Error("Crypto wallet not available");
  }

  const ethPrice = await getEthPrice();
  const ethAmount = (amountUSD / ethPrice).toFixed(18);

  try {
    const provider = new BrowserProvider(window.ethereum);

    // Ensure account access (prompts MetaMask if needed)
    await provider.send("eth_requestAccounts", []);

    const signer = await provider.getSigner();

    const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    console.log(`Sending ${ethAmount} ETH for Order ${orderId}`);

    const tx = await contract.pay(orderId, {
      value: parseEther(ethAmount)
    });

    console.log("Tx Hash:", tx.hash);

    const receipt = await tx.wait(1);
    return {
      hash: tx.hash,
      receipt,
      success: true
    };
  } catch (err: any) {
    console.error("Payment error:", err);

    // Common user rejection codes: 4001 (EIP-1193) or provider-specific strings
    if (err?.code === 4001 || err?.code === "ACTION_REJECTED") {
      throw new Error("User rejected transaction");
    }

    if (
      err?.code === "BAD_DATA" ||
      err?.message?.includes("contract runner") ||
      err?.code === "CALL_EXCEPTION"
    ) {
      throw new Error(
        "Contract error. Confirm the contract is deployed and CONTRACT_ADDRESS is correct."
      );
    }

    throw new Error(err?.reason || err?.message || "Blockchain error");
  }
};
