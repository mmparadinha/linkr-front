import styled from "styled-components";
import { Link } from "react-router-dom";

export default function UserSearched({data}) {
    return (
        <Box>
            <Link>
                <img src={data.profilePicture} alt="fotinho"/>
                <p>resultado1</p>
            </Link>
        </Box>
    );
};

const Box = styled.div`
    display: flex;
    align-items: center;
    color: #515151;
    gap: 12px;

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }
`;