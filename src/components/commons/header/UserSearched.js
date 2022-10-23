import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function UserSearched({data}) {
    const navigate = useNavigate();

    function goToUser() {
        navigate(`/user/${data.id}`)
    }

    return (
        <Box onClick={goToUser}>
            <img src={data.pictureUrl} alt="fotinho"/>
            <p>{data.username}</p>
        </Box>
    );
}

const Box = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 5px;
    padding: 5px;

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }

    p {
        font-size: 19px;
        color: #515151;
        font-weight: 400;
        font-family: var(--font-body);
    }

    &:hover {
        cursor: pointer;
        background-color: #d9d9d9;
    }
`;