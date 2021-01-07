import React, { useState, useEffect, useCallback } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";

import { getUserLocation } from "./../scripts/localActions";
import { mapContainerStyle } from "./../styles/mapStyles";
import Constants from "./../scripts/constants";
import luggageSVG from "./../assets/luggage.svg";

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_PLACES_API_KEY,
        libraries: Constants.googleLibs,
    });
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [currLocation, setCurrLocation] = useState({});

    useEffect(() => {
        (async () => {
            const center = await getUserLocation();
            setCurrLocation(center);
        })();
    }, []);

    const onMapClick = useCallback((e) => {
        setMarkers((current) => [
            ...current,
            {
                lat: e.latLng.lat(),
                lng: e.latLng.lng(),
                time: new Date(),
            },
        ]);
    }, []);

    if (loadError) return "Error loading google maps";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={currLocation}
                options={Constants.googleMapsOptions}
                onClick={onMapClick}
                // onLoad={onMapLoad}
            >
                {markers.map((marker) => (
                    <Marker
                        key={`${marker.lat}-${marker.lng}`}
                        position={{ lat: marker.lat, lng: marker.lng }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                        icon={{
                            url: luggageSVG,
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15),
                            scaledSize: new window.google.maps.Size(30, 30),
                        }}
                    />
                ))}

                {selected ? (
                    <InfoWindow
                        position={{ lat: selected.lat, lng: selected.lng }}
                        onCloseClick={() => {
                            setSelected(null);
                        }}
                    >
                        <div>
                            <h2>
                                <span role="img" aria-label="bear">
                                    🐻
                                </span>{" "}
                                Alert
                            </h2>
                            <p>
                                Spotted{" "}
                                {formatRelative(selected.time, new Date())}
                            </p>
                        </div>
                    </InfoWindow>
                ) : null}
            </GoogleMap>
        </div>
    );
};

export default Map;
