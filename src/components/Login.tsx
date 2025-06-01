// src/components/Login.tsx

import React, { FunctionComponent, useCallback, useState } from 'react'
import styles from '../styles/Login.module.css'

interface LoginProps {
  onRegisterLinkClick: () => void
  onClose: () => void
}

const Login: FunctionComponent<LoginProps> = ({
  onRegisterLinkClick,
  onClose,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Закрываем модалку, если кликнули по полупрозрачному фону
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.loginOverlay)) {
      onClose()
    }
  }

  // Сабмит формы (пока просто console.log)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Авторизация:', { email, password })
  }

  // Перейти на окно регистрации
  const handleRegisterClick = useCallback(() => {
    onRegisterLinkClick()
  }, [onRegisterLinkClick])

  return (
    <div className={styles.loginOverlay} onClick={handleBackgroundClick}>
      <div className={styles.loginContainer}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Заголовок «Вход в аккаунт» */}
          <h2 className={styles.title}>Вход в аккаунт</h2>

          {/* Поле Email */}
          <label htmlFor="loginEmail" className={styles.label}>
            Почта
          </label>
          <input
            id="loginEmail"
            type="email"
            className={styles.inputField}
            placeholder="Введите вашу почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Поле Пароль */}
          <label htmlFor="loginPassword" className={styles.label}>
            Пароль
          </label>
          <input
            id="loginPassword"
            type="password"
            className={styles.inputField}
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Кнопка «Войти» */}
          <button type="submit" className={styles.submitButton}>
            <span className={styles.submitButtonText}>Войти</span>
          </button>

          {/* Ссылка «Нет аккаунта? Зарегистрироваться» */}
          <div className={styles.switchToRegister} onClick={handleRegisterClick}>
            Нет аккаунта? Зарегистрироваться
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
