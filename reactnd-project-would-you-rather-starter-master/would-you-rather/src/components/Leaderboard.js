import React from "react"
import { Card } from "react-bootstrap"
import { connect } from "react-redux"

const Leaderboard = (props) => {

    console.log(props.users)


    const sortedu = props.users.sort((u1, u2) => {
        let usum1 = Object.keys(u1.answers).length + u1.questions.length
        let usum2 = Object.keys(u2.answers).length + u2.questions.length
        return usum2 - usum1
    })


    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingBottom: 40 }}>

            {sortedu.map((user, index) => {

                let answers = Object.keys(user.answers).length
                let questions = user.questions.length

                let pos, color

                switch (index) {
                    case 0: pos = "1st"
                        color = "blue transparent transparent transparent"
                        break
                    case 1: pos = "2nd"
                        color = "red transparent transparent transparent"
                        break
                    case 2: pos = "3rd"
                        color = "green transparent transparent transparent"
                        break
                }

                return (
                    <Card key={user.id} style={{ width: "70%", height: 160, marginTop: 40, boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(247, 247, 247, 0.19)" }}>
                        <Card.Body style={{ display: "flex", flexDirection: "row", padding: 0 }}>
                            <div style={{ display: "flex", flex: 2, flexDirection: "column", justifyContent: "center", alignItems: "center", borderRight: "0.5px solid #dddddd" }}>
                                <div style={{ width: 0, height: 0, top: 0, left: 0, borderStyle: "solid", borderWidth: "60px 60px 0 0 ", borderColor: color, position: "absolute" }}></div>
                                <p style={{ position: "absolute", top: 5, left: 5, color: "#ffffff", fontWeight: "500" }}>{pos}</p>
                                <img src={user.avatarURL} style={{ height: 120, width: 120, borderRadius: 60 }} />
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", flex: 3, borderRight: "0.5px solid #dddddd" }}>
                                <h5 style={{ marginTop: 15, marginLeft: 20 }}>{user.name}</h5>
                                <div style={{ display: "flex", flexDirection: "row", marginTop: 10 }}>
                                    <p style={{ marginTop: 5, marginLeft: 20 }}>Answered Questions</p>
                                    <p style={{ marginTop: 5, marginLeft: 30 }}>{answers}</p>
                                </div>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <p style={{ marginTop: 5, marginLeft: 20 }}>Created Questions</p>
                                    <p style={{ marginTop: 5, marginLeft: 45 }}>{questions}</p>
                                </div>
                            </div>
                            <div style={{ display: "flex", flex: 2, justifyContent: "center", alignItems: "center" }}>
                                <Card style={{ height: "70%", width: "50%" }}>
                                    <Card.Header style={{ height: 40, fontWeight: "700", paddingBottom: 5 }}>Score</Card.Header>
                                    <Card.Body style={{ justifyContent: "center", alignItems: "center" }}>
                                        <div style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: "blue", textAlign: "center", fontWeight: "500", fontSize: 18, color: "#ffffff", paddingTop: 6 }}>
                                            {answers + questions}
                                        </div>
                                    </Card.Body>
                                </Card>
                            </div>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}

const MapstateToprops = (state) => {
    return {
        users: state.response
    }
}

export default connect(MapstateToprops)(Leaderboard)