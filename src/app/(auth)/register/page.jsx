'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import config from '@/config';
import { Button, Input } from '@material-tailwind/react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

const Register = () => {
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
      await axios.post(`${baseURL}/auth/register`, {
        username,
        password,
      });
      router.push('/');
      console.log('Registered successfully');
    } catch (error) {
      if (error.name === 'ValidationError') {
        const validationErrors = {};
        error.inner.forEach((err) => {
          validationErrors[err.path] = err.message;
        });
        setErrors(validationErrors);
      } else {
        console.error('Registration failed', error);
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="p-8 bg-white shadow-md rounded-xl sm:w-96">
        <h2 className="mb-4 text-2xl font-semibold">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <Input
              variant="standard"
              label="Username"
              placeholder="username"
              value={username}
              error={!!errors.username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && (
              <div className="mt-1 text-sm text-red-500">{errors.username}</div>
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
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </div>
            {errors.password && (
              <div className="mt-1 text-sm text-red-500">{errors.password}</div>
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
            {loading ? 'Registering...' : 'Register'}
          </Button>
        </form>
      </section>
    </div>
  );
};

export default Register;
