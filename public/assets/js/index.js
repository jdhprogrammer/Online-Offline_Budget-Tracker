// import Chart from "chart.js";

let transactions = [];
let myChart;

fetch("/api/transaction")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // save db data on global variable
    transactions = data;

    populateTotal();
    populateTable();
    //populateChart();
    populateChart2();
  });

function populateTotal() {
  // reduce transaction amounts to a single total value
  let total = transactions.reduce((total, t) => {
    return total + parseInt(t.value);
  }, 0);

  let totalEl = document.querySelector("#total");
  totalEl.textContent = total;
}

function populateTable() {
  let tbody = document.querySelector("#tbody");
  tbody.innerHTML = "";

  transactions.forEach((transaction) => {
    // create and populate a table row
    let tValue = parseInt(transaction.value);
    let tr = document.createElement("tr");

    if (parseInt(tValue) < 0) {
      tr.className = "neg";
      tr.innerHTML = `
          <td class="negTd">${transaction.name}</td>
          <td class="negTd">${transaction.value}</td>
        `;
    } else if (parseInt(tValue) > 0) {
      tr.className = "pos";
      tr.innerHTML = `
      <td class="posTd">${transaction.name}</td>
      <td class="posTd">${transaction.value}</td>
    `;
    } else {
      tr.ClassName = "neut";
      tr.innerHTML = `
    <td class="neutTd">${transaction.name}</td>
    <td class="neutTd">${transaction.value}</td>
    `;
    }

    tbody.appendChild(tr);
  });
}

function sendTransaction(isAdding) {
  let nameEl = document.querySelector("#t-name");
  let amountEl = document.querySelector("#t-amount");
  let errorEl = document.querySelector(".form .error");

  // validate form
  if (nameEl.value === "" || amountEl.value === "") {
    errorEl.textContent = "Missing Information";
    return;
  } else {
    errorEl.textContent = "";
  }

  // create record
  let transaction = {
    name: nameEl.value,
    value: amountEl.value,
    date: new Date().toISOString(),
  };

  // if subtracting funds, convert amount to negative number
  if (!isAdding) {
    transaction.value *= -1;
  }

  // add to beginning of current array of data
  transactions.unshift(transaction);

  // re-run logic to populate ui with new record
  //populateChart();
  populateTable();
  populateTotal();
  populateChart2();

  // also send to server
  fetch("/api/transaction", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.errors) {
        errorEl.textContent = "Missing Information";
      } else {
        // clear form
        nameEl.value = "";
        amountEl.value = "";
      }
    })
    .catch((err) => {
      // fetch failed, so save in indexed db
      saveRecord(transaction);

      // clear form
      nameEl.value = "";
      amountEl.value = "";
    });
}

document.querySelector("#add-btn").onclick = function () {
  sendTransaction(true);
};

document.querySelector("#sub-btn").onclick = function () {
  sendTransaction(false);
};

function generatePalette() {
  const arr = [
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#f4ab2e",
    "#eeca14",
    "#fbfb5f",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#000226",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#f4ab2e",
    "#eeca14",
    "#fbfb5f",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#000226",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#f4ab2e",
    "#eeca14",
    "#fbfb5f",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#000226",
    "#003f5c",
    "#2f4b7c",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#f4ab2e",
    "#eeca14",
    "#fbfb5f",
    "#665191",
    "#a05195",
    "#d45087",
    "#f95d6a",
    "#ff7c43",
    "#000226",
  ];

  return arr;
}

