export function calculateFee(amount, rate = 0.0001) {
  return Math.floor(amount * rate);
}
