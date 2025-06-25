import axios from "axios";

export async function fetchJupiterPrices(tokenMintA, tokenMintB) {
  const url = `https://quote-api.jup.ag/v6/quote?inputMint=${tokenMintA}&outputMint=${tokenMintB}&amount=1000000`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Jupiter prices:", error);
    return null;
  }
}
