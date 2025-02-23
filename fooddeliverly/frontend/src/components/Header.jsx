
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/">TastyNow</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;