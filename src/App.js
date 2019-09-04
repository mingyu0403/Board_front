import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {Provider} from 'mobx-react';

import './App.css';
import Stores from "./Stores";

import Header from "./Header";
import Home from "./Home";
import User from "./User";
import Board from "./Board";
import Category from "./Category";

function App() {
  return (
    <Provider stores={Stores}>
        <BrowserRouter>
            <header>
                <div>
                    <Header/>
                </div>
            </header>
            <section>
                <Route path='/' exact component={Home} />
                <Route path='/user/:command?' exact component={User} />
                <Route path='/board/:command?/:boardid?' exact component={Board}/>
                <Route path='/category/:categoryid' exact component={Category}/>
            </section>
            <footer>

            </footer>
        </BrowserRouter>
    </Provider>
  );
}

export default App;
