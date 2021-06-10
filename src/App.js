//import {ChatEngine} from 'react-chat-engine';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

import {AuthProvider} from './context/AuthContext';
import Login from './components/login';
import Chats from './components/chats';


const App = () => {
  return(
     <Router>
       <AuthProvider>
       <Switch>
         <Route path="/chats" component={Chats} />
         <Route path="/" component={Login} />
       </Switch>
       </AuthProvider>
     </Router>
   
  )
}

export default App;
