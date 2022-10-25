import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import axios from "axios";

export default function Hashtags() {
    const { hashtags, setHashtags, setHashtagName, config, loading } = useContext(UserContext);
    const navigate = useNavigate();
    const URL_BASE = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const promise = axios.get(`${URL_BASE}/hashtags`, config);
        promise.then(res => {
            setHashtags(res.data);
        });
    }, [loading]);

    function isTagClicked(hashtag) {
        setHashtagName(hashtag.name);
        navigate(`/hashtag/${hashtag.name}`);
    }

    return (
        <>
            <Container>
                <Title>trending</Title>
                <Line></Line>
                <List>
                    {hashtags.map((hashtag, index) => (
                        <Item key={index} onClick={() => isTagClicked(hashtag)} ># {hashtag.name}</Item>
                    ))}
                </List>
            </Container>

        </>
    );
}

const Container = styled.div`
    background-color: #171717;
    width: 301px;
    height: 406px;
    border-radius: 16px;
    border: 1px solid #171717;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    margin-left: 25px;

    @media (max-width: 645px) {
        display: none;
    }
`;

const Title = styled.h5`
    color: #ffffff;
    font-size: 27px;
    font-weight: 700;
    font-family: var(--font-titles);
    margin: 16px 16px 12px 16px;

    @media (max-width: 645px) {
        display: none;
    }
`;

const Line = styled.div`
    width: 100%;
    border: 1px solid #484848;

    @media (max-width: 645px) {
        display: none;
    }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    margin: 22px 16px 30px 16px;

    @media (max-width: 645px) {
            display: none;
    }
`;

const Item = styled.h6`
    color: #ffffff;
    font-family: var(--font-body);
    font-style: normal;
    font-weight: 700;
    font-size: 19px;
    line-height: 22.8px;
    margin-bottom: 8px;
    cursor: pointer;

    @media (max-width: 645px) {
        display: none;
    }
`;

