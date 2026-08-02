import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteChrome } from './components/SiteChrome';
import { WaitlistModal } from './components/WaitlistModal';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import UseCasePage from './pages/UseCasePage';

export default function App() {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <SiteChrome onJoin={() => setWaitlistOpen(true)}>
      <Routes>
        <Route path="/" element={<HomePage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/demo" element={<DemoPage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/use-cases/:slug" element={<UseCasePage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="*" element={<HomePage onJoin={() => setWaitlistOpen(true)} />} />
      </Routes>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </SiteChrome>
  );
}