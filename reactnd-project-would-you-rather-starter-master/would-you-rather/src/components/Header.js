import React from "react"
import { Route, Switch, NavLink, Redirect } from "react-router-dom"
import Home from "./Home"
import New from "./Newquestion"
import Leaderboard from "./Leaderboard"
import Question from "./Question"
import { Navbar, Card, Button, Image, Nav } from "react-bootstrap"
import { connect } from "react-redux"

const Header = (props) => {

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ width: "100%" }}>
                <Navbar bg="primary" variant="dark">
                    <Nav className="mr-auto">
                        <NavLink activeStyle={{ color: "#ffffff" }} to="/home" style={{ textDecoration: "none", color: "#f0f0f0", marginTop: 5, marginBottom: 5 }}>Home</NavLink>
                        <NavLink to="/newquestion" activeStyle={{ color: "#ffffff" }} style={{ textDecoration: "none", color: "#f0f0f0", marginLeft: 14, marginTop: 5, marginBottom: 5 }}>New Question</NavLink>
                        <NavLink to="/leaderboard" activeStyle={{ color: "#ffffff" }} style={{ textDecoration: "none", color: "#efefef", marginLeft: 14, marginTop: 5, marginBottom: 5 }}>Leader Board</NavLink>
                    </Nav>

                    <p style={{marginTop : "auto" , marginBottom : "auto" , color : "#ffffff"}}>Hello, {props.signedin.name}</p>
                    <img src={props.signedin.avatarURL} style={{height : 32 , width : 32 , borderRadius : 16 , marginLeft : 20}}/>
                    <p onClick={()=>{props.signout()}} style={{marginTop : "auto" , marginBottom : "auto" , color : "#ffffff" , marginLeft : 20 , marginRight : 10}}>Logout</p>
                </Navbar>
            </div>
            <Switch>
                <Route path="/home/:id" component={Question} />
                <Route path="/home" component={Home} />
                <Route path="/newquestion" exact component={New} />
                <Route path="/leaderboard" exact component={Leaderboard} />
            </Switch>
        </div>
    )

}

const MapdispatchToprops = (dispatch) => {
    return {
        signout: () => {
            return dispatch({ type: "signout" })
        }
    }
}

const MapstateToprops = (state) => {
    return {
        signedin: state.signedIn
    }
}

export default connect(MapstateToprops, MapdispatchToprops)(Header)