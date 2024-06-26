import { useDocumentTitle, useScrollTop } from '@/hooks';
import React from 'react';

const Dashboard = () => {
  useDocumentTitle('Welcome | Dashboard');
  useScrollTop();

  return (
    <div className="loader">
      <h2>Welcome to the dashboard</h2>
    </div>
  );
};

export default Dashboard;
