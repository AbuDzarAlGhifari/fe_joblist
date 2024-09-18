'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import config from '@/config';
import { Input } from '@material-tailwind/react';
import { Button } from '@material-tailwind/react';
import { MdErrorOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const baseURL = config.BASE_URL_API;

  const validationSchema = yup.object({
    username: yup.string().required('Username cannot be empty'),
    password: yup.string().required('Password cannot be empty'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await validationSchema.validate(
        { username, password },
        { abortEarly: false }
      );
      const response = await axios.post(`${baseURL}/auth/login`, {
        username,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      router.push('/job-list');
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Login failed', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = () => router.push('/register');

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="p-10 bg-white shadow-md rounded-xl sm:w-96">
        <h2 className="mb-4 text-2xl font-semibold">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <Input
              variant="standard"
              label="Username"
              placeholder="username"
              value={username}
              error={!!errors.username}
              fullWidth
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="flex items-center gap-1 my-1 text-xs text-red-500 text-end">
                <MdErrorOutline />
                <p>{errors.username}</p>
              </div>
            )}
          </div>
          <div className="relative mb-5">
            <Input
              variant="standard"
              label="Password"
              placeholder="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              error={!!errors.password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </div>
            {errors.password && (
              <div className="flex items-center gap-1 my-1 text-xs text-red-500 text-end">
                <MdErrorOutline />
                <p>{errors.password}</p>
              </div>
            )}
          </div>

          <Button
            variant="gradient"
            size="md"
            color="light-blue"
            type="submit"
            fullWidth
            loading={loading}
            disabled={loading}
            className="text-center"
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <h1
            className="w-full p-2 mt-2 text-sm font-semibold text-blue-400 cursor-pointer text-end hover:text-blue-500"
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
