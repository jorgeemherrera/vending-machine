import './App.css';
import VendingMachine from './Components/VendingMachine'

function App() {
  return (
    <div className="App" data-testid="app-component">
      <VendingMachine data-testid="vending-machine-component" />
    </div>
  );
}

export default App;
