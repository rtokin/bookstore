import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    User,
} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDRS5quH0zsZMlxfpwlNc3W3R6x7zqX6fo",
    authDomain: "streetbook-e6099.firebaseapp.com",
    projectId: "streetbook-e6099",
    storageBucket: "streetbook-e6099.firebasestorage.app",
    messagingSenderId: "794950402770",
    appId: "1:794950402770:web:f43c2e68329bc2bdd4230b",
    measurementId: "G-3PPK0BM7EN"
};

// ==================== 2) Инициализация Firebase App ====================
const app = initializeApp(firebaseConfig);

// ==================== 3) Получаем экземпляр Auth ====================
const auth = getAuth(app);

// ==================== 4) Экспорт функций для регистрации/входа ====================

// Регистрирует нового пользователя через e-mail + пароль
export function registerWithEmail(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
}

// Входит под существующим пользователем (e-mail + пароль)
export function loginWithEmail(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
}

// Выход пользователя
export function logout() {
    return signOut(auth);
}

// Подписка на изменения состояния (например, на App.tsx или main.tsx можно слушать)
export function onUserStateChanged(callback: (user: User | null) => void) {
    return onAuthStateChanged(auth, callback);
}