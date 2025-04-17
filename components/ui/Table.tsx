import React, { useState } from 'react';
import { Paginator, SearchInput, SecondaryButton } from '.';
import { PaginatedData } from '@/types';
import { FiRefreshCw } from 'react-icons/fi';
import { FaClipboardList, FaFileExport, FaFilter } from 'react-icons/fa6';

interface ColumnConfig<T> {
  key: keyof T;
  header: string;
  render?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  paginatedData: PaginatedData<T>;
  columns: ColumnConfig<T>[];
  onSearch: (query: string) => void;
  onPageChange?: (page: number) => void;
  onRefresh?: () => void;
}

const Table = <T extends Record<string, any>>({
  paginatedData,
  columns,
  onSearch,
  onPageChange,
  onRefresh,
}: TableProps<T>) => {

  const [searchQuery, setSearchQuery] = useState('');

  const isDataEmpty = paginatedData.data.length === 0;


  const totalPages = Math.ceil(paginatedData.total / paginatedData.page_size);

  const getPageMessage = () => {
    if (isDataEmpty) return null;
    const { page, page_size, total } = paginatedData;
    const start = (page - 1) * page_size + 1;
    const end = Math.min(page * page_size, total);
    return <p className='text-xs mt-2'>Showing <span className='font-semibold'>{start}-{end}</span> of <span className='font-semibold'>{total}</span></p>
  };

  return (
    <div className='p-4'>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div>
            <SearchInput onSearch={() => onSearch(searchQuery)} placeholder="Search Invoices" />
          </div>
          <SecondaryButton label='Filters' onClick={() => { }} Icon={<FaFilter />} />
        </div>

        <div className='flex gap-2'>
          {onRefresh && (
            <SecondaryButton label='Refresh' Icon={<FiRefreshCw />} onClick={onRefresh} />
          )}
          <SecondaryButton label='Export' Icon={<FaFileExport />} onClick={() => { }} />
        </div>
      </div>

      {isDataEmpty ? <EmptyView /> : <div className="relative overflow-x-auto">
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
      </div>}
      {onPageChange && (
        <div className='flex justify-between'>
          <p>{getPageMessage()}</p>
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

const EmptyView = () =>
  <div className='w-full py-24 flex flex-col justify-center items-center gap-4'>
    <div className='h-8 w-8 flex justify-center items-center rounded-full bg-gray-300 p-8 text-gray-500 text-2xl'>
      <div><FaClipboardList /></div>
    </div>
    <p className='text-gray-400 text-sm'>There are no records available for the current period.</p>
  </div>