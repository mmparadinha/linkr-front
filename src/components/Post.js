import styled from "styled-components";
import { Link } from "react-router-dom";

export default function NewPosts({ photo, username, comment, url, urlTitle, urlImage, urlDescription }) {

    return (
        <Post >
            <Photo src={photo} />
            <PostInfo>
                <h1>{username}</h1>
                <h2>{comment}</h2>
                <a href={url} target="_blank">
                    <Linkr>
                        <text>
                            <h1>{urlTitle}</h1>
                            <h2>{urlDescription}</h2>
                            <h3>{url}</h3>
                        </text>
                        <img alt="" src={urlImage} />
                    </Linkr>
                </a>
            </PostInfo>
        </Post>
    );
};

const Post = styled.div`
    height: 276px;
    width: 611px;
    display: flex;
    border-radius: 16px;
    margin-bottom: 16px;    
    padding-top: 18px;
    padding-left: 16px;
    background-color: #171717;
    box-sizing: border-box;
`

const Photo = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 50%;

    @media(max-width: 500px){
        width: 44px;
        height: 44px;
    }
`;

const PostInfo = styled.div`

    margin-left: 18px;

    h1 {
        width: 502px;
        height: 23px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;      
        color: #FFFFFF;
        margin-bottom: 8px;
    }

    h2 {
        width: 502px;
        height: 52px;
        font-family: 'Lato';
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
    }

`

const Linkr = styled.div`
    display: flex;
    width: 503px;
    height: 155px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    cursor: pointer;

    text {
        display: flex;
        flex-direction: column;
        margin-top: 15px;        
        margin-left: 19px;
        text-align: left;

        h1 {
            width: 249.98px;
            font-family: 'Lato';
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #CECECE;
            margin-bottom: 20px;
        }

        h2 {
            width: 302.82px;
            font-family: 'Lato';
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            color: #9B9595;
        }

        h3 {
            font-family: 'Lato';
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            color: #CECECE;
        }
    };

    img {
        width: 154px;
        height: 154px;
        border-radius: 0px 11px 11px 0px;
        margin-left: 26px;
    };
`