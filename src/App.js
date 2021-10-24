import './App.css';
import "@fontsource/roboto"
import { BrowserRouter, Route, Switch, Redirect} from "react-router-dom";

import NotFound from './components/NotFound'
import TopMenu from './components/TopMenu';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

import { PayPalScriptProvider } from "@paypal/react-paypal-js";



function App() {
  return (
    <div className="App">
    <PayPalScriptProvider options={{ "client-id": "AcNthTPLRpGxYlDB5ph4s77-wdLppHWTJxceTMemu_uw1yTcDAyb2E2yXVS9kJFOEIUQrWl6il079RrC" }}>
      <BrowserRouter>
          <TopMenu />
          <Switch>
            <Redirect exact from="/" to="/home" />
            <Route exact path='/home' component={HomePage} />
            {/*<Route exact path='/' component={ProductPage} />
            <Route exact path='/' component={AboutPage} />*/}
            <Route exact path='/login' component={LoginPage} />
            <Route exact path='/cart' component={CartPage} /> 
            <Route exact path='/register' component={RegisterPage} />
            <Route exact path='*' component={NotFound} />
          </Switch>
        </BrowserRouter>
    </PayPalScriptProvider>
      
    </div>
  );
}

export default App;
