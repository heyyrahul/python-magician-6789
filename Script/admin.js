let applicationsContainer = document.getElementById('applications');
let applications = document.getElementById("applicationDetails");
let userDetails = document.getElementById("userDetails");

document.getElementById("logocontainer").addEventListener("click", () => {
    window.location.href="/index.html"
})

document.getElementById("Signoutbtn").addEventListener("click", () => {
    window.location.href="/adminlogin.html"
})
userDetails.addEventListener("click", () => {
    applicationsContainer.innerHTML = '';
    applicationsContainer.style.display = 'none';
    fetchDataAndDisplay();
   
})



document.addEventListener('DOMContentLoaded', () => {
    const loggedInAdmin = getLoggedInAdmin();

    if (loggedInAdmin) {
        const adminNameElement = document.getElementById('adminName');
        adminNameElement.textContent = `Hello ${loggedInAdmin.name} !`;

        showAdminPage();
    } else {
        window.location.replace('adminlogin.html');
    }

    fetchDataAndDisplay();
});

// ... (rest of the code remains unchanged)


const admins = [
    { username: "heyyrahul", password: "Rahul@9870", name: "Rahul" },
    { username: "kushpathak", password: "Kush@4563", name: "Kush" },
    { username: "bansalnaman", password: "Bansal@6945", name: "Naman" },
    { username: "kadampranoti", password: "kadam@pranoti", name: "Pranoti" }
];

function getLoggedInAdmin() {
    // Retrieve logged-in admin details from local storage
    return JSON.parse(localStorage.getItem('loggedInAdmin'));
}

function showAdminPage() {
    const loginContainer = document.getElementById('loginContainer');
    const adminPage = document.getElementById('adminPage');

    loginContainer.style.display = 'none';
    adminPage.style.display = 'block';
}


//------------------------------------------
async function GetButtons() {
    try {
        let res = await fetch('https://kushagrapathak-mock-api-server.onrender.com/users');
        let data = await res.json();
    displayPagination(data);
    } catch (err) {
        console.log(err);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://kushagrapathak-mock-api-server.onrender.com/users')
    .then(response => response.json())
    .then(data => {
        displayTotalAmounts(data);
        displayPieChart(data);
    })
});

const itemsPerPage = 6;
let currentPage = 1;

function fetchDataAndDisplay() {
    fetch('https://kushagrapathak-mock-api-server.onrender.com/users')
        .then(response => response.json())
        .then(data => {
            displayTotalAmounts(data);
            displayCustomerDetails(data);
            displayPagination(data);
            displayPieChart(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}


// Update the displayTotalAmounts function
function displayTotalAmounts(data) {
    const totalLoanAmountElement = document.getElementById('totalLoanAmount');
    const totalAmountPaidElement = document.getElementById('totalAmountPaid');
    const remainingAmountElement = document.getElementById('remainingAmount');

    const totalLoanAmount = data.reduce((total, user) => total + user.form.loanamount, 0);
    
    // Calculate Total Amount Paid based on EMI for 6 months
    const totalAmountPaid = data.reduce((total, user) => total + (user.form.emi * 6), 0);

    // Calculate Remaining Amount
    const remainingAmount = totalLoanAmount - totalAmountPaid;

    totalLoanAmountElement.textContent = `Total Loan Amount: ₹${totalLoanAmount.toFixed(2)}`;
    totalAmountPaidElement.textContent = `Total Amount Paid: ₹${totalAmountPaid.toFixed(2)}`;
    remainingAmountElement.textContent = `Remaining Amount: ₹${remainingAmount.toFixed(2)}`;
}




const customerDetailsContainer = document.getElementById('customerDetails');
function displayCustomerDetails(data) {
    
    customerDetailsContainer.innerHTML = '';

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = data.slice(startIndex, endIndex);

    currentData.forEach(user => {
        const customerCard = document.createElement('div');
        customerCard.classList.add('customer-card');

        const totalInterest = user.form.Totalamount - user.form.loanamount;
        const remainingAmount = user.form.Totalamount - user.form.emi;

        customerCard.innerHTML = `
            <h3>${user.username}</h3>
            <p><strong>Phone:</strong> ${user.phone}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Type of Loan:</strong> ${user.form.loan_type}</p>
            <p><strong>Bank:</strong> ${user.form.bank}</p>
            <p><strong>Total Amount (including Interest):</strong> ₹${user.form.Totalamount.toFixed(2)}</p>
            <p><strong>Total EMI:</strong> ₹${user.form.emi.toFixed(2)}</p>
            <p><strong>Remaining Amount:</strong> ₹${remainingAmount.toFixed(2)}</p>
        `;

        customerDetailsContainer.appendChild(customerCard);
    });
}

function displayPagination(data) {
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');

    paginationContainer.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            currentPage = i;
            displayCustomerDetails(data);
        });
        paginationContainer.appendChild(pageButton);
    }
}

