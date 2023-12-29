// Импорт React и необходимых хуков
import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import styled from 'styled-components'
import Sidebar from './Sidebar'

// Компонент Popular для отображения популярных аниме
function Popular({ rendered }) {
    // Получение данных из глобального контекста
    const { popularAnime, isSearch, searchResults } = useGlobalContext()

    // Условный рендеринг в зависимости от типа данных и режима отображения
    const conditionalRender = () => {
        if (!isSearch && rendered === 'popular') {
            return popularAnime?.map((anime) => {
                return (
                    // Ссылка на страницу аниме с изображением
                    <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt="" />
                    </Link>
                )
            })
        } else {
            return searchResults?.map((anime) => {
                return (
                    // Ссылка на страницу аниме с изображением
                    <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt="" />
                    </Link>
                )
            })
        }
    }

    // Возвращение JSX разметки
    return (
        <PopularStyled>
            {/* Контейнер с популярными аниме и боковой панелью */}
            <div className="popular-anime">
                {conditionalRender()}
            </div>
            <Sidebar />
        </PopularStyled>
    )
}

// Стилизованный компонент PopularStyled
const PopularStyled = styled.div`
    display: flex;
    .popular-anime {
        margin-top: 2rem;
        padding-top: 2rem;
        padding-bottom: 2rem;
        padding-left: 5rem;
        padding-right: 0;
        width: 100%;
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        grid-gap: 2rem;
        background-color: #fff;
        border-top: 5px solid #e5e7eb;
        a {
            height: 500px;
            border-radius: 7px;
            border: 5px solid #e5e7eb;
        }
        a img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 5px;
        }
    }
`;

// Экспорт компонента Popular
export default Popular
