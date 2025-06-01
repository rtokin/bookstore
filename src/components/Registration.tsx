// src/components/Registration.tsx

import React, { FunctionComponent, useCallback, useState } from 'react'
import styles from '../styles/Registration.module.css'

interface RegistrationProps {
  onLoginLinkClick: () => void
  onClose: () => void
}

const Registration: FunctionComponent<RegistrationProps> = ({
  onLoginLinkClick,
  onClose,
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // Закрываем модалку, если кликнули по полупрозрачному фону
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains(styles.registrationOverlay)) {
      onClose()
    }
  }

  // Сабмит формы (пока просто console.log)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Регистрация:', { email, password, confirmPassword })
  }

  // Перейти на окно входа
  const handleLoginClick = useCallback(() => {
    onLoginLinkClick()
  }, [onLoginLinkClick])

  return (
    <div
      className={styles.registrationOverlay}
      onClick={handleBackgroundClick}
    >
      <div className={styles.registrationContainer}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* Заголовок «Регистрация» */}
          <h2 className={styles.title}>Регистрация</h2>

          {/* Поле Email */}
          <label htmlFor="email" className={styles.label}>
            Почта
          </label>
          <input
            id="email"
            type="email"
            className={styles.inputField}
            placeholder="Введите вашу почту"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {/* Поле Пароль */}
          <label htmlFor="password" className={styles.label}>
            Пароль
          </label>
          <input
            id="password"
            type="password"
            className={styles.inputField}
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Поле Подтверждения Пароля */}
          <label htmlFor="confirmPassword" className={styles.label}>
            Подтвердите пароль
          </label>
          <input
            id="confirmPassword"
            type="password"
            className={styles.inputField}
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {/* Кнопка «Зарегистрироваться» */}
          <button type="submit" className={styles.submitButton}>
            <span className={styles.submitButtonText}>Зарегистрироваться</span>
          </button>

          {/* Ссылка «Уже есть аккаунт? Войти» */}
          <div
            className={styles.switchToLogin}
            onClick={handleLoginClick}
          >
            Уже есть аккаунт? Войти
          </div>
        </form>
      </div>
    </div>
  )
}

export default Registration
