import React from 'react';
import Container from '../Layouts/Container';

const LoginPage = () => {
  return (
    <Container>
      <div className="min-h-screen pt-8 text-white flex items-center justify-center flex-col">
        <h1 className="text-4xl font-bold text-center">Login</h1>
        <p className="text-center text-gray-400 mt-4">Login form will go here.</p>
      </div>
    </Container>
  );
};

export default LoginPage;
