import { Provider } from 'next-auth/client'
import PageNProgress from 'next-styled-nprogress'
import { AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Styledtheme from 'styled-theming'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { Menu } from '../components/Menu/Menu'
import { ScrollTop } from '../components/ScrollTop/ScrollTop'
import { AuthProvider } from '../contexts/AuthContext'
import colors from '../styles/Colors'
import { GlobalStyle } from '../styles/Global'

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const theme = localStorage.getItem('theme')

    if (theme) {
      setTheme(theme)
    } else {
      localStorage.setItem('theme', 'light')
    }
  }, [])

  function handleTheme() {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <AuthProvider>
      <Provider session={pageProps.session}>
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
          <Menu handleTheme={handleTheme} />
          <Component {...pageProps} />
          <Footer />
          <ScrollTop />
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  )
}

export default App
