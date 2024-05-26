
import './App.css';
import { Home } from './auth/Home';
import  Login from './auth/Login';
import ProtectRouter from './auth/Protect';
import  Register  from './auth/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch,Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
   <div className="App">
    <Switch>
      <Route exact path='/' component={Login}/>
      <Route exact path='/login'login component={Login}/>
      <Route exact path='/register' component={Register}/>
    <ProtectRouter exact path="/home" component={Home}/>
    </Switch>
    <ToastContainer/>
   </div>
  );
}

export default App;
