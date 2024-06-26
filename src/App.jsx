
import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import Pokedex from './pages/Pokedex.jsx'
import PokeInfo from './pages/Pokeinfo.jsx'
import ProtecterRoutes from './pages/ProtecterRoutes'
import PokeFooter from './components/shared/PokeFooter.jsx'


function App() {


  return (
  <div>
    {/* <h1>Pokedex</h1> */}
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route element={<ProtecterRoutes/>}>
      <Route path='/pokedex' element={<Pokedex/>}/>
      <Route path='/pokedex/:id' element={<PokeInfo/>}/>
      </Route>
    </Routes>
    <PokeFooter/>
  </div>
  )
}

export default App
