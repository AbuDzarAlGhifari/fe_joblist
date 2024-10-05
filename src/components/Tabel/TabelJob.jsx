'use client';

import React from 'react';

const TableJob = ({ columns, data, renderAction }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <div className="mx-3 overflow-hidden overflow-x-auto min-h-96">
      <div className="p-3">
        <table className="w-full">
          <thead className="rounded-lg">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-1 py-2 text-sm font-medium text-center text-white bg-indigo-400 border"
                >
                  {column.title}
                </th>
              ))}
              <th className="px-1 py-2 text-sm font-medium text-center text-white bg-indigo-400 border"></th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-2 text-sm text-white border whitespace-nowrap"
                  >
                    {['tanggal_lamar', 'tanggal_batas_lamaran'].includes(
                      column.key
                    )
                      ? formatDate(row[column.key])
                      : row[column.key]}
                  </td>
                ))}
                <td className="px-4 py-2 text-sm text-gray-700 border whitespace-nowrap">
                  {renderAction(row)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableJob;
