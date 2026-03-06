import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/HomePage';
import QuotePage from './pages/QuotePage';
import FileClaimPage from './pages/FileClaimPage';
import TrackClaimPage from './pages/TrackClaimPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="quote" element={<QuotePage />} />
          <Route path="claims/file" element={<FileClaimPage />} />
          <Route path="claims/track" element={<TrackClaimPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
