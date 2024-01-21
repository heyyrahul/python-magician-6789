// Catch the Signup elements
let inptsignUpName = document.getElementById("signUpName");
let inptsignUpEmail = document.getElementById("signUpEmail");
let inptsignUpPassword = document.getElementById("signUpPassword");
let signup = document.getElementById("signup");

// Catch the SignIn elements
let inpsignInEmail = document.getElementById("signInEmail");
let inpsignInPassword = document.getElementById("signInPassword");
let signIn = document.getElementById("signIn");

// Rest
let container = document.getElementById('container');
let registerBtn = document.getElementById('register');
let loginBtn = document.getElementById('login');

// Event handlers
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

signup.addEventListener("click", async (e) => {
    e.preventDefault();

    // Check if all fields are filled
    if (!inptsignUpName.value || !inptsignUpEmail.value || !inptsignUpPassword.value) {
        alert("Please fill in all the fields.");
        return;
    }

    // Check if the email already exists
    const existingUser = await checkExistingUser(inptsignUpEmail.value);

    if (existingUser) {
        alert("Email already registered, please use a different email.");
    } else {
        signUp();
    }
});

async function checkExistingUser(email) {
    try {
        const response = await fetch('https://kushagrapathak-mock-api-server.onrender.com/users');
        const users = await response.json();
        return users.some(u => u.email === email);
    } catch (error) {
        console.error('Error checking existing user:', error);
        return false;
    }
}

async function signUp() {
    let user = {
        username: inptsignUpName.value,
        email: inptsignUpEmail.value,
        password: inptsignUpPassword.value
    };

    try {
        const response = await fetch('https://kushagrapathak-mock-api-server.onrender.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            alert("Sign up successful!");
        } else {
            alert("Error during sign up. Please try again.");
        }
    } catch (error) {
        console.error('Error during sign up:', error);
    }
}

async function signInUser() {
    // Check if all fields are filled
    if (!inpsignInEmail.value || !inpsignInPassword.value) {
        alert("Please fill in all the fields.");
        return;
    }

    let signInCredentials = {
        email: inpsignInEmail.value,
        password: inpsignInPassword.value
    };

    try {
        const response = await fetch('https://kushagrapathak-mock-api-server.onrender.com/users');
        const users = await response.json();

        const user = users.find(u => u.email === signInCredentials.email && u.password === signInCredentials.password);

        if (user) {
            alert("Login successful!");
            window.location.href = '/home.html';
        } else {
            alert("Invalid email or password.");
        }
    } catch (error) {
        console.error('Error during sign in:', error);
    }
}
