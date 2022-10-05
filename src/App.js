import { Route } from "react-router-dom";
import RoutesApp from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
      <ToastContainer autoclose={200} />
      <RoutesApp/>
      </div>
  )
}

export default App;
