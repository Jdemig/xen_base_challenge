import {makeAutoObservable} from 'mobx';
import {RootStore} from "./index";
import {Invoice} from "../types";
import axios from "axios";



class InvoiceStore {
  rootStore: RootStore;

  invoices: { [key: string]: Invoice } = {};

  constructor(rootStore: RootStore) {
    makeAutoObservable(this, { rootStore: false });
    this.rootStore = rootStore;
  }

  getInvoice = (id?: string) => {
    if (!id)
      return null;

    return this.invoices[id];
  }

  getInvoices = () => {
    return Object.values(this.invoices);
  }

  setInvoices = (invoices: Invoice[]) => {
    for (const invoice of invoices) {
      this.invoices[invoice.id] = invoice;
    }
  }

  fetchInvoices = async () => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/invoices`);

    this.setInvoices(result.data);

    return result.data;
  }

  fetchInvoice = async (id: string) => {
    const result = await axios.get(`${import.meta.env.VITE_API_URL}/invoices/${id}`);

    this.invoices[id] = result.data;

    return result.data;
  }

  updateInvoice = async (invoice: Invoice) => {
    const result = await axios.put(`${import.meta.env.VITE_API_URL}/invoices/${invoice.id}`, invoice);

    this.invoices[invoice.id] = result.data.invoice;

    return result.data.invoice;
  }

  payInvoice = async (invoice: Invoice) => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/invoices/${invoice.id}/pay`, invoice);

    this.invoices[invoice.id] = result.data.invoice;

    return result.data.invoice;
  }

  voidInvoice = async (invoice: Invoice) => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/invoices/${invoice.id}/void`, invoice);

    this.invoices[invoice.id] = result.data.invoice;

    return result.data.invoice;
  }

  shipInvoice = async (invoice: Invoice) => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/invoices/${invoice.id}/ship`, invoice);

    this.invoices[invoice.id] = result.data.invoice;

    return result.data.invoice;
  }

  completeInvoice = async (invoice: Invoice) => {
    const result = await axios.post(`${import.meta.env.VITE_API_URL}/invoices/${invoice.id}/complete`, invoice);

    this.invoices[invoice.id] = result.data.invoice;

    return result.data.invoice;
  }
}

export default InvoiceStore;

