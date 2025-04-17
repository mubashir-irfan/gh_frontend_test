import React, { useState } from 'react';
import { Paginator, SearchInput, SecondaryButton } from '.';
import { PaginatedData } from '@/types';
import { FiRefreshCw } from 'react-icons/fi';
import { FaFileExport } from 'react-icons/fa6';

interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  paginatedData: PaginatedData<T>;
  columns: ColumnConfig<T>[];
  isLoading: boolean;
  isError: boolean;
  onSearch: (query: string) => void;
  onPageChange?: (page: number) => void;
  onRefresh?: () => void;
}

const Table = <T extends Record<string, any>>({
  paginatedData,
  columns,
  isLoading,
  isError,
  onSearch,
  onPageChange,
  onRefresh,
}: TableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data.</p>;
  }

  const totalPages = Math.ceil(paginatedData.total / paginatedData.page_size);

  return (
    <div className='p-4'>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div>
            <SearchInput onSearch={onSearch} placeholder="Search Invoices" />
          </div>
          <SecondaryButton label='Filters' onClick={() => { }} />
        </div>

        <div className='flex gap-2'>
          {onRefresh && (
            <SecondaryButton label='Refresh' Icon={<FiRefreshCw />} onClick={() => { }} />
          )}

          <SecondaryButton label='Export' Icon={<FaFileExport />} onClick={() => { }} />
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {columns.map((column) => (
                <th key={column.key.toString()} scope="col" className="px-6 py-3">
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.data.map((item, index) => (
              <tr
                key={index}
                className={`bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:bg-gray-800`}
              >
                {columns.map((column) => (
                  <td key={column.key.toString()} className="px-6 py-4">
                    {column.render ? column.render(item) : item[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {onPageChange && (
        <div className='flex justify-end'>
          <Paginator
            currentPage={paginatedData.page}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        </div>
      )}
    </div>
  );
};
export default Table;