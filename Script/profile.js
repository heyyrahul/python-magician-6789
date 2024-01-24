document.addEventListener("DOMContentLoaded", async function () {
    const logoutBtn = document.getElementById("logoutBtn");
    const profileContent = document.getElementById("profileContent");

    logoutBtn.addEventListener("click", function () {
        localStorage.removeItem("loggedInUser");
        window.location.href = "/index.html";
    });

    try {
        const loggedInUser = localStorage.getItem("loggedInUser");

        if (loggedInUser) {
            const response = await fetch("https://kushagrapathak-mock-api-server.onrender.com/users");
            const users = await response.json();

            const user = users.find(u => u.email === loggedInUser);

            if (user) {
                // ...

                const profileContent = document.getElementById("profileContent");

                // Concatenate address, city, state, and pincode into a single line
                const fullAddress = `${user.address}, ${user.city}, ${user.state} ${user.pincode}, ${user.country}`;

                // Insert user profile content
                profileContent.innerHTML = `
    <h1 class="greeting">Welcome to your profile, <span class="gradient-text">${user.username}</span>!</h1>
    <p><h3>Email:</h3> ${user.email}</p>
    <p><h3>Phone:</h3> ${user.phone}</p>
    <p><h3>Address:</h3> ${fullAddress}</p>
    <p><h3>Gender:</h3> ${user.gender}</p>

    <!-- Additional form details -->
    <h2 style="text-align:center">Loan Application Details</h2>
    <table>
    <tr>
    <td>    <p><h3>Aadhar Card:</h3> ${user.form.aadharcard}</p>
    </td>
    <td>    <p><h3>PAN Card:</h3> ${user.form.pancard}</p>
    </td>
    </tr>
    <tr>
    <td>    <p><h3>Loan Amount:</h3> ${user.form.loanamount}</p>
    </td>
    <td>    <p><h3>Loan Term:</h3> ${user.form.loanterm} years</p>
    </td>
    </tr>
    <tr>
    <td>    <p><h3>Interest Rate:</h3> ${user.form.intrestrate}</p>
    </td>
    <td>    <p><h3>EMI:</h3> ${user.form.emi}</p>
    </td>
    </tr>
    <tr>
    <td colspan="2">    <p><h3>Total Amount:</h3> ${user.form.Totalamount}</p>
    </td>
    </tr>
    <tr>
    <td>    <p><h3>Bank:</h3> ${user.form.bank}</p>
    </td>
    <td>    <p><h3>Loan Type:</h3> ${user.form.loan_type}</p>
    </td>
    </tr>
    </table>

`;

                // Add event listener for logout button
                document.getElementById("logoutBtn").addEventListener("click", function () {
                    localStorage.removeItem("loggedInUser");
                    window.location.href = "./index.html";
                });

                // ...

            } else {
                console.error("User not found.");
                // Handle the case where the user is not found
            }
        } else {
            console.error("User not logged in.");
            // Handle the case where the user is not logged in
        }
    } catch (error) {
        console.error("Error fetching user data:", error);
        // Handle the error
    }
});
