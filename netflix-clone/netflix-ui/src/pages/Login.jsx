import React, { useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import styled from 'styled-components'
import BackgroundImage from "../components/BackgroundImage";
import Header from "../components/Header";
import { firebaseAuth } from '../utils/firebase-config';
import { useNavigate } from "react-router-dom";

// Компонент для страницы входа
export default function Login() {
    const navigate = useNavigate();
    
    // Состояние формы с данными пользователя
    const [formValues, setFormValues] = useState({
        email: "",
        password: "",
    });

    // Обработчик входа пользователя
    const handlerLogIn = async () => {
        console.log(formValues); // Вывод данных формы в консоль (для тестирования)
        try {
            const {email, password} = formValues;
            // Попытка входа с использованием Firebase Authentication
            await signInWithEmailAndPassword(firebaseAuth, email, password);
        } catch(error) {
            console.log(error); // Вывод ошибки в консоль (для обработки ошибок)
        }
    }

    // Обработчик изменения состояния аутентификации
    onAuthStateChanged(firebaseAuth, (currentUser) => {
        if(currentUser) navigate("/"); // Перенаправление на главную страницу, если пользователь уже аутентифицирован
    })

    return (
        <Container>
            <BackgroundImage />
            <div className="content">
                <Header />
                <div className="form-container flex column a-center j-center">
                    <div className="form flex column a-center j-center">
                        <div className="title">
                            <h3>Войти</h3>
                        </div>
                        <div className="container flex column">
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
                            {/* Поле ввода для пароля */}
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
                            {/* Кнопка для входа */}
                            <button onClick={handlerLogIn}>Войти</button>
                        </div>
                    </div>
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
        .form-container {
            gap: 2rem;
            height: 85vh;
            .form {
                padding: 2rem;
                background-color: #000000b0;
                width: 25vw;
                gap: 2rem;
                color: #fff;
                .container {
                    gap: 2rem;
                    input {
                        padding: 0.5rem 1rem;
                        width: 15rem;
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
            }
        }
    }
`;
