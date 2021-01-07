import React from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { mapContainerStyle } from "./styles/mapStyles";
import Constants from "./scripts/constants";

const center = {
    lat: 43.6532,
    lng: -79.3832,
};

const App = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
        libraries: Constants.googleLibs,
    });

    if (loadError) return "Error loading google maps";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={center}
                options={Constants.googleMapsOptions}
                // onClick={onMapClick}
                // onLoad={onMapLoad}
            />
        </div>
    );
};

export default App;
