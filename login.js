document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const defaultUsers = [
        { username: "admin", password: "admin123", role: "admin" },
        { username: "creator", password: "creator123", role: "creator" }
    ];
    let users = JSON.parse(localStorage.getItem('users')) || [];
    defaultUsers.forEach(du => {
        if (!users.find(u => u.username === du.username)) {
            users.push(du);
        }
    });
    localStorage.setItem('users', JSON.stringify(users));
    loginForm.addEventListener("submit", function(e) {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const users = JSON.parse(localStorage.getItem('users')) || [];
    
        const user = users.find(u => u.username === username);
        if (!user) {
            alert("Account does not exist. Please sign up first!");
            window.location.href = "signup.html"; 
            return;
        }
        if (user.password !== password) {
            alert("Incorrect password. Try again.");
            return;
        }
        alert("Login successful!");
        if (user.role === "admin") {
            window.location.href = "home_page.html";

        } else if (user.role === "creator") {
          window.location.href = "home_page.html";
        } else {
            window.location.href = "home_page.html";

        }
    });
});

