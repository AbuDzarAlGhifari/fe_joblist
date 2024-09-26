'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import config from '@/config';
import { Button, Input } from '@material-tailwind/react';
import { MdErrorOutline, MdVisibility, MdVisibilityOff } from 'react-icons/md';
import { RiEyeCloseLine, RiEyeFill } from 'react-icons/ri';
import Link from 'next/link';

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
    <div className="flex items-center justify-center min-h-screen custom-gradient">
      <div class="rounded-xl bg-gradient-to-br from-[#8E62FF]  to-[#b496ff] p-[0.5px]">
        <section className="p-6 px-7 bg-gradient-to-br  from-[#291336] to-[#300341] text-white shadow-md rounded-xl w-full max-w-md lg:w-96">
          <h2 className="mb-10 text-2xl font-poetsen lg:text-3xl">Signup</h2>
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
            <div className="mb-5">
              <Input
                label="Email"
                placeholder="email"
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

            <div className="relative mb-5">
              <Input
                label="Confirm Password"
                placeholder="confirm password"
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
              className="text-center text-white capitalize text-sm font-extrabold font-noto bg-gradient-to-r from-[#8E62FF] via-[#8740CD] to-[#580475]"
            >
              {loading ? 'Logging in...' : 'Signup'}
            </Button>

            <div className="mt-3 text-sm text-center text-whplaceholder-white">
              <Link href="/" className="">
                Already Registered? Login
              </Link>
            </div>
            <p className="mt-3 text-[11px] text-center ">
              @Create BY <b>AO</b> Team
            </p>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Register;
