// Импорт React и необходимых хуков, компонентов и стилей
import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/global'
import styled from 'styled-components'
import Sidebar from './Sidebar'

// Компонент Upcoming для отображения аниме, которое выйдет в ближайшем будущем
function Upcoming({ rendered }) {
    // Получение функций и данных из глобального контекста
    const { upcomingAnime, isSearch, searchResults } = useGlobalContext()

    // Функция для условного рендера в зависимости от параметров
    const conditionalRender = () => {
        if (!isSearch && rendered === 'upcoming') {
            return upcomingAnime?.map((anime) => {
                return (
                    <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                        <img src={anime.images.jpg.large_image_url} alt="" />
                    </Link>
                )
            })
        } else {
            return searchResults?.map((anime) => {
                return (
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
            <div className="upcoming-anime">
                {conditionalRender()}
            </div>
            <Sidebar />
        </PopularStyled>
    )
}

// Стилизованный компонент PopularStyled
const PopularStyled = styled.div`
    display: flex;
    .upcoming-anime {
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

// Экспорт компонента Upcoming
export default Upcoming
