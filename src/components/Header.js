import styles from "./modules/Header.module.css";
import { FiHelpCircle } from "react-icons/fi";

function Header({ setShowInstructions }) {
  return (
    <header className={styles.header}>
      <span className={styles.title}>Mastermind</span>
      <button
        className={styles.infoButton}
        onClick={() => setShowInstructions(true)}
      >
        <FiHelpCircle />
      </button>
    </header>
  );
}

export default Header;
