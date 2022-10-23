import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ReactTagify } from "react-tagify";

export default function NewPosts({ userId, photo, username, comment, url, urlTitle, urlImage, urlDescription }) {
    const navigate = useNavigate();

    function isTagClicked(tag) {
        const hashtag = tag.replace("#", "");
        setHashtagName(hashtag);
        navigate(`/hashtag/${hashtag}`);
    }

    return (
        <Post >
            <Left>
                <Link to={`/user/${userId}`}>
                    <Photo src={photo} />
                </Link>
                <Like></Like>
            </Left>
            <PostInfo>
                <Link to={`/user/${userId}`}>
                    <h1>{username}</h1>
                </Link>
                <ReactTagify colors={'#ffffff'} tagClicked={(tag => { isTagClicked(tag) })}>
                    <h2>{comment}</h2>
                </ReactTagify>
                <a href={url} target="_blank" rel="noreferrer">
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
    width: 611px;
    display: flex;
    border-radius: 16px;
    margin-bottom: 16px;
    padding: 18px;
    background-color: #171717;
    box-sizing: border-box;

    a {
        background-color: blue;
        height: 53px;
    }

    @media (max-width: 645px) {
        width: 100%;
        border-radius: 0;
        padding: 15px;
        padding-top: 9px;
    }
`;

const Left = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Like = styled(FiHeart)`
    margin-top: 20px;
    width: 20px;
    height: 20px;
    color: white;
    cursor: pointer;
`;

const Photo = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 50%;

    @media(max-width: 645px){
        width: 40px;
        height: 40px;
    }
`;

const PostInfo = styled.div`
    margin-left: 18px;

    h1 {
        width: 502px;
        height: 23px;
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 19px;
        line-height: 23px;      
        color: #FFFFFF;
        margin-bottom: 8px;
    }

    h2 {
        width: 502px;
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 17px;
        line-height: 20px;
        color: #B7B7B7;
        margin-bottom: 8px;
    }

    @media (max-width: 645px) {
        margin-left: 14px;
        width: 100%;
        h1{
            font-size: 17px;
            margin-bottom: 7px;
            width: 100%;
        }
        h2{
            font-size: 15px;
            margin-bottom: 13px;
            width: 100%;
        }
    }
`;

const Linkr = styled.div`
    display: flex;
    width: 503px;
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
            font-family: 'Lato', sans-serif;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #CECECE;
            margin-bottom: 20px;
            word-break: normal;
        }

        h2 {
            width: 302.82px;
            font-family: 'Lato', sans-serif;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            color: #9B9595;
            word-break: normal;
        }

        h3 {
            font-family: 'Lato', sans-serif;
            font-weight: 400;
            font-size: 11px;
            line-height: 13px;
            color: #CECECE;
            word-break: break-all;
        }
    };

    img {
        width: 154px;
        height: 154px;
        border-radius: 0px 11px 11px 0px;
        margin-left: 26px;
    };

    @media (max-width: 645px) {
        width: 100%;
        padding-top: 0;
        padding-left: 11px;

        text{
            margin: 0;
            width: 100%;

            h1 {
            font-size: 11px;
            margin: 0;
            margin-bottom: 12px;
            margin-top: 7px;
            width: 100%;
            };

            h2{
                font-size: 8px;
                margin: 0;
                margin-bottom: 4px;
                width: 100%;
            };

            h3{
                font-size: 9px;
                margin: 0;
                width: 100%;
                margin-bottom: 4px;
            };
        }

        img{
            width: 95px;
            height: 115px;
            margin: 0;
        };
    };

    @media (max-width: 350px) {
        img{
            display: none;
        }
    }
`;