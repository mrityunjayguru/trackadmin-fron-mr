import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { setZomm } from "../../../store/manageMap";

const API_KEY = import.meta.env.VITE_APP_MAP_KEY;

const Maps: React.FC = () => {
  const maprecords = useSelector((state: any) => state.map.AllmapDetails);
  const autoZoom: any = useSelector((state: any) => state.map.autoZoom);
  const [mapMode,setMapmode]=useState<any>("roadmap")
  const dispatch = useDispatch();

  const [zoom, setZoom] = useState<number>(5);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 20.5937,
    lng: 78.9629,
  });

  useEffect(() => {
    if (maprecords?.length === 1) {
      const location = maprecords[0]?.trackingData?.location;
      if (location?.latitude && location?.longitude && autoZoom === true) {
        setZoom(10);
        setCenter({ lat: Number(location.latitude), lng: Number(location.longitude) });
      }
    }
  }, [maprecords, autoZoom]);

  const handleZoomIn = (location: { latitude: number; longitude: number }) => {
    setZoom(15);
    setCenter({ lat: Number(location.latitude), lng: Number(location.longitude) });
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
    libraries: ["places"],
  });

  const mapRef = React.useRef<google.maps.Map | null>(null);

  const onMapLoad = (map: google.maps.Map) => {
    mapRef.current = map;

    // Add event listener for map type changes
    google.maps.event.addListener(map, "maptypeid_changed", () => {
      const currentMapType = map.getMapTypeId();
      setMapmode(currentMapType)
    });

    // Add event listener for street view changes
    google.maps.event.addListener(map, "streetview_changed", () => {
      const streetView = map.getStreetView();
      if (streetView.getVisible()) {
        console.log("Street View is now enabled!");
      } else {
        console.log("Street View is now disabled!");
      }
    });
  };

  const onZoomChanged = async () => {
    setTimeout(() => {
      dispatch(setZomm(false));
    }, 1000);

    if (mapRef.current) {
      setZoom(mapRef.current.getZoom()!);
    }
  };

  if (!isLoaded) {
    return (
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          color: "#fff",
          background: "rgba(0, 0, 0, 0.7)",
          padding: "10px 20px",
          borderRadius: "8px",
          fontSize: "16px",
        }}
      >
        Loading Map...
      </div>
    );
  }

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100vw", height: "100vh" }}
      center={center}
      zoom={zoom}
      onLoad={onMapLoad}
      onZoomChanged={onZoomChanged}
      options={{
        gestureHandling: "greedy",
        disableDefaultUI: false,
        mapTypeControl: true,
        streetViewControl: true,
        mapTypeId:mapMode,
        fullscreenControl: true,
         fullscreenControlOptions: {
    position: google?.maps?.ControlPosition?.LEFT_TOP, // Set position to the right
  },
      }}
    >
      {maprecords?.length > 0 ? (
        maprecords.map((val: any, index: number) => {
          const location = val?.trackingData?.location;
          const iconUrl = `${import.meta.env.VITE_APP_Image_Url}${val?.vehicletype?.icons}`;

          return location ? (
            <Marker
              key={index}
              position={{
                lat: Number(location.latitude),
                lng: Number(location.longitude),
              }}
              icon={{
                url: iconUrl,
                scaledSize: window.google
                  ? new window.google.maps.Size(30, 30)
                  : undefined,
                anchor: window.google
                  ? new window.google.maps.Point(15, 15)
                  : undefined,
                rotation: 90,
              }}
              onClick={() => handleZoomIn(location)}
            />
          ) : null;
        })
      ) : (
        <Marker
          position={{ lat: 37.7749, lng: -122.4194 }} // Default marker position
        />
      )}
    </GoogleMap>
  );
};

export default Maps;
