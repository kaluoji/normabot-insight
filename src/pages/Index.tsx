import { Navigate } from 'react-router-dom';

// This page will redirect to Dashboard since we're using Dashboard as the main index page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;