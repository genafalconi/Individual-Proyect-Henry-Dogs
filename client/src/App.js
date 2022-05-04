import './App.css';
import Razas from './components/Razas/Razas';
import { Route, Routes } from 'react-router-dom';
import BotonHome from './components/BotonHome/BotonHome';
import Busqueda from './components/BusquedaRaza/BusquedaRaza';
import BusquedaTemp from './components/BusquedaTemp/BusquedaTemp';
import OrdenarAlfa from './components/Ordenar/OrdenarAlfa';
import OrdenarPeso from './components/Ordenar/OrdenarPeso';
function App() {
  return (
    <div className="App">
      <Routes>  
        <Route exact path='/' element={<BotonHome/>}/>
        <Route exact path='/dogs' element={[<Busqueda/>,<BusquedaTemp/>,<OrdenarAlfa/>,<OrdenarPeso/>,<Razas/>]}/>
      </Routes>
    </div>
  );
}

export default App;
