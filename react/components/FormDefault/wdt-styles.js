import styled from "styled-components"

export const Container = styled.div`

.wdt-form-franquias {
    padding-top: 0px;

    @media(max-width: 1024px){
        flex-direction: initial;
    }
    @media(max-width: 767px){
        flex-direction: column;
    }

    .goldko-goldko-theme-1-x-w100{
        width: 48%;

        @media(max-width: 767px){
            width: 100%;
        }

        .wdt-input-label {
            display: block !important;
            color: #fff;
            font-size: 19px !important;
            margin-bottom: 6px;
            font-family: 'VinilaRegular';
        }

        input{
            border-radius: 10px !important;
        }
        input::placeholder{
            font-size: 0px !important;
        }
    }
    .goldko-goldko-theme-1-x-buttonEnv {
        background: #f46110;
        border-radius: 20px;
        font-size: 0;
        width: auto;
        margin: 20px auto 0px;
        padding: 20px 30px;
        height: initial;
        line-height: initial;
        font-family: 'VinilaBold';
        margin-bottom: 20px;
    }

    .goldko-goldko-theme-1-x-buttonEnv::after {
        content: "Quero ser um(a) franqueado(a)";
        font-size: 20px;
    }
    .wdt-wrap-radio {
        width: 100%;
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-bottom: 0px !important;

        .wdt-input-label {
            display: block !important;
            color: #fff;
            font-size: 19px !important;
            margin-bottom: 20px;
            width: 100%;
            font-family: 'VinilaRegular';
        }
        .wdt-radio-value {
            display: flex;
            color: #fff;
            font-size: 19px !important;
            margin-bottom: 10px;
            line-height: initial;
            font-family: 'VinilaRegular';

            label{
                font-family: 'VinilaRegular';
                line-height: initial;
                font-size: 20px;

                @media(max-width: 1366px){
                    font-size: 16px;
                }
            }

            input {
                width: 15px;
                height: 15px;
                margin-right: 7px;
                -moz-appearance: none;
                -webkit-appearance: none;
                appearance: none;
                outline: none;
                background: #fff;
                border-radius: 100%;
                border: 1px solid #fff;
            }
            input:checked{
                background: #f46111;
            }
        }
    }

    #wdt-title-form{
        color: #fff;
        text-align: center;
        width: 100%;
        margin: initial !important;
        line-height: initial;
        font-weight: 600;
        display: block !important;
        margin: 50px auto 30px !important;
        font-family: 'VinilaRegular';
        font-size: 28px;

        @media(max-width: 1366px){
            font-size: 22px;
        }
        @media(max-width: 767px){
            margin: 30px auto !important;
        }

        .strong-wdt-title-form{
            text-transform: uppercase;
            font-weight: 900;
            font-family: 'VinilaBold';
            font-size: 32px;

            @media(max-width: 1366px){
                font-size: 24px;
            }
        }
    }
}
`