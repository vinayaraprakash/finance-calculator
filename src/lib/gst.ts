export type GSTType = "exclusive" | "inclusive";
export type GSTMode = "cgst_sgst" | "igst";

export function calculateGST(
  amount: number,
  rate: number,
  type: GSTType,
  mode: GSTMode
) {
  let baseAmount = amount;
  let gstAmount = 0;

  if (type === "exclusive") {
    gstAmount = (amount * rate) / 100;
    baseAmount = amount;
  } else {
    baseAmount = amount / (1 + rate / 100);
    gstAmount = amount - baseAmount;
  }

  let cgst = 0;
  let sgst = 0;
  let igst = 0;

  if (mode === "cgst_sgst") {
    cgst = gstAmount / 2;
    sgst = gstAmount / 2;
  } else {
    igst = gstAmount;
  }

  return {
    baseAmount: Number(baseAmount.toFixed(2)),
    gstAmount: Number(gstAmount.toFixed(2)),
    cgst: Number(cgst.toFixed(2)),
    sgst: Number(sgst.toFixed(2)),
    igst: Number(igst.toFixed(2)),
    totalAmount:
      type === "exclusive"
        ? Number((baseAmount + gstAmount).toFixed(2))
        : Number(amount.toFixed(2)),
  };
}
