'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import config from '@/config';
import { Input, Button } from '@material-tailwind/react';
import { MdErrorOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { Poiret_One } from 'next/font/google';

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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#5F0081] via-[#220F2E] to-[#15091c]">
      <div className="flex items-center justify-center w-full max-w-4xl gap-10 mx-auto">
        {/* Login Form */}

        <div class=" rounded-xl bg-gradient-to-br from-[#8E62FF]  to-[#b496ff] p-[1px]">
          <section className="p-6 bg-gradient-to-br  from-[#291336] to-[#300341] text-white shadow-md rounded-xl w-full max-w-md lg:w-80">
            <h2 className="mb-4 text-2xl font-semibold lg:text-3xl">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <Input
                  label="Username"
                  placeholder="username"
                  value={username}
                  error={!!errors.username}
                  fullWidth
                  className="text-yellow-100 placeholder-white border-white "
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
                  label="Password"
                  placeholder="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  error={!!errors.password}
                  fullWidth
                  className="text-white placeholder-white border-white"
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
                type="submit"
                fullWidth
                loading={loading}
                disabled={loading}
                className="text-center text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:bg-gradient-to-r hover:from-purple-700 hover:to-indigo-700"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="mt-3 text-sm text-center">
                <a href="#" className="">
                  Forgot password?
                </a>
              </div>
              <div className="mt-3 text-sm text-center text-whplaceholder-white">
                <p>Or</p>
                <a onClick={handleRegister} className="">
                  Dont have an account? Signup
                </a>
              </div>
              <p className="mt-5 text-xs text-center text-gray-500">
                Create BY AO Team
              </p>
            </form>
          </section>
        </div>

        {/* Quote Section */}
        <div className="items-center justify-center hidden w-1/2 text-white md:flex">
          <div className="text-justify">
            <p className="text-xl lg:text-2xl">
              &quot;The only way to do great work is to love what you do. If you
              haven’t found it yet, keep looking. Don’t settle.&quot;
            </p>
            <p className="mt-4 text-lg font-bold">- &apos;Steve Jobs&apos;</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
