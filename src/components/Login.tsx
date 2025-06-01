import React, { FunctionComponent, useCallback, useState } from "react"
import styles from "../styles/Login.module.css"
import { loginWithEmail } from "../services/firebase"

interface LoginProps {
  onClose: () => void           // закрыть модалку
  switchToRegister: () => void  // переключиться на модалку регистрации
}

const Login: FunctionComponent<LoginProps> = ({ onClose, switchToRegister }) => {
  // Состояние полей
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // Обработчик сабмита «вход»
  const handleLogin = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      try {
        setLoading(true)
        await loginWithEmail(email, password)
        onClose()
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Не удалось войти.")
      } finally {
        setLoading(false)
      }
    },
    [email, password, onClose]
  )

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        {/* Крестик «×» */}
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {/* Заголовок «Вход» */}
        <h2 className={styles.title}>Вход</h2>

        {/* Вывод ошибки, если есть */}
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleLogin} className={styles.form}>
          {/* Почта */}
          <div className={styles.field}>
            <label htmlFor="login-email" className={styles.label}>
              Почта
            </label>
            <input
              id="login-email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Пароль */}
          <div className={styles.field}>
            <label htmlFor="login-password" className={styles.label}>
              Пароль
            </label>
            <input
              id="login-password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Подождите…" : "Войти"}
          </button>
        </form>

        {/* Ссылка «Нет аккаунта? Зарегистрироваться» */}
        <div className={styles.switchLine}>
          <span>Нет аккаунта? </span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={switchToRegister}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
