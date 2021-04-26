import { formatAddress, formatDate, formatPhone } from '../../utils/format'
import { Map } from '../Map/Map'
import { Container, Content } from './DetailsStore.style'

interface DetailsStoreProps {
  store: {
    _id: string
    name: string
    phone: string
    address: {
      street: string
      number: number
      neighborhood: string
      city: string
      state: string
      zipCode: string
      lat: string
      lng: string
    }[]
    profile_picture: {
      url: string
    }
    created_at: string
    status: string
  }
}

export const DetailsStore = ({ store }: DetailsStoreProps) => {
  const existsLatLng = store.address.some(address => address.lat && address.lng)

  return (
    <Container>
      <Content>
        <div>
          <h1>{store.name}</h1>
        </div>
        <main>
          <div>
            <img
              src={store.profile_picture?.url ?? '/images/icon_store.png'}
              alt={`Logo da loja ${store.name}`}
            />
          </div>
          <div>
            <ul>
              <li>Telefone: {store.phone && formatPhone(store.phone)}</li>
              <li>
                Endereço(s): &nbsp;
                {store.address.map(address => (
                  <p key={formatAddress(address)}>{formatAddress(address)}</p>
                ))}
              </li>
              <li>Ativo desde: {formatDate(new Date(store.created_at))}</li>
            </ul>
          </div>
        </main>
      </Content>
      {existsLatLng && <Map center={store.address} zoom={16} />}
    </Container>
  )
}
