import {makeAutoObservable} from 'mobx';
import {RootStore} from './index';
import {AlertColor} from "@mui/material";


type Alert = {
    message?: string,
    status?: AlertColor | undefined,
    timeout?: number,
} | null;

export class GlobalStore {
    rootStore: RootStore;

    alert: Alert = null;

    constructor(rootStore: RootStore) {
        makeAutoObservable(this, { rootStore: false });
        this.rootStore = rootStore;
    }

    getAlert = () => {
        return this.alert;
    }

    setAlert = (alert: Alert) => {
        this.alert = alert;
    }
}

export default GlobalStore;
