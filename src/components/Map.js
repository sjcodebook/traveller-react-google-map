import React, { useState, useEffect, useCallback, useRef } from "react";
import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";
import { formatRelative } from "date-fns";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
} from "@reach/combobox";

import "@reach/combobox/styles.css";

import { getUserLocation } from "./../scripts/localActions";
import { mapContainerStyle } from "./../styles/mapStyles";
import Constants from "./../scripts/constants";
import luggageSVG from "./../assets/luggage.svg";
import compassSVG from "./../assets/compass.svg";

// import userStore from "./../stores/UserStore";

const Map = () => {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey:
            process.env.NODE_ENV === "production"
                ? process.env.REACT_APP_GOOGLE_PLACES_API_KEY_PROD
                : process.env.REACT_APP_GOOGLE_PLACES_API_KEY_DEV,
        libraries: Constants.googleLibs,
    });
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);
    const [currLocation, setCurrLocation] = useState({
        lat: 40.73061,
        lng: -73.935242,
    });

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

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    const panTo = useCallback(({ lat, lng }) => {
        mapRef.current.panTo({ lat, lng });
        mapRef.current.setZoom(14);
    }, []);

    if (loadError) return "Error loading google maps";
    if (!isLoaded) return "Loading...";

    return (
        <div>
            <Locate panTo={panTo} currLocation={currLocation} />
            <Search panTo={panTo} />
            <GoogleMap
                id="map"
                mapContainerStyle={mapContainerStyle}
                zoom={8}
                center={currLocation}
                options={Constants.googleMapsOptions}
                onClick={onMapClick}
                onLoad={onMapLoad}
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

const Locate = ({ panTo, currLocation }) => {
    return (
        <button className="locate" onClick={() => panTo(currLocation)}>
            <img src={compassSVG} alt="compass" />
        </button>
    );
};

const Search = ({ panTo }) => {
    const {
        ready,
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {},
    });

    const handleInput = (e) => {
        setValue(e.target.value);
    };

    const handleSelect = async (address) => {
        setValue(address, false);
        clearSuggestions();

        try {
            const results = await getGeocode({ address });
            const { lat, lng } = await getLatLng(results[0]);
            panTo({ lat, lng });
        } catch (error) {
            console.log("Error: ", error);
        }
    };

    return (
        <div className="search">
            <Combobox onSelect={handleSelect}>
                <ComboboxInput
                    value={value}
                    onChange={handleInput}
                    disabled={!ready}
                    placeholder="Search your location"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" &&
                            data.map(({ id, description }) => (
                                <ComboboxOption key={id} value={description} />
                            ))}
                    </ComboboxList>
                </ComboboxPopover>
            </Combobox>
        </div>
    );
};

export default Map;
