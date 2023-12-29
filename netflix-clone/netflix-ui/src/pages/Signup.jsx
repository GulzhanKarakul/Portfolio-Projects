import React, { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import styled from 'styled-components'
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from "react-router-dom";

// Компонент для страницы регистрации
export default function SignUp() {
    // navigate - это функция, предоставляемая библиотекой React Router для программной 
    // навигации между различными страницами в веб-приложении. 
    // Она используется для изменения текущего маршрута (URL) и отображения соответствующего компонента страницы.
    const navigate = useNavigate();
    
    // Состояния для отслеживания отображения поля ввода пароля и данных формы
    const [showPassword, setShowPassword] = useState(false);
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    // Обработчик регистрации пользователя
    const handlerSignIn = async () => {
        console.log(formValues); // Вывод данных формы в консоль (для тестирования)
        try {
            const {email, password} = formValues;
            // Попытка создания пользователя с использованием Firebase Authentication
            await createUserWithEmailAndPassword(firebaseAuth, email, password);
        } catch(error) {
            console.log(error); // Вывод ошибки в консоль (для обработки ошибок)
        }
    }

    // Обработчик изменения состояния аутентификации
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) navigate("/"); // Перенаправление на главную страницу, если пользователь уже аутентифицирован
    })

    return (
        <Container showPassword={showPassword}>
            <BackgroundImage />
            <div className="content">
                {/* Заголовок страницы для входа */}
                <Header login /> 
                <div className="body flex column a-center j-center">
                    <div className="text flex column">
                        <h1>Неограниченное количество фильмов, телешоу и многое другое</h1>
                        <h4>Смотрите где угодно. Отмените подписку в любое время</h4>
                        <h6>Готовы смотреть? Введите свой адрес электронной почты, чтобы создать или восстановить подписку</h6>
                    </div>
                    <div className="form">
                        {/* Поле ввода для адреса электронной почты */}
                        <input 
                            type="email" 
                            placeholder="Адрес электронной почты" 
                            name="email" 
                            value={formValues.email} 
                            onChange={(event) =>
                                setFormValues({ 
                                    ...formValues,
                                    [event.target.name]: event.target.value
                                })
                            } 
                        />
                        
                        {/* Условное отображение поля ввода для пароля в зависимости от состояния showPassword */}
                        {showPassword && (
                            <input 
                                type="password" 
                                placeholder="Пароль"
                                name="password"
                                value={formValues.password} 
                                onChange={(event) =>
                                    setFormValues({ 
                                        ...formValues,
                                        [event.target.name]: event.target.value
                                    })
                                }  
                            />                        
                        )}
                        
                        {/* Условное отображение кнопки для показа поля ввода пароля */}
                        {!showPassword && <button onClick={() => setShowPassword(true)}>Начать</button>}
                    </div>
                    
                    {/* Кнопка для регистрации пользователя */}
                    <button onClick={handlerSignIn}>Подписаться</button>
                </div>
            </div>
        </Container>
    )
}

// Стилизованный контейнер для компонента
const Container = styled.div`
    position: relative;
    .content {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        height: 100vh;
        width: 100vw;
        display: grid;
        grid-template-rows: 15vh 85vh;
        .body {
            gap: 1rem;
            text-align: center;
            font-size: 2rem;
            h1 {
                padding: 0 25rem;
            }
            .form {
                display: grid;
                grid-template-columns: ${({showPassword}) => showPassword ? "1fr 1fr" : "2fr 1fr"} ;
                width: 60%;
            }
            input {
                color: black;
                border: none;
                padding: 1.5rem;
                font-size: 1.2rem;
                border: 1px solid #000;
                &:focus {
                    outline: none;
                }
            }
            button {
                padding: 0.5rem 1rem;
                background-color: #e50914;
                border: none;
                cursor: pointer;
                color: white;
                font-weight: bolder;
                font-size: 1.05rem;
            }
        }
        button {
            padding: 0.5rem 1rem;
            background-color: #e50914;
            border: none;
            cursor: pointer;
            color: white;
            border-radius: 0.2rem;
            font-weight: bolder;
            font-size: 1.05rem;
        }
    }
`;
