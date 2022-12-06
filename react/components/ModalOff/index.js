import { useState } from "react"
import style from "./modal.css";

function ModalOff() {
    const openModal = () => {
        var url = window.location.href;
        url = url.indexOf("teste7ways");
        if (url > 0) {
            document.getElementById("ModalOff").classList.add("testeways");
        }

        let currentLocal = localStorage.getItem('close-modal');
        let currentSessi = sessionStorage.getItem('close-modal');
        if (currentLocal == "sim") { } else {
            if (currentSessi == "sim") { } else {
                document.getElementById('ModalOff').style.display = "flex";
            }
        }
    }

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

    const mySubmitHandler = (event) => {
        event.preventDefault();
        let tel = document.getElementById('tel').value;
        let email = document.getElementById('email').value;
        let nome = document.getElementById('name').value;
        tel = tel.replace("(", "");
        tel = tel.replace(")", "")
        tel = tel.replace("-", "")

        console.log(tel)

        var data = JSON.stringify({
            "tel": tel,
            "email": email,
            "nome": nome,
        });

        var xhr = new XMLHttpRequest();
        xhr.withCredentials = true;

        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.response);
                if (xhr.status == 201 || xhr.status == 200) {
                    document.getElementById("first").style.display = "none";
                    setTimeout(() => {
                        document.getElementById("thanks").style.display = "flex";
                    }, 200);

                    localStorage.setItem("close-modal", "sim");
                } else {
                    document.getElementById("error_message").style.opacity = "1";
                }
            }
        })

        xhr.open("POST", "/api/dataentities/MC/documents");
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.setRequestHeader("Accept", "application/vnd.vtex.ds.v10+json");
        xhr.setRequestHeader("x-vtex-api-appKey", "vtexappkey-goldko-TUQXBH");
        xhr.setRequestHeader("x-vtex-api-appToken", "IMPFYZQECAMFLJBVIDZLEOYDQKKPUGFOJWIDXTKLAKADOBAVKVEJWDVOWTYBHONFVNPSSBDTNZARVPPKHWLUWUTNTNDRKAEHDPNARANAUJVQEYTGJNSJMONLZAICCGQW");
        xhr.setRequestHeader("Cookie", "janus_sid=273883d0-216b-4e9c-b20a-7fd3bf9473cf");

        xhr.send(data);
    }

    const ModalClose = () => {
        document.getElementById('ModalOff').style.display = "none";
        sessionStorage.setItem("close-modal", "sim");
    }

    setTimeout(() => {
        openModal();
    }, 500);

    return (
        <div className={style.ModalOff} style={{ display: "none" }} id="ModalOff">
            <div className={style.modal_box}>
                <div className={style.close}>
                    <div className={style.close_btn} onClick={ModalClose}>
                        x
                    </div>
                </div>
                <div className={style.first} id="first">
                    <div className={style.image}>
                        <img src="https://goldko.vteximg.com.br/arquivos/top-modal-off-390.png" alt="Imagem de um chocolate" />
                    </div>
                    <div className={style.box_all}>
                        <div className={style.left_box}>
                            <div className={style.texts}>
                                <p className={style.title}>
                                    CADASTRE E RECEBA
                                </p>
                                <div className={style.off}>
                                    10% <br />
                                    OFF
                                </div>
                                <p className={style.descr}>
                                    em sua primeira compra.
                                </p>
                            </div>
                            <div className={style.form_box}>
                                <form className={style.form_modal} onSubmit={mySubmitHandler}>
                                    <label for="name">Nome:</label>
                                    <input type="text" id="name" className={style.name} name="name" placeholder="" />

                                    <label for="email">Email:</label>
                                    <input type="email" id="email" className={style.email} name="email" placeholder="" required="required" />

                                    <label for="tel">Celular:</label>
                                    <input type="text" id="tel" className={style.tel} name="tel" onChange={mask_DDDFONEFAX9_v1} onKeyPress={mask_DDDFONEFAX9_v1} onBlur={mask_DDDFONEFAX9_v1} placeholder="" />

                                    <b className={style.error_message} id="error_message"> Erro no envio, por favor contate o administrador </b>

                                    <button type="submit" className={style.btn_submit}> Eu Quero! </button>
                                </form>
                            </div>
                        </div>
                        <div className={style.right_box}>
                            <p> *cupom válido somente para a primeira compra por CPF </p>
                        </div>
                    </div>
                </div>
                <div className={style.thanks} style={{ display: "none" }} id="thanks">
                    <div className={style.box}>
                        <div className={style.texts}>
                            <p className={style.title}>
                                BEM VINDO <br />
                                À FAMILIA!
                            </p>

                            <p className={style.descr}>
                                Seu cupom é: <br />
                                <b className={style.cupom}> MEUPRIMEIROGOLDKO </b>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalOff