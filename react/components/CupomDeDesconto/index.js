import style from "./styles.css";
import {useState} from "react"

const CupomDeDesconto = () =>{
    const [buttonText10, setButtonText10] = useState("Pegar Desconto")       
    const [buttonText20, setButtonText20] = useState("Pegar Desconto")       
    const [buttonText30, setButtonText30] = useState("Pegar Desconto")               
    
    const desconto15 = (e) => {                      
        navigator.clipboard.writeText("MeuPrimeiroGoldKo")        
        setButtonText10("Cupom copiado!")          
    }
    
    const desconto20 = (e) => {                      
        navigator.clipboard.writeText("ChocoLover20")        
        setButtonText20("Cupom copiado!")            
    }

    const desconto25 = (e) => {                            
        navigator.clipboard.writeText("ChocoLover25")        
        setButtonText30("Cupom copiado!")            
    }
                        
        
    return (        
        <div className={style.container}>
            <div className={style.ofertas}>
                <p>3 cupons online | 9 ofertas</p>
            </div>
            
            <div className={style.desconto}>                        
                <div className={style.cupom}>    
                    
                    <img src="https://goldko.vtexassets.com/arquivos/voucher15-final.png" alt="cupon" />                                    
                </div>
                <div className={style.banner}>                
                    <h2>Cupom de<span> 15% off </span> na primeira compra</h2>
                    <button onClick = {desconto15} className={style.button+ ' ' + style.buttonColor1}>{buttonText10}</button>                    
                </div>
            </div>
            <div className={style.desconto}>
                <div className={style.cupom}>
                    <img src="https://goldko.vtexassets.com/arquivos/btnazul.png" alt="cupon" />                                    
                </div>
                <div className={style.banner}>
                    <h2>Cupom de <span> 20% off </span> em compras acima de R$ 400,00</h2>                     
                    <button onClick = {desconto20} className={style.button+ ' ' + style.buttonColor2}>{buttonText20}</button>
                </div>
            </div>
            <div className={style.desconto}>
                <div className={style.cupom}>
                    <img src="https://goldko.vtexassets.com/arquivos/voucher25-final.png" alt="cupon" />                                    
                </div>
                <div className={style.banner}>
                    <h2>Cupom de <span> 25% off </span> em compras acima de R$ 600,00</h2>                                         
                    <button onClick = {desconto25} className={style.button+ ' ' + style.buttonColor3}>{buttonText30}</button>
                </div>
            </div>
        </div>
    )
}

export default CupomDeDesconto