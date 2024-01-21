const loanAmountInput = document.querySelector(".loan-amount");
const interestRateInput = document.querySelector(".interest-rate");
const loanTenureInput = document.querySelector(".loan-tenure");

const loanEMIValue = document.querySelector(".loan-emi .value");
const totalInterestValue = document.querySelector(".total-interest .value");
const totalAmountValue = document.querySelector(".total-amount .value");

const calculateBtn = document.querySelector(".calculate-btn");

let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanTenure = parseFloat(loanTenureInput.value);
let applybutton = document.getElementById('applybutton');

let interest = interestRate / 100 / 12;

let myChart;

const checkValues = () => {
  let loanAmountValue = loanAmountInput.value;
  let interestRateValue = interestRateInput.value;
  let loanTenureValue = loanTenureInput.value;

  let regexNumber = /^[0-9]+$/;
  if ( loanAmountValue < 0 || isNaN(loanAmountValue)) {
    // loanAmountInput.value = "10000";
    alert("Please enter valid amount");
    return false;
  }

  if ( loanTenureValue < 0 || isNaN(loanTenureValue)) {
    // loanTenureInput.value = "12";
    alert("Please enter valid intrest rate");
    return false;
  }

  if (interestRateValue < 0 || isNaN(interestRateValue) ) {
    // interestRateInput.value = "7.5";
    alert("Please enter a valid number");
    return false;
  }
};

const displayChart = (totalInterestPayableValue) => {
  const ctx = document.getElementById("myChart").getContext("2d");
  myChart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Total Interest", "Principal Loan Amount"],
      datasets: [
        {
          data: [totalInterestPayableValue, loanAmount],
          backgroundColor: ["#e63946", "#14213d"],
          borderWidth: 0,
        },
      ],
    },
  });
};

const updateChart = (totalInterestPayableValue) => {
  myChart.data.datasets[0].data[0] = totalInterestPayableValue;
  myChart.data.datasets[0].data[1] = loanAmount;
  myChart.update();
};

const refreshInputValues = () => {
  loanAmount = parseFloat(loanAmountInput.value);
  interestRate = parseFloat(interestRateInput.value);
  loanTenure = parseFloat(loanTenureInput.value);
  interest = interestRate / 12 / 100;
};

const calculateEMI = () => {
  if (checkValues() === false) {
    return false;
  }
  refreshInputValues();
  let emi =
    loanAmount *
    (interest * Math.pow(1 + interest, loanTenure)) /
    (Math.pow(1 + interest, loanTenure) - 1);

  return emi;
};

const calculateTotalAmount = (emi) => {
  let totalAmount = Math.round(emi * loanTenure);
  return totalAmount;
};
const updateData = (emi) => {
    console.log('in updateData', emi, isNaN(emi));
    loanEMIValue.innerHTML = (isNaN(emi) ? 0 : Math.round(emi));

    let totalAmount = calculateTotalAmount(emi);
    totalAmountValue.innerHTML = (isNaN(totalAmount) ? 0 : Math.round(totalAmount));

    let totalInterestPayable = Math.round(totalAmount - loanAmount);
    totalInterestValue.innerHTML = (isNaN(totalInterestPayable) ? 0 : Math.round(totalInterestPayable));

    if (myChart) {
        updateChart(totalInterestPayable);
    } else {
        displayChart(totalInterestPayable);
    }
};


const calculateAndUpdate = () => {
  let emi = calculateEMI();
  console.log('in calculateAndUpdate ', emi);
  if (emi === false) {
    return false;
  }
//   console.log('in calculateAndUpdate before update', emi);
  updateData(emi);
//   console.log('in calculateAndUpdate after update', emi);
};
const init = () => {
  calculateAndUpdate();
};

document.addEventListener("DOMContentLoaded", function() {
    // Your existing code here
  
   
  
    calculateBtn.addEventListener("click", calculateAndUpdate);
    init();
  });


calculateBtn.addEventListener("click", calculateAndUpdate);
init();

async function getProducts() {
  try {
    let data = {
      "name": document.getElementById("name").value,
      "phonenumber": document.getElementById("phone").value,
      "email": document.getElementById("email").value,
      "city": document.getElementById("city").value,
      "state": document.getElementById("state").value,
      "aadharnumber": document.getElementById("aadhar").value,
      "pannumber": document.getElementById("pan").value,
      "loanamount": document.getElementById("loanAmount").value
    };

    const response = await fetch("https://kushagrapathak-mock-api-server.onrender.com/loanform", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const products = await response.json();
    console.log(products);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

applybutton.addEventListener("click", getProducts);

