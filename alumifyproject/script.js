document.addEventListener("DOMContentLoaded", () => {
    // Handle Registration Form Submission
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload

            // Get form data
            const name = document.getElementById("registerName").value;
            const email = document.getElementById("registerEmail").value;
            const password = document.getElementById("registerPassword").value;
            const confirmPassword = document.getElementById("confirmPassword").value; // Get confirm password

            // Check if passwords match
            if (password !== confirmPassword) {
                alert("Passwords do not match!");
                return;
            }

            // Get users from localStorage or create an empty array
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Check if user already exists
            const userExists = users.some(user => user.email === email);
            if (userExists) {
                alert("User with this email already exists!");
                return;
            }

            // Create new user object
            const newUser = { name, email, password };

            // Add user to the users array
            users.push(newUser);

            // Save the updated user list to localStorage
            localStorage.setItem("users", JSON.stringify(users));

            // Show success message and reset form
            const registerMessage = document.getElementById("registerMessage");
            registerMessage.style.display = "block";
            registerForm.reset();

            // Hide the success message after 3 seconds
            setTimeout(() => {
                registerMessage.style.display = "none";

                // Redirect to login page after registration success
                window.location.href = "login.html";  // Change to your login page URL
            }, 3000); // 3 seconds delay for the success message
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Handle Login Form Submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent page reload

            // Get form data
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            // Get users from localStorage
            let users = JSON.parse(localStorage.getItem("users")) || [];

            // Find the user with matching email and password
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                // If user is found, show login success message
                const loginMessage = document.getElementById("loginMessage");
                loginMessage.style.display = "block";
                setTimeout(() => {
                    // Redirect to the homepage (index.html) after successful login
                    window.location.href = "index.html";  // Redirect to your home page
                    
                    // Show the profile section after login
                    const profileSection = document.getElementById("profileSection");
                    const profileName = document.getElementById("profileName");
                    const profileIcon = document.getElementById("profileIcon");

                    // Set the user's name in the profile section
                    profileName.textContent = user.name;

                    // Set the profile icon image (use profile image or default)
                    profileIcon.src = "images/pro.jpg";  // Change to user's profile image if available

                    // Show profile section
                    profileSection.style.display = "flex";  // Set to 'flex' or 'block' as needed
                }, 2000);  // 2 seconds delay for showing the success message
            } else {
                alert("Invalid email or password!");
            }
        });
    }
});
document.addEventListener("DOMContentLoaded", () => {
    // Check if user is logged in by verifying localStorage or cookies
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = users.find(user => user.email === localStorage.getItem("loggedInUser"));
    
    if (loggedInUser) {
        const profileSection = document.getElementById("profileSection");
        const profileName = document.getElementById("profileName");
        const profileIcon = document.getElementById("profileIcon");

        // Set the user's name in the profile section
        profileName.textContent = loggedInUser.name;

        // Set the profile icon image (use profile image or default)
        profileIcon.src = "images/pro.jpg"; // Adjust path or logic as needed

        // Show profile section
        profileSection.style.display = "flex";
    }
});
