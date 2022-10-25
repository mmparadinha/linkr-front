import styled from "styled-components";
import axios from "axios";
import Header from "./commons/header/Header";
import NewPosts from "./Post";
import {useContext, useEffect} from 'react';
import UserContext from '../contexts/UserContext';
import Hashtags from "./Hashtags";
import {useParams} from 'react-router-dom';
import Loading from "./commons/Loading";

export default function HashtagPage(){
    const {hashtagName, hashtagPosts, setHashtagPosts, config, setHashtagName} = useContext(UserContext);
    const {hashtag} = useParams();

    useEffect(() => {
        if(hashtagName !== ''){
            const promise = axios.get(`${process.env.REACT_APP_BACK_END_URL}/hashtag/${hashtagName}`, config);
            promise.then(res => {
                setHashtagPosts(res.data);
            });
        }
    }, [hashtagName]);

    useEffect(() => {
        setHashtagName(hashtag);
    }, []);

    return (
        <>
            <Header>
                {Header}
            </Header>
            <Body>
                <Title># {hashtagName}</Title>
                <Container>
                    <AlignBox>
                        {hashtagPosts.length === 0 ? <Loading />
                            :
                            <>
                                {hashtagPosts.map((a, index) => <NewPosts key={index} userId={a.userId} photo={a.pictureUrl} username={a.username} comment={a.comment} url={a.url} urlTitle={a.urlTitle} urlImage={a.urlImage} urlDescription={a.urlDescription} />)}
                            </>
                        }
                    </AlignBox>
                    <Hashtags />
                </Container>
            </Body>

        </>
    );
};

const Body = styled.div`
	width: 931px;
    display: flex;
    flex-direction: column;
    margin: 150px auto 30px auto;
    box-sizing: border-box;

    @media (max-width: 645px) {
        width: 100%;
        margin: 99px 0 20px 0;
    }
`;

const Container = styled.div`
    width: 937px;
    display: flex;
    justify-content: flex-start;

    h1 {
    color: #ffffff;
    font-size: 27px;
    font-weight: 700;
    font-family: var(--font-titles);
    };

    @media (max-width: 645px) {
        width: 100%;
    }
    h1{
        font-size: 17px;
        font-family: var(--font-body);
    }
`;

const Title = styled.h5`
    color: #ffffff;
    font-size: 43px;
    font-weight: 700;
    font-family: var(--font-titles);
    margin-bottom: 43px;

    @media (max-width: 645px) {
        font-size: 33px;
        margin-left: 17px;
        margin-bottom: 19px;
    }
`;

const Publish = styled.div`
    height: 209px;
    width: 611px;
    display: flex;
    border-radius: 16px;
    margin-bottom: 48px;
    padding-top: 18px;
    padding-left: 16px;
    background-color: white;
    box-sizing: border-box;

    @media (max-width: 645px) {
        width: 100%;
        height: 164px;
        border: none;
        border-radius: 0px;
        padding: 0px;
        margin-bottom: 16px;
        position: relative; 
    }
`;

const Photo = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 50%;

    @media(max-width: 645px){
        display: none;
    }
`;

const PublishContent = styled.div`
    padding-top: 10px;
    padding-left: 18px;
    font-family: var(--font-body);
    font-size: 20px;
    font-weight: 300;
    letter-spacing: 0em;
    text-align: left;
    color: #707070;

    @media (max-width: 645px) {
        width: 100%;
        padding: 15px;
        font-size: 17px;
        display: flex;
        flex-direction: column;  

        p{
            text-align: center;
        }
    }
`;

const Input1 = styled.input`        
        height: 30px;
        width: 503px;
        background: #EFEFEF;
        margin-top: 10px;        
        padding-left: 5px;

        border-radius: 5px;
        border-style: none none solid;
        border-width: 1px;
        border-color: #000 #000 hsla(0, 0%, 100%, 0.7);
             
        box-sizing: border-box;
        cursor: pointer;

        ::placeholder {
            font-family: var(--font-body);
            font-size: 15px;
            font-weight: 300;
            line-height: 18px;
            letter-spacing: 0em;
            text-align: left;
            padding-left: 13px;
            color: #949494;        
        }

        &:disabled{
            opacity: 0.7;
        }

    @media (max-width: 645px) {
        width: 100%;
        height: 30px;

        ::placeholder {
            font-size: 13px;
        }
    }
`;

const Input2 = styled.input`
    height: 66px;
    width: 503px;
    background: #EFEFEF;
    margin-top: 5px;    
    padding-left: 5px;

    border-radius: 5px;
    border-style: none none solid;
    border-width: 1px;
    border-color: #000 #000 hsla(0, 0%, 100%, 0.7);
        
    box-sizing: border-box;
    cursor: pointer;

    ::placeholder {
        font-family: var(--font-body);
        font-size: 15px;
        font-weight: 300;
        line-height: 18px;
        letter-spacing: 0em;
        text-align: left;
        padding-left: 13px;
        color: #949494;        
    }

    &:disabled{
        opacity: 0.7;
    }

    @media (max-width: 645px) {
        width: 100%;
        height: 47px;

        ::placeholder {
            font-size: 13px;
        }
    }
`;

const Button1 = styled.button`
        display: flex;
        width: 112px;
        height: 31px;
        background: #1877F2;
        border-radius: 5px;

        font-family: var(--font-body);
        font-size: 14px;
        font-weight: 700;
        line-height: 17px;
        letter-spacing: 0em;
        text-align: left;
        color: #FFFFFF;

        margin-top: 5px;
        margin-left: 391px;
        box-sizing: border-box;
        cursor: pointer;
        text-align: center;
        align-items: center;
        justify-content: center;

        border-style: solid;
        border-width: 1px;
        border-color: #1877F2;

        &:disabled{
            opacity: 0.7;
        }

    @media (max-width: 645px) {
        margin-left: 0;
        height: 22px;
        position: absolute;
        bottom: 12px;
        right: 15px;
    }
`;

const AlignBox = styled.div`
    width: 611px;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;

    @media (max-width: 645px) {
        width: 100%;
    }
`;