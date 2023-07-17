export interface Invoice {
  id: number,
  invoice_number: string,
  amount: number,
  due_date: string,
  state: string,
  created_at: string,
  updated_at: string
}
