import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ProdutoDetalhes from './components/ProdutoDetalhes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto/:categoria/:slug" element={<ProdutoDetalhes />} />
      </Routes>
    </Router>
  );
}

export default App;