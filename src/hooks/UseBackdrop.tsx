import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { createContext, ReactNode, useContext, useState } from 'react'

interface BackdropContextData {
  open: boolean
  handleOpen: () => void
  handleClose: () => void
  handleToggle: () => void
}

interface BackdropProviderProps {
  children: ReactNode
}

const BackdropContext = createContext<BackdropContextData>(
  {} as BackdropContextData
)

export function BackdropProvider({ children }: BackdropProviderProps) {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleToggle = () => {
    setOpen(!open)
  }

  return (
    <BackdropContext.Provider
      value={{ open, handleOpen, handleClose, handleToggle }}
    >
      <Backdrop open={open} style={{ zIndex: 9999 }} onClick={handleClose}>
        <CircularProgress color="inherit" />
      </Backdrop>
      {children}
    </BackdropContext.Provider>
  )
}

export function useBackdrop() {
  const context = useContext(BackdropContext)

  return context
}
