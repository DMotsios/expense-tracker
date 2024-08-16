export function transactionFormValidation(text, amount) {
  if (!text || !amount || amount == "-") {
    return "Text and amount fields are required";
  }

  let numberAmount = parseFloat(amount);
  if (isNaN(numberAmount)) {
    return "Amount must be a number";
  }
  
  return "success";
}
