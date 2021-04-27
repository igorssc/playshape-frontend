import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import { useEffect, useState } from 'react'
import { Container } from './ScrollTop.style'

export const ScrollTop = () => {
  const top = 20
  const [visible, setVisible] = useState(false)
  const onScroll = () => {
    setVisible(document.documentElement.scrollTop > top)
  }
  useEffect(() => {
    document.addEventListener('scroll', onScroll)
    return () => document.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <Container
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }}
      visible={visible}
    >
      <ExpandLessIcon />
    </Container>
  )
}
