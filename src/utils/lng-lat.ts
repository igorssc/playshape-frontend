import Geocode from 'react-geocode'
import { formatAddress } from './format'

export const generateLngLat = async address => {
  await Geocode.setApiKey(process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_MAPS_KEY)
  await Geocode.setLanguage('pt-br')
  await Geocode.setRegion('br')
  await Geocode.setLocationType('ROOFTOP')

  const addressFormated = formatAddress(address)

  let lat = 0
  let lng = 0

  await Geocode.fromAddress(addressFormated).then(
    response => {
      const { lat: latitude, lng: longitude } =
        response.results[0].geometry.location

      lat = latitude
      lng = longitude
    },
    error => {
      throw new Error(error)
    }
  )
  return { lat, lng }
}
