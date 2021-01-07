import { mapLayout } from "./../styles/mapStyles";

const Constants = {
    googleLibs: ["places"],
    googleMapsOptions: {
        styles: mapLayout,
        disableDefaultUI: true,
        zoomControl: true,
    },
};

export default Constants;
