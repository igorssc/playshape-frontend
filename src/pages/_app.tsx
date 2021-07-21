import Slide from '@material-ui/core/Slide'
import { Provider } from 'next-auth/client'
import PageNProgress from 'next-styled-nprogress'
import { AppProps } from 'next/app'
import { SnackbarProvider } from 'notistack'
import React, { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Styledtheme from 'styled-theming'
import { Footer } from '../components/Footer/Footer'
import { Header } from '../components/Header/Header'
import { Menu } from '../components/Menu/Menu'
import { ScrollTop } from '../components/ScrollTop/ScrollTop'
import { AuthProvider } from '../hooks/UseAuth'
import { BackdropProvider } from '../hooks/UseBackdrop'
import { ShoppingCartProvider } from '../hooks/UseShoppingCart'
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
    <BackdropProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        TransitionComponent={Slide}
      >
        <AuthProvider>
          <ShoppingCartProvider>
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
          </ShoppingCartProvider>
        </AuthProvider>
      </SnackbarProvider>
    </BackdropProvider>
  )
}

export default App
