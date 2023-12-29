import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store/index";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import NotAvailable from "../components/NotAvailable";
import SelectGenre from "../components/SelectGenre";

export default function Movies() {

    // const navigate = useNavigate();

    // Состояние для отслеживания прокрутки страницы
    const [isScrolled, setIsScrolled] = useState(false);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);
    const genres = useSelector((state) => state.netflix.genres);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    },[]);

    useEffect(() => {
        if(genresLoaded) dispatch(fetchMovies({type: "movies"}));

    },[genresLoaded]);

    // Обработчик события прокрутки страницы
    window.onscroll = () => {
        // Устанавливаем состояние isScrolled в зависимости от того, находится ли страница в верхней части (не прокручена)
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        
        // Очищаем обработчик события прокрутки после использования (предотвращает утечку памяти)
        return () => (window.onscroll = null);
    }

    // Обработчик изменения состояния аутентификации
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        // if(currentUser) navigate("/"); // Перенаправление на главную страницу, если пользователь уже аутентифицирован
    })

    return (
        <Container>
            <div className="navbar">
                <Navbar isScrolled={isScrolled} />
            </div>
            <div className="data">
                <SelectGenre genres={genres} type="movie" />
                {
                    movies.length ? <Slider movies={movies} /> :
                    <NotAvailable />
                }
            </div>
        </Container>
    )
}

const Container = styled.div`
    .data {
        margin-top: 8rem;
        .not-available {
            text-alighn: center;
            color: #fff;
            margin-top: 4rem;
        }
    }
`;