import styled from "styled-components";

export const Container = styled.div``;

export const OptionsContainer = styled.div`
  padding-bottom: 24px;

  @media (max-width: 456px) {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const QuantityButton = styled.button`
  height: 44px;
  width: 100%;
  max-width: 196px;
  font-family: "Charlevoix Pro", sans-serif;
  font-weight: 700;
  font-size: 1rem;
  line-height: 19px;
  color: #1675bf;
  background: #ffffff;
  border: 1px solid #1675bf;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:not(:last-child) {
    margin-right: 24px;
  }
  &.quantityButtonActive {
    background: #1675bf;
    color: #fff;
  }

  @media (max-width: 768px) {
    max-width: 158px;
  }
`;

export const ProductPrice = styled.div`
  padding-bottom: 37px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  @media (max-width: 1190px) {
    gap: 30px;
  }

  @media (max-width: 456px) {
    justify-content: center;
  }
`;

export const PriceInfo = styled.div`
  padding-right: 12px;
  @media (max-width: 456px) {
    text-align: center;
  }
`;

export const Discount = styled.span`
  display: block;
  font-family: 'Charlevoix Pro', sans-serif;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  text-decoration-line: line-through;
  color: #A2A2A2;
`;

export const Price = styled.span`
  font-family: 'Charlevoix Pro', sans-serif;
  color: #1675bf;
  font-size: 26px;
  line-height: 31px;
  font-weight: 600;
  margin: 0;
  margin-bottom: 4px;
`;

export const PricePayment = styled.p`
  color: rgb(22, 117, 191);
  font-size: 13px;
  margin: 10px 0px 0px;
`;

export const ShippingContainer = styled.div`

`;

export const BuyButtonCustom = styled.div`
  padding: 0 15px;
  display: flex;
  align-items: center;
  background-color: #f46110;
  font-size: 1rem !important;
  font-weight: 600;
  text-transform: uppercase;
  justify-content: center !important;
  color: #FFF;
  border: none;
  width: 100%;
  max-width: 340px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
`;

export const Button = styled.button`
  font-family: 'Charlevoix Pro', sans-serif;  
  font-size: 1rem !important;
  font-weight: 600;
  color: #FFF;
  border: none;
  background: transparent;
  width: 100%;
  position: relative;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  &::after {
      content: '';
      width: 20px !important;
      height: 20px !important;
      margin-left: 10px;
      display: inline-block;
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 456 456' fill='%23fff' %3E%3Cpath d='M345.6 338.9c-29.2 0-53.2 23.6-53.2 53.2 0 29.2 23.6 53.2 53.2 53.2 29.2 0 53.2-23.6 53.2-53.2-.5-29.2-24-53.2-53.2-53.2zM215 389.5c-1-28.2-24.6-50.7-52.7-50.7-29.7 1.5-52.2 26.1-51.2 55.3 1 28.2 24.1 50.7 52.2 50.7h1c29.2-1.5 52.3-26.1 50.7-55.3zM439.3 84.9c-1 0-2.6-.5-4.1-.5H112.6l-5.1-34.3C104.4 27.6 85 10.7 62 10.7H20.5C9.2 10.7 0 19.9 0 31.2s9.2 20.5 20.5 20.5H62c2.6 0 4.6 2 5.1 4.6l31.7 216.1c4.1 27.1 27.6 47.6 55.3 47.6h213c26.6 0 49.7-18.9 55.3-45.1l33.3-166.4c2-10.8-5.1-21.5-16.4-23.6zm-193.9 99.9H218c0-5.8.2-11.7-.1-17.6-.4-6.7-.3-13.6-2.1-19.9-2.2-8-11.6-12.9-19.2-11-8.5 2.1-14.7 6.9-14.8 16.5-.1 32.1-.2 64.2 0 96.3.1 9.4 6.4 16.1 15.1 17.1 8.9 1 17.5-3.6 19.2-12.5 1.8-9.2 1.4-18.8 2-28.5-6.5-.7-10.9-1.1-16.4-1.7v-20.1H245v90.3c-8.5-.4-16.5-.8-28.3-1.4-37.5 15-66.8-17.2-65.1-51.6 1.4-28.5.1-57.1.4-85.7.3-27.5 22-48.3 48.9-47.4 21.4.7 40.8 16.9 44 39 1.9 12.2.5 24.9.5 38.2zm96.1 108c-15.2-25.5-30.9-51.8-46.5-78.1-.9.1-1.7.3-2.6.4v77.5h-27.9V110.8h26.8v75.5c1.2.4 2.4.8 3.7 1.2 12.5-25.7 25-51.5 37.6-77.4h30.1c-14.1 30.4-27.9 60.4-42.2 91.1 16.7 30 33.5 60.1 51 91.6h-30z'/%3E%3C/svg%3E") !important;
  }
`;

export const Input = styled.input`
  font-family: 'Charlevoix Pro', sans-serif;  
  width: 30px;
  color: #fff;
  border: 0;
  height: 50px;
  font-size: 16px;
  background-color: transparent;
  text-align: center;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const StepperPlus = styled.button`
  background: transparent;
  border: none;
  width: 20px;
  height: 30px;
  position: relative;
  cursor: pointer;
  &::before {
    position: absolute;
    width: 12px;
    height: 12px;
    -webkit-filter: invert(1);
    filter: invert(1);
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='451.847px' height='451.846px' viewBox='0 0 451.847 451.846' style='enable-background:new 0 0 451.847 451.846;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0 L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4 c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z'/%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
  }
`;

export const StepperMinus = styled.button`
  background: transparent;
  border: none;
  width: 20px;
  height: 30px;
  position: relative;
  cursor: pointer;
  &::before {
    position: absolute;
    width: 12px;
    height: 12px;
    -webkit-filter: invert(1);
    filter: invert(1);
    content: "";
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' version='1.1' id='Capa_1' x='0px' y='0px' width='451.847px' height='451.847px' viewBox='0 0 451.847 451.847' style='enable-background:new 0 0 451.847 451.847;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751 c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0 c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z'/%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3Cg%3E%3C/g%3E%3C/svg%3E");
  }
`;
