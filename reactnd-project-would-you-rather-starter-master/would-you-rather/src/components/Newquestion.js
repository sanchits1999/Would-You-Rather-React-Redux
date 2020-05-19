import React, { useState } from "react"
import { FormControl, Card, Button, InputGroup } from "react-bootstrap"
import { connect } from "react-redux"
import { _saveQuestion as savequestion } from "../_DATA"
import {Redirect} from "react-router-dom"

const New = (props) => {

    const [option1, set1] = useState("")
    const [option2, set2] = useState("")
    const [redirect,setredirect] = useState(false)

    if(redirect){
        return <Redirect to="/home"/>
    }


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Card style={{ width: "60%", marginTop: "8%" }}>
                <Card.Header style={{ textAlign: "center", fontWeight: "500", letterSpacing: 0.6, fontSize: 20 }}>Create New Question</Card.Header>
                <Card.Body style={{ display: "flex", flexDirection: "column", padding: 0 }}>
                    <div style={{ fontSize: 18, marginLeft: 40, marginTop: 20 }}>
                        Complete the question :
                    </div>
                    <div style={{ fontSize: 18, fontWeight: "500", marginLeft: 40, marginTop: 10 }}>
                        Would You Rather ....
                    </div>
                    <div style={{ marginLeft: 40, marginRight: 40, marginTop: 10 }}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Option 1</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" aria-label="With textarea" onChange={(txt) => { set1(txt.currentTarget.value) }} />
                        </InputGroup>
                    </div>
                    <div style={{ fontSize: 18, marginLeft: 40, marginTop: 10, marginRight: 40, textAlign: "center", fontWeight: "500" }}>
                        OR
                    </div>
                    <div style={{ marginLeft: 40, marginRight: 40, marginTop: 10, marginBottom: 20 }}>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>Option 2</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" aria-label="With textarea" onChange={(txt) => { set2(txt.currentTarget.value) }} />
                        </InputGroup>
                    </div>
                    <Button variant="primary" onClick={() => {
                        if (option1 === "" || option2 === "") {
                            alert("Please add options to continue")
                        }
                        else {
                            savequestion({ optionOneText: option1, optionTwoText: option2, author: props.signedin.id }).then((question) => {
                                console.log(question)
                                props.addquestion(question)
                                setredirect(true)
                            }).catch(() => {

                            })
                        }
                    }} style={{ marginTop: "auto", width: "85%", alignSelf: "center", marginBottom: 20 }}>Submit</Button>
                </Card.Body>
            </Card>
        </div>
    )
}


const MapstateToprops = (state) => {
    return {
        signedin: state.signedIn
    }
}

const MapdispatchToprops = (dispatch) => {
    return {
        addquestion: (question) => {
            dispatch({ type: "addquestion", payload: question })
        }
    }
}

export default connect(MapstateToprops, MapdispatchToprops)(New)