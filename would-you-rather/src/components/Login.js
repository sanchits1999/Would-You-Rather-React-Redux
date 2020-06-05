import React, { useState, useEffect } from "react"
import { Card, Button, Dropdown } from "react-bootstrap"
import { _getUsers as gUsers } from "../_DATA"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const Login = (props) => {

    const [user, setuser] = useState("")

    console.log(props.response)

    useEffect(() => {

        if (props.response.length === 0) {
            gUsers().then((u) => {
                console.log(Object.values(u))
                props.setresponse(Object.values(u))
            }).catch((e) => {
                console.log(e)
            })
        }

    }, [])

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card style={{ width: "40%", height: 260, marginTop: "10%" }}>
                <Card.Header style={{ textAlign: "center", fontWeight: "700" }}>Welcome to Would you Rather Game</Card.Header>
                <Card.Body style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: 0 }}>
                    <Card.Title style={{ marginTop: 20 }}>Sign In</Card.Title>
                    <Card.Text>
                        Select User to continue
                    </Card.Text>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-custom-1" style={{ width: 200 }}>Users</Dropdown.Toggle>
                        <Dropdown.Menu style={{ width: 200 }}>
                            {props.response.map((u) => {
                                return (<Dropdown.Item key={u.id} eventKey={u.id} onSelect={(id) => { setuser(id) }} style={{ padding: 0 }}>
                                    <div style={{ display: "flex", alignItems: "center" }}>
                                        <div style={{ marginStart: 0, marginTop: 4, marginBottom: 4, paddingLeft: 10 }}>
                                            <img src={u.avatarURL} style={{ height: 30, width: 30, borderRadius: 15 }} />
                                        </div>
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <div style={{ fontSize: 16, fontWeight: 400, textAlign: "center", paddingLeft: 10 }}>{u.name}</div>
                                        </div>
                                    </div>
                                </Dropdown.Item>)
                            })}
                        </Dropdown.Menu>
                    </Dropdown>

                    <Link to={user === "" ? "/login" : "/home"} style={{ marginTop: "auto", marginBottom: 20, width: "70%" }}>
                        <Button variant="primary" onClick={() => {
                            if (user === "") {
                                alert("Please select a user to continue!")
                            }
                            else {
                                let u = props.response.filter((r) => {
                                    return r.id === user
                                })
                                props.signin(u[0])
                            }
                        }} style={{ width: "100%" }}>Sign In</Button></Link>
                </Card.Body>
            </Card>
        </div>
    )
}

const MapstateToprops = (state) => {
    return {
        signedin: state.signedIn,
        response: state.response
    }
}

const MapdispatchToprops = (dispatch) => {
    return {
        signin: (user) => {
            return dispatch({ type: "signin", payload: user })
        },
        setresponse: (response) => {
            return dispatch({ type: "setresponse", payload: response })
        }
    }
}

export default connect(MapstateToprops, MapdispatchToprops)(Login)