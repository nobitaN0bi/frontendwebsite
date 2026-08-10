import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { SiteChrome } from './components/SiteChrome';
import { WaitlistModal } from './components/WaitlistModal';
import HomePage from './pages/HomePage';
import DemoPage from './pages/DemoPage';
import MapPage from './pages/MapPage';
import UseCasePage from './pages/UseCasePage';
import LegalCenterPage from './pages/LegalCenterPage';
import LegalPage from './pages/LegalPage';
import ResourcesPage from './pages/ResourcesPage';
import ArticlePage from './pages/ArticlePage';
import InvestorPage from './pages/InvestorPage';
import CustomerGatewayPage from './pages/CustomerGatewayPage';
import VentureInvestorPage from './pages/VentureInvestorPage';
import StrategicInvestorPage from './pages/StrategicInvestorPage';
import OperatorInvestorPage from './pages/OperatorInvestorPage';
import ExecutiveCustomerPage from './pages/ExecutiveCustomerPage';
import TechnicalCustomerPage from './pages/TechnicalCustomerPage';
import WorkflowCustomerPage from './pages/WorkflowCustomerPage';

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
        <Route path="/map/:id" element={<MapPage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/use-cases/:slug" element={<UseCasePage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/resources/:slug" element={<ArticlePage />} />
        <Route path="/investor" element={<InvestorPage />} />
        <Route path="/investor/customer" element={<CustomerGatewayPage />} />
        <Route path="/investor/venture" element={<VentureInvestorPage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/investor/strategic" element={<StrategicInvestorPage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/investor/operator" element={<OperatorInvestorPage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/investor/customer/executive/:department/:industry" element={<ExecutiveCustomerPage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/investor/customer/technical/:department/:industry" element={<TechnicalCustomerPage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/investor/customer/workflow/:department/:industry" element={<WorkflowCustomerPage onJoin={() => setWaitlistOpen(true)} />} />
        <Route path="/legal" element={<LegalCenterPage />} />
        <Route path="/legal/:document" element={<LegalPage />} />
        <Route path="*" element={<HomePage onJoin={() => setWaitlistOpen(true)} />} />
      </Routes>
      <WaitlistModal open={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </SiteChrome>
  );
}