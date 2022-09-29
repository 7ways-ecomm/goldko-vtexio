import styled from "styled-components"

export const Container = styled.div`
  &.product-page {
    height: 100%;
    display: flex;
    align-items: center;
    .goldko-goldko-theme-1-x-buttonDataContainer {
      font-size: 1rem;
        &::after {
          width: 20px;
          height: 20px;
        }
    }
  }
  .goldko-goldko-theme-1-x-buttonDataContainer {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;

      font-size: 13px;
      font-weight: 600;
      color: #fff;
      &::after {
          width: 16px;
          height: 16px;
          content: "";
          display: block;
          background-size: contain;
          background-image: url(${({ minicartIcon }) => minicartIcon});
          background-repeat: no-repeat;
          background-position: 50%;
      }
    }
`