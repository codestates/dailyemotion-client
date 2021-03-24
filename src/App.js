import React, { useState, useEffect, createContext, useMemo} from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import EmailSignUp from './components/EmailSignUp';
import LandingPage from './components/LandingPage';
import List from './components/List';
import EmailLogin from './components/EmailLogin';
import MainPage from './components/MainPage';
import Modified from './components/Modified';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer';
import Delete from './components/Delete';
import axios from 'axios';


import { initialState } from '../src/assets/state';

axios.defaults.withCredentials = true;

export const AppContext = createContext()
export const EditContext = createContext()

function App() {

// const [items, setItems] = useState(initialState.items);
const [items, setItems] = useState([]); // null
const [deletedItems, setDeletedItems] = useState("");


// const [editItem, setEditItem] = useState(null)

useEffect(() => {
  axios
    .get("https://localhost:5000/text/textList")
    .then((res) => {
      console.log(res.data)
      setItems(res.data)
    })
    .catch(err =>{
      console.log(err)  
    })
})



const removeItem = (itemId) => {
  if(items.id !== itemId) {
    setItems(items.filter(el => el.id !== itemId))
  } else {
    setDeletedItems(items.map(el => el.id === itemId))
    console.log(setDeletedItems(itemId))
  }
}

// const findItem = itemId => {
//   const item = items.find(item => item.id === itemId)
  
//   setEditItem(item)
// }



const removeValue = useMemo(() => ({items, removeItem}), [removeItem])

// const deletedItem = (itemId) => {
//   setDeletedItems(items.filter(el => el.id === itemId))
// }



  return (
    <AppContext.Provider value={removeValue}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/signup" component={EmailSignUp} />
          <Route path="/emaillogin" component={EmailLogin}  />
          <Route path="/mainpage" component={MainPage} /> 
          <Route path="/login" component={LandingPage} />
          <Route path="/list" component={List}/>
          <Route path="/delete" component={Delete}/>
          <Route path="/modified" component={Modified} />
          <Redirect path="*" to="/login" />
        </Switch>
        <Footer />
      </Router>
    </AppContext.Provider>
  )
}

export default App;