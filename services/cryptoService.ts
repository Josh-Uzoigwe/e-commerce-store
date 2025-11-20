import { ethers } from 'ethers';

// Types
export interface WalletState {
  address: string | null;
  balance: string | null;
  isConnected: boolean;
}

// --- SMART CONTRACT CONFIGURATION ---

// 1. DEPLOY THE CONTRACT IN 'contracts/PaymentProcessor.sol' USING REMIX (https://remix.ethereum.org/)
// 2. PASTE THE DEPLOYED CONTRACT ADDRESS HERE:
const CONTRACT_ADDRESS = "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"; // <--- REPLACE THIS WITH YOUR DEPLOYED ADDRESS

// 3. IF YOU CHANGE THE SOLIDITY CODE, UPDATE THIS ABI JSON:
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
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

export const connectWallet = async (): Promise<WalletState> => {
  // @ts-ignore
  if (typeof window.ethereum === 'undefined') {
    throw new Error("MetaMask is not installed!");
  }

  try {
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();
    const balanceBigInt = await provider.getBalance(address);
    const balance = ethers.formatEther(balanceBigInt);

    return {
      address,
      balance,
      isConnected: true
    };
  } catch (error) {
    console.error("Wallet connection failed", error);
    throw error;
  }
};

export const getEthPrice = async (): Promise<number> => {
  // In production, fetch from CoinGecko or Oracle
  return 3500.00; // Hardcoded mock price for demo: 1 ETH = $3500
};

export const sendPayment = async (amountUSD: number, orderId: string) => {
  // @ts-ignore
  if (typeof window.ethereum === 'undefined') throw new Error("No Crypto Wallet found");

  const ethPrice = await getEthPrice();
  // Formatting to 18 decimals properly is complex, here we use standard string fixing
  // for robustness in this demo context.
  const ethAmount = (amountUSD / ethPrice).toFixed(18); 
  
  try {
    // @ts-ignore
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    // Initialize Contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    console.log(`Initiating Smart Contract Payment: ${ethAmount} ETH for Order ${orderId}`);

    // Call the 'pay' function on the smart contract
    const transactionResponse = await contract.pay(orderId, {
      value: ethers.parseEther(ethAmount)
    });
    
    console.log("Transaction Hash:", transactionResponse.hash);

    // Wait for 1 confirmation
    const receipt = await transactionResponse.wait(1);
    
    return {
        hash: transactionResponse.hash,
        success: true,
        receipt
    };
  } catch (error: any) {
    console.error("Smart Contract Payment Failed", error);
    
    if(error.code === "ACTION_REJECTED") {
        throw new Error("User rejected the transaction");
    }
    
    // Fallback for demo if contract address is invalid/not deployed yet
    if (error.code === "BAD_DATA" || error.message.includes("contract runner") || error.code === "CALL_EXCEPTION") {
       throw new Error("Contract error. Ensure you have deployed PaymentProcessor.sol and updated the CONTRACT_ADDRESS in services/cryptoService.ts");
    }

    throw new Error("Blockchain transaction failed: " + (error.reason || error.message));
  }
};