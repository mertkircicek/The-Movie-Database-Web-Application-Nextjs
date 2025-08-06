import React from 'react';
import HomePage from '../components/HomePage'; // src/components/HomePage.jsx'ten HomePage'i import ediyoruz

// Bu dosya, ana sayfa rotası (/) için Next.js sayfasıdır.
// HomePage bileşenini render ederek ana sayfanın içeriğini gösterir.
const IndexPage = () => {
  return <HomePage />;
};

export default IndexPage;
