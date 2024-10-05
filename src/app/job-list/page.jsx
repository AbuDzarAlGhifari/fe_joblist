'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TableJob from '@/components/Tabel/TabelJob';
import Search from '@/components/search_filter/Search';
import config from '@/config';
import { BsThreeDots } from 'react-icons/bs';
import { FiEdit, FiTrash2 } from 'react-icons/fi';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [menuOpenJobId, setMenuOpenJobId] = useState(null);
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
        setFilteredJobs(response.data.data);
      } catch (error) {
        console.error('Failed to fetch jobs', error);
      }
    };

    fetchJobs();
  }, [router, baseURL]);

  const handleSearch = (query) => {
    if (query === '') {
      setFilteredJobs(jobs);
    } else {
      const lowerCaseQuery = query.toLowerCase();
      const filtered = jobs.filter(
        (job) =>
          job.perusahaan.toLowerCase().includes(lowerCaseQuery) ||
          job.lokasi.toLowerCase().includes(lowerCaseQuery) ||
          job.posisi.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredJobs(filtered);
    }
  };

  const columns = [
    { key: 'id', title: 'No' },
    { key: 'perusahaan', title: 'Perusahaan' },
    // { key: 'lokasi', title: 'Lokasi' },
    { key: 'posisi', title: 'Posisi' },
    { key: 'tanggal_lamar', title: 'Lamar' },
    // { key: 'tanggal_batas_lamaran', title: 'Batas Lamar' },
    // { key: 'platform', title: 'Platform' },
    { key: 'status_lamar', title: 'Status' },
    // { key: 'keterangan', title: 'Keterangan' },
  ];

  const toggleMenu = (jobId) => {
    setMenuOpenJobId(menuOpenJobId === jobId ? null : jobId);
  };

  const handleDelete = async (jobId) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this job?'
    );
    if (!isConfirmed) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('You are not authenticated.');
        return;
      }

      await axios.delete(`${baseURL}/job/${jobId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setJobs(jobs.filter((job) => job.id !== jobId));
      setFilteredJobs(filteredJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error('Failed to delete job', error);
      alert('Failed to delete job. Please try again.');
    }
  };

  const handleEdit = (jobId) => {
    router.push(`/job-list/edit/${jobId}`);
  };

  //Button icon
  const renderAction = (job) => (
    <div className="relative flex items-center justify-center space-x-2 ">
      <BsThreeDots
        onClick={() => toggleMenu(job.id)}
        className="cursor-pointer"
      />

      {menuOpenJobId === job.id && (
        <div className="absolute right-0 z-50 w-24 bg-white rounded-md shadow-lg top-6">
          <button
            className="flex items-center w-full px-2 py-1 text-sm text-black hover:bg-gray-100"
            onClick={() => handleEdit(job.id)}
          >
            <FiEdit className="mr-2" /> Edit
          </button>
          <button
            className="flex items-center w-full px-2 py-1 text-sm text-red-500 hover:bg-gray-100"
            onClick={() => handleDelete(job.id)}
          >
            <FiTrash2 className="mr-2" /> Delete
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen custom-gradient">
      <div className="flex justify-between px-6 pt-4">
        <Search onSearch={handleSearch} />
        <button
          type="submit"
          className="rounded-md text-white px-3 bg-gradient-to-r from-[#580475] via-[#8740CD] to-[#8E62FF]"
          onClick={() => router.push('/job-list/create')}
        >
          Tambah Lamaran
        </button>
      </div>
      <TableJob
        columns={columns}
        data={filteredJobs}
        renderAction={renderAction}
      />
    </div>
  );
};

export default JobList;
