import '../styles/theme.css'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Auth } from 'utils.ts/WhitAuth'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import { wrapper } from 'store'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Auth>
          <Component {...pageProps} />
        </Auth>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
