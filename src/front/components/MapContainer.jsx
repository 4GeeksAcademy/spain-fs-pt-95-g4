import React, { useEffect, useRef, useState } from 'react';
import './MapContainer.css';

const MapContainer = ({ onLocationSelect, activeLocation, places }) => {
  const mapRef = useRef(null);
  const searchInputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const initMap = () => {
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        center: { lat: 40.4168, lng: -3.7038 }, 
        zoom: 12,
        disableDefaultUI: true,
        //mapTypeId: 'satellite',
        zoomControl: true
      });

      const autocomplete = new window.google.maps.places.Autocomplete(
        searchInputRef.current,
        { types: ['geocode'] }
      );

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) return;

        mapInstance.setCenter(place.geometry.location);
        mapInstance.setZoom(15);

        onLocationSelect?.({
          name: place.name,
          location: place.geometry.location,
          address: place.formatted_address
        });
      });

      setMap(mapInstance);
    };

    if (!window.google) {
      const script = document.createElement('script');
      script.src = script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPe-3jLXtTGWnsc0FQxkds61l5TK_WC3s&libraries=places`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
      script.onload = initMap;
    } else {
      initMap();
    }
  }, [onLocationSelect]);

  useEffect(() => {
    if (!map || !places) return;

    markers.forEach(marker => marker.setMap(null));
    const newMarkers = [];


    places.forEach(place => {
      if (place.location) {
        const marker = new window.google.maps.Marker({
          position: place.location,
          map,
          title: place.name,
          icon: {
            url: place.active ? "http://maps.google.com/mapfiles/ms/icons/red-dot.png" : 
                               "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new window.google.maps.Size(32, 32)
          }
        });

        marker.addListener('click', () => {
          onLocationSelect?.(place);
          map.setZoom(15);
          map.setCenter(place.location);
        });

        newMarkers.push(marker);
      }
    });

    setMarkers(newMarkers);
  }, [places, map]);

  
  useEffect(() => {
    if (!map || !activeLocation) return;
    map.setCenter(activeLocation);
    map.setZoom(15);
  }, [activeLocation, map]);

  return (
    <div className="map-container">
      <div className="map-search-container mb-2">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Buscar lugar..."
          className="form-control form-control-sm"
        />
      </div>
      <div ref={mapRef} className="map-view"></div>
    </div>
  );
};

export default MapContainer;