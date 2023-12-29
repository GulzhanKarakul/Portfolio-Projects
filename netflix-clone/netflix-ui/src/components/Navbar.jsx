import React, { useState } from "react";
import styled from "styled-components";
import logo from '../assets/logo.png'
import { Link } from "react-router-dom";
import { FaSearch, FaPowerOff } from 'react-icons/fa';
import { signOut } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";

// Компонент навигационной панели
export default function Navbar({isScrolled}) {
    // Список ссылок
    const links = [
        {name: 'Home', link: '/'},
        {name: 'TV Shows', link: '/tv'},
        {name: 'Movies', link: '/movies'},
        {name: 'My List', link: '/mylist'},
    ];

    // Состояния для отображения поиска и обработки событий наведения/фокуса
    const [showSearch, setShowSearch] = useState(false);
    const [inputHover, setInputHover] = useState(false);

    return (
        <Container>
            {/* Верхнее меню навигации */}
            <nav className={`flex ${isScrolled ? 'scrolled': ""}`}>
                {/* Левая часть навигационной панели */}
                <div className="left flex a-center">
                    {/* Логотип */}
                    <div className="brand flex a-center j-center">
                        <img src={logo} alt="logo" />
                    </div>
                    {/* Список ссылок */}
                    <ul className="links flex">
                        {links.map(({name, link}) => {
                            return (
                                <li key={name}>
                                    {/* Ссылка с использованием React Router */}
                                    <Link to={link}>{name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                {/* Правая часть навигационной панели */}
                <div className="right flex a-center">
                    {/* Поиск */}
                    <div className={`search ${showSearch ? "show-search" : ""}`}> 
                        {/* Кнопка поиска */}
                        <button 
                            onFocus={() => setShowSearch(true)}  // При фокусе кнопки, отобразить поле поиска
                            onBlur={() => {
                                setTimeout(() => {
                                    if (!inputHover) setShowSearch(false);
                                }, 200); // Добавлено небольшая задержка перед скрытием
                            }}
                        >
                            {/* Иконка поиска */}
                            <FaSearch />
                        </button>
                        
                        {/* Поле ввода для поиска */}
                        <input 
                            type="text" 
                            placeholder="Поиск" 
                            onMouseEnter={() => setInputHover(true)}  // При наведении указателя на поле ввода, установить inputHover в true
                            onMouseLeave={() => setInputHover(false)}  // При уходе указателя с поля ввода, установить inputHover в false
                            onBlur={() => {
                                setShowSearch(false);  // При потере фокуса, скрыть поле поиска
                                setInputHover(false);  // Установить inputHover в false после потери фокуса
                            }}
                        />
                    </div>
                    {/* Кнопка выхода */}
                    <button onClick={() => signOut(firebaseAuth)}>
                        {/* Иконка выхода */}
                        <FaPowerOff />
                    </button>
                </div>
            </nav>
        </Container>
    )
}

// Стилизованный контейнер для компонента
const Container = styled.div`
    .scrolled {
        background-color: #000;
    }
    nav {
        position: sticky;
        top: 0;
        height: 6.5rem;
        width: 100%;
        justify-content: space-between;
        position: fixed;
        z-index: 2;
        align-items: center;
        transition: 300ms ease-in-out;
        .left {
            gap: 2rem;
            .brand {
                img {
                    height: 4rem;
                }
            }
            .links {
                list-style-type: none;
                gap: 2rem;
                li {
                    a {
                        color: #fff;
                        text-decoration: none;
                    }
                }
            }
        }
        .right {
            gap: 1rem;
            button {
                background-color: transparent;
                border: none;
                cursor: pointer;
                &:focus {
                    outline: none;
                }
                svg {
                    color: #f34242;
                    font-size: 1.2rem;
                }
            }
            .search {
                display: flex;
                gap: 0.4rem;
                align-items: center;
                justify-content: center;
                padding: 0.2rem;
                padding-left: 0.5rem;
                button {
                    background-color: transparent;
                    svg {
                        color: #fff;
                    }
                }
                input {
                    width: 0;
                    opacity: 0;
                    visibility: hidden;
                    transition: 300ms ease-in-out;
                    background-color: transparent;
                    border: none;
                    color: #fff;
                    &:focus {
                        outline: none;
                    }
                }
            }
            .show-search {
                border: 1px solid #fff;
                background-color: rgba(0, 0, 0, 0.6);
                input {
                    width: 100%;
                    opacity: 1;
                    visibility: visible;
                    padding: 0.3rem;
                }
            }
        }
    }
`;