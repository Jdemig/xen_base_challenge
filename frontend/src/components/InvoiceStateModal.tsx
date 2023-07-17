import XenModal from "./XenModal";
import {Invoice} from "../types";
import {useRootStore} from "../stores/react";


type InvoiceStateModalProps = {
  invoice?: Invoice,
  isOpen: boolean,
  onClose: () => void,
  type: 'pay' | 'void' | 'ship' | 'complete',
}

const InvoiceStateModal = ({ invoice, isOpen, onClose, type }: InvoiceStateModalProps) => {
  const { invoiceStore, globalStore } = useRootStore();

  const onInvoiceUpdateState = async () => {
    let newInvoice;
    if (invoice?.state === 'created' && type === 'pay') {
      newInvoice = await invoiceStore.payInvoice(invoice);
    } else if (invoice?.state === 'created' && type === 'void') {
      newInvoice = await invoiceStore.voidInvoice(invoice);
    } else if (invoice?.state === 'paid' && type === 'ship') {
      newInvoice = await invoiceStore.shipInvoice(invoice);
    } else if (invoice?.state === 'shipped' && type === 'complete') {
      newInvoice = await invoiceStore.completeInvoice(invoice);
    }

    if (newInvoice) {
      onClose();
      globalStore.setAlert({ status: 'success', message: 'Invoice updated' });
    } else {
      globalStore.setAlert({ status: 'error', message: 'Error updating invoice' });
    }
  }

  let newStatus: string = type;
  if (type === 'ship') {
    newStatus = 'shipped';
  }

  return (
    <XenModal open={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col">
        <div className="text-center font-bold text-lg mb-8">Are you sure you want to mark invoice {invoice?.invoice_number} as {newStatus}?</div>

        <div className="flex items-center justify-center">
          <button className="px-6 py-2 border-2 border-gray-800 bg-white mx-2" onClick={onInvoiceUpdateState}>Confirm</button>
          <button className="px-6 py-2 border-2 border-gray-800 bg-white mx-2" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </XenModal>
  );
}


export default InvoiceStateModal;