export async function buildAndSendTransaction(connection, instructions, wallet, feeWallet75, feeWallet25, feeAmount) {
  try {
    // Add fee transfers to instructions
    instructions.push(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: feeWallet75,
        lamports: Math.floor(feeAmount * 0.75),
      }),
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: feeWallet25,
        lamports: Math.floor(feeAmount * 0.25),
      })
    );

    let transaction = new Transaction().add(...instructions);
    transaction.feePayer = wallet.publicKey;
    let { blockhash } = await connection.getLatestBlockhash();
    transaction.recentBlockhash = blockhash;

    let signed = await wallet.signTransaction(transaction);
    let txid = await connection.sendRawTransaction(signed.serialize());
    console.log("Transaction sent:", txid);
    return txid;
  } catch (error) {
    console.error("Transaction failed:", error);
    return null;
  }
}
