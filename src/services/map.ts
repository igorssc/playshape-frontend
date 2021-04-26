import axios from 'axios'

export const apiMaps = axios.create({
  baseURL: `https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_KEY}`
})
