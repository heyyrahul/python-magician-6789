let notificationsElement = document.getElementById("notifications");

async function fetchNotifications() {
    try {
        let res = await fetch("https://kushagrapathak-mock-api-server.onrender.com/loanform");
        let data = await res.json();
        // Update the notifications count
        notificationsElement.textContent = data.length;
    } catch (err) {
        console.log(err);
    }
}

fetchNotifications(); 


const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});


// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

///external code


// Function to fetch applications and display them
function fetchApplicationsAndDisplay() {
    fetch('https://kushagrapathak-mock-api-server.onrender.com/loanform')
        .then(response => response.json())
        .then(data => {
            displayApplications(data);
        })
        .catch(error => console.error('Error fetching applications:', error));
}

// Function to display applications in the table
function displayApplications(applications) {
    const tbody = document.querySelector('#applicationsTable tbody');
    tbody.innerHTML = '';

    applications.forEach(application => {
        const row = document.createElement('tr');
        row.setAttribute('data-id', application.id);
        row.innerHTML = `
            <td>${application.name}</td>
            <td>${application.phonenumber}</td>
            <td>${application.email}</td>
            <td>₹${application.loanamount}</td>
            <td>
                <button class="accept-button" onclick="acceptApplication(${application.id})">Accept</button>
                <button class="reject-button" onclick="rejectApplication(${application.id})">Reject</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Function to accept an application
function acceptApplication(applicationId) {
    // Placeholder logic for accepting application
    console.log(`Application ${applicationId} accepted`);
    const applicationRow = document.querySelector(`#applicationsTable tbody tr[data-id="${applicationId}"]`);
    if (applicationRow) {
        applicationRow.remove();
    }
}



function rejectApplication(applicationId) {
    // Placeholder logic for rejecting application
    console.log(`Application ${applicationId} rejected`);
    const applicationRow = document.querySelector(`#applicationsTable tbody tr[data-id="${applicationId}"]`);
    if (applicationRow) {
        applicationRow.remove();
        // Remove data from the server
        fetch(`https://kushagrapathak-mock-api-server.onrender.com/loanform/${applicationId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete application');
            }
            fetchNotifications(); 
            console.log(`Application ${applicationId} deleted from the server`);
        })
        .catch(error => {
            console.error('Error deleting application:', error);
            
        });
    }
}

// Event listener for document ready
document.addEventListener('DOMContentLoaded', () => {
    fetchApplicationsAndDisplay();
});

//Amount display
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

//Onload 
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://kushagrapathak-mock-api-server.onrender.com/users')
    .then(response => response.json())
    .then(data => {
        displayTotalAmounts(data);
        // displayPieChart(data);
    })
});

//piechart

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

//Stats

// Function to display statistics chart
function displayStatsChart(data) {
	const statsData = [12978500, 5841500, 18820000, 10752000];
	const statsLabels = ['Loan Amount', 'Interest', 'Total Loan Amount', 'Paid Amount']; 

    const statsChartCanvas = document.getElementById('statsChart');
    const statsChartContext = statsChartCanvas.getContext('2d');

    new Chart(statsChartContext, {
        type: 'bar',
        data: {
            labels: statsLabels,
            datasets: [{
                label: 'Statistics Chart',
                data: statsData,
                backgroundColor: '#198f72',
                borderColor: 'black',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Function to display statistics graph
function displayStatsGraph(data) {
    // Placeholder for calculating statistics based on data
	const statsData = [12978500, 5841500, 18820000, 10752000];
	const statsLabels = ['Loan Amount', 'Interest', 'Total Loan Amount', 'Paid Amount']; 

    const statsGraphCanvas = document.getElementById('statsGraph');
    const statsGraphContext = statsGraphCanvas.getContext('2d');

    new Chart(statsGraphContext, {
        type: 'line',
        data: {
            labels: statsLabels,
            datasets: [{
                label: 'Statistics Graph',
                data: statsData,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Onload
document.addEventListener('DOMContentLoaded', () => {
    fetch('https://kushagrapathak-mock-api-server.onrender.com/users')
    .then(response => response.json())
    .then(data => {
        displayPieChart(data);
        displayStatsChart(data);
        displayStatsGraph(data);
    })
});

//admin name
let pic = document.getElementById("userpic");
const admins = [
    { username: "heyyrahul", password: "Rahul@9870", name: "Rahul" },
    { username: "kushpathak", password: "Kush@4563", name: "Kush" },
    { username: "bansalnaman", password: "Bansal@6969", name: "Naman" },
    { username: "kadampranoti", password: "kadam@pranoti", name: "Pranoti" }
];

function showAdminPage() {
    const adminPage = document.getElementById('adminPage');
    adminPage.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const loggedInAdmin = getLoggedInAdmin();

    if (loggedInAdmin) {
        const adminNameElement = document.getElementById('adminName');
        adminNameElement.textContent = `Hello ${loggedInAdmin.name} !`;
        showAdminPage();

        // Loop through the admins array to find a match
        admins.forEach(admin => {
            if (loggedInAdmin.name === admin.username) {
                pic.setAttribute('src', `./images/${admin.name.toLowerCase()}.jpg`);
            
            }
        });
    } else {
        window.location.replace('adminlogin.html');
    }
});

// Function to retrieve logged-in admin details from local storage
function getLoggedInAdmin() {
    return JSON.parse(localStorage.getItem('loggedInAdmin'));
}



function getLoggedInAdmin() {
    // Retrieve logged-in admin details from local storage
    return JSON.parse(localStorage.getItem('loggedInAdmin'));
}

document.getElementById("logout").addEventListener("click", () => {
	window.location.href="adminlogin.html"
})