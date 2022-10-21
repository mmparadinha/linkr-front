import styled from "styled-components";
import { Link, useNavigate } from 'react-router-dom';
import {useContext, useEffect, useState} from 'react';
import UserContext from '../contexts/UserContext';
import axios from "axios";
import Header from "./commons/Header.js";
import Hashtags from "./Hashtags";

export default function HashtagPage(){

    return(
        <>
            <Header />
            <Container>
                <Title># hashtag</Title>
                <Post>
                    <Picture />
                    <ContentBox>
                        <Name>Juvenal Juvêncio</Name>
                        <Text>Muito maneiro!</Text>
                    </ContentBox>
                </Post>
            </Container>
            <Hashtags />
        </>
    );
}

const Container = styled.div`
    width: 611px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const Title = styled.h5`
    color: #ffffff;
    font-size: 43px;
    font-weight: 700;
    font-family: var(--font-titles);
    margin-bottom: 41px;

    @media (max-width: 800px) {
        display: none;
    }
`;

const Post = styled.div`
    width: 100%;
    height: 276px;
    background-color: #171717;
    border-radius: 16px;
    border: 1px solid #171717;
    display: flex;
    flex-direction: center;
    align-items: center;
    margin-bottom: 16px;
    position: relative;
`;

const Picture = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    position: absolute;
    top: 17px;
    left: 18px;
`;

const Name = styled.h4`
    color: #ffffff;
    font-family: var(--font-body);
    font-size: 19px;
    font-weight: 400;
    line-height: 22.8px;
`;

const Text = styled.h4`
    color: #b7b7b7;
    font-family: var(--font-body);
    font-size: 17px;
    font-weight: 400;
    line-height: 20.4px;
    width: 502px;
    word-break: normal;
`;

