// Импорт React и необходимых хуков и компонентов
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { useGlobalContext } from '../context/global';

// Компонент Sidebar для отображения боковой панели с топ-5 популярными аниме
export default function Sidebar() {
    // Получение данных из глобального контекста
    const { popularAnime } = useGlobalContext()

    // Сортировка по рейтингу
    const sorted = popularAnime?.sort((a, b) => {
        return b.score - a.score
    })

    // Возвращение JSX разметки
    return (
        <SidebarStyled>
            {/* Заголовок боковой панели */}
            <h3>Top 5 Popular</h3>
            {/* Контейнер с топ-5 популярными аниме */}
            <div className="anime">
                {/* Маппинг по массиву топ-5 популярных аниме и создание ссылок */}
                {sorted?.slice(0, 5).map((anime) => {
                    return (
                        <Link to={`/anime/${anime.mal_id}`} key={anime.mal_id}>
                            {/* Изображение аниме */}
                            <img src={anime.images.jpg.large_image_url} alt="" />
                            {/* Заголовок аниме */}
                            <h5>
                                {anime.title}
                            </h5>
                        </Link>
                    )
                })}
            </div>
        </SidebarStyled>
    )
}

// Стилизованный компонент SidebarStyled
const SidebarStyled = styled.div`
    margin-top: 2rem;
    background-color: #fff;
    border-top: 5px solid #e5e7eb;
    padding-right: 5rem;
    padding-left: 2rem;
    padding-top: 2rem;
    .anime {
        display: flex;
        flex-direction: column;
        width: 150px;
        img {
            width: 100%;
            border-radius: 5px;
            border: 5px solid #e5e7eb;
        }
        a {
            margin-top: 1rem;
            display: flex;
            flex-direction: column;
            gap: .4rem;
            color: #27AE60;
            h4 {
                font-size: 1.1rem;
            }
        }
    }
`;
