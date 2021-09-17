import GoogleMapReact from 'google-map-react'
import React from 'react'
import { Icon } from './Map.style'

interface MapProps {
  center: {
    lat: string
    lng: string
  }
  zoom: number
}
interface PointOnTheMapProps {
  lat: number
  lng: number
}

const PointOnTheMap = (props: PointOnTheMapProps) => (
  <div>
    <Icon />
  </div>
)

export const Map = (props: MapProps) => {
  return (
    <div
      style={{
        height: '500px',
        maxHeight: '500px',
        width: '100%'
      }}
    >
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_KEY
        }}
        defaultCenter={{
          lat: Number(props.center[0].lat),
          lng: Number(props.center[0].lng)
        }}
        defaultZoom={props.zoom}
      >
        <PointOnTheMap
          lat={Number(props.center.lat)}
          lng={Number(props.center.lng)}
        />
      </GoogleMapReact>
    </div>
  )
}
