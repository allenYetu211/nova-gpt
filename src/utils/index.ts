export function keepDecimal(num: number, decimal: number) {
  return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal)
}
