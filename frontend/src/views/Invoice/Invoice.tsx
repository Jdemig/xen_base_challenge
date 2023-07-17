import {useEffect, useState} from 'react'
import {observer} from "mobx-react";
import {useParams} from "react-router-dom";


import Navigator from "../../components/Navigator";
import EditInvoiceModal from "../../components/EditInvoiceModal";
import InvoiceStateModal from "../../components/InvoiceStateModal";
import {useRootStore} from "../../stores/react";
import StatusPill from "../../components/StatusPill";


const Invoice = observer(() => {
  const { invoiceStore } = useRootStore();

  const { id } = useParams();

  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isStateModalOpen, setIsStateModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'pay' | 'void' | 'ship' | 'complete'>('pay');

  const invoice = invoiceStore.getInvoice(id);

  useEffect(() => {
    if (id) {
      invoiceStore.fetchInvoice(id);
    }
  }, []);

  const onOpenModal = (type: 'pay' | 'void' | 'ship' | 'complete') => {
    setModalType(type);
    setIsStateModalOpen(true);
  }

  return (
    <div className="flex flex-col w-[480px] px-8">
      <Navigator text="Invoice Details"/>

      <div className="border rounded-lg p-4">
        <div className="flex flex-row mb-8 mt-8">
          <div className="flex-1">
            <div className="text-left mb-2"><span className="font-bold">Invoice Number:</span> {invoice?.invoice_number}</div>
            <div className="text-left mb-2"><span className="font-bold">Amount:</span> {invoice?.amount}</div>
            <div className="text-left mb-2"><span className="font-bold">Due Date:</span> {invoice?.due_date}</div>
          </div>
          <div>
            <div className="font-bold text-right mb-2">State</div>
            <StatusPill status={invoice?.state} />
          </div>
        </div>

        <div>
          {invoice?.state === 'shipped' && (
            <button className="px-6 py-2 border-2 border-gray-800 bg-white mx-2" onClick={() => onOpenModal('complete')}>
              Complete
            </button>
          )}

          {invoice?.state === 'paid' && (
            <button className="px-6 py-2 border-2 border-gray-800 bg-white mx-2" onClick={() => onOpenModal('ship')}>
              Ship
            </button>
          )}

          {invoice?.state === 'created' && (
            <button className="px-6 py-2 border-2 border-gray-800 bg-white mx-2" onClick={() => onOpenModal('pay')}>
              Pay
            </button>
          )}

          {invoice?.state === 'created' && (
            <button className="px-6 py-2 border-2 border-gray-800 bg-white mx-2" onClick={() => onOpenModal('void')}>
              Void
            </button>
          )}

          {invoice?.state === 'created' && (
            <button className="px-6 py-2 border-2 border-gray-800 bg-white mx-2" onClick={() => setIsEditModalOpen(true)}>
              Edit
            </button>
          )}
        </div>
      </div>

      {invoice && (
        <>
          <EditInvoiceModal invoice={invoice} isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
          <InvoiceStateModal invoice={invoice} isOpen={isStateModalOpen} onClose={() => setIsStateModalOpen(false)} type={modalType} />
        </>
      )}
    </div>
  )
});

export default Invoice
