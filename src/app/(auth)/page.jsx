'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      router.push('/job-list');
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const handleRegister = () => router.push('/register');

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="p-8 bg-white shadow-md rounded-xl sm:w-96 ">
        <p className="text-xs text-center"></p>
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              UserName
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Input username"
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Password
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Input password"
              // type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            className="w-full p-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
            type="submit"
          >
            Login
          </button>
          <h1
            className="w-full p-2 mt-2 text-sm font-semibold text-center text-blue-500 cursor-pointer hover:text-blue-600"
            type="button"
            onClick={handleRegister}
          >
            Register
          </h1>
        </form>
      </section>
    </div>
  );
};

export default Login;
