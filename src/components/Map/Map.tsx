import GoogleMapReact from 'google-map-react'
import React from 'react'
import { Icon } from './Map.style'

interface MapProps {
  center: {
    lat: string
    lng: string
  }[]
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
        {props.center.map(point => (
          <PointOnTheMap
            key={`${point.lat} ${point.lng}`}
            lat={Number(point.lat)}
            lng={Number(point.lng)}
          />
        ))}
      </GoogleMapReact>
    </div>
  )
}
