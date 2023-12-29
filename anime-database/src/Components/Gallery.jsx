// Импорт React и необходимых хуков, компонентов и стилей
import React from 'react'
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { useGlobalContext } from '../context/global';

// Компонент Gallery для отображения галереи изображений аниме
function Gallery() {
    // Получение функций и данных из глобального контекста
    const { getAnimePictures, pictures } = useGlobalContext()
    // Получение параметра id из URL
    const { id } = useParams();

    // Состояние для отслеживания текущего индекса изображения
    const [index, setIndex] = React.useState(0);

    // Функция для обработки клика по маленьким изображениям
    const handleImageClick = (i) => {
        setIndex(i)
    }

    // Запуск эффекта при монтировании компонента и при изменении параметра id
    React.useEffect(() => {
        getAnimePictures(id)
    }, [id])

    // Возвращение JSX разметки
    return (
        <GalleryStyled>
            {/* Ссылка для возвращения на главную страницу */}
            <div className="back">
                <Link to="/">
                    <i className="fas fa-arrow-left"></i>
                    Back to Home
                </Link>
            </div>
            {/* Блок для отображения выбранного изображения в большом размере */}
            <div className="big-image">
                <img src={pictures[index]?.jpg.image_url} alt="" />
            </div>
            {/* Блок для отображения маленьких изображений с возможностью выбора */}
            <div className="small-images">
                {pictures?.map((picture, i) => {
                    return (
                        <div className="image-con" onClick={() => {
                            handleImageClick(i)
                        }} key={i}>
                            <img
                                src={picture?.jpg.image_url}
                                style={{
                                    border: i === index ? "3px solid #27AE60" : "3px solid #e5e7eb",
                                    filter: i === index ? 'grayscale(0)' : 'grayscale(60%)',
                                    transform: i === index ? 'scale(1.1)' : 'scale(1)',
                                    transition: 'all .3s ease-in-out'
                                }}
                                alt=""
                            />
                        </div>
                    )
                })}
            </div>
        </GalleryStyled>
    )
}

// Стилизованный компонент GalleryStyled
const GalleryStyled = styled.div`
    background-color: #EDEDED;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    .back {
        position: absolute;
        top: 2rem;
        left: 2rem;
        a {
            font-weight: 600;
            text-decoration: none;
            color: #EB5757;
            display: flex;
            align-items: center;
            gap: .5rem;
        }
    }
    .big-image {
        display: inline-block;
        padding: 2rem;
        margin: 2rem 0;
        background-color: #fff;
        border-radius: 7px;
        border: 5px solid #e5e7eb;
        position: relative;
        img {
            width: 350px;
        }
    }

    .small-images {
        display: flex;
        flex-wrap: wrap;
        gap: .5rem;
        width: 80%;
        padding: 2rem;
        border-radius: 7px;
        background-color: #fff;
        border: 5px solid #e5e7eb;
        img {
            width: 6rem;
            height: 6rem;
            object-fit: cover;
            cursor: pointer;
            border-radius: 5px;
            border: 3px solid #e5e7eb;
        }
    }
`;

// Экспорт компонента Gallery
export default Gallery
