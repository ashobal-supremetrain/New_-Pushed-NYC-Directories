'use client'

import { useEffect, useRef } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface BusinessMapProps {
  address: string;
  latitude: number;
  longitude: number;
  userLocation?: {
    lat: number;
    lon: number;
  };
}

export default function BusinessMap({ address, latitude, longitude, userLocation }: BusinessMapProps) {
  const mapUrl = userLocation
    ? `https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=${userLocation.lat},${userLocation.lon}&destination=${latitude},${longitude}&mode=driving`
    : `https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${encodeURIComponent(address)}`;

  return (
    <div className="h-96 rounded-lg overflow-hidden">
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
} 