// 'use client';

// import { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useRouter } from 'next/navigation';
// import TableJob from '@/components/Tabel/TabelJob';
// import Search from '@/components/search_filter/Search';

// const JobList = () => {
//   const [jobs, setJobs] = useState([]);
//   const router = useRouter();

//   useEffect(() => {
//     const fetchJobs = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           router.push('/');
//           return;
//         }

//         const response = await axios.get('http://localhost:5000/job', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setJobs(response.data.data);
//       } catch (error) {
//         console.error('Failed to fetch jobs', error);
//       }
//     };

//     fetchJobs();
//   }, [router]);

//   // Define the columns for the table
//   const columns = [
//     { key: 'perusahaan', title: 'Perusahaan' },
//     { key: 'lokasi', title: 'lokasi' },
//     { key: 'posisi', title: 'Posisi' },
//     { key: 'tanggal_lamar', title: 'Tanggal Lamar' },
//     { key: 'tanggal_batas_lamaran', title: 'Tanggal Batas Lamar' },
//     { key: 'platform', title: 'Platform' },
//     { key: 'status_lamar', title: 'Status' },
//     { key: 'keterangan', title: 'Keterangan' },
//   ];

//   return (
//     <>
//       <div className="flex items-center justify-between m-2">
//         <Search />
//         <button
//           className="p-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
//           onClick={() => router.push('/job-list/create')}
//         >
//           Tambah Lamaran
//         </button>
//       </div>
//       <TableJob columns={columns} data={jobs} />
//     </>
//   );
// };

// export default JobList;

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import TableJob from '@/components/Tabel/TabelJob';
import Search from '@/components/search_filter/Search';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }

        const response = await axios.get('http://localhost:5000/job', {
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
  }, [router]);

  // Define the columns for the table
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

  // Define the action buttons for each row
  const renderAction = (job) => (
    <div className="space-x-2">
      <button
        className="px-3 py-1 text-sm text-white bg-blue-500 rounded"
        onClick={() => router.push(`/job-list/edit/${job.id}`)}
      >
        Edit
      </button>
      <button
        className="px-3 py-1 text-sm text-white bg-red-500 rounded"
        onClick={() => handleDelete(job.id)}
      >
        Delete
      </button>
    </div>
  );

  const handleDelete = async (jobId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/job/${jobId}`, {
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
      <div className="flex items-center justify-between m-2">
        <Search />
        <button
          className="p-2 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={() => router.push('/job-list/create')}
        >
          Tambah Lamaran
        </button>
      </div>
      <TableJob columns={columns} data={jobs} renderAction={renderAction} />
    </>
  );
};

export default JobList;
