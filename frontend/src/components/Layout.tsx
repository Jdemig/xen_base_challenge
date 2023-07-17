import GlobalAlert from "./GlobalAlert";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {useRootStore} from "../stores/react";
import InvoiceList from "../views/InvoiceList";
import Invoice from "../views/Invoice";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <InvoiceList />,
  },
  {
    path: "/invoice/:id",
    element: <Invoice />,
  }
]);

const Layout = () => {
  const { globalStore } = useRootStore();

  return (
    <div className="m-auto">
      <GlobalAlert store={globalStore} />
      <RouterProvider router={router} />
    </div>
  )
}

export default Layout;