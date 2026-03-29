import { login } from './actions'
import styles from './login.module.css'

export default function LoginPage({
    searchParams,
  }: {
    searchParams: { message: string }
}) {
    return (
      <div className={styles.container}>
         <div className={styles.loginCard}>
             <div className={styles.header}>
                 <h1>Admin Login</h1>
                 <p>Welcome back! Please enter your details.</p>
             </div>
             
             <form className={styles.form} action={login}>
                 {searchParams?.message && (
                     <div className={styles.errorMessage}>
                         {searchParams.message}
                     </div>
                 )}
                 <div className={styles.inputGroup}>
                     <label htmlFor="email">Email</label>
                     <input id="email" name="email" type="email" required placeholder="you@example.com" />
                 </div>
                 <div className={styles.inputGroup}>
                     <label htmlFor="password">Password</label>
                     <input id="password" name="password" type="password" required placeholder="••••••••" />
                 </div>
                 <button type="submit" className={styles.submitButton}>Sign In</button>
             </form>
         </div>
      </div>
    )
  }
