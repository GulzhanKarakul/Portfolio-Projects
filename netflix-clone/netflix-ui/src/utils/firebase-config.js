// Импортируем необходимые функции из SDK Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// Конфигурация вашего веб-приложения в Firebase
// Для Firebase JS SDK версии 7.20.0 и новее, параметр measurementId необязателен
const firebaseConfig = {
  apiKey: "AIzaSyBuVQWz-6l0vER8XcP61zFvh735Wxato6Y",         // Ключ API вашего проекта Firebase
  authDomain: "react-netflix-clone-b0149.firebaseapp.com",   // Домен вашего приложения в Firebase
  projectId: "react-netflix-clone-b0149",                   // Идентификатор проекта Firebase
  storageBucket: "react-netflix-clone-b0149.appspot.com",   // Бакет (контейнер для хранения файлов) в Firebase Storage
  messagingSenderId: "991231428961",                        // Идентификатор отправителя для Firebase Cloud Messaging
  appId: "1:991231428961:web:b062d7487af8b8d0ca5d20",      // Идентификатор приложения Firebase
  measurementId: "G-FVN7T4H971"                            // Идентификатор измерения (необязательно)
};

// Инициализация Firebase с использованием конфигурации
const app = initializeApp(firebaseConfig);

// Получение объекта аутентификации Firebase
export const firebaseAuth = getAuth(app);
