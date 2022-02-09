import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'; // Archivo Javascript de Bootstrap 4 
import Criptomonedas from './Components/criptomonedas';

function App() {
  return (
    <div className="App">
      <header className="App-header">
     <h1>Criptomonedas</h1>  
      </header>
      <Criptomonedas/>
    </div>
  );
}

export default App;
