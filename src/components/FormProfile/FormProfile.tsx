import ControlPointIcon from '@material-ui/icons/ControlPoint'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'
import { useSnackbar } from 'notistack'
import { FocusEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../../hooks/UseAuth'
import { useBackdrop } from '../../hooks/UseBackdrop'
import { formatCpf, formatPhone } from '../../utils/format'
import { Container, Content } from './FormProfile.style'

export const FormProfile: React.FC = () => {
  const { register, handleSubmit } = useForm()

  const { enqueueSnackbar } = useSnackbar()

  const { user, updateUser } = useAuth()

  const [cpfMask, setCpfMask] = useState('')
  const [phoneMask, setPhoneMask] = useState('')

  const { handleOpen: handleOpenBackdrop, handleClose: handleCloseBackdrop } =
    useBackdrop()

  type AddressExampleType = {
    zipCode?: string
    street?: string
    number?: number
    neighborhood?: string
    city?: string
    state?: string
    lat?: string
    lng?: string
  }

  const addressExample: AddressExampleType = {
    zipCode: '',
    street: '',
    number: null,
    neighborhood: '',
    city: '',
    state: '',
    lat: '0',
    lng: '0'
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    address: [{ ...addressExample }]
  })

  useEffect(() => {
    setFormData({
      name: user?.name,
      email: user?.email,
      cpf: user?.cpf ?? '',
      phone: user?.phone ?? '',
      address: user?.address
    })

    setCpfMask(formatCpf(user?.cpf ?? ''))
  }, [user])

  async function getAddressData(
    event: FocusEvent<HTMLInputElement>,
    index: number
  ) {
    const zipCode = event.target.value

    const updateAddressForm = (index: number, newElement: any) => {
      setFormData({
        ...formData,
        address: formData.address.map((element, indexElement) =>
          indexElement !== index ? element : { ...element, ...newElement }
        )
      })
    }

    if (zipCode) {
      try {
        updateAddressForm(index, {
          street: '...',
          city: '...',
          neighborhood: '...'
        })

        await fetch(`https://viacep.com.br/ws/${event.target.value}/json/`, {
          mode: 'cors'
        })
          .then(async res => res.json())
          .then(data => {
            updateAddressForm(index, {
              street: data.logradouro,
              city: data.localidade,
              neighborhood: data.bairro,
              state: data.uf
            })
          })
          .catch(() => {
            enqueueSnackbar('CEP inv??lido', {
              variant: 'error'
            })
            updateAddressForm(index, { street: '', city: '', neighborhood: '' })

            document
              .querySelector(`input[name="address[${index}].zipCode"]`)
              // @ts-ignore: Unreachable code error
              .focus()
          })
      } catch (error) {
        enqueueSnackbar(error.message, {
          variant: 'error'
        })

        updateAddressForm(index, { street: '', city: '', neighborhood: '' })
      }
    }
  }

  const addAddress = () => {
    setFormData({
      ...formData,
      address: [
        ...formData.address,
        {
          zipCode: '',
          street: '',
          number: null,
          neighborhood: '',
          city: '',
          state: '',
          lat: '0',
          lng: '0'
        }
      ]
    })
  }

  const removeAddress = (index: number) => {
    setFormData({
      ...formData,
      address: formData.address.filter(
        (_, indexFilter) => indexFilter !== index
      )
    })
    enqueueSnackbar('Endere??o removido', {
      variant: 'error'
    })
  }

  async function handleUpdateUser() {
    try {
      handleOpenBackdrop()
      await updateUser(formData)
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error'
      })
    }

    handleCloseBackdrop()

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function changeInput(
    newElement: any,
    element: AddressExampleType,
    index: number
  ) {
    const newAddress = { ...element, ...newElement }
    setFormData({
      ...formData,
      address: formData.address.map((valueElement, indexElement) =>
        indexElement !== index ? valueElement : newAddress
      )
    })
  }

  return (
    <Container>
      <Content>
        <div>
          <div>
            {/* <Avatar alt={user?.name} src={user?.profile_picture?.url}></Avatar> */}
          </div>
        </div>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <h2>Informa????es pessoais</h2>
          <div>
            <div>
              <label htmlFor="name">Nome</label>
              <input
                {...register('name')}
                type="text"
                name="name"
                onChange={event => {
                  const value = event.target.value
                  setFormData({ ...formData, name: value })
                }}
                value={formData.name}
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                {...register('email')}
                type="text"
                name="email"
                onChange={event => {
                  const value = event.target.value
                  setFormData({ ...formData, email: value })
                }}
                value={formData.email}
              />
            </div>
            <div>
              <label htmlFor="cpf">CPF</label>
              <input
                {...register('cpf')}
                type="text"
                name="cpf"
                // @ts-ignore: Unreachable code error
                maxLength="14"
                onChange={event => {
                  const value = event.target.value.replace(/[^a-z0-9]/gi, '')
                  setFormData({ ...formData, cpf: value })
                  setCpfMask(formatCpf(value))
                }}
                value={cpfMask}
              />
            </div>
            <div>
              <label htmlFor="phone">Telefone</label>
              <input
                {...register('phone')}
                type="text"
                name="phone"
                onChange={event => {
                  const value = event.target.value.replace(/[^a-z0-9]/gi, '')
                  setFormData({ ...formData, phone: value })
                  setPhoneMask(formatPhone(value))
                }}
                value={phoneMask}
              />
            </div>
          </div>
          <h2>Endere??os</h2>

          {formData.address?.map((element, index) => {
            const fieldName = `address[${index}]`

            return (
              <fieldset className="address" name={fieldName} key={fieldName}>
                <div>
                  <label htmlFor={`${fieldName}.zipCode`}>CEP</label>
                  <input
                    {...register(`${fieldName}.zipCode`)}
                    required
                    type="text"
                    onBlur={event => {
                      getAddressData(event, index).then()
                    }}
                    name={`${fieldName}.zipCode`}
                    onChange={event =>
                      changeInput(
                        { zipCode: event.target.value },
                        element,
                        index
                      )
                    }
                    value={formData.address[index].zipCode}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.street`}>Endere??o</label>
                  <input
                    {...register(`${fieldName}.street`)}
                    required
                    type="text"
                    name={`${fieldName}.street`}
                    onChange={event =>
                      changeInput(
                        { street: event.target.value },
                        element,
                        index
                      )
                    }
                    value={formData.address[index].street}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.number`}>N??mero</label>
                  <input
                    {...register(`${fieldName}.number`)}
                    required
                    type="number"
                    name={`${fieldName}.number`}
                    onBlur={async () => {}}
                    onChange={event =>
                      changeInput(
                        { number: event.target.value },
                        element,
                        index
                      )
                    }
                    value={formData.address[index].number}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.neighborhood`}>Bairro</label>
                  <input
                    {...register(`${fieldName}.neighborhood`)}
                    required
                    type="text"
                    name={`${fieldName}.neighborhood`}
                    onChange={event =>
                      changeInput(
                        { neighborhood: event.target.value },
                        element,
                        index
                      )
                    }
                    value={formData.address[index].neighborhood}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.city`}>Cidade</label>
                  <input
                    {...register(`${fieldName}.city`)}
                    required
                    type="text"
                    name={`${fieldName}.city`}
                    onChange={event =>
                      changeInput({ city: event.target.value }, element, index)
                    }
                    value={formData.address[index].city}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.state`}>Estado</label>
                  <select
                    {...register(`${fieldName}.state`)}
                    required
                    name={`${fieldName}.state`}
                    onChange={event =>
                      changeInput({ state: event.target.value }, element, index)
                    }
                    value={formData.address[index].state}
                  >
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amap??</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Cear??</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Esp??rito Santo</option>
                    <option value="GO">Goi??s</option>
                    <option value="MA">Maranh??o</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Par??</option>
                    <option value="PB">Para??ba</option>
                    <option value="PR">Paran??</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piau??</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rond??nia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">S??o Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
                <p
                  className="remove-address"
                  onClick={() => removeAddress(index)}
                >
                  <HighlightOffIcon color="secondary" />
                  &nbsp;Remover endere??o acima
                </p>
              </fieldset>
            )
          })}
          <p className="add-address" onClick={addAddress}>
            <ControlPointIcon />
            &nbsp;Adicionar novo endere??o
          </p>
          <button type="submit">Salvar altera????es</button>
        </form>
      </Content>
    </Container>
  )
}
