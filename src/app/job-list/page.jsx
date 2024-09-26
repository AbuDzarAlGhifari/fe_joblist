'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TableJob from '@/components/Tabel/TabelJob';
import Search from '@/components/search_filter/Search';
import config from '@/config';
import { Button, IconButton } from '@material-tailwind/react';
import { BsThreeDots } from 'react-icons/bs';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();
  const baseURL = config.BASE_URL_API;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }

        const response = await axios.get(`${baseURL}/job`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setJobs(response.data.data);
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    };

    fetchJobs();
  }, [router, baseURL]);

  const columns = [
    { key: 'perusahaan', title: 'Perusahaan' },
    { key: 'lokasi', title: 'lokasi' },
    { key: 'posisi', title: 'Posisi' },
    { key: 'tanggal_lamar', title: 'Lamar' },
    { key: 'tanggal_batas_lamaran', title: 'Batas Lamar' },
    { key: 'platform', title: 'Platform' },
    { key: 'status_lamar', title: 'Status' },
    { key: 'keterangan', title: 'Keterangan' },
  ];

  const renderAction = (job) => (
    <div className="flex items-center justify-center space-x-2">
      <BsThreeDots />

      {/* <Button
        className="px-3 py-1 text-sm text-white bg-red-500 rounded"
        onClick={() => handleDelete(job.id)}
      >
        Delete
      </Button> */}
    </div>
  );

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseURL}/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setJobs(jobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Failed to delete job', error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between min-h-screen m-2 custom-gradient">
        <Search />
        <Button
          variant="gradient"
          size="md"
          color="light-blue"
          type="submit"
          onClick={() => router.push('/job-list/create')}
        >
          Tambah Lamaran
        </Button>
      </div>
      <TableJob columns={columns} data={jobs} renderAction={renderAction} />
    </>
  );
};

export default JobList;
