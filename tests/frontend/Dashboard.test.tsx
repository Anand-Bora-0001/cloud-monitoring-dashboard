import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from '../../frontend/src/pages/Dashboard';

describe('Dashboard Component', () => {
  it('renders the Global Infrastructure Heat Map header', () => {
    // In a real scenario, mock the recharts ResponsiveContainer to avoid issues
    render(
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Global Infrastructure Heat Map')).toBeDefined();
    expect(screen.getByText('Active Servers')).toBeDefined();
  });
});
