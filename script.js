function formatCurrency(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(number);
}

function calculateSavings() {
  const toolCheckboxes = document.querySelectorAll(".tool-checkbox");
  const planRadios = document.querySelectorAll('input[name="ghl-plan"]');
  const hoursLost = document.getElementById("hoursLost");
  const hourlyRate = document.getElementById("hourlyRate");

  let stackCost = 0;
  let selectedCount = 0;

  toolCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      stackCost += Number(checkbox.dataset.price);
      selectedCount++;
    }
  });

  let ghlCost = 97;
  planRadios.forEach((radio) => {
    if (radio.checked) {
      ghlCost = Number(radio.value);
    }
  });

  const hoursLostValue = Number(hoursLost.value);
  const hourlyRateValue = Number(hourlyRate.value);
  const timeWaste = hoursLostValue * hourlyRateValue;
  const bloatedTotal = stackCost + timeWaste;
  const monthlySavings = bloatedTotal - ghlCost;
  const annualSavings = monthlySavings * 12;

  document.getElementById("selected-count").textContent = `${selectedCount} selected`;
  document.getElementById("hoursLostValue").textContent = hoursLostValue;
  document.getElementById("hourlyRateValue").textContent = formatCurrency(hourlyRateValue);
  document.getElementById("stackCost").textContent = formatCurrency(stackCost);
  document.getElementById("timeWaste").textContent = formatCurrency(timeWaste);
  document.getElementById("bloatedTotal").textContent = formatCurrency(bloatedTotal);
  document.getElementById("ghlCost").textContent = formatCurrency(ghlCost);
  document.getElementById("monthlySavings").textContent = formatCurrency(monthlySavings);
  document.getElementById("annualSavings").textContent = formatCurrency(annualSavings);
}

document.addEventListener("DOMContentLoaded", () => {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("input", calculateSavings);
    input.addEventListener("change", calculateSavings);
  });

  calculateSavings();
});