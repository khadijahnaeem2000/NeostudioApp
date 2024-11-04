import { useState } from "react"

export default () => {

    const msgsarray = [
        {
            id: 1,
            isuser: true,
            message: "Diferencia de Dolo e imprudencia",
        },
        {
            id: 2,
            isuser: false,
            message: "Lo siento"
        }
    ]


    const [messages, setMessages] = useState(msgsarray)

    return {
        messages
    }


}