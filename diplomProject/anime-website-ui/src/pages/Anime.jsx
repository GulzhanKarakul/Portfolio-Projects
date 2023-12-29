import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { getAnimeById, getCharacters } from "../store/animeSlice/fetchFunctions";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import CardSlider from "../components/CardSlider";

export default React.memo(function AnimeItem() {
    const [isScrolled, setIsScrolled] = useState(false);
    const { id } = useParams();

    const currentAnime = useSelector((state) => state.anime.curAnime);
    const characters = useSelector((state) => state.anime.characters);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(true);

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                await dispatch(getAnimeById(id));
                dispatch(getCharacters(id));
                setLoading(false);
            } catch (error) {
                console.error("Error fetching airing anime:", error);
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 165 ? false : true);
        return () => (window.onscroll = null);
    }

    return (
        <AnimeItemStyled>
            <Navbar isScrolled={isScrolled} />
            {loading ? (
                <Loader />
            ) : (
                <> 
                  <div className="info">
                    <h1>{`${currentAnime.title}/${currentAnime.title_japanese}`}</h1>
                    <div className="details">
                        <div className="detail">
                            <div className="image">
                                <img src={currentAnime.images.jpg.large_image_url} alt={currentAnime.title_english} />
                            </div>
                            <div className="anime-details">
                                <p><span>Aired:</span><span>{currentAnime.aired.string}</span></p>
                                <p><span>Rating:</span><span>{currentAnime?.rating}</span></p>
                                 <p><span>Rank:</span><span>{currentAnime?.rank}</span></p>
                                 <p><span>Score:</span><span>{currentAnime?.score}</span></p>
                                 <p><span>Scored By:</span><span>{currentAnime?.scored_by}</span></p>
                                 <p><span>Popularity:</span><span>{currentAnime?.popularity}</span></p>
                                 <p><span>Status:</span><span>{currentAnime?.status}</span></p>
                                 <p><span>Source:</span><span>{currentAnime?.source}</span></p>
                                 <p><span>Season:</span><span>{currentAnime?.season}</span></p>
                                 <p><span>Duration:</span><span>{currentAnime?.duration}</span></p>
                            </div>
                        </div>
                        <p className="description">
                            {showMore ? currentAnime.synopsis : currentAnime.synopsis?.substring(0, 450) + '...'}
                            <button onClick={() => setShowMore(!showMore)}>
                                {showMore ? 'Show Less' : 'Read More'}
                            </button>
                        </p>
                    </div>
                    </div>

                  <div className="video">
                    <h3 className="title">Trailer</h3>
                    <div className="trailer-con">
                        {currentAnime.trailer?.embed_url ? (
                            <iframe
                                src={currentAnime.trailer?.embed_url}
                                title="Inline Frame Example"
                                width="100%" 
                                height="450"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            >
                            </iframe>
                        ) : (
                            <h3>Trailer not available</h3>
                        )}
                    </div>
                    </div>
                    <div className="Slider">
                        <CardSlider data={characters} title={"Characters"} />
                    </div>
                </>
            )}
        </AnimeItemStyled>
    );
});


const AnimeItemStyled = styled.div`
padding: 3rem 0;
  background-color: #000; /* Черный цвет фона для всего компонента */
  color: #fff; /* Белый цвет текста для всего компонента */
h1{
    display: inline-block;
    font-size: 3rem;
    margin-bottom: 1.5rem;
    cursor: pointer;
    background:linear-gradient( to right, #A855F7, #27AE60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    transition: all .4s ease-in-out;
    &:hover{
        transform: skew(-3deg);
    }
}
.info {
   padding: 3rem 18rem;
}
 .video {
   padding: 0 22rem;
}
.title{
   
    display: inline-block;
    margin: 3rem 0;
    font-size: 2rem;
    cursor: pointer;
    background:linear-gradient( to right, #A855F7 23%, #27AE60);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.description{
    margin-top: 2rem;
    color: #6c7983;
    line-height: 1.7rem;
    button{
        background-color: transparent;
        border: none;
        outline: none;
        cursor: pointer;
        font-size: 1.2rem;
        color: #27AE60;
        font-weight: 600;
    }
}

.trailer-con{
    display: flex;
    justify-content: center;
    align-items: center;
    iframe{
        outline: none;
        background-color: #333; /* Цвет фона для контейнера с информацией об аниме */
        border-radius: 20px;
        padding: 2rem;
        border: 5px solid #555; /* Цвет границы */
    }
}

.details{
    padding: 2rem;
    background-color: #333;
    border-radius: 20px;
    padding: 2rem;
    border: 5px solid #555; 
    .detail{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        img{
            border-radius: 7px;
        }
    }
    .anime-details{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        p{
            display: flex;
            gap: 1rem;
        }
        p span:first-child{
            font-weight: 600;
            color: #9d9d9d;
        }
    }
}

.characters{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    grid-gap: 2rem;
    background-color: #333; /* Цвет фона для контейнера с информацией об аниме */
   border-radius: 20px;
   padding: 2rem;
   border: 5px solid #555; /* Цвет границы */
    .character{
        padding: .4rem .6rem;
        border-radius: 7px;
        background-color: #000;
        transition: all .4s ease-in-out;
        img{
            width: 100%;
        }
        h4{
            padding: .5rem 0;
            color: #fff;
        }
        p{
            color: #27AE60;
        }
        &:hover{
            transform: translateY(-5px);
        }
    }
}
`;
