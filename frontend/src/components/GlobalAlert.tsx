import {observer} from 'mobx-react';
import {Alert} from "@mui/material";
import GlobalStore from "../stores/GlobalStore";

const GlobalAlert = observer(({ store }: { store: GlobalStore }) => {
    const alert = store.getAlert();

    if (alert) {
        setTimeout(() => {
            store.setAlert(null);
        }, 5000);

        return (
            <div className={`fixed top-4 right-8 z-50 max-w-[430px]`}>
                <Alert severity={alert?.status} onClose={() => store.setAlert(null)}>
                    {alert?.message}
                </Alert>
            </div>
        );
    }

    return <></>;
});

export default GlobalAlert;