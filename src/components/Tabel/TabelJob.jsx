import React from 'react';

const TableJob = ({ columns, data, renderAction }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead>
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
            >
              {column.title}
            </th>
          ))}
          <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((column) => (
              <td
                key={column.key}
                className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap"
              >
                {row[column.key]}
              </td>
            ))}
            <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
              {renderAction(row)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableJob;
