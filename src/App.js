import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import UserList from "./components/UserList";
import {Provider} from "react-redux";
import store from "./redux/store"

function App() {
  return (
    <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/" exact component={UserList}></Route>
          </Switch>
        </Router>
    </Provider>
    );
}

export default App;
