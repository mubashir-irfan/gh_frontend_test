'use client'
import { formatCurrency } from "@/libs/utils";
import { mockInvoicesData } from "@/mockData";
import { Badge, Table } from "@/shared/components";

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

  const handlePageChange = (page: number) => {
    console.log('Page changed to:', page);
  };

  const handleRefresh = () => {
    console.log('Refresh triggered')
  }

  const onSearch = (search: string) => {
    console.log('search for', search)
  }

  const invoicesData = mockInvoicesData;

  return (
    <Table
      paginatedData={invoicesData}
      columns={columns}
      isLoading={false}
      isError={false}
      onPageChange={handlePageChange}
      onRefresh={handleRefresh}
      onSearch={onSearch}
    />
  );
};

export default InvoiceTable;