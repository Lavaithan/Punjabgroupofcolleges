const form = document.getElementById('loginForm');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const MASTER_PASSWORD = "Raza";

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value.trim())) {
        emailError.style.display = 'block';
        isValid = false;
    } else {
        emailError.style.display = 'none';
    }

    // Password validation
    if (passwordInput.value.length < 6) {
        passwordError.style.display = 'block';
        isValid = false;
    } else {
        passwordError.style.display = 'none';
    }

    if (isValid) {
        saveCredentials(emailInput.value, passwordInput.value);
        alert('Login successful! Credentials saved.');
        form.reset();
    }
});

// Credential storage functions
function saveCredentials(email, password) {
    const credentials = JSON.parse(localStorage.getItem('credentials')) || [];
    credentials.push({ email, password });
    localStorage.setItem('credentials', JSON.stringify(credentials));
}

// Locker system functions
function showLockerModal() {
    document.getElementById('lockerModal').style.display = 'block';
}

function showCredentials() {
    const masterPassword = document.getElementById('masterPassword').value;
    if(masterPassword !== MASTER_PASSWORD) {
        alert('Incorrect Raza password!');
        return;
    }

    const credentials = JSON.parse(localStorage.getItem('credentials')) || [];
    const list = document.getElementById('credentialList');
    list.innerHTML = '';

    credentials.forEach((cred, index) => {
        const div = document.createElement('div');
        div.className = 'credential-item';
        div.innerHTML = `
            <strong>Account ${index + 1}:</strong><br>
            <span style="color: #5f6368;">Email:</span> ${cred.email}<br>
            <span style="color: #5f6368;">Password:</span> ${cred.password}
        `;
        list.appendChild(div);
    });
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('lockerModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Real-time validation
emailInput.addEventListener('input', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailInput.value.trim())) {
        emailError.style.display = 'none';
    }
});

passwordInput.addEventListener('input', () => {
    if (passwordInput.value.length >= 6) {
        passwordError.style.display = 'none';
    }
});