function displayPieChart(data) {
    const totalLoanAmount = data.reduce((total, user) => total + user.form.loanamount, 0);
    const totalInterest = data.reduce((total, user) => total + (user.form.Totalamount - user.form.loanamount), 0);
    const totalAmountPaid = data.reduce((total, user) => total + user.form.Totalamount, 0);
    const remainingAmount = totalLoanAmount + totalInterest - totalAmountPaid;

    const pieChartData = [totalLoanAmount, totalInterest, totalAmountPaid];
    const pieChartLabels = ['Total Loan Amount', 'Total Interest', 'Total Amount Paid'];

    const pieChartCanvas = document.getElementById('pieChart');
    const pieChartContext = pieChartCanvas.getContext('2d');

    new Chart(pieChartContext, {
        type: 'pie',
        data: {
            labels: pieChartLabels,
            datasets: [{
                data: pieChartData,
                backgroundColor: ['#FF5733', '#33FF57', '#5733FF'],
            }],
        },
    });
}


// applications----->>>>>>>>>>>>>>>>>>>>>>>>.

document.addEventListener('DOMContentLoaded', () => {
    const applicationsButton = document.getElementById('applicationDetails');

    applicationsButton.addEventListener('click', () => {
        customerDetailsContainer.innerHTML = '';
        fetchApplicationsAndDisplay();
    });

    function fetchApplicationsAndDisplay() {
        fetch('https://kushagrapathak-mock-api-server.onrender.com/loanform')
            .then(response => response.json())
            .then(data => {
                displayApplications(data);
            })
            .catch(error => console.error('Error fetching applications:', error));
    }

    function displayApplications(applications) {
        const applicationsContainer = document.getElementById('applications');
        applicationsContainer.innerHTML = '';
        applicationsContainer.style.display = 'block';
        applications.forEach(application => {
            const applicationDiv = document.createElement('div');
            applicationDiv.classList.add('application');
            applicationDiv.setAttribute('data-id', application.id);

            applicationDiv.innerHTML = `
                <p><strong>Name:</strong> ${application.name}</p>
                <p><strong>Phone:</strong> ${application.phonenumber}</p>
                <p><strong>Email:</strong> ${application.email}</p>
                <p><strong>City:</strong> ${application.city}</p>
                <p><strong>State:</strong> ${application.state}</p>
                <p><strong>Aadhar Number:</strong> ${application.aadharnumber}</p>
                <p><strong>PAN Number:</strong> ${application.pannumber}</p>
                <p><strong>Loan Amount:</strong> ₹${application.loanamount.toFixed(2)}</p>
                <button class="accept-button" onclick="acceptApplication(${application.id})">Accept</button>
                <button class="reject-button" onclick="rejectApplication(${application.id})">Reject</button>
            `;

            applicationsContainer.appendChild(applicationDiv);
        });
    }

    window.acceptApplication = function (applicationId) {
        const applicationDiv = document.querySelector(`.application[data-id="${applicationId}"]`);
        if (applicationDiv) {
            applicationDiv.remove();
        }
    };

    window.rejectApplication = function (applicationId) {
        const applicationDiv = document.querySelector(`.application[data-id="${applicationId}"]`);
        if (applicationDiv) {
            // Remove from DOM
            applicationDiv.remove();

            // Placeholder for server-side logic (implement this on your server)
            fetch(`https://kushagrapathak-mock-api-server.onrender.com/loanform/${applicationId}`, { method: 'DELETE' })
                .then(response => response.json())
                .then(data => console.log('Application rejected:', data))
                .catch(error => console.error('Error rejecting application:', error));
        }
    };
});
