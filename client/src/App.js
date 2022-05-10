import './App.css';
import { Route, Routes } from 'react-router-dom';
import BotonHome from './components/BotonHome/BotonHome';
import PagRazas from './components/PagRazas/PagRazas';
import DetailRazas from './components/DetailRazas/DetailRazas';
import CreateRaza from './components/CreateRaza/CreateRaza';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route exact path='/' element={<BotonHome />} />
        <Route exact path='/dogs' element={<PagRazas/>} />
        <Route exact path='/dogs/:id' element={<DetailRazas/>}/>
        <Route exact path='/dogs/dog' element={<CreateRaza/>}/>
      </Routes>
    </div>
  );
}

export default App;
