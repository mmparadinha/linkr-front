import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import UserRegistration from "./signup";

export default function Login({setToken}) {

    const navigate = useNavigate();
    const [clicado, setClicado] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleForm(e) {
        e.preventDefault();
        const dados = {
            email,
            password,
        }

        const promise = axios.post(`${process.env.REACT_APP_BACK_END_URL}/`, dados);

        promise.then((res) => {
            restForm()
            navigate("/timeline")
            setToken(res.data.token)
        })
        promise.catch((err) => {
            alert('Não foi possível entar, verifique seu email ou a senha!')
        })
    }

    function restForm() {
        setEmail('');
        setPassword('');
    }

    function registryAccess() {
        if(!clicado) {
            return (
                <SignupComponents>
                <DescriptionComponents>
                    <div className="description">
                        <h1>linkr</h1>
                        <p>save, share and discover the best links on the web</p>
                    </div>
                </DescriptionComponents>
                <RegistrationData>
                    <form onSubmit={handleForm}>
                        <label>
                            <input 
                                id="formEmail"
                                type="text"
                                name='email'
                                placeholder="e-mail"
                                onChange={(e) => {setEmail(e.target.value)}}
                                value={email}
                                required
                            />
                        </label>
                        <label>
                            <input 
                                id="forPassword"
                                type="password"
                                name='password'
                                placeholder="password"
                                onChange={(e) => {setPassword(e.target.value)}}
                                value={password}
                                required
                            />
                        </label>
                        <button>Log In</button>
                        <p onClick={() => {
                                setClicado(true);
                            }}>First time? Create an account!</p>
                    </form>
                </RegistrationData>
                </SignupComponents>
            );
        }

        if(clicado) {
            return (
                <UserRegistration SignupComponents={SignupComponents} DescriptionComponents={DescriptionComponents} RegistrationData={RegistrationData} setClicado={setClicado} navigate={navigate}/>
            );
        }
    }

    return (
       <>
            {registryAccess()}
       </>
    );
}


const SignupComponents = styled.div`
    display: flex;
    flex-direction: row;

    @media(max-width: 500px){
        display: flex;
        flex-direction: column;
    }
`

const DescriptionComponents = styled.div`
    width: 60%;
    height: 100vh;
    background-color:  #151515;

    display: flex;
    flex-direction: column;
    padding-top: 12%;
    padding-left: 144px;

    color: white;

    h1 {
        font-size: 106px;
        font-family: 'Passion One';
    }

    p {
        width: 435px;
        font-size: 43px;
        font-family: 'Oswald';
        line-height: 64px;
    }

    @media(max-width: 950px) {
        width: 50%;
        padding-left: 35px;

        h1 {
            font-size: 80px;
        }

        p {
            width: 250px;
            font-size: 25px;
            line-height: 50px;
        }
    }


    @media(max-width: 500px){
        width: 100%;
        height: 175px;
        padding: 0 25%;
        padding-top: 10px;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
        position: fixed;

        .description {
            width: 238px;
        }

        h1 {
            width: 230px;
            font-size: 76px;

            display: flex;
            justify-content: center;
        }

        p {
            font-size: 23px;
            width: 230px;
            text-align: center;
            line-height: 34px;
        }
    }
`

const RegistrationData = styled.div`
    width: 30%;
    height: 100vh;
    background-color:  #333333;
    display: flex;
    flex-direction: column;
    justify-content: center;

    form {
        width: 10%;
        height: 90%;
        margin-top: 15px;
        padding: 0 15%;

        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    input {
        width: 429px;
        height: 65px;
        border: 0;
        border-radius: 6px;
        background-color: white;

        padding-left: 15px;
        margin-bottom: 15px;

        font-family: 'Oswald';
        font-size: 27px;
        color: #9F9F9F;
        font-weight: 700;
    }

    button {
        width: 429px;
        height: 65px;
        background-color: #1877F2;
        border: 0;
        border-radius: 6px;

        color: white;
        font-family: 'Oswald';
        font-size: 27px;
        font-weight: 700;

        margin-bottom: 20px;

        cursor: pointer;
    }

    p {
        width: 429px;
        color: white;
        font-size: 20px;
        font-family: 'Lato';

        display: flex;
        justify-content: center;

        text-decoration: underline;

        cursor: pointer;
    }

    @media(max-width: 1200px) {

        input {
            width: 325px;
            height: 65px;

            font-size: 30px;
        }
        button {
            width: 325px;
            height: 65px;

            font-size: 30px;
        }

        p {
            width: 330px;
            font-size: 19px;
        }
    }

    @media(max-width: 950px) {
        input {
            width: 300px;
            height: 55px;

            font-size: 25px;
        }

        button {
            width: 300px;
            height: 55px;

            font-size: 25px;
        }

        p {
            width: 330px;
            font-size: 17px;
        }
    }

    @media(max-width: 500px) {
        width: 100%;
        height: 600px;

        form {
            padding: 0 17%;
            margin-top: 65px;
            padding-top: 175px;
        }

        input {
            width: 330px;
            height: 55px;

            font-size: 22px;
        }

        button {
            width: 330px;
            height: 55px;

            font-size: 22px;
        }

        p {
            width: 330px;
            font-size: 17px;
        }

        @media(max-width: 414px) {
            form {
                padding: 0 10%;
                padding-top: 175px;
            }
        }
    }
`