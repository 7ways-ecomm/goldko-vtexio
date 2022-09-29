import React, { useState, useEffect, useLayoutEffect } from "react";
import { ExtensionPoint } from "vtex.render-runtime";
import setCookie from "./setCookies";
import getCookie from "./getCookie";
import style from "./styles.css";

function PromotionModal({ title, active, discount }) {
    const RenderRuntime = ExtensionPoint();
    const [open, setOpen] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [response, setResponse] = useState("");
    const [openMessageModal, setOpenMessageModal] = useState(false)
    const [messageImage, setMessageImage] = useState(0)

    const {
        props: {
            runtime: {
                page,
                route: {
                    canonicalPath
                }
            }
        }
    } = RenderRuntime;

    useEffect(() => { }, [open]);
    useEffect(() => { }, [submit]);
    useEffect(() => { }, [loading]);

    useLayoutEffect(() => {
        const promotionModal = getCookie("promotionModal");
        if (!promotionModal) {
            setOpen(true);
            setMessageImage(1)
        }
    }, []);

    const submitHandler = event => {
        event.preventDefault();
        const value = event.currentTarget.querySelector("input").value;

        const search = `/api/dataentities/PC/search?email=${value}&_fields=_all`;
        const searchSettings = {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.vtex.ds.v10+json'
            }
        };
        const clientRecord = `/api/dataentities/CL/documents`;
        const clientRecordSettings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.vtex.ds.v10+json'
            },
            body: JSON.stringify({
                email: value,
                receiveNewsletter: true
            })
        };

        // console.log("Client: ", res);
        const firstPurchase = `/api/dataentities/PC/documents`;
        const firstPurchaseSettings = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/vnd.vtex.ds.v10+json'
            },
            body: JSON.stringify({
                email: value
            })
        };

        fetch(search, searchSettings).then(res => {
            setLoading(true);
            res.json().then(res => {
                console.log("🚀 ~ file: index.js ~ line 80 ~ res.json ~ res", res)
                if (res.length) {
                    console.log("Search: ", res);
                    console.log("JA TEM");
                    fetch(clientRecord, clientRecordSettings).then(res => {
                        res.json().then(res => {
                            console.log("Client: ", res);
                            setMessageImage(2)
                            setResponse(`Verificamos que você já está cadastrado e recebeu nosso cupom de ${discount}. Por isso cadastramos você em nossa lista privilegiada, para sempre receber nossas mais recentes ofertas.`)
                            setLoading(false);
                            setSubmit(true);
                            setCookie("promotionModal", "closed", 10);
                        }).catch(err => {
                            setMessageImage(0)
                            setResponse("Pedimos desculpas. Houve um erro com nosso servidor, estamos trabalhando para uma melhor experiência dos nossas usuários.");
                            setLoading(false);
                            setSubmit(true);
                            setCookie("promotionModal", "closed", 10);
                            console.log("ERROR: ", err);
                        });
                    });

                } else {
                    console.log("NoVO");
                    fetch(clientRecord, clientRecordSettings).then(res => {
                        res.json().then(res => {
                            fetch(firstPurchase, firstPurchaseSettings).then(res => {
                                res.json().then(res => {
                                    setMessageImage(2)
                                    // setResponse(`Parabéns! Você agora participa da nossa promoção! Verifique sua caixa de e-mail e encontrará ali o seu cupom de desconto de ${discount}`);
                                    setLoading(false);
                                    setSubmit(true);
                                    setCookie("promotionModal", "closed", 10);

                                    dataLayer.push({
                                        'email': value,
                                        'event': 'primeiraCompra'
                                    });
                                });
                            }).catch(err => {
                                setMessageImage(0)
                                setResponse("Pedimos desculpas. Houve um erro com nosso servidor, estamos trabalhando para uma melhor experiência dos nossas usuários.");
                                setLoading(false);
                                setSubmit(true);
                                setCookie("promotionModal", "closed", 10);
                                console.log("ERROR: ", err);
                            });
                        }).catch(err => {
                            setMessageImage(0)
                            setResponse("Pedimos desculpas. Houve um erro com nosso servidor, estamos trabalhando para uma melhor experiência dos nossas usuários.");
                            setLoading(false);
                            setSubmit(true);
                            setCookie("promotionModal", "closed", 10);
                            console.log("ERROR: ", err);
                        });
                    });
                }
            });
        }).catch(err => {
            setMessageImage(0)
            setResponse("Pedimos desculpas. Houve um erro com nosso servidor, estamos trabalhando para uma melhor experiência dos nossas usuários.");
            setLoading(false);
            setSubmit(true);
            setCookie("promotionModal", "closed", 10);
            console.log("ERROR: ", err);
        });
    }

    const onClickHandler = () => {
        console.log("onClickHandler");
        setOpen(false);
        setCookie("promotionModal", "closed", 10);
    }

    if (!open) return null
    if (!active) return null

    return (
        <>
            <div className={style.rulerMessage}>
                <h2 onClick={() => setOpenMessageModal(true)}>{title === undefined ? `CLIQUE AQUI, INSIRA SEU EMAIL E GANHE ${discount} OFF` : title}</h2>
                <span className={style.closeRulerMessage} onClick={onClickHandler}>X</span>
            </div>
            {openMessageModal &&
                <>
                    <div className={open ? style.modalOverlayOpen : style.modalOverlayClose} onClick={() => setOpenMessageModal(false)}></div>
                    <div className={open ? style.modalOpen : style.modalClose}>
                        <div className={style.modalContent}>
                            <div className={style.closeModal} onClick={() => setOpenMessageModal(false)}>
                                <i className="feather-icon icon-x" />
                            </div>
                            {loading ?
                                <div className={style.loading}></div>
                                :
                                <>
                                    <div className={style.modalBody} style={!submit ? { display: 'block' } : { display: 'none' }}>
                                        <img
                                            src="https://goldko.vtexassets.com/arquivos/message-1.png"
                                            alt="Mensagem"
                                            style={messageImage === 1 ? { display: 'block' } : { display: 'none' }}
                                        />
                                        <form onSubmit={submitHandler}>
                                            <input type="text" placeholder="E-mail:" />
                                            <button type="submit">Enviar</button>
                                        </form>
                                    </div>
                                    <div className={style.modalBody} style={submit ? { display: 'block' } : { display: 'none' }}>
                                        <img
                                            src="https://goldko.vtexassets.com/arquivos/message-2.png"
                                            alt="Mensagem"
                                            style={messageImage === 2 ? { display: 'block' } : { display: 'none' }}
                                        />
                                        {response !== "" || response && <p>{response}</p>}
                                    </div>
                                </>
                            }
                        </div>
                    </div>
                </>
            }
        </>
    );
}

PromotionModal.schema = {
    type: 'object',
    title: 'Modal de Primeira Compra',
    properties: {
        title: {
            type: 'string',
            title: 'Titulo',
            default: 'CLIQUE AQUI, INSIRA SEU EMAIL E GANHE 15% OFF'
        },
        discount: {
            type: 'string',
            title: 'Quantidade de desconto',
            default: '15%'
        },
        active: {
            type: 'boolean',
            title: 'Ativo?',
            default: false
        }
    }
};

export default PromotionModal;