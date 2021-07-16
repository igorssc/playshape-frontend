import { Avatar } from '@material-ui/core'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../contexts/AuthContext'
import { Container, Content } from './FormProfile.style'

export const FormProfile: React.FC = () => {
  const { register, handleSubmit } = useForm()
  const [indexes, setIndexes] = useState([])
  const [counter, setCounter] = useState(0)

  const { user } = useContext(AuthContext)

  async function getAddressData(event, fieldName) {
    const zipCode = event.target.value

    if (zipCode) {
      try {
        const street = document.querySelector(
          `[name='${fieldName}.street']`
        ) as HTMLInputElement

        const number = document.querySelector(
          `[name='${fieldName}.number']`
        ) as HTMLInputElement

        const neighborhood = document.querySelector(
          `[name='${fieldName}.neighborhood']`
        ) as HTMLInputElement

        const city = document.querySelector(
          `[name='${fieldName}.city']`
        ) as HTMLInputElement

        const state = document.querySelector(
          `[name='${fieldName}.state']`
        ) as HTMLInputElement

        street.value = '...'
        neighborhood.value = '...'
        city.value = '...'

        await fetch(`http://viacep.com.br/ws/${event.target.value}/json/`, {
          mode: 'cors'
        })
          .then(res => res.json())
          .then(data => {
            street.value = data.logradouro
            neighborhood.value = data.bairro
            city.value = data.localidade
            state.value = data.uf

            street.focus()
            neighborhood.focus()
            city.focus()
            state.focus()
            number.focus()
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  const addAddress = () => {
    setIndexes(prevIndexes => [...prevIndexes, counter])
    setCounter(prevCounter => prevCounter + 1)
  }

  const removeAddress = index => () => {
    setIndexes(prevIndexes => [...prevIndexes.filter(item => item !== index)])
    setCounter(prevCounter => prevCounter - 1)
  }

  async function handleUpdateUser(data) {
    try {
      console.log('tudo certo', data)
    } catch (error) {
      console.log('erro', error)
      // document.getElementById('alert').style.display = 'flex'
      // document.getElementById('alert-message').innerHTML = error
    }
  }

  return (
    <Container>
      <Content>
        <div>
          <div>
            <Avatar alt={user?.name} src={user?.profile_picture?.url}></Avatar>
          </div>
        </div>
        <form onSubmit={handleSubmit(handleUpdateUser)}>
          <div>
            <div>
              <label htmlFor="name">Nome</label>
              <input {...register('name')} type="text" name="name" />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input {...register('email')} type="text" name="email" />
            </div>
            <div>
              <label htmlFor="cpf">CPF</label>
              <input {...register('cpf')} type="text" name="cpf" />
            </div>
            <div>
              <label htmlFor="phone">Telefone</label>
              <input {...register('phone')} type="text" name="phone" />
            </div>
          </div>
          <h2>Endereço</h2>
          {indexes.map(index => {
            const fieldName = `address[${index}]`

            return (
              <fieldset className="address" name={fieldName} key={fieldName}>
                <div>
                  <label htmlFor={`${fieldName}.zipCode`}>CEP</label>
                  <input
                    {...register(`${fieldName}.zipCode`)}
                    type="text"
                    onBlur={event => getAddressData(event, fieldName)}
                    name={`${fieldName}.zipCode`}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.street`}>Endereço</label>
                  <input
                    {...register(`${fieldName}.street`)}
                    type="text"
                    name={`${fieldName}.street`}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.number`}>Número</label>
                  <input
                    {...register(`${fieldName}.number`)}
                    type="number"
                    name={`${fieldName}.number`}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.neighborhood`}>Bairro</label>
                  <input
                    {...register(`${fieldName}.neighborhood`)}
                    type="text"
                    name={`${fieldName}.neighborhood`}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.city`}>Cidade</label>
                  <input
                    {...register(`${fieldName}.city`)}
                    type="text"
                    name={`${fieldName}.city`}
                  />
                </div>
                <div>
                  <label htmlFor={`${fieldName}.state`}>Estado</label>
                  <select
                    {...register(`${fieldName}.state`)}
                    required
                    defaultValue="MG"
                    name={`${fieldName}.state`}
                  >
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </select>
                </div>
                <button type="button" onClick={removeAddress(index)}>
                  Remove
                </button>
              </fieldset>
            )
          })}
          <button type="button" onClick={addAddress}>
            Adicionar novo endereço
          </button>
          <button type="submit">Salvar alterações</button>
        </form>
      </Content>
    </Container>
  )
}
