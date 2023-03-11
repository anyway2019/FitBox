import React, { useState,useRef,useEffect } from "react";
import semicircles2degress from "../../utils/ geo";
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = 'pk.eyJ1IjoibGlzaHVvNzEwIiwiYSI6ImNrZm0ybDVhdjFlZ24yeWxkbmVuNDRpeWEifQ.DnL_IUIoILXMXZlgp-HAzA';


    
const Map = React.memo(({activity})=>{
    const mapContainer = useRef(null);
    const mapRef = useRef(null);

    const coordinates = activity.recordMesgs.map(e=>semicircles2degress(e.positionLat,e.positionLong));
    const geojson = {
        'type': 'FeatureCollection',
        'features': [
        {
            'type': 'Feature',
            'geometry': {
                'type': 'LineString',
                'properties': {},
                'coordinates': coordinates
            }
        }
        ]
    };

    useEffect(() => {
        let map = mapRef.current;
        if (map) return; // initialize map only once
  
        map = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/light-v11',
            center: coordinates[0],
            zoom: 12
        });
      
        map.on('load', () => {
            map.addSource('LineString', {
                'type': 'geojson',
                'data': geojson
                });
                map.addLayer({
                        'id': 'LineString',
                        'type': 'line',
                        'source': 'LineString',
                        'layout': {
                        'line-join': 'round',
                        'line-cap': 'round'
                    },
                    'paint': {
                        'line-color': '#BF93E4',
                        'line-width': 5
                    }
                });
            
            // Create a 'LngLatBounds' with both corners at the first coordinate.
            const bounds = new mapboxgl.LngLatBounds(
                coordinates[0],
                coordinates[0]
            );
            
            // Extend the 'LngLatBounds' to include every coordinate in the bounds result.
            for (const coord of coordinates) {
                bounds.extend(coord);
            }
            
            map.fitBounds(bounds, {
                padding: 20
            });
        });
        
    },[activity]);
  
    return (
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    );
  });
  export default Map;