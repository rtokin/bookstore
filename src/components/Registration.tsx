import React, { FunctionComponent, useCallback, useState } from "react"
import styles from "../styles/Registration.module.css"
import { registerWithEmail } from "../services/firebase"

interface RegistrationProps {
  onClose: () => void        // вызывается при закрытии модалки
  switchToLogin: () => void  // вызывается, если нажали «Уже есть аккаунт? Войти»
}

const Registration: FunctionComponent<RegistrationProps> = ({
  onClose,
  switchToLogin,
}) => {
  // 1) Локальное состояние формы
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  // 2) Обработчик сабмита регистрации
  const handleRegister = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault()
      setError(null)

      if (password !== confirmPassword) {
        setError("Пароли не совпадают.")
        return
      }

      try {
        setLoading(true)
        // Вызываем Firebase-функцию
        await registerWithEmail(email, password)
        // После успешной регистрации закрываем модалку
        onClose()
      } catch (err: any) {
        console.error(err)
        setError(err.message || "Не удалось зарегистрироваться.")
      } finally {
        setLoading(false)
      }
    },
    [email, password, confirmPassword, onClose]
  )

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        {/* Крестик «×» */}
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>

        {/* Заголовок */}
        <h2 className={styles.title}>Регистрация</h2>

        {/* Вывод ошибки, если есть */}
        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleRegister} className={styles.form}>
          {/* Почта */}
          <div className={styles.field}>
            <label htmlFor="reg-email" className={styles.label}>
              Почта
            </label>
            <input
              id="reg-email"
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Пароль */}
          <div className={styles.field}>
            <label htmlFor="reg-password" className={styles.label}>
              Пароль
            </label>
            <input
              id="reg-password"
              type="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {/* Подтверждение пароля */}
          <div className={styles.field}>
            <label htmlFor="reg-confirm" className={styles.label}>
              Подтвердите пароль
            </label>
            <input
              id="reg-confirm"
              type="password"
              className={styles.input}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          {/* Кнопка «Зарегистрироваться» */}
          <button
            type="submit"
            className={styles.submitButton}
            disabled={loading}
          >
            {loading ? "Подождите…" : "Зарегистрироваться"}
          </button>
        </form>

        {/* Ссылка «Уже есть аккаунт? Войти» */}
        <div className={styles.switchLine}>
          <span>Уже есть аккаунт? </span>
          <button
            type="button"
            className={styles.linkButton}
            onClick={switchToLogin}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  )
}

export default Registration
