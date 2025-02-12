let credentials = []; // Array to store multiple users' credentials

function storeCredentials() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username && password) {
        if (credentials.length < 7) { // Limit to 7 users
            credentials.push({ username, password });
            alert('Credentials stored securely!');
            document.getElementById('hiddenContainer').style.display = 'block';
            document.getElementById('username').value = '';
            document.getElementById('password').value = '';
        } else {
            alert('Maximum user limit reached (7 users).');
        }
    } else {
        alert('Please enter both email and password.');
    }
}

function unlockContainer() {
    const unlockPassword = document.getElementById('unlockPassword').value;

    if (unlockPassword === 'Raza') {
        document.getElementById('credentials').style.display = 'block';
        let credentialsList = document.getElementById('storedCredentials');
        credentialsList.innerHTML = '';

        credentials.forEach((cred, index) => {
            let listItem = document.createElement('p');
            listItem.textContent = `User ${index + 1}: Email - ${cred.username}, Password - ${cred.password}`;
            credentialsList.appendChild(listItem);
        });
    } else {
        alert('Incorrect unlock password');
    }
}
