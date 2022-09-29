import styled, { css } from "styled-components"

export const Container = styled.div`
    padding: 10px;
    background-color: #f46110;
    position: relative;
`
export const Message = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    @media(max-width: 1024px) {
        justify-content: flex-start;
    }
`
export const Title = styled.h2`
    margin: 0;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    @media(max-width: 1024px) {
        font-size: 12px;
    }
`
export const ExitButton = styled.span`
    position: absolute;
    right: 0;
    top: 0;
    background-color: #fff;
    color: #f46110;
    width: 15px;
    height: 15px;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    line-height: 0;
    border-radius: 100%;
    cursor: pointer;
`
export const Overlay = styled.div`
    background-color: rgba(0,0,0,0.4);
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
`
export const ModalContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const ModalContent = styled.div`
    z-index: 1;
    background: #fff;
    border-radius: 7px;
    padding: 2rem;
    position: relative;
    @media(max-width: 1024px) {
        width: calc(100% - 2rem);
        padding: 1rem;
    }
    .close-modal {
        top: 1rem;
        right: .8rem;
    }
`
export const ModalText = styled.label`
    margin: 0 auto 30px;
    color: #1675bf;
    max-width: 80%;
    text-align: center;
    font-size: 1.3rem;
    font-weight: bold;
    display: block;
    height: auto;
    @media(max-width: 1024px) {
        font-size: 1rem;
        margin: 0 auto 1rem;
    }
`
export const ModalForm = styled.form`
    input {
        display: block;
        margin: 0 auto 1rem;
        width: 300px;
        border: 0;
        padding-bottom: .25rem;
        outline-color: #1675bf61;
        color: #1675bf;
        font-size: 14px;
        border-radius: 0;
        border-bottom: 1px solid #dedede;
        background-color: transparent;
        font-family: "Charlevoix Pro", sans-serif;
    }
    button {
        display: block;
        margin: 0 auto;
        border: 0;
        color: #fff;
        padding: 10px 15px;
        font-size: 16px;
        font-weight: 500;
        text-transform: uppercase;
        border-radius: 7px;
        font-weight: bold;
        background-color: #1675bf;
        cursor: pointer;
        font-family: "Charlevoix Pro", sans-serif;
        @media(max-width: 1024px) {
            font-size: 14px;
        }
    }
`