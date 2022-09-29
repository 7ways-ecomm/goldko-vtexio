import React, {
    useLayoutEffect,
    useState
} from "react"
import defaults from "./AcceptCookies/defaults"

export default function MilkIntegration() {
    const [msg, setMsg] = useState(false)

    useLayoutEffect(() => {
        const search = window.location.search;
        if (search !== "") {
            fetch("/api/oms/pvt/orders/" + search.split("=")[1] + "-01", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    "x-vtex-api-appKey": defaults.appKey,
                    "x-vtex-api-appToken": defaults.appToken
                }
            }).then((res) => {
                res.json().then((res) => {
                    const {
                        shippingData: {
                            logisticsInfo: [
                                {
                                    deliveryChannel
                                }
                            ]
                        }
                    } = res

                    if (deliveryChannel === "pickup-in-point") {
                        setMsg(true)
                    }
                    console.log("Integração MILK")
                })
            }).catch((err) => console.log("ERROR", err))
        }
    }, [])

    if (msg === false) return null
    return (
        <p style={{
            display: "block",
            padding: "15px",
            borderRadius: "10px",
            background: "#f6e58d",
            color: "#1675bf",
            marginLeft: window.innerWidth < 767 ? "15px" : "40px",
            marginRight: window.innerWidth < 767 ? "15px" : "0"
        }}>Retiradas podem ser feitas de segunda a domingo, no horário de funcionamento do Shopping, mediante apresentação da NF. A NF é emitida de segunda a sexta-feira em horário comercial, e é enviada para o e-mail de cadastro no site. Caso você ainda não tenha recebido sua NF e queira ir ao Shopping, por favor nos envie um e-mail para que possamos verificar o status do seu pedido: <a href="mailto:alo@goldko.com.br" style={{
            color: "#1675bf",
            fontWeight: "bold"
        }}>alo@goldko.com.br</a></p>
    )
}