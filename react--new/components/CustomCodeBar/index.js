import React, { useLayoutEffect, useState } from 'react'
import { useQuery } from 'react-apollo'

import { useRuntime } from 'vtex.render-runtime'
import { FormattedPrice } from "vtex.formatted-price";

import GET_ORDER_GROUP from '../../queries/getOrderGroup.gql'
import styles from "./styles.css"

const CustomCodeBar = ({children}) => {

    const [codeUrl, setCodeUrl] =  useState(null)
    const [total, setTotal] =  useState(null)
    const [paymentSystem, setPaymentSystem] =  useState(null)

    const runtime = useRuntime()
    
    const { data, loading, error } = useQuery(GET_ORDER_GROUP, {
        variables: {
          orderGroup: runtime.query.og,
        }
    })

    useLayoutEffect(() => {
        if(data != null) {

            const order = data?.orderGroup?.orders[0]
            const url = order.paymentData.transactions[0].payments[0].url
            const paymentSystem = order.paymentData.transactions[0].payments[0].paymentSystem
            
            let value = order.value
            let str = value.toString();
            let len = str.length
            let res = str.substring(0, len-2) + "." + str.substring(len-2)
            
            setTotal(res)
            setCodeUrl(url)
            setPaymentSystem(paymentSystem)
            
        }
    })
    
    if(paymentSystem != 6) return null
    return(
        <>
            <div className={styles.wrapperCodeBar}>
                <p>Efetue o pagamento no valor de</p>
                <strong>
                    <FormattedPrice value={total} />
                </strong>
                <p>até a data do vencimento utilizando os dados abaixo.</p>
                <a href={codeUrl} target="_blank">Abrir boleto bancário</a>
            </div>
        </>
    )
}

export default CustomCodeBar