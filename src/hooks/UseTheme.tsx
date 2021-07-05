import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'

interface ThemeContextData {
  name: string
  changeTheme: (theme: string) => Promise<void>
}

interface ThemeProviderProps {
  children: ReactNode
}

const ThemeContext = createContext<ThemeContextData>({} as ThemeContextData)

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme) {
      setTheme(theme)
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }, [])

  async function changeTheme(theme: string) {
    setTheme(theme)
  }

  return (
    <ThemeContext.Provider value={{ name: theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  return context
}
