import React, { useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import AnimeList from "../components/AnimeList";
import NotAvailable from "../components/NotAvailable";

export default function Search() {
    const [isScrolled, setIsScrolled] = useState(false);
    const searchResults = useSelector((state) => state.anime.searchResults); 

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        return () => (window.onscroll = null);
    }
    return (
        <Container>
            <Navbar isScrolled={isScrolled} />
            {
                searchResults && searchResults.length ? (
                    <AnimeList title={"Результаты Поика"} data={searchResults} />
                ) : (
                    <NotAvailable />
                )
            }
        </Container>
    )
}

const Container = styled.div`

`;