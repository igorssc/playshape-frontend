import PageNProgress from 'next-styled-nprogress'
import { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Styledtheme from 'styled-theming'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { Switch } from '../components/Switch/Switch'
import colors from '../styles/colors'
import { GlobalStyle } from '../styles/global'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const [theme, setTheme] = useState<string>('light')

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme) {
      setTheme(theme)
    } else {
      localStorage.setItem('theme', 'light')
    }
  }, [])

  const handleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'

    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <ThemeProvider theme={{ mode: theme }}>
      <GlobalStyle />
      <PageNProgress
        color={Styledtheme('mode', {
          light: colors.grayDarker,
          dark: colors.yellowLight
        })}
        showSpinner={false}
        height="5px"
        delay={200}
      />
      <Header />
      <Switch checked={theme === 'dark'} handleChange={handleTheme} />
      <Component {...pageProps} theme={theme} setTheme={setTheme} />
      <Footer />
    </ThemeProvider>
  )
}

export default App
