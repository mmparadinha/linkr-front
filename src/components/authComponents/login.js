import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserRegistration from "./signup";
import UserContext from "../../contexts/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const [clicado, setClicado] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserToken, setUserId, setPicture } = useContext(UserContext);

  const URL_BASE = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    if (
      localStorage.getItem("linkr-token") !== null &&
      localStorage.getItem("linkr-pictureUrl") !== null &&
      localStorage.getItem("linkr-username") !== null &&
      localStorage.getItem("linkr-userId") !== null
    ) {
      navigate("/timeline");
    }
  }, [navigate]);

  function handleForm(e) {
    e.preventDefault();
    const dados = {
      email,
      password,
    };

    const promise = axios.post(`${URL_BASE}/`, dados);

    promise.then((res) => {
      resetForm();
      //persistência de login
      localStorage.setItem("linkr-token", res.data.token);
      localStorage.setItem("linkr-pictureUrl", res.data.pictureUrl);
      localStorage.setItem("linkr-username", res.data.username);
      localStorage.setItem("linkr-userId", res.data.userId);
      //forçando recarregamento do /App
      setUserToken(localStorage.getItem("linkr-token") || null);
      setUserId(localStorage.getItem("linkr-userId") || null);
      setPicture(localStorage.getItem("linkr-pictureUrl") || null);
      navigate("/timeline");
    });
    promise.catch((err) => {
      alert("Não foi possível entrar, verifique seu email ou a senha!");
    });
  }

  function resetForm() {
    setEmail("");
    setPassword("");
  }

  function registryAccess() {
    if (!clicado) {
      return (
        <SignupComponents>
          <DescriptionComponents>
            <div className="description">
              <h1>linkr</h1>
              <p>
                save, share and discover <br /> the best links on the web
              </p>
            </div>
          </DescriptionComponents>
          <RegistrationData>
            <form onSubmit={handleForm}>
              <label>
                <input
                  id="formEmail"
                  type="text"
                  name="email"
                  placeholder="e-mail"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </label>
              <label>
                <input
                  id="forPassword"
                  type="password"
                  name="password"
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                />
              </label>
              <button>Log In</button>
              <p onClick={() => setClicado(true)}>
                First time? Create an account!
              </p>
            </form>
          </RegistrationData>
        </SignupComponents>
      );
    }

    if (clicado) {
      return (
        <UserRegistration
          SignupComponents={SignupComponents}
          DescriptionComponents={DescriptionComponents}
          RegistrationData={RegistrationData}
          setClicado={setClicado}
          navigate={navigate}
        />
      );
    }
  }

  return <>{registryAccess()}</>;
}

const SignupComponents = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 645px) {
    flex-direction: column;
  }
`;

const DescriptionComponents = styled.div`
  width: 65vw;
  height: 100vh;
  background-color: #151515;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  h1 {
    font-size: 106px;
    font-family: "Passion One";
  }
  p {
    width: 435px;
    font-size: 43px;
    font-family: "Oswald";
    line-height: 64px;
    font-weight: 400;
  }
  @media (max-width: 950px) {
    width: 50%;
    h1 {
      font-size: 80px;
    }
    p {
      width: 250px;
      font-size: 25px;
      line-height: 50px;
    }
  }
  @media (max-width: 645px) {
    width: 100%;
    height: 175px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    position: fixed;
    .description {
      width: 100%;
      font-size: 23px;
      line-height: 34.09px;
      text-align: center;
    }
    h1 {
      width: 100%;
      font-size: 76px;
      line-height: 83.86px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    @media (max-width: 645px) {
      width: 100%;
      height: 175px;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      position: fixed;
      .description {
        width: 100%;
        font-size: 23px;
        text-align: center;
      }
      h1 {
        width: 100%;
        font-size: 76px;
        line-height: 83.86px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      p {
        font-size: 23px;
        width: 100%;
        text-align: center;
        line-height: 25px;
      }
    }
  }
`;

const RegistrationData = styled.div`
  width: 35vw;
  background-color: #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  input {
    width: 100%;
    height: 65px;
    border: 0;
    border-radius: 6px;
    background-color: white;
    padding-left: 15px;
    margin-bottom: 15px;
    font-family: "Oswald";
    font-size: 27px;
    color: #9f9f9f;
    font-weight: 700;
  }
  button {
    width: 100%;
    height: 65px;
    background-color: #1877f2;
    border: 0;
    border-radius: 6px;
    color: white;
    font-family: "Oswald";
    font-size: 27px;
    font-weight: 700;
    margin-bottom: 20px;
    cursor: pointer;
  }
  p {
    width: 100%;
    color: white;
    font-size: 20px;
    font-family: "Lato";
    font-weight: 400;
    display: flex;
    justify-content: center;
    text-decoration: underline;
    cursor: pointer;
  }
  @media (max-width: 950px) {
    width: 50vw;
    input {
      height: 45px;
      font-size: 18px;
    }
    button {
      height: 45px;
      font-size: 18px;
    }
    p {
      font-size: 14px;
    }
  }
  @media (max-width: 645px) {
    width: 100%;
    margin-top: 215px;
    padding: 20px;
    input {
      width: 100%;
      height: 55px;
      font-size: 22px;
    }
    button {
      width: 100%;
      height: 55px;
      font-size: 22px;
    }
    p {
      width: 100%;
      font-size: 17px;
      line-height: 20.4px;
    }
  }
`;