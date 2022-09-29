import React, { useState, useRef, useEffect } from "react";
import defaults from "./defaults";
import style from "./styles.css";
import Modal from "./modal";
import * as S from "./wdt-styles"

function FormDefault(props) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [typeForm, setTypeForm] = useState()

    const {
        revendedor,
        franqueado
    } = defaults;

    const formRef = useRef();

    const submitHandler = ev => {
        ev.preventDefault();

        console.log(data);

        const url = `/api/dataentities/${props.acronym}/documents`;
        const settings = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/vnd.vtex.ds.v10+json"
            },
            body: JSON.stringify(data)
        };
        fetch(url, settings).then(res => res.json().then(res => {
            setSuccess(true)
            setTimeout(() => {
                setSuccess(false)
                //window.location.href = "/"
            }, 2000);
        })).catch(err => {
            setError(true)
            setTimeout(() => {
                setError(false)
                //window.location.href = "/"
            }, 2000);
        });
    }

    const changeHandler = ev => {
        let name = ev.currentTarget.name;
        let value = ev.currentTarget.value;

        setData({ ...data, [name]: value });
    }

    useEffect(() => {
        if (props.typeForm === 'revendedor') {
            setTypeForm(revendedor)
        } else if (props.typeForm === 'franqueado') {
            setTypeForm(franqueado)
        }
    }, [])

    if (!typeForm) return null
    return (
        <>
            <S.Container>
                <form id="formFaleConosco" className={`${props.customClass} ${style.formDefault}`} onSubmit={submitHandler} ref={formRef}>
                    <div id="wdt-title-form" className="wdt-title-form" style={{display: "none"}}><span class="strong-wdt-title-form">Quero ser um(a) franqueado(a)</span> <br/>Preencha os campos abaixo:</div>
                    
                    {Object.keys(typeForm).map(key => {
                        if (typeForm[key].type == "input") {
                            return (
                                <div className={typeForm[key].width == "50" ? style.w50 : style.w100}>
                                    <label className="wdt-input-label" style={{display: "none"}}>{`${typeForm[key].placeholder}`}</label>
                                    {typeForm[key].name !== undefined && <label for={key}>{`${typeForm[key].name}:`}<span style={{ color: "red" }}>{`${typeForm[key].required ? "*" : ""}`}</span></label>}
                                    <input id={key} name={key} required={typeForm[key].required ? "required" : null} placeholder={`${typeForm[key].placeholder}`} onChange={changeHandler} />
                                </div>

                            )
                        } else if (typeForm[key].type == "select") {
                            return (
                                <div className={typeForm[key].width == "50" ? style.w50 : style.w100}>
                                    {typeForm[key].name !== undefined && <label for={key}>{`${typeForm[key].name}:`}<span style={{ color: "red" }}>{`${typeForm[key].required ? "*" : ""}`}</span></label>}
                                    <select id={key} name={key} required={typeForm[key].required ? "required" : null} onChange={changeHandler}>
                                        <option>{typeForm[key].placeholder}</option>
                                        {typeForm[key].options.map(option => <option value={option}>{option}</option>)}
                                    </select>
                                </div>
                            )
                        } else if (typeForm[key].type == "textarea") {
                            return (
                                <div className={typeForm[key].width == "50" ? style.w50 : style.w100}>
                                    {typeForm[key].name !== undefined && <label for={key}>{`${typeForm[key].name}:`}<span style={{ color: "red" }}>{`${typeForm[key].required ? "*" : ""}`}</span></label>}
                                    <textarea id={key} name={key} required={typeForm[key].required ? "required" : null} placeholder={`${typeForm[key].placeholder}`} onChange={changeHandler}></textarea>
                                </div>
                            )
                        } else if(typeForm[key].type == "radio"){
                            return (
                                <div className="wdt-wrap-radio">
                                    <label className="wdt-input-label" style={{display: "none"}}>{`${typeForm[key].placeholder}`}</label>
                                    {typeForm[key].options.map(option => <div class="wdt-radio-value"><input name={key} type="radio" id={option} value={option} onChange={changeHandler}></input><label for={option}>{option}</label></div>)}
                                </div>
                            )
                        }
                    })}
                    <button type='submit' className={style.buttonEnv}>Enviar</button>
                    {success ? <Modal props={{ success: true, message: "Mensagem enviada com sucesso!" }} /> : null}
                    {error ? <Modal props={{ success: false, message: "Houve um erro, tente novamente mais tarde." }} /> : null}
                </form>
            </S.Container>
        </>
    );
}

export default FormDefault;