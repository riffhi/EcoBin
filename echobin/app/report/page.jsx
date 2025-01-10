'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function ReportUncleanAreas() {
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState('');
  const [reports, setReports] = useState([]);
  const mapRef = useRef(null);
  const inputRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef([]);

  useEffect(() => {
    const savedReports = localStorage.getItem('reports');
    if (savedReports) {
      setReports(JSON.parse(savedReports));
    }
  }, []);

  // Initialize Google Maps and Autocomplete
  useEffect(() => {
    const initMap = () => {
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: { lat: 19.2183, lng: 72.9781 },
        zoom: 13,
      });

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current);
      autocomplete.bindTo('bounds', mapInstance.current);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          setLocation(place);
        }
      });

      // Load existing markers from localStorage
      reports.forEach((report) => addMarkerToMap(report));
    };

    if (typeof google !== 'undefined' && google.maps) {
      initMap();
    } else {
      console.error('Google Maps API not loaded.');
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!location.geometry) {
      alert('Please select a valid location from the suggestions.');
      return;
    }

    if (!file) {
      alert('Please upload an image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const newReport = {
        location: location.geometry.location.toJSON(),
        placeName: location.name,
        image: reader.result,
      };

      const updatedReports = [...reports, newReport];
      setReports(updatedReports);
      // localStorage.setItem('reports', JSON.stringify(updatedReports));

      addMarkerToMap(newReport);
      setFile(null);
      setLocation('');
    };
    reader.readAsDataURL(file);
  };

  const addMarkerToMap = (report) => {
    const marker = new google.maps.Marker({
      position: report.location,
      map: mapInstance.current,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<strong>${report.placeName}</strong><br><img src="${report.image}" alt="Reported Image" style="max-width: 100px;">`,
    });

    marker.addListener('click', () => infoWindow.open(mapInstance.current, marker));
    markers.current.push(marker);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={{ backgroundColor: '#F8E7A2' }}
    >
      <div
        className="p-6 rounded-lg shadow-lg"
        style={{
          width: '400px',
          border: '2px solid #0B5394',
          backgroundColor: '#FDF3CC',
        }}
      >
        <h2
          className="text-center font-bold"
          style={{
            fontSize: '18px',
            color: '#000000',
            marginBottom: '5px',
          }}
        >
          REPORT UNCLEAN AREAS
        </h2>
        <p
          className="text-center"
          style={{
            fontSize: '12px',
            color: '#000000',
            marginBottom: '15px',
          }}
        >
          See something messy? Let us know!
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              className="block text-center mb-2"
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                color: '#000000',
              }}
            >
              Upload Waste Image
            </label>
            <input
              type="file"
              accept=".png,.jpg,.jpeg"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border rounded-md"
              style={{
                backgroundColor: '#D9D9D9',
                borderColor: '#D9D9D9',
                color: '#000000',
              }}
            />
          </div>
          <div>
            <input
              ref={inputRef}
              type="text"
              placeholder="Add Location"
              className="w-full px-3 py-2 border rounded-md"
              style={{
                backgroundColor: '#D9D9D9',
                borderColor: '#D9D9D9',
                color: '#000000',
                textAlign: 'center',
              }}
            />
          </div>
          <button
            type="submit"
            className="block mx-auto px-6 py-2 rounded-md"
            style={{
              backgroundColor: '#008000',
              color: '#FFFFFF',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Submit
          </button>
        </form>
      </div>

      {/* Map Component */}
      <div
        id="map"
        ref={mapRef}
        style={{
          height: '400px',
          width: '80%',
          marginTop: '20px',
          borderRadius: '8px',
          border: '1px solid #ccc',
        }}
      ></div>
    </div>
  );
}
