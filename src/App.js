import {Switch, Link, Route, useHistory} from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Favorite from './pages/Favorite';

const Navigation = () => {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/favorite">Favorite</Link>
      </li>
      <li>
        <Link to="/cat/:id">Detail</Link>
      </li>
    </ul>
  );
};

function URLFallback(){
  const history = useHistory()
  return(
    <div>
      존재하지 않는 페이지 입니다
      <br />

      <button onClick={()=>{
        history.push("/")
      }}>
        Home
      </button>
    </div>
  )
}

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/favorite" component={Favorite} />
        <Route exact path="/cat/:id" component={Detail} />
        <Route component={URLFallback}/>
      </Switch>
    </div>
  );
}

export default App;
