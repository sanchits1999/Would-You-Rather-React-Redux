import React from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import Header from "../src/components/Header"
import Login from "../src/components/Login"
import { connect } from "react-redux"

const App = (props) => {


  return (
    <BrowserRouter>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Switch>
          <Route path="/login" exact component={Login} />
          <Redirect to="/login" from="/" exact />
          {props.signedin === null ? <Redirect to="/login" /> : <Route path="/" component={Header} />}
        </Switch>
      </div>
    </BrowserRouter>
  )
}

const MapstateToprops = (state) => {
  return {
    signedin: state.signedIn
  }
}

export default connect(MapstateToprops)(App);
