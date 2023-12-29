import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import backgroundImage from '../assets/home.jpg';
import MovieLogo from '../assets/homeTitle.webp';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchMovies, getGenres } from "../store/index";
import Slider from "../components/Slider";

// Компонент Netflix, представляющий главную страницу приложения
export default function Netflix() {
    const navigate = useNavigate();
    // Состояние для отслеживания прокрутки страницы
    const [isScrolled, setIsScrolled] = useState(false);
    const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
    const movies = useSelector((state) => state.netflix.movies);


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres());
    },[dispatch, genresLoaded]);

    useEffect(() => {
        if(genresLoaded) dispatch(fetchMovies({type: "all"}));

    }, [dispatch, movies, genresLoaded]);

    // Обработчик события прокрутки страницы
    window.onscroll = () => {
        // Устанавливаем состояние isScrolled в зависимости от того, находится ли страница в верхней части (не прокручена)
        setIsScrolled(window.pageYOffset === 0 ? false : true);
        
        // Очищаем обработчик события прокрутки после использования (предотвращает утечку памяти)
        return () => (window.onscroll = null);
    }

    return (
        <Container>
            {/* Передаем состояние прокрутки в компонент Navbar */}
            <Navbar isScrolled={isScrolled} />
            <div className="hero">
                <img 
                    src={backgroundImage} 
                    alt="background" 
                    className="background-image"
                />
                <div className="container">
                    <div className="logo">
                        <img src={MovieLogo} alt="Movie Logo" />
                    </div>
                    <div className="buttons flex">
                        <button 
                            className="flex j-center a-center"
                            onClick={() => navigate('/player')}
                        >
                            <FaPlay /> Play
                        </button>
                        <button className="flex j-center a-center">
                            <AiOutlineInfoCircle /> More Info
                        </button>

                    </div>
                </div>
            </div>
            <Slider movies={movies} />
        </Container>
    )
}

const Container = styled.div`
    background-color: #000;
    .hero {
        position: relative;
        .background-image {
            filter: brightness(60%);
        }
        img {
            height: 100vh;
            width: 100vw;
        }
        .container {
            position: absolute;
            bottom: 5rem;
            .logo {
                img {
                    width: 100%;
                    height: 100%;
                    margin-left: 5rem;
                }
            }
            .buttons {
                margin: 5rem;
                gap: 2rem;
                button {
                    font-size: 1.4rem;
                    gap: 1rem;
                    border-radius: 0.2rem;
                    padding: 0.5rem;
                    padding-left: 2rem;
                    padding-right: 2.4rem;
                    border: none;
                    cursor: pointer;
                    transition: 300ms ease-in-out;
                    &:hover {
                        opacity: 0.8;
                    }
                    &:nth-of-type(2) {
                        background-color: rgba(109, 109, 110, 0.7);
                        color: #fff;
                        svg {
                            font-size: 1.8rem;
                        }
                    }
                }
            }
        }
    }
`;
