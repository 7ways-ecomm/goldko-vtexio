import React, { useEffect, useState, useRef, useCallback } from "react";
import style from "./form.css";

function sendMail(data, email, copia, empresa, logo, title) {
    fetch(`https://www.wedigi.com.br/we.digi.tech/wdt-sendmail-hunter.php?data=${JSON.stringify(data)}&email=${email}&copia=${copia}&empresa=${empresa}&logo=${logo}&title=${title}`, {
        method: "POST",
        headers: {
            "accept": "application/json"
        },
        body: ""
    })
        .then(response => response.text())
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
}

function mask_date_v1(campo) {
    v = campo.value;
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.replace(/(\d{2})(\d)/, "$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1/$2");
    campo.value = v;
}

function mask_CEP_v1(campo) {
    v = campo.value;
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{5})(\d)/, "$1-$2");
    campo.value = v;
}

function mask_Card_v1(campo) {
    v = campo.value;
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{4})(\d)/, "$1.$2");
    v = v.replace(/(\d{4})(\d)/, "$1.$2");
    v = v.replace(/(\d{4})(\d)/, "$1.$2");
    v = v.replace(/(\d{4})(\d)/, "$1.$2");
    campo.value = v;
}

function mask_CPF_v1(campo) {
    v = campo.value;
    v = v.replace(/\D/g, ""); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1-$2");
    campo.value = v;
}

function Form() {
    const [modalContent, useModalContent] = useState("");
    const [values, setValues] = useState({});
    const [modal, useModal] = useState(false);

    const handleChange = (event) => {
        const auxValues = { ...values };
        auxValues[event.target.name] = event.target.value;
        setValues(auxValues);
    };

    const mask_DDDFONEFAX9_v1 = function (ev) {
        let v = ev.currentTarget.value;
        v = v.replace(/\D/g, "") //Remove tudo o que não é dígito
        v = v.replace(/^(\d{2})(\d)/g, "($1)$2"); //Coloca parênteses em volta dos dois primeiros dígitos
        if (v.substr(4, 1) == 9)
            v = v.replace(/(\d{5})(\d)/, "$1-$2");
        else {
            v = v.replace(/(\d{4})(\d)/, "$1-$2");
            v = v.substr(0, 13);
        }
        ev.currentTarget.value = v;
    };

    const handleModalClose = () => useModal(!modal);

    const mySubmitHandler = (event) => {
        event.preventDefault();

        // Object.keys(values).forEach(value => {
        //     if (value == "email") {
        //         if (!validMail(values[value])) {
        //             useModalContent("Favor preencher o campo e-mail corretamente");
        //             useModal(true);
        //         }
        //     }
        // });

        var data = JSON.stringify({
            "subject": values.subject,
            "email": values.email,
            "name": values.name,
            "tel": values.tel,
            "msg": values.msg
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response);

                useModal(true);
                useModalContent("Mensagem enviada com sucesso.");

                sendMail(data, "alo@goldko.com.br", "", "Goldko", "https://goldko.vtexassets.com/arquivos/logo.png", "Fale Conosco");
            }
        })

        xhr.open("POST", "/api/dataentities/FC/documents");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/vnd.vtex.ds.v10+json");
        xhr.setRequestHeader("x-vtex-api-appKey", "vtexappkey-goldko-AJYLNK");
        xhr.setRequestHeader("x-vtex-api-appToken", "KPZXQVJBWTNCJWUALFTWTBURERSXYAMTKRGKEVYZZMWMEFEYKAGCOGLIVITZCLDVHTRSQJWPHTWHFHNYMTNYUKEEFXOVCZXNIAFKOMIADRUVJDDOUUNIYFBWPMMTUANI");
        xhr.setRequestHeader("Cookie", "janus_sid=273883d0-216b-4e9c-b20a-7fd3bf9473cf");

        xhr.send(data);
    }

    useEffect(() => { }, [modal]);

    return (
        <div className={style.contactForm}>
            <form id="formFaleConosco" onSubmit={mySubmitHandler}>
                <div className={style.inputGroup}>
                    <input type="text" name="name" onChange={handleChange} placeholder="Nome" className={style.inputDefault} required />
                </div>
                <div className={style.inputGroup}>
                    <input type="email" name="email" onChange={handleChange} placeholder="E-mail" className={style.inputDefault} required />
                </div>
                <div className={style.inputGroup}>
                    <input type="text" name="tel" onChange={handleChange} onKeyPress={mask_DDDFONEFAX9_v1} onBlur={mask_DDDFONEFAX9_v1} placeholder="Telefone" className={style.inputDefault} required />
                </div>
                <div className={style.inputGroup}>
                    <input type="text" name="subject" onChange={handleChange} placeholder="Assunto" className={style.inputDefault} required />
                </div>
                <div className={style.inputGroup}>
                    <textarea type="text" name="msg" onChange={handleChange} placeholder="Sua mensagem" className={style.textAreaDefault} required />
                </div>
                <input type="submit" value="Enviar" className={style.buttonEnv} />
            </form>
            <div className={style.formResponse} style={{ display: modal == false ? "none" : "block" }}>
                <div className={style.formResponseWrap}>
                    <div className={style.formResponseClose} onClick={handleModalClose}></div>
                    <div className={style.formResponseContent}>{modalContent != "" ? `${modalContent}` : ""}</div>
                </div>
            </div>
            <div className={style.formOverlay} onClick={handleModalClose} style={{ display: modal == false ? "none" : "block" }}></div>
        </div>
    );
}

export default Form;