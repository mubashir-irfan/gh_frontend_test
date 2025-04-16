const mockAccountsData = {
  "stats": {
    "outstanding_invoices": 475,
    "average_collection_period": "04:14",
    "gross_profit_margin": 657800,
    "inventory_turnover": "04:14",
    "online_payments": 40
  },
  "financials": {
    "revenue": 163400.0,
    "expenses": 163400.0,
    "stock_value": 163400.0,
    "profit_distribution": {
      "profit": 76.0,
      "expenses": 20.0,
      "assets": 4.0
    }
  },
  "change": {
    "outstanding_invoices": 1.4,
    "average_collection_period": 1.4,
    "gross_profit_margin": 1.4,
    "inventory_turnover": 1.4,
    "online_payments": 1.4,
    "revenue": -2.4,
    "expenses": 1.24,
    "stock_value": 2.34
  },
  "period": {
    "start": "2024-07-01",
    "end": "2024-08-01"
  }
}

const mockPlGrapthData = {
  "profit": 1000,
  "loss": 500
}

const mockInvoicesData = {
  "data": [
    {
      "id": "INV-001",
      "customer_name": "John Doe",
      "description": "Car servicing",
      "type": "Insurance",
      "date": "2024-06-01",
      "amount": 500,
      "ar_ap": "Receivables",
      "status": "Completed",
      "payment_due_date": "2024-06-30"
    },
    {
      "id": "INV-002",
      "customer_name": "Jane Doe",
      "description": "Sold Parts",
      "type": "Business",
      "date": "2024-06-03",
      "amount": 800,
      "ar_ap": "Receivables",
      "status": "In progress",
      "payment_due_date": "2024-07-02"
    },
    {
      "id": "INV-003",
      "customer_name": "Jane Smith",
      "description": "Car Maintenance",
      "type": "Agent",
      "date": "2024-06-05",
      "amount": 450,
      "ar_ap": "Receivables",
      "status": "Cancelled",
      "payment_due_date": "2024-06-15"
    },
    {
      "id": "INV-004",
      "customer_name": "Charlie Davis",
      "description": "Car servicing",
      "type": "Individual",
      "date": "2024-06-08",
      "amount": 650,
      "ar_ap": "Receivables",
      "status": "Completed",
      "payment_due_date": "2024-06-25"
    },
    {
      "id": "INV-005",
      "customer_name": "Charlie Davis",
      "description": "Charlie Davis",
      "type": "Supplier",
      "date": "2024-06-08",
      "amount": 650,
      "ar_ap": "Payables",
      "status": "Completed",
      "payment_due_date": "2024-07-05"
    }
  ],
  "total": 5,
  "page": 1,
  "page_size": 10
}

const mockReceiptsData = {
  "data": [
    {
      "id": "REC-001",
      "customer_name": "John Doe",
      "description": "John Doe",
      "type": "Insurance",
      "date": "2024-06-01",
      "amount": 500,
      "status": "Completed",
      "payment_method": "Credit Card"
    },
    {
      "id": "REC-002",
      "customer_name": "Jane Doe",
      "description": "Jane Doe",
      "type": "Business",
      "date": "2024-06-03",
      "amount": 800,
      "status": "In progress",
      "payment_method": "Bank Transfer"
    },
    {
      "id": "REC-003",
      "customer_name": "Jane Smith",
      "description": "Engine Oil",
      "type": "Agent",
      "date": "2024-06-05",
      "amount": 450,
      "status": "Cancelled",
      "payment_method": "Online Payment"
    },
    {
      "id": "REC-004",
      "customer_name": "Charlie Davis",
      "description": "Charlie Davis",
      "type": "Individual",
      "date": "2024-06-08",
      "amount": 650,
      "status": "Completed",
      "payment_method": "Cash"
    }
  ],
  "total": 4,
  "page": 1,
  "page_size": 10
}

/**
 * 
data : []
page: 1
page_size: 10
total: 0
 */

const mockAccountsEmpty = {
  "stats": {
    "outstanding_invoices": 0,
    "average_collection_period": "0",
    "gross_profit_margin": 0,
    "inventory_turnover": "0",
    "online_payments": 0
  },
  "financials": {
    "revenue": 0,
    "expenses": 0,
    "stock_value": 0,
    "profit_distribution": {}
  },
  "change": {
    "outstanding_invoices": 0,
    "average_collection_period": 0,
    "gross_profit_margin": 0,
    "inventory_turnover": 0,
    "online_payments": 0,
    "revenue": 0,
    "expenses": 0,
    "stock_value": 0
  },
  "period": {
    "start": "2025-04-01",
    "end": "2025-05-02"
  }
}