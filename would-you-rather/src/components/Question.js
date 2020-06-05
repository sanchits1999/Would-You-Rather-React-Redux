import React, { useState, useEffect } from "react"
import { connect } from "react-redux"
import { Card, Button, Form, ProgressBar } from "react-bootstrap"

const Question = (props) => {

    let op1, op2
    const [answered, setanswered] = useState(false)
    const [option1, setoption1] = useState(0)
    const [option2, setoption2] = useState(0)
    const [opacity, setopacity] = useState({ op1: 1, op2: 0.5 })
    const [info, setinfo] = useState(undefined)

    const id = props.match.params.id
    let question, author


    console.log(info)

    useEffect(() => {

        console.log("rendered")

        let vop1, vop2
        question = props.questions.filter((q) => {
            if (q.id === id) {
                vop1 = q.optionOne.votes.length
                vop2 = q.optionTwo.votes.length

            }
            return q.id === id
        })

        author = props.users.filter((u) => {
            return question[0].author == u.id
        })

        Object.keys(props.signedin.answers).forEach((qid, index) => {
            if (qid === id) {
                setanswered(true)


                if (props.signedin.answers[qid] === "optionOne") {
                    setoption1(1)
                    setoption2(0)
                    setopacity({ op1: 1, op2: 0.5 })
                } else {
                    setoption1(0)
                    setoption2(1)
                    setopacity({ op1: 0.5, op2: 1 })
                }
            }
        })


        setinfo({
            question: question[0],
            author: author[0],
            vop1: vop1,
            vop2: vop2
        })

    }, [answered])


    console.log(opacity,op1+"  "+ opacity.op2)
  /*  if (option1) {
        op1 = 1
        op2 = 0.5
    } else {
        op2 = 1
        op1 = 0.5
    }*/

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card style={{ width: "60%", marginTop: 70, marginBottom: 20, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(247, 247, 247, 0.19)" }}>
                <Card.Header>{info !== undefined ? info.question.author : ""} Asks :</Card.Header>
                <Card.Body style={{ padding: 0 }}>
                    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "row", margin: 0 }}>
                        <div style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center", borderRightStyle: "solid", borderRightWidth: 1, borderRightColor: "#dddddd" }}>
                            <img src={info !== undefined ? info.author.avatarURL : null} style={{ height: 80, width: 80, borderRadius: 40 }} />
                        </div>
                        {!answered ? (<div style={{ display: "flex", flex: 3, alignItems: "center", flexDirection: "column" }}>
                            <h5 style={{ fontWeight: "500", marginLeft: 10, marginTop: 10, alignSelf: "flex-start" }}>Would You Rather :</h5>
                            <div className="mb-3">
                                <Form.Check
                                    type={"radio"}
                                    id={"radio1"}
                                    label={info !== undefined ? info.question.optionOne.text : null}
                                    name="answerradio"
                                    style={{ marginBottom: 10 }}
                                    onChange={(props) => {
                                        if (props) {
                                            setoption1(1)
                                            setoption2(0)
                                        }
                                    }}
                                />

                                <Form.Check
                                    type={"radio"}
                                    id={"radio2"}
                                    label={info !== undefined ? info.question.optionTwo.text : null}
                                    name="answerradio"
                                    onChange={(props) => {
                                        if (props) {
                                            setoption1(0)
                                            setoption2(1)
                                        }
                                    }}
                                />
                            </div>
                            <div style={{ width: "100%", display: "flex", marginTop: "auto", marginBottom: 15, justifyContent: "center" }}>
                                <Button variant="primary" style={{ width: "80%", height: 40 }} onClick={() => {
                                    if (option1 || option2) {
                                        if (option1) {

                                            let newuserinfo = { ...props.signedin, answers: { ...props.signedin.answers, [id]: "optionOne" } }
                                            let q = { ...info.question, optionOne: { ...info.question.optionOne, votes: info.question.optionOne.votes.concat(props.signedin.id) } }
                                            props.addanswer({ author: newuserinfo, question: q })
                                            console.log(q)
                                            console.log(newuserinfo)
                                            setanswered(true)
                                        }
                                        if (option2) {
                                            let newuserinfo = { ...props.signedin, answers: { ...props.signedin.answers, [id]: "optionTwo" } }
                                            let q = { ...info.question, optionTwo: { ...info.question.optionTwo, votes: info.question.optionTwo.votes.concat(props.signedin.id) } }
                                            props.addanswer({ author: newuserinfo, question: q })
                                            setanswered(true)
                                        }
                                    }
                                    // 
                                }}>Submit</Button>
                            </div>
                        </div>) : (<div style={{ display: "flex", flex: 3, alignItems: "center", flexDirection: "column" }}>
                            <h5 style={{ marginLeft: 10, marginTop: 10, alignSelf: "flex-start" }}>Results :</h5>
                            <div style={{ marginLeft: 10, marginTop: 0, alignSelf: "flex-start" }}>Would You Rather</div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", marginTop: 10 }}>
                                <Card style={{ width: "97%", height: 80, opacity: option1===1?1:0.5, alignItems: "center", marginRight: "auto", marginTop: 15, display: "flex", flexDirection: "column", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(247, 247, 247, 0.19)" }}>
                                    <div style={{ fontSize: 15, fontWeight: "500", marginTop: 10 }}>{info !== undefined ? info.question.optionOne.text : null}</div>
                                    <ProgressBar now={info.vop1 !== undefined ? info.vop1 : 0} max={info.vop1 !== undefined ? info.vop1 + info.vop2 : 10} style={{ height: 10, width: "80%", marginTop: "auto" }} />
                                    <div style={{ fontSize: 12, fontWeight: "700", marginBottom: 5 }}>{info.vop1 !== undefined ? info.vop1 : 0} out of {info.vop1 !== undefined ? info.vop1 + info.vop2 : 10}</div>
                                </Card>
                                <div style={{ height: 40, width: 40, borderRadius: 20, opacity: option1, backgroundColor: "red", display: "flex", position: "absolute", alignSelf: "flex-end", fontWeight: "300", color: "#ffffff", textAlign: "center", padding: 0, justifyContent: "center" }}><p style={{ fontSize: 10, marginTop: 5, fontWeight: "500" }}>YOUR<br />VOTE</p></div>
                            </div>
                            <div style={{ width: "80%", display: "flex", flexDirection: "column", marginTop: 10, marginBottom: 30 }}>
                                <Card style={{ width: "97%", height: 80, opacity: option1===1?0.5:1, alignItems: "center", marginRight: "auto", marginTop: 15, display: "flex", flexDirection: "column", boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(247, 247, 247, 0.19)" }}>
                                    <div style={{ fontSize: 15, fontWeight: "500", marginTop: 10 }}>{info !== undefined ? info.question.optionTwo.text : null}</div>
                                    <ProgressBar now={info.vop2 !== undefined ? info.vop2 : 0} max={info.vop1 !== undefined ? info.vop1 + info.vop2 : 10} style={{ height: 10, width: "80%", marginTop: "auto" }} />
                                    <div style={{ fontSize: 12, fontWeight: "700", marginBottom: 5 }}>{info.vop2 !== undefined ? info.vop2 : 0} out of {info.vop1 !== undefined ? info.vop1 + info.vop2 : 10}</div>
                                </Card>
                                <div style={{ height: 40, width: 40, borderRadius: 20, opacity: option2, backgroundColor: "red", display: "flex", position: "absolute", alignSelf: "flex-end", fontWeight: "300", color: "#ffffff", textAlign: "center", padding: 0, justifyContent: "center" }}><p style={{ fontSize: 10, marginTop: 5, fontWeight: "500" }}>YOUR<br />VOTE</p></div>
                            </div>
                        </div>)}

                    </div>
                </Card.Body>
            </Card>
        </div>
    )
}

const MapdispatchToprops = (dispatch) => {
    return {
        addanswer: (answer) => {
            return dispatch({ type: "addanswer", payload: answer })
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

export default connect(MapstateToprops, MapdispatchToprops)(Question)