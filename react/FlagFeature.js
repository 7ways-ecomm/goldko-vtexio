import style from "./Flag.css"
import React from "react"
import { useProductSummary } from 'vtex.product-summary-context/ProductSummaryContext'

function FlagFeatures() {
    const productSummary = useProductSummary()
    const product = productSummary

    console.log(product.product.properties)

    return (
        <>
            {
                product.product.properties ?
                    <div className={style.flagsImage}>  
                    {
                        product.product.properties.map(item => {
                            if(item.name == "Características") {
                                return(
                                    <>  
                                    {
                                        item.values.map(caracteristica => {
                                            if(caracteristica == "Sem Glúten")
                                                return(<span  className={style.flagImage}><img src="https://goldko.vtexassets.com/arquivos/sem-gluten.png" alt="Sem Glútém" /></span>)
                                            else
                                                return null
                                        })
                                    }
                                    </>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                    {
                        product.product.properties.map(item => {
                            if(item.name == "Características") {
                                return(
                                    <>  
                                    {
                                        item.values.map(caracteristica => {
                                            if(caracteristica == "Vegano")
                                                return(<span  className={style.flagImage}><img src="https://goldko.vtexassets.com/arquivos/veganos.png" alt="Vegano" /></span>)
                                            else
                                                return null
                                        })
                                    }
                                    </>
                                )
                            } else {
                                return null
                            }
                        })
                    }
                    </div>
                : null
            }
        </>
    )
}

export default FlagFeatures