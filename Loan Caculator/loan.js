function calculateLoan() {
  const principal = parseFloat(document.getElementById("amount").value);
  const annualInterestRate = parseFloat(document.getElementById("rate").value);
  const years = parseInt(document.getElementById("years").value);

  if (!principal || !annualInterestRate || !years || principal <= 0 || years <= 0) {
    document.getElementById("payment").innerHTML = "Please enter valid values.";
    return;
  }

  const monthlyInterestRate = annualInterestRate / 100 / 12;
  const totalPayments = years * 12;

  const monthlyPayment =
    (principal * monthlyInterestRate) /
    (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

  const result = monthlyPayment.toFixed(2);

  document.getElementById("payment").innerHTML = `Monthly Payment: ₹${result}`;
}
