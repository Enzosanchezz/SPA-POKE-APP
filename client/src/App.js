import './App.css';
import{BrowserRouter, Route, Switch} from "react-router-dom"
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Detail from './components/Detail/Detail';
import Created from './components/Created/Created';
import Modified from './components/Modified/Modified';
import Favs from './components/Favs/Favs';

function App() {
  
  return (
    <BrowserRouter>
      <div className="App">

        <Switch>
          <Route exact path="/" component={Landing}></Route>
          <Route exact path="/home" component={Home}></Route>
          <Route path="/home/:id" component={Detail}></Route>
          <Route exact path="/pokemons" component={Created}></Route>
          <Route path="/pokemons/:id" component={Modified}></Route>
          <Route path="/favs" component={Favs}></Route>
        </Switch>
      </div>
    </BrowserRouter> 
  );
}

export default App;
