import styled from "styled-components";
import {Link} from "react-router-dom";
import profilePicture from "../../assets/Imagens Teste/teste.jpeg";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import { DebounceInput } from "react-debounce-input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Header() {
    const navigate = useNavigate();
    const [searching, setSearching] = useState(false);
    const [search, setSearch] = useState('');
    const [searchResult, setSearchResult] = useState(false);


    function updateSearch(e) {
        setSearch(e.target.value);
    };

    function resetSearch() {
        setSearch('');
        setSearching(false);
    }

    function getSearch(e) {
        e.preventDefault();
        setSearching(true);
        console.log('pesquisei em!');
        if(0) {
            navigate('/pagina do muleque');
        } else {
            resetSearch();
        }
    };

    return (
        <>
            <Container>
                <Title onClick={() => console.log('bora pro home')}>linkr</Title>
                <DebounceInput
                        minLength={3}
                        debounceTimeout={300}
                        placeholder="testeDebounce"
                    />
                <SearchBox>
                    <SearchBar
                        minLength={3}
                        debounceTimeout={300}
                        placeholder="Search for people and friends"
                        disabled={searching}
                        required
                        type='text'
                        value={search}
                        onChange={updateSearch}
                    />
                    <SearchIcon onClick={getSearch}/>
                    <SearchResultBox>
                        <div>
                            <img src={profilePicture} alt="fotinho"/>
                            <p>resultado1</p>
                        </div>
                        <div>
                            <img src={profilePicture} alt="fotinho"/>
                            <p>resultado2</p>
                        </div>
                    </SearchResultBox>
                </SearchBox>
                <AlignItems>
                    <ProfileIcon onClick={() => console.log('abre menu')}/>
                    <Link>
                        <Photo src={profilePicture} />
                    </Link>
                </AlignItems>
            </Container>

            <SearchBoxMobile>
                <SearchBar
                    minLength={3}
                    debounceTimeout={300}
                    placeholder="Search for people and friends"
                    disabled={searching}
                    type='text'
                    value={search}
                    onChange={updateSearch}
                />
                <SearchIcon onClick={getSearch}/>
                <SearchResultBox>
                    <div>
                        <img src={profilePicture} alt="fotinho"/>
                        <p>resultado1</p>
                    </div>
                    <div>
                        <img src={profilePicture} alt="fotinho"/>
                        <p>resultado2</p>
                    </div>
                </SearchResultBox>
            </SearchBoxMobile>
        </>
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
`;

const Title = styled.h3`
    color: #ffffff;
    font-size: 49px;
    font-weight: 700;
    font-family: var(--font-linkr);
    letter-spacing: 3px;
    
    &:hover{
        cursor: pointer;
    }

    @media(max-width: 645px){
        font-size: 45px;
    }
`;

const SearchBox = styled.div`
    position: relative;
    width: 50%;

    @media(max-width: 645px){
        display: none;
    }
`;

const SearchBar = styled(DebounceInput)`
    width: 100%;
    height: 46px;
    border: none;
    border-radius: 8px;
    padding: 10px;
    font-size: 19px;
    font-weight: 400;
    color: #000000;
    font-family: var(--font-body);
    background-color: ${props => props.disabled ? '#E7E7E7' : '#FFFFFF'};;

    &::placeholder {
        color: #C6C6C6;
    }

    @media(max-width: 645px){
        font-size: 17px;
    }
`;

const SearchIcon = styled(IoSearchOutline)`
    font-size: 24px;
    position: absolute;
    top: 11px;
    right: 17px;
    color: #C6C6C6;

    &:hover{
        cursor: pointer;
    }
`;

const SearchResultBox = styled.div`
    background-color: #E7E7E7;
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    padding: 60px 10px 10px 10px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    font-size: 19px;
    font-weight: 400;
    font-family: var(--font-body);

    div {
        display: flex;
        align-items: center;
        color: #515151;
        gap: 12px;
    }

    img {
        width: 39px;
        height: 39px;
        border-radius: 50%;
    }

    @media(max-width: 645px){
        font-size: 17px;
    }
`;

const SearchBoxMobile = styled.div`
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 82px auto;
    position: relative;

    @media(min-width: 646px){
        display: none;
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
        width: 41px;
        height: 41px;
    }
`;

const ProfileIcon = styled(IoChevronDownOutline)`
    color: #ffffff;
    font-size: 30px;
    margin-right: 12px;

    &:hover{
        cursor: pointer;
    }

    @media(max-width: 645px){
        font-size: 26px;
    }
`;