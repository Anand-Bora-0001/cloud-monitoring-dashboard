import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import CapacityPlanning from './pages/CapacityPlanning';
import ComplianceDashboard from './pages/ComplianceDashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/capacity-planning" element={<CapacityPlanning />} />
          <Route path="/compliance" element={<ComplianceDashboard />} />
          {/* We will add more routes here for Servers, Alerts, etc. */}
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
