import { Cards } from './components/Cards'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { IS_DEVELOPMENT } from './config.js'

function App () {
  return (
    <>
      <Header />
      <Cards />
      {IS_DEVELOPMENT && <Footer />}
    </>
  )
}

export default App
