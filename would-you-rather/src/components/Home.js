import React, { useState, useEffect } from "react"
import { Nav, Navbar, Card, Button, Image } from "react-bootstrap"
import { _getQuestions as gquestions } from "../_DATA"
import { connect } from "react-redux"
import { Link } from "react-router-dom"

const Home = (props) => {

    console.log(props.users)
    console.log(props.signedin)

    console.log(props.questions)

    useEffect(() => {
        if (props.questions.length === 0) {
            gquestions().then((response) => {
                props.setQuestions(Object.values(response))
            }).catch(() => {

            })
        }
    }, [])

    const [act, setact] = useState(true)

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
            <div style={{ display: "flex", width: "60%", justifyContent: "space-between", marginTop: 50 }}>
                <Button variant="outline-primary" active={act} onClick={() => { setact(true) }} style={{ width: "47%" }}>UnAnswered</Button>
                <Button variant="outline-primary" active={!act} onClick={() => { setact(false) }} style={{ width: "47%" }}>Answered</Button>
            </div>
            <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginTop: 50 }}>
                {props.questions.map((q, index) => {
                    if (act) {

                        let ques = Object.keys(props.signedin.answers).filter((ans) => {
                            return ans === q.id
                        })

                        if (ques.length !== 0) {
                            return null
                        }

                        let u = props.users.filter((x) => {
                            return x.id === q.author
                        })

                        return (
                            <Card key={q.id} style={{ width: "60%", height: 230, marginBottom: 20, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(247, 247, 247, 0.19)" }}>
                                <Card.Header>{q.author} Asks :</Card.Header>
                                <Card.Body style={{ padding: 0 }}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", margin: 0 }}>
                                        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", borderRightStyle: "solid", borderRightWidth: 1, borderRightColor: "#dddddd" }}>
                                            <img src={u[0].avatarURL} style={{ height: 80, width: 80, borderRadius: 40 }} />
                                        </div>
                                        <div style={{ display: "flex", flex: 3, alignItems: "center", flexDirection: "column" }}>
                                            <h5 style={{ fontWeight: "500", marginLeft: 10, marginTop: 10, alignSelf: "flex-start" }}>Would You Rather :</h5>
                                            <div style={{ marginTop: 10, textAlign: "center", lineHeight: 2 }}>{q.optionOne.text}<br />OR...</div>
                                            <div style={{ width: "100%", display: "flex", marginTop: "auto", marginBottom: 15, justifyContent: "center" }}>
                                                <Link style={{ width: "80%", justifyContent: "center", display: "flex" }} to={"/home/" + q.id}><Button variant="primary" style={{ width: "100%", height: 40 }}>View Poll</Button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    } else {

                        let ques = Object.keys(props.signedin.answers).filter((ans) => {
                            return ans === q.id
                        })

                        if (ques.length === 0) {
                            return null
                        }

                        let u = props.users.filter((x) => {
                            return x.id === q.author
                        })

                        return (
                            <Card key={q.id} style={{ width: "60%", height: 230, marginBottom: 20, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(247, 247, 247, 0.19)" }}>
                                <Card.Header>{q.author} Asks :</Card.Header>
                                <Card.Body style={{ padding: 0 }}>
                                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", margin: 0 }}>
                                        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", borderRightStyle: "solid", borderRightWidth: 1, borderRightColor: "#dddddd" }}>
                                            <img src={u[0].avatarURL} style={{ height: 80, width: 80, borderRadius: 40 }} />
                                        </div>
                                        <div style={{ display: "flex", flex: 3, alignItems: "center", flexDirection: "column" }}>
                                            <h5 style={{ fontWeight: "500", marginLeft: 10, marginTop: 10, alignSelf: "flex-start" }}>Would You Rather :</h5>
                                            <div style={{ marginTop: 10, textAlign: "center", lineHeight: 2 }}>{q.optionOne.text}<br />OR...</div>
                                            <div style={{ width: "100%", display: "flex", marginTop: "auto", marginBottom: 15, justifyContent: "center" }}>
                                                <Link style={{ width: "80%", justifyContent: "center", display: "flex" }} to={"/home/" + q.id}><Button variant="primary" style={{ width: "100%", height: 40 }}>View Poll</Button></Link>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        )

                    }
                })}

            </div>
        </div>
    )
}

const MapdispatchToprops = (dispatch) => {
    return {
        setQuestions: (questions) => {
            return dispatch({ type: "setquestions", payload: questions })
        }
    }
}

const MapstateToprops = (state) => {
    return {
        questions: state.questions,
        users: state.response,
        signedin: state.signedIn
    }
}

export default connect(MapstateToprops, MapdispatchToprops)(Home)