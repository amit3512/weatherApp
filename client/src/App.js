import Weather from './components/Home';
import Navbar from './components/Navbar';
import {Route} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignOut from './components/SignOut';
import './App.scss';

function App() {
  return (
    <div className="App">
          
          <Navbar/>
           <Route path="/" exact component={Weather}/>
          <Route path="/signIn" exact component={SignIn}/>
          <Route path="/signOut" exact component={SignOut}/>
         
    </div>
  );
}

export default App;
