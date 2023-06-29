import './App.css';
import SortingVisualizer from './components/SortingVisualizer/SortingVisualizer';
import Navbar from './components/Navbar/Navbar';
import PathfindingVisualizer from './components/PathfindingVisualizer/PathfindingVisualizer';

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <SortingVisualizer /> */}
      <PathfindingVisualizer />
    </div>
  );
}

export default App;
