'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import config from '@/config';
import { Input, Button } from '@material-tailwind/react';
import { MdErrorOutline } from 'react-icons/md';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';
import Link from 'next/link';
import quote from '../dummy/quote';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [randomQuote, setRandomQuote] = useState(null);
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

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quote.length);
    setRandomQuote(quote[randomIndex]);
  };

  useEffect(() => {
    getRandomQuote();

    const interval = setInterval(() => {
      getRandomQuote();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  /* bg-gradient-to-br from-[#5F0081] via-[#220F2E] to-[#15091c] */

  return (
    <div className="flex items-center justify-center min-h-screen custom-gradient">
      <div className="flex items-center justify-center w-full max-w-4xl gap-10 mx-auto">
        {/* Login Form */}

        <div class="rounded-xl bg-gradient-to-br from-[#8E62FF]  to-[#b496ff] p-[0.5px]">
          <section className="p-6 bg-gradient-to-br  from-[#291336] to-[#300341] text-white shadow-md rounded-xl w-full max-w-md lg:w-80">
            <h2 className="mb-10 text-2xl font-poetsen lg:text-3xl">Login</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-5">
                <Input
                  label="Username"
                  placeholder="username"
                  color="white"
                  value={username}
                  error={!!errors.username}
                  fullWidth
                  labelProps={{
                    className: 'text-white',
                  }}
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
                  color="white"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  error={!!errors.password}
                  fullWidth
                  labelProps={{
                    className: 'text-white',
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute text-purple-200 transform -translate-y-1/2 cursor-pointer right-3 top-1/2"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <RiEyeFill /> : <RiEyeCloseLine />}
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
                className="text-center text-white capitalize text-sm font-extrabold font-noto bg-gradient-to-r from-[#580475] via-[#8740CD] to-[#8E62FF]"
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="mt-3 text-sm text-center">
                <Link href="/register" className="">
                  Forgot password?
                </Link>
              </div>
              <div className="text-sm text-center text-whplaceholder-white">
                <div className="flex items-center justify-center gap-4">
                  <hr className="w-full border border-[#4D4D4D]" />
                  <p className="my-3 text-[#4D4D4D]">Or</p>
                  <hr className="w-full border border-[#4D4D4D]" />
                </div>
                <Link href="/register" className="">
                  Dont have an account? Signup
                </Link>
              </div>
              <p className="mt-3 text-[11px] text-center ">
                @Create BY <b>AO</b> Team
              </p>
            </form>
          </section>
        </div>

        {/* Quote Section */}
        <div className="items-center justify-center hidden w-1/2 text-white md:flex">
          {randomQuote && (
            <div className="text-justify">
              <p className="text-3xl text-gray-300 lg:text-2xl">
                &quot;{randomQuote.quote}&quot;
              </p>
              <p className="mt-8 text-xl font-bold">
                - &apos;{randomQuote.nama}&apos;
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
