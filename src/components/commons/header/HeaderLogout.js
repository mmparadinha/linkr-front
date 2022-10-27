import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import { useContext } from "react";

export default function Logout({setLogout}) {
    const navigate = useNavigate();
    const { setPosts } = useContext(UserContext)

    function logoutFunctionality(e) {
        e.preventDefault();
        setLogout(true);
        setPosts(null);
        localStorage.clear();
        navigate('/');
    }

    return (
        <LogoutComponents onClick={logoutFunctionality}>
            <p>Logout</p>
        </LogoutComponents>
    );
}

const LogoutComponents = styled.div`
    width: 150px;
    height: 43px;
    background-color: #171717;

    left: cal(90% - 10%);
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

        &:hover {
            cursor: pointer;
        }
    }
`