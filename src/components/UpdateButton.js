import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";
import update from "./../assets/update.png"
import UserContext from '../contexts/UserContext';
import useInterval from 'react-useinterval';

export default function UpdateButton({ newPosts }) {

    // lógica de timeline-update
    const { postID, count, setCount, config } = useContext(UserContext);

    async function countNewPosts() {

        const URL_BASE = 'https://back-linkr-projetao.herokuapp.com';

        try {
            const response = await axios.get(`${URL_BASE}/timeline/update?postId=${postID}`, config);
            setCount(response.data.count);
        } catch (error) {
            console.log(error.response);
        }
    };

    useInterval(countNewPosts, 15000);

    return (
        <Update onClick={newPosts} >
            <h1>{count} new posts, load more!</h1>
            <img alt="" src={update} />
        </Update>
    );
};

const Update = styled.div`

    width: 611px;
    height: 61px;
    background: #1877F2;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 17px;
    cursor: pointer;

    h1 {

    font-family: 'Lato';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 19px;
    color: #FFFFFF;

    };

    img {
        width: 22px;
        height: 16px;
        margin-left: 14px;
    }
    
`