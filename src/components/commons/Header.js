import styled from "styled-components";
import { Link } from "react-router-dom";
import profilePicture from "../../assets/Imagens Teste/teste.jpeg";
import { IoChevronDownOutline } from "react-icons/io5";

export default function Header() {
    return (
        <Container>
            <Title>Linkr</Title>
            <AlignItems>
                <Icons>
                    <IoChevronDownOutline />
                </Icons>
                <Link>
                    <Photo src={profilePicture} />
                </Link>
            </AlignItems>
        </Container>
    );
};

const Container = styled.div`
    width: 100%;
    height: 72px;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 28px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
`;

const Title = styled.h3`
    color: #ffffff;
    font-size: 49px;
    font-weight: 700;
    font-family: var(--font-linkr);

    @media(max-width: 645px){
        font-size: 45px;
    }
`;

const AlignItems = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Photo = styled.img`
    width: 53px;
    height: 53px;
    border-radius: 50%;

    @media(max-width: 645px){
        width: 44px;
        height: 44px;
    }
`;

const Icons = styled.div`
    color: #ffffff;
    font-size: 30px;
    margin-right: 12px;

    @media(max-width: 645px){
        font-size: 26px;
    }
`;