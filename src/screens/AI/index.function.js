import { useRef, useState } from "react"

export default () => {
    const listRef = useRef()

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
    const [message, setMessage] = useState(null)

    return {
        messages,
        setMessages,
        message,
        setMessage,
        listRef
    }


}