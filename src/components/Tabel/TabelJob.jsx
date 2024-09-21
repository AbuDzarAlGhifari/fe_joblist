'use client';

import React from 'react';
import { Card, CardBody } from '@material-tailwind/react';

const TableJob = ({ columns, data, renderAction }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  return (
    <Card className="overflow-hidden shadow-lg">
      <CardBody className="p-4">
        <table className="w-full text-left">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-4 py-2 text-sm font-medium text-center text-white bg-indigo-400 border"
                >
                  {column.title}
                </th>
              ))}
              <th className="px-4 py-2 text-sm font-medium text-center text-white bg-indigo-400 border">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-b">
                {columns.map((column) => (
                  <td
                    key={column.key}
                    className="px-4 py-2 text-sm text-gray-700 border whitespace-nowrap"
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
      </CardBody>
    </Card>
  );
};

export default TableJob;
