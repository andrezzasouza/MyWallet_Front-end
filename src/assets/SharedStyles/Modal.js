import styled from "styled-components";

const Modal = styled.div`
  position: fixed;
  top: calc((100vh - 200px) / 2);
  left: calc((100vw - 597px) / 2);
  height: 200px;
  width: 597px;
  background-color: #550a73;
  color: #ffffff;
  opacity: 1;
  z-index: 130;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  h3 {
    text-align: center;
  }
  @media (max-width: 597px) {
    width: 95vw;
    height: auto;
    left: 2.5vw;
    padding: 0 15px 20px;
  }
`;

const TopSection = styled.div`
  font-family: "Raleway", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0 15px;
  width: 100%;
  h2 {
    width: 500px;
    font-weight: bold;
    font-size: 34px;
    line-height: 41px;
    overflow-wrap: break-word;
    margin: 0 5px 0 0;
    text-align: center;
  }
  p {
    font-size: 19.74px;
    cursor: pointer;
  }
  @media (max-width: 611px) {
    h2 {
      width: 350px;
      font-size: 26px;
      line-height: 30px;
    }
  } ;
`;

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  background-color: rgba(255, 255, 255, 0.6);
  z-index: 120;
`;

const ModalButtons = styled.div`
  margin-top: 25px;
  margin-bottom: 15px;
  button {
    font-family: "Raleway", sans-serif;
    width: 134px;
    height: 37px;
    border-radius: 5px;
    border: none;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    background-color: #550a73;
    color: #ffffff;
    cursor: pointer;
    @media (max-width: 400px) {
      width: 100px;
      font-size: 15px;
    }
  }
  .second {
    background-color: #ffffff;
    color: #550a73;
    margin-left: 27px;
    @media (max-width: 400px) {
      margin-left: 10px;
    }
  }
`;

export {
  Modal,
  ModalBackground,
  ModalButtons,
  TopSection
}