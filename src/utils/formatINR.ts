export function formatINR(value?: number) {
  if (typeof value !== "number" || isNaN(value)) {
    return "₹0.00";
  }

  return value.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });
}
