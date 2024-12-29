// Function to update the current time and date
function updateDateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    document.getElementById('datetime').textContent = now.toLocaleDateString(undefined, options);
}

// Function to fetch the user's location using Geolocation API
function fetchLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;

                // Reverse geocoding API to get location name
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('location').textContent = data.address.city || data.address.town || "Unknown Location";
                    })
                    .catch(() => {
                        document.getElementById('location').textContent = "Unable to fetch location";
                    });
            },
            () => {
                document.getElementById('location').textContent = "Location access denied";
            }
        );
    } else {
        document.getElementById('location').textContent = "Geolocation not supported";
    }
}

// Update time every second
setInterval(updateDateTime, 1000);

// Fetch location on page load
fetchLocation();