function populateChart2() {
  // let balance = transactions.reduce((balance, t) => {
  //     return balance + parseInt(t.value);
  // }, 0);

  let debitLabels = [];
  let debits = [];
  let creditLabels = [];
  let credits = [];
  let neutLabels = [];
  let neuts = [];
  let allLabels = [];
  let all = [];

  const colors = generatePalette();

  transactions.forEach((transaction) => {
    // create and populate a table row
    let tValue = parseInt(transaction.value);
    let tName = transaction.name;

    if (parseInt(tValue) < 0) {
      creditLabels.push(tName);
      credits.push(tValue);
      allLabels.push(tName);
      all.push(tValue);
    } else if (parseInt(tValue) > 0) {
      debitLabels.push(tName);
      debits.push(tValue);
      allLabels.push(tName);
      all.push(tValue);
    } else {
      neutLabels.push(tName);
      neuts.push(tValue);
      allLabels.push(tName);
      all.push(tValue);
    }
  });

  let line = document.querySelector("#canvas1").getContext("2d");
  let bar = document.querySelector("#canvas2").getContext("2d");
  let pie = document.querySelector("#canvas3").getContext("2d");
  let pie2 = document.querySelector("#canvas4").getContext("2d");

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let reversed2 = transactions.slice().reverse();
  let sum = 0;

  // const dateLabels = reversed.map(({ day }) => {
  //     const date = new Date(day);
  //     return daysOfWeek[date.getDay()];
  // });
  // create date labels for chart
  let dateLabels = reversed2.map((t) => {
    let date = new Date(t.date);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  });

  // create incremental values for chart
  let data2 = reversed2.map((t) => {
    sum += parseInt(t.value);
    return sum;
  });

  let lineChart = new Chart(line, {
    type: "line",
    data: {
      labels: dateLabels,
      datasets: [
        {
          label: "Budget Balance",
          backgroundColor: [
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
          fill: false,
          data: data2,
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
      },
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
            },
          },
        ],
      },
    },
  });

  let barChart = new Chart(bar, {
    type: "bar",
    data: {
      labels: allLabels,
      datasets: [
        {
          label: "Transactions",
          data: all,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "All Budget Items",
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });

  let pieChart = new Chart(pie, {
    type: "pie",
    data: {
      labels: debitLabels,
      datasets: [
        {
          label: "Income Earned",
          backgroundColor: colors,
          data: debits,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Income Earned",
      },
    },
  });

  let donutChart = new Chart(pie2, {
    type: "doughnut",
    data: {
      labels: creditLabels,
      datasets: [
        {
          label: "Expenses Paid",
          backgroundColor: colors,
          data: credits,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Expenses Paid",
      },
    },
  });
}

// function calculateTotalWeight(data) {
//     // let total = transactions.reduce((total, t) => {
//     //     return total + parseInt(t.value);
//     // }, 0);

//     // let totalEl = document.querySelector("#total");
//     // totalEl.textContent = total;

//     let totals = [];

//     data.forEach((workout) => {
//         const workoutTotal = workout.exercises.reduce((total, { type, weight }) => {
//             if (type === 'resistance') {
//                 return total + weight;
//             } else {
//                 return total;
//             }
//         }, 0);

//         totals.push(workoutTotal);
//     });

//     return totals;
// }

function transactionNames(data) {
  let transactions = [];

  data.forEach((transaction) => {
    transactions.push(transaction.name);
  });

  // return de-duplicated array with JavaScript `Set` object
  return [...new Set(transactions)];
}

populateChart2(transactions);

// function //populateChart() {
//     // copy array and reverse it
//     let reversed = transactions.slice().reverse();
//     let sum = 0;

//     // create date labels for chart
//     let labels = reversed.map(t => {
//         let date = new Date(t.date);
//         return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
//     });

//     // create incremental values for chart
//     let data = reversed.map(t => {
//         sum += parseInt(t.value);
//         return sum;
//     });

//     // remove old chart if it exists
//     if (myChart) {
//         myChart.destroy();
//     }

//     let ctx = document.getElementById("myChart").getContext("2d");

//     myChart = new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels,
//             datasets: [{
//                 label: "Total Over Time",
//                 fill: true,
//                 backgroundColor: "#6666ff",
//                 data
//             }]
//         }
//     });
// }
