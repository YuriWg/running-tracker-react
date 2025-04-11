// ... 现有导入 ...
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // 确保导入 Router
import RunHistoryPage from './pages/RunHistoryPage';
import RunMapPage from './pages/RunMapPage';
import Header from './components/Header';

function App() {
  return (
    /* Temporarily remove basename for local development */
    <Router>  {/* No basename here */}
      <Header />
      <Routes>
        <Route path="/" element={<RunHistoryPage />} />
        <Route path="/run/:id" element={<RunMapPage />} />
        {/* 其他路由 */}
      </Routes>
    </Router>
  );
}

export default App;