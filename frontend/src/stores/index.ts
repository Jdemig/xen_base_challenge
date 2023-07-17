import InvoiceStore from "./InvoiceStore";
import GlobalStore from "./GlobalStore";


export class RootStore {
    invoiceStore: InvoiceStore;
    globalStore: GlobalStore;

    constructor() {
        this.globalStore = new GlobalStore(this);
        this.invoiceStore = new InvoiceStore(this);
    }
}

const rootStore = new RootStore();

export default rootStore;
