import React from "react"
import reducer from "./reducer"
import { createStore } from "redux"
import { Provider } from "react-redux"

const store = createStore(reducer)

export const reduxProvider = ({ children }) => {

    return <Provider store={store}>
        {children}
    </Provider>
}
