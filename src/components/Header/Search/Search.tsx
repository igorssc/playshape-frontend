import { useRouter } from 'next/dist/client/router'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { Container } from './Search.style'

export const Search: React.FC = () => {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSubmit = async event => {
    event.preventDefault()

    setQuery('')

    router.push({
      pathname: '/search',
      query: { q: query }
    })
  }

  return (
    <Container>
      <form method="GET" onSubmit={handleSubmit}>
        <div>
          <span>
            <BsSearch />
          </span>
          <input
            type="search"
            name="q"
            placeholder="Buscar produtos"
            autoComplete="off"
            required
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <button type="submit">Buscar</button>
      </form>
    </Container>
  )
}
