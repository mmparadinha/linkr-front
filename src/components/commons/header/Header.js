import styled from "styled-components";
import {Link} from "react-router-dom";
import profilePicture from "../../../assets/Imagens Teste/teste.jpeg";
import { IoChevronDownOutline, IoSearchOutline } from "react-icons/io5";
import { DebounceInput } from "react-debounce-input";
import { useContext, useState } from "react";
import SearchResultsBox from "./SearchResultsBox.js";
import { getSearchedUsers } from "../../../services/linkr";
import SearchContext from "../../../contexts/SearchContext.js";

export default function Header() {
    const [searching, setSearching] = useState(false);
    const [searchBox, setSearchBox] = useState(false);
    const {search, setSearch} = useContext(SearchContext);

    function getSearch(e) {
        setSearching(true);
        setSearchBox(true);
        getSearchedUsers(e.target.value)
            .then(res => {
                setSearch(res.data);
                setSearching(false);
            })
            .catch(error => console.log(error));
    };

    return (
        <>
            <Container>
                <Title onClick={() => console.log('bora pro home')}>linkr</Title>
                <SearchBox>
                    <SearchBar
                        minLength={3}
                        debounceTimeout={300}
                        placeholder="Search for people and friends"
                        disabled={searching}
                        type='text'
                        onChange={getSearch}
                    />
                    <SearchIcon onClick={getSearch}/>
                    {searchBox ? <SearchResultsBox/> : ''}
                </SearchBox>
                <AlignItems>
                    <ProfileIcon onClick={() => console.log('menuzinho de logout da Rosa')}/>
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
                    onChange={getSearch}
                />
                <SearchIcon onClick={getSearch}/>
                {search ? <SearchResultsBox/> : ''}
            </SearchBoxMobile>
        </>
    );
}

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
    z-index: 1;
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
