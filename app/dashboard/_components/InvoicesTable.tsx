'use client'
import { useGet } from "@/hooks/useAPIQueryHooks";
import { formatCurrency } from "@/libs/utils";
import { mockInvoicesData } from "@/mockData";
import { Badge, Spinner, Table } from "@/components/ui";
import { PaginatedData } from "@/types";
import { Invoice } from "@/types/dashboard";

const INVOICE_TYPES = {
  insurance: 'Insurance',
  business: 'Business',
  agent: 'Agent',
  individual: 'Individual',
  supplier: 'Supplier'
}

const INVOICE_STATUSES = {
  completed: 'Completed',
  inProgress: 'In progress',
  cancelled: 'Cancelled',
}

const getInvoiceTypeStyles = (type: string) => {
  let styles = 'bg-gray-100 text-gray-700';
  switch (type) {
    case INVOICE_TYPES.insurance:
      styles = 'bg-yellow-100 text-yellow-800'
      break;
    case INVOICE_TYPES.business:
      styles = 'bg-blue-100 text-blue-800'
      break;
    case INVOICE_TYPES.agent:
      styles = 'bg-purple-100 text-purple-800'
      break;
    case INVOICE_TYPES.individual:
      styles = 'bg-gray-100 text-gray-800'
      break;
    case INVOICE_TYPES.supplier:
      styles = 'bg-cyan-100 text-cyan-800'
      break;
  }

  return styles;
}

const getInvoiceStatusStyles = (status: string) => {
  let styles = 'bg-gray-100 text-gray-700';
  switch (status) {
    case INVOICE_STATUSES.completed:
      styles = 'bg-green-100 text-green-800'
      break;
    case INVOICE_STATUSES.inProgress:
      styles = 'bg-purple-100 text-purple-800'
      break;
    case INVOICE_STATUSES.cancelled:
      styles = 'bg-red-100 text-red-800'
      break;
  }

  return styles;
}


const InvoiceTable = () => {
  const { data: invoices, isLoading, isError, error, refetch, isRefetching } = useGet<PaginatedData<Invoice>>('dashboard/accountant/invoices', 'dashboard/invoices')
  const columns = [
    { key: 'id', header: 'Invoice ID' },
    { key: 'customer_name', header: 'Customer Name' },
    { key: 'description', header: 'Description' },
    {
      key: 'type', header: 'Type', render: (item) => <Badge label={item.type} classNames={`${getInvoiceTypeStyles(item.type)}`} />
    },
    { key: 'date', header: 'Date' },
    { key: 'amount', header: 'Amount', render: (item) => formatCurrency(item.amount) },
    { key: 'ar_ap', header: 'AR/AP' },
    {
      key: 'status', header: 'Status', render: (item) => <Badge label={item.status} classNames={`${getInvoiceStatusStyles(item.status)}`} />
    },
    { key: 'payment_due_date', header: 'Payment Due Date' },
  ];


  if (isError && error.status === 403) return <AccessDeniedView />

  if (isLoading || isRefetching) return <div className="p-12 flex justify-center items-center"><Spinner /></div>

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
  };

  const handleRefresh = () => {
    console.log('Refresh triggered')
    refetch();
  }

  const onSearch = (search: string) => {
    console.log('search for', search)
  }

  const invoicesData = invoices;

  return (
    <Table
      paginatedData={invoicesData}
      columns={columns}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
      onSearch={onSearch}
    />
  );
};

export default InvoiceTable;

const AccessDeniedView = () => <div className="flex flex-col items-center p-8 justify-center dark:bg-gray-900 rounded-lg">
  <div className="text-center">
    <h1 className="text-xl font-bold text-red-600 mb-2">Access Denied</h1>
    <p className="text-gray-400 dark:text-gray-400">You do not have permission to view this data.</p>
    <p className="text-gray-400 dark:text-gray-400">Please contact your administrator for assistance.</p>
  </div>
</div>