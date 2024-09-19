'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import config from '@/config';
import { Button } from '@material-tailwind/react';
import ModalCreate from './_partials/ModalCreate';

const CreateJob = () => {
  // const [openModal, setOpenModal] = useState('false');
  const [jobData, setJobData] = useState({
    perusahaan: '',
    lokasi: '',
    posisi: '',
    tanggal_lamar: '',
    tanggal_batas_lamaran: '',
    platform: '',
    status_lamar: '',
    keterangan: '',
    link: '',
  });
  const router = useRouter();
  const baseURL = config.BASE_URL_API;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/');
        return;
      }

      await axios.post(`${baseURL}/job`, jobData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      router.push('/job-list');
    } catch (error) {
      console.error('Failed to create job', error);
    }
  };

  const handleChange = (e) => {
    setJobData({ ...jobData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="p-8 my-1 bg-white shadow-md sm:mx-10 rounded-xl">
        <p className="text-xs text-center"></p>
        <h2 className="mb-4 text-2xl font-bold">Tambah Lamaran</h2>
        <form
          className="grid grid-cols-12 gap-3 text-black"
          onSubmit={handleSubmit}
        >
          <div className="col-span-full">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Kantor / Perusahaan
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              name="perusahaan"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-full sm:col-span-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Lokasi
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              name="lokasi"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-full sm:col-span-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Posisi
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              name="posisi"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-full sm:col-span-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Platform
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              name="platform"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-full sm:col-span-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Tanggal Lamar
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="tanggal_lamar"
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-span-full sm:col-span-4">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Batas Akhir Lamar
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="date"
              name="tanggal_batas_lamaran"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-full sm:col-span-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Status Lamaran
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              name="status_lamar"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-full sm:col-span-6">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Link
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              name="link"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-full">
            <label className="block mb-2 text-sm font-bold text-gray-700">
              Keterangan
            </label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-md"
              name="keterangan"
              onChange={handleChange}
            />
          </div>
          <div className="col-span-full">
            <Button
              type="submit"
              size="md"
              fullWidth
              color="blue"
              // onClick={setOpenModal(true)}
            >
              Submit
            </Button>
          </div>
        </form>
      </section>
      {/* <ModalCreate open={setOpenModal(true)} close={setOpenModal(false)} /> */}
    </div>
  );
};

export default CreateJob;
