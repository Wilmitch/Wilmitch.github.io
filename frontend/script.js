async function fetchItems() {
    const response = await fetch('/api/items');
    const items = await response.json();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = items.map(item => `<div><strong>${item.name}</strong>: ${item.description} (${item.type})</div>`).join('');
}

document.getElementById('lost-item-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('lost-item-name').value;
    const description = document.getElementById('lost-item-description').value;
    await fetch('/api/lost', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    });
    alert('Lost item reported!');
    fetchItems();
});

document.getElementById('found-item-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('found-item-name').value;
    const description = document.getElementById('found-item-description').value;
    await fetch('/api/found', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
    });
    alert('Found item reported!');
    fetchItems();
});

document.getElementById('search-button')?.addEventListener('click', async () => {
    const query = document.getElementById('search-input').value;
    const response = await fetch(`/api/search?query=${encodeURIComponent(query)}`);
    const items = await response.json();
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = items.map(item => `<div><strong>${item.name}</strong>: ${item.description} (${item.type})</div>`).join('');
});

document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        window.location = 'index.html'; // Redirect to main page
    } else {
        alert('Login failed. Please check your username and password.');
    }
});

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('register-password').value;

    await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    alert('Registration successful! You can now log in.');
    window.location = 'login.html'; // Redirect to login page
});

document.getElementById('logout-button')?.addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'GET' });
    window.location = 'login.html'; // Redirect to login page
});

// Fetch and display items when the page loads
window.onload = async () => {
    fetchItems();
};
