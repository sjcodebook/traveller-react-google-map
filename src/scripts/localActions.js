const getUserLocation = async () => {
    if (navigator.geolocation) {
        return await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                () => {
                    reject(null);
                },
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0,
                }
            );
        });
    } else {
        // New York Coords
        return {
            lat: 40.73061,
            lng: -73.935242,
        };
    }
};

export { getUserLocation };
