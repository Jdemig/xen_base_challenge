import {useEffect} from 'react'
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material'
import {observer} from "mobx-react";

import Navigator from "../../components/Navigator";
import {useRootStore} from "../../stores/react";
import {featherChevronRight} from "../../utils/svgs";
import StatusPill from "../../components/StatusPill";


const InvoiceList = observer(() => {
  const { invoiceStore } = useRootStore();

  const rows = invoiceStore.getInvoices();

  useEffect(() => {
    invoiceStore.fetchInvoices();
  }, []);

  return (
    <div>
      <Navigator text="Invoice List" />

      <TableContainer component={Paper} className="shadow-none " sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 520 }} aria-label="invoices">
          <TableHead>
            <TableRow
              className="bg-gray-200 rounded-lg"
              sx={{ '&:last-child th': { borderBottom: 0 } }}
            >
              <TableCell align="left" sx={{ fontWeight: 'bold', borderBottomLeftRadius: '8px', borderTopLeftRadius: '8px', color: 'rgb(75 85 99)' }}>INVOICE ID</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'rgb(75 85 99)' }}>AMOUNT</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'rgb(75 85 99)' }}>DUE DATE</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', color: 'rgb(75 85 99)' }}>STATUS</TableCell>
              <TableCell align="right" sx={{ fontWeight: 'bold', borderBottomRightRadius: '8px', borderTopRightRadius: '8px', color: 'rgb(75 85 99)' }}>{''}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.invoice_number}
                sx={{ '&:first-child td': { borderTop: 0 } }}
              >
                <TableCell align="left">{row.invoice_number}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.due_date}</TableCell>
                <TableCell align="right">
                  <StatusPill status={row.state} className="ml-auto" />
                </TableCell>
                <TableCell align="right">
                  <Link data-testid="invoice-link" href={`/invoice/${row.id}`}>
                    <span
                      className="hover:text-gray-400 text-gray-900 w-2 mr-0"
                      dangerouslySetInnerHTML={{ __html: featherChevronRight }}
                    />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
});

export default InvoiceList
