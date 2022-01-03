import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
//toast 메시지 기능 추가
import { ToastContainer } from "react-toastify";

import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />
        <NavBar />
        <Switch>
          <Route path="/cart" component={Cart} />
          <Route path="/" exact component={Home} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
