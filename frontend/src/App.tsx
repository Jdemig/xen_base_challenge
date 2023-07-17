import {RootStoreProvider} from "./stores/react";
import {CssBaseline} from "@mui/material";
import Layout from "./components/Layout";


function App() {
  return (
    <RootStoreProvider>
      <CssBaseline />
      <Layout />
    </RootStoreProvider>
  )
}


export default App
