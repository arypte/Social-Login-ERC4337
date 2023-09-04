import Auth from './pages/auth';
import Login from './pages/login';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TestPage from './pages/testpage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-[844px]">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/auth" element={<Auth /> } />
          <Route path="/testpage" element={<TestPage /> } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
