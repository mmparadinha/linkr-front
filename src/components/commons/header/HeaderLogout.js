import styled from "styled-components";
import { Link } from "react-router-dom";

export default function Logout({setLogout}) {

    function logoutFunctionality(e) {
        e.preventDefault();
        setLogout(true);
        localStorage.clear();
    }

    return (
        <LogoutComponents onClick={logoutFunctionality}>
            <Link to={'/'}>
                <p>Logout</p>
            </Link>
        </LogoutComponents>
    );
}

const LogoutComponents = styled.div`
    width: 150px;
    height: 43px;
    background-color: #171717;

    left: cal(80% - 10%);
    top: 72px;
    position: absolute;

    display: flex;
    align-items: center;
    justify-content: center;

    border-radius: 0px 0px 0px 20px;

    p {
        color: white;
        font-family: 'Lato';
        font-weight: 700;
    }


`