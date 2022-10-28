import styled from 'styled-components';
import axios from 'axios';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';


export default function Likes({ postId }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);
  const [likesNames, setLikesNames] = useState([]);

  const URL_BASE = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const token = localStorage.getItem('linkr-token');
        const config = { headers: { Authorization: `Bearer ${token}` } }

        const promise = axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/likes/${postId}`,
            config
        );

        promise.then((res) => {
            if (res.data.length > 0) {
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
        });
    
        promise.catch((err) => {
            // alert("An error has occurred");
        });

        getLikesNumber();
        getLikesNames();
    }, []);

    function toggleLike() {
        const token = localStorage.getItem('linkr-token');
        const config = { headers: {"authorization": `Bearer ${token}` }}
        
        const promise = axios.post(
            `${process.env.REACT_APP_API_BASE_URL}/likes/${postId}`,
            {},
            config
        );

        promise.then((response) => {
            setIsLiked(!isLiked);
            getLikesNumber();
            getLikesNames();
        });

        promise.catch((err) => {
            alert("Não foi possível interagir com o post");
        });
    }

    function getLikesNumber() {
        const promise = axios.get(
            `${URL_BASE}/likes/count/${postId}`
        );
        
        promise.then((res) => {
            setLikesNumber(Number(res.data.count));
          });
      
        promise.catch((err) => {
            // alert("An error has occurred");
        });
    }

    function getLikesNames() {
        const token = localStorage.getItem('linkr-token');
        const config = { headers: { Authorization: `Bearer ${token}` } }

        const promise = axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/likes/names/${postId}`,
            config
        );

        promise.then((res) => {
            console.log(res.data);
            setLikesNames(res.data.map((name) => name.username));
        });
      
        promise.catch((err) => {
            //alert("An error has occurred on like's names");
        });
    }

    return (
        <>
            { isLiked ? <AllFillHeartedLike onClick={toggleLike} /> 
            : 
            <FiHeartedLike onClick={toggleLike} />}
            
            <a data-tip data-for={`${postId}`}>  
                <LikesQuantity>{likesNumber} likes</LikesQuantity>
            </a>

            {/* <ReactTooltip id="likes-tooltip" place="bottom" type="light">
                <p>...</p>
            </ReactTooltip> */}

            { isLiked ? (
            <ReactTooltip id={`${postId}`} place="bottom" type="light">
                {/* <p>eu curti isso kk</p> */}
                Você
                {likesNames.length > 0
                ? `, ${likesNames[0]} e outras ${likesNumber - 2} pessoas curtiram isso`
                : ` curtiu isso`}
            </ReactTooltip>
            ) : (
            <ReactTooltip id={`${postId}`} place="bottom" type="light">
                {/* <p>credo eu curti não</p> */}
                {likesNames.length > 1
                ? `${likesNames[0]}, ${likesNames[1]} e outras ${likesNumber - 2} pessoas curtiram isso`
                : likesNames.length === 1
                ? `${likesNames[0]} curtiu isso`
                : "Ninguém curtiu isso ainda"}
            </ReactTooltip>
            ) }
        </>
    );
}

const FiHeartedLike = styled(AiOutlineHeart)`
    margin: 20px 0 6px 0;
    width: 22px;
    height: 22px;
    color: white;
    cursor: pointer;
`;

const AllFillHeartedLike = styled(AiFillHeart)`
    margin: 20px 0 6px 0;
    width: 22px;
    height: 22px;
    color: red;
    cursor: pointer;
`;

const LikesQuantity = styled.p`
    font-size: 12px;
    color: white;
    cursor: default;
`