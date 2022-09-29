import React, {
    useState,
    useEffect,
    useLayoutEffect
} from "react";
import setCookie from "./setCookie";
import getCookie from "./getCookie.js";
import ReactMarkdown from "react-markdown";

import style from "./styles.css";

function AcceptCookies({ content, button }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loadingComponent, setLoadingComponent] = useState(true)
    function getIp(callback) {
        function response(s) {
            callback(window.userip);

            s.onload = s.onerror = null;
            document.body.removeChild(s);
        }

        function trigger() {
            window.userip = false;

            var s = document.createElement("script");
            s.async = true;
            s.onload = function () {
                response(s);
            };
            s.onerror = function () {
                response(s);
            };

            s.src = "https://l2.io/ip.js?var=userip";
            document.body.appendChild(s);
        }

        if (/^(interactive|complete)$/i.test(document.readyState)) {
            trigger();
        } else {
            document.addEventListener('DOMContentLoaded', trigger);
        }
    }


    const handleModalToggle = () => setIsModalOpen(!isModalOpen);

    useLayoutEffect(() => {
        const storageItem = localStorage.getItem("cookie")

        if(storageItem !== null) {
            setIsModalOpen(false)
        } else {
            getIp(function(ip) {
                getCookie(ip).then(res => {
                    res.json().then(res => {
                        console.log("RESPONSE: ", res);
                        if (res.length == 0) {
                            setIsModalOpen(!isModalOpen);
                        }
                    });
                }).catch(err => {
                    console.log("ERROR: ", err);
                    setIsModalOpen(!isModalOpen);
                });
                setLoadingComponent(false)
            });
        }
    }, []);

    const clickHandle = () => {
        localStorage.setItem("cookie", "sim")
        getIp(function(ip) {
            setCookie(ip, "sim").then(res => {
                res.json().then(res => {
                    console.log("RESPONSE: ", res);
                    setIsModalOpen(!isModalOpen);
                }).catch(err => {
                    console.log("ERROR: ", err);
                    setIsModalOpen(!isModalOpen);
                });
            });
        });
    }

    useEffect(() => {}, [isModalOpen]);

    if(loadingComponent) return null
    return (
        <div className={`${style.modal} ${isModalOpen ? style.open : ""}`}>
            <p>
                {
                    content ?
                        <ReactMarkdown>{content}</ReactMarkdown>
                    :
                        <ReactMarkdown>Nós usamos cookies para personalizar anúncios e melhorar a sua experiência no site. Ao continuar navegando, você concorda com a nossa [Política de Privacidade](/politica-de-privacidade).</ReactMarkdown>
                }
            </p>
            <button onClick={clickHandle}>{button ? button : "continuar e fechar"}</button>
        </div>
    );
}

export default AcceptCookies;

AcceptCookies.schema = {
    type: 'object',
    title: 'Accept Cookies',
    properties: {
        content: {
            type: 'string',
            title: 'Modal Content'
        },
        button: {
            type: 'string',
            title: 'Button Text'
        }
    }
};