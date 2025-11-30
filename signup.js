document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const fullname = document.getElementById('fullname').value.trim();
        const username = document.getElementById('username').value.trim();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        if (!fullname || !username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }
        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.find(u => u.username === username)) {
            alert("Username already exists. Please choose another.");
            return;
        }
        users.push({ fullname, username, email, password, role: "respondent" });
        localStorage.setItem('users', JSON.stringify(users));
        alert(`Account created successfully!\nFull Name: ${fullname}\nUsername: ${username}\nEmail: ${email}`);
        signupForm.reset();
    });
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
