import React, { useState, useEffect } from 'react';
import './profile.css'

function UserLocation() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Check if geolocation is available
        if (navigator.geolocation) {
            // Fetch user's current position
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Call OpenCage API for reverse geocoding
                    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=5b1f9abf95ec453f8fefbfb1b6d6adea`)
                        .then(response => response.json())
                        .then(data => {
                            if (data.results && data.results.length > 0) {
                                // Extract the country from the response
                                const country = data.results[0].components.country;
                                setLocation(country);
                            } else {
                                setError('Unable to retrieve location information.');
                            }
                        })
                        .catch(() => setError('Error fetching location data.'));
                },
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            setError('User denied the request for Geolocation.');
                            break;
                        case error.POSITION_UNAVAILABLE:
                            setError('Location information is unavailable.');
                            break;
                        case error.TIMEOUT:
                            setError('The request to get user location timed out.');
                            break;
                        default:
                            setError('An unknown error occurred.');
                            break;
                    }
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    }, []);

    return (
        <div className='user-location'>
            <h2>User Location</h2>
            {location ? (
                <p>Your country: {location}</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <p>Loading location...</p>
            )}
        </div>
    );
}

export default UserLocation;





