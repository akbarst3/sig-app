async function fetchProtected(url, options = {}) {
    const accessToken = localStorage.getItem('accessToken');

    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers
    };

    const fetchOptions = {
        ...options,
        headers
    };

    const response = await fetch(url, fetchOptions);

    if (response.status === 401) {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
            return fetchProtected(url, options);
        } else {
            alert('Your session has expired, please login again');
            window.location.href = "/login";
            return;
        }
    }

    if (!response.ok) {
        console.error('HTTP error! Status:', response.status);
        const data = await response.json();
        console.error('Error message:', data.message);
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

async function refreshAccessToken() {
    const response = await fetch('/token', {
        method: 'GET',
        credentials: 'include'
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        return data.accessToken;
    } else {
        return null;
    }
}

async function fetchProtectedData(url) {
    return fetchProtected(url, { method: 'GET' });
}

async function fetchProtectedPost(url, body) {
    return fetchProtected(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

async function fetchProtectedPut(url, body) {
    return fetchProtected(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

async function fetchProtectedDelete(url, body) {
    return fetchProtected(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });
}

function fetchProtectedExcel(url, body) {
    return fetchProtected(url, {
        method: 'POST',
        body: body
    });
}