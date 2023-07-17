import XenModal from "./XenModal";
import {Invoice} from "../types";
import {useRootStore} from "../stores/react";
import {useState} from "react";


type EditInvoiceModalProps = {
  invoice?: Invoice,
  isOpen: boolean,
  onClose: () => void
}


const EditInvoiceModal = ({ invoice, isOpen, onClose }: EditInvoiceModalProps) => {
  const { invoiceStore, globalStore } = useRootStore();

  const [invoiceAmount, setInvoiceAmount] = useState<number>(invoice?.amount || 0);

  const onInputChange = (event: any) => {
    setInvoiceAmount(event.target.value);
  }

  const onSaveInvoice = async () => {
    if (invoice?.id) {
      if (isNaN(invoiceAmount)) {
        return alert('Please enter a valid amount');
      }

      await invoiceStore.updateInvoice({
        ...invoice,
        amount: invoiceAmount,
      });

      onClose();

      globalStore.setAlert({ status: 'success', message: 'Invoice updated' });
    }
  }

  return (
    <XenModal open={isOpen} onClose={onClose}>
      <div className="flex flex-col">
        <div className="text-center font-bold text-xl mb-4">Edit Invoice</div>

        <div className="relative flex items-center mb-4 w-full">
          <div className="absolute left-3">$</div>
          <input className="px-3 py-2 pl-7 border rounded w-full" onChange={onInputChange} value={invoiceAmount} />
        </div>

        <button className="text-white" onClick={onSaveInvoice}>Save</button>
      </div>
    </XenModal>
  );
}


export default EditInvoiceModal;