import './App.css';
import Weather from './cpmponents/weather';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './cpmponents/home';
import Details from './cpmponents/details';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/weather' element={<Weather/>}/>
        <Route path='/details' element={<Details/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
