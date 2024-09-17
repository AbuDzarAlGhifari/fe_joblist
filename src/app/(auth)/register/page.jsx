'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import config from '@/config';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const baseURL = config.BASE_URL_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${baseURL}/auth/register`, {
        username,
        password,
      });
      router.push('/');
      console.log('resgister sucsesfully');
    } catch (error) {
      console.error('Registration failed', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="p-8 bg-white shadow-md rounded-xl sm:w-96">
        <p className="text-xs text-center"></p>
        <h2 className="mb-4 text-2xl font-semibold">Register</h2>
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
            Register
          </button>
        </form>
      </section>
    </div>
  );
};

export default Register;
