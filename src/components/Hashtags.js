import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import UserContext from '../contexts/UserContext';
import axios from "axios";
import Header from "./commons/header/Header";

export default function Hashtags(){
    const {hashtags, setHashtags} = useContext(UserContext);

    useEffect(() => {
        const promise = axios.get('https://back-linkr-projetao.herokuapp.com/hashtags');
        promise.then(res => {
            setHashtags('javascript');
        });
    }, []);

    return(
        <>
            <Container>
                <Title>trending</Title>
                <Line></Line>
                <List>
                    {hashtags.map((hashtag, index) => (
                        <Link to={`/hashtag/${hashtag.name}`}>
                            <Item index={index}># {hashtag.name}</Item>
                        </Link>
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

    @media (max-width: 800px) {
        display: none;
    }
`;

const Title = styled.h5`
    color: #ffffff;
    font-size: 27px;
    font-weight: 700;
    font-family: var(--font-titles);
    margin: 16px 16px 12px 16px;

    @media (max-width: 800px) {
        display: none;
    }
`;

const Line = styled.div`
    width: 100%;
    border: 1px solid #484848;

    @media (max-width: 800px) {
        display: none;
    }
`;

const List = styled.div`
    display: flex;
    flex-direction: column;
    margin: 22px 16px 30px 16px;

    @media (max-width: 800px) {
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

    @media (max-width: 800px) {
        display: none;
    }
`;

