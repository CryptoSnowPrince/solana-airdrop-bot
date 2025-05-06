const solanaWeb3 = require('@solana/web3.js');
const dotenv = require('dotenv');
dotenv.config();

const PUBKEY = process.env.PUBKEY; // Replace with your wallet public key
const RPC = process.env.RPC; // Replace with your RPC URL
const INTERVAL = 6 * 3600; // Default to 6 hours if not set

// Set up connection to devnet
const connection = new solanaWeb3.Connection(RPC, 'confirmed');

// Replace with the public key you want to airdrop SOL to
const recipientPublicKey = new solanaWeb3.PublicKey(PUBKEY);

let count = 0;
// Airdrop 1 SOL every 2 hours
async function airdropSol() {
    try {
        console.log(`Request ${count++}: Requesting airdrop of 1 SOL to ${recipientPublicKey.toBase58()}...`);
        const signature = await connection.requestAirdrop(
            recipientPublicKey,
            solanaWeb3.LAMPORTS_PER_SOL // 1 SOL
        );
        await connection.confirmTransaction({ signature }, 'confirmed');
        console.log(`Airdrop successful. Signature: ${signature}`);
    } catch (error) {
        console.error('Airdrop failed:', error);
    }
}

// Run airdrop
airdropSol(); // initial run
setInterval(airdropSol, INTERVAL * 1000);
