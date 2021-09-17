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
      lat?: string
      lng?: string
    }
    profile_picture: {
      url: string
    }
    created_at: string
    status: string
  }
}

export const DetailsStore = ({ store }: DetailsStoreProps) => {
  const existsLatLng = store.address?.lat && store.address?.lng

  const position = { lat: store.address?.lat, lng: store.address?.lng }

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
                Endereço: &nbsp;
                <p>{store.address && formatAddress(store.address)}</p>
              </li>
              <li>Ativo desde: {formatDate(new Date(store.created_at))}</li>
            </ul>
          </div>
        </main>
      </Content>

      {existsLatLng && <Map center={position} zoom={16} />}
    </Container>
  )
}
