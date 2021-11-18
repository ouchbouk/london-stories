import styled from "styled-components";

export const Nav = styled.nav`
  @keyframes moveDown {
    0% {
      opacity: 0;
      transform: translateY(-1rem);
    }

    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }

  display: flex;
  text-decoration: none;
  background-color: transparent;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 6rem;
  gap: 3rem;
  height: 4.6rem;
  width: 100%;
  margin-top: 1rem;
  position: relative;
  z-index: 100;
  animation: moveDown 1s;

  @media (max-width: 1040px) {
    flex-direction: column;
    margin-bottom: ${(props) => (props.collapsed ? "50rem" : "0")};
    padding: 1.4rem 0;
    gap: 0;
    background-color: ${(props) =>
      props.theme === "white" && props.collapsed ? "#065f46" : "transparent"};
    margin: 0;
  }

  .brand {
    text-decoration: none;
    font-size: 2rem;
    color: ${(props) => (props.theme === "white" ? "white" : "#065f46")};
    font-weight: 800;
    text-transform: uppercase;
    margin-right: 2rem;
    white-space: nowrap;
    letter-spacing: 1.1px;

    @media (max-width: 1040px) {
      margin-bottom: ${(props) => (props.theme === "white" ? "0" : "2rem")};
    }
  }

  .brand:hover,
  .brand:active {
    color: ${(props) => (props.theme === "white" ? "white" : "#10b981")};
  }

  .nav-links {
    display: flex;
    justify-content: space-between;
    gap: 2.6rem;
    align-items: center;
    transition: all 0.3s;

    @media (max-width: 1040px) {
      width: 100%;
      flex-direction: column;
      background-color: inherit;
      width: 100%;
      background-color: #065f46;
      padding: 2rem 0;
      display: ${(props) => (props.collapsed ? "" : "none")};
      font-size: 2rem;
    }
  }

  .link {
    text-decoration: none;
    color: ${(props) => (props.theme === "white" ? "white" : "#065f46")};
    white-space: nowrap;
    font-weight: 700;
    letter-spacing: 1.1px;
    text-transform: uppercase;
    border: none;
    @media (max-width: 1040px) {
      color: white;
    }
  }

  .link:hover {
    color: #10b981;
    color: ${(props) => (props.theme === "white" ? "white" : "#10b981")};

    @media (max-width: 1040px) {
      color: #a7f3d0;
    }
  }

  .auth-btn {
    background-color: ${(props) =>
      props.theme === "white" ? "white" : "#065f46"};
    padding: 9px 18px;
    color: ${(props) => (props.theme === "white" ? "#065f46" : "white")};
    border-radius: 100px;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2);

    @media (max-width: 1040px) {
      color: #065f46;
      background-color: white;
      font-size: 2rem;
    }
  }

  .auth-btn:hover {
    color: ${(props) => (props.theme === "white" ? " #10b981" : "white")};
    background-color: ${(props) => (props.theme === "white" ? "" : " #064E3B")};

    @media (max-width: 1040px) {
      color: #10b981;
      background-color: white;
    }
  }

  .sign-up-btn {
    padding: 8px 16px;
    color: ${(props) => (props.theme === "white" ? "#065f46" : "white")};
    background-color: ${(props) =>
      props.theme === "white" ? "white" : "#065f46"};
    border-radius: 100px;
    box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.3);

    @media (max-width: 1040px) {
      color: #065f46;
      background-color: white;
      font-size: 2rem;
    }
  }

  .sign-up-btn:hover {
    color: ${(props) => (props.theme === "white" ? " #10b981" : "white")};
    background-color: ${(props) => (props.theme === "white" ? "" : " #064E3B")};

    @media (max-width: 1040px) {
      color: #10b981;
      background-color: white;
    }
  }

  .auth-btns {
    display: flex;
    align-items: center;
    gap: 2rem;
    text-align: center;
    white-space: nowrap;
    transition: all 0.3s;
    @media (max-width: 1040px) {
      flex-direction: column;
      background-color: #065f46;
      width: 100%;
      padding: 2rem 0;
      opacity: ${(props) => (props.collapsed ? "1" : "0")};
      display: ${(props) => (props.collapsed ? "" : "none")};
    }
  }

  .menu-btn {
    display: none;
    color: ${(props) => (props.theme === "white" ? "white" : "#065f46")};
    font-size: 4rem;
    cursor: pointer;

    @media (max-width: 1040px) {
      display: block;
      position: absolute;
      right: 2rem;
      top: 0.1rem;
    }
  }

  .nav-links-collapsed {
    display: flex;
    height: 0;
    flex-direction: column;
    gap: 2;
    top: 4.6rem;
    background-color: #e5e7eb;
    padding: 2rem;
    width: 100%;
    border-bottom: 1px solid #d1d5db;
    transition: all 300ms;
    display: none;
  }
`;
