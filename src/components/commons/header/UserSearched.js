import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";

export default function UserSearched({data}) {
    const navigate = useNavigate();

    function goToUser() {
        navigate(`/user/${data.id}`)
    }

    return (
        <Box onClick={goToUser}>
            <img src={data.pictureUrl} alt="fotinho"/>
            <p>{data.username}</p>
            {data.followerId ? <><Dot/><span>following</span></> : ''}
        </Box>
    );
}

const Box = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 5px;
    padding: 5px;
    font-size: 19px;
    font-weight: 400;
    font-family: var(--font-body);

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
        object-fit: cover;
    }

    p {
        color: #515151;
    }

    span {
        color: #C5C5C5;
    }

    &:hover {
        cursor: pointer;
        background-color: #d9d9d9;
    }
`;

const Dot = styled(GoPrimitiveDot)`
    color: #C5C5C5;
`;