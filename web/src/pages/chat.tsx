import styles from "../styles/chat.module.scss";

export default function ChatPage() {
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>Chats</h2>
        <ul>
          <li className={styles.active}>General</li>
          <li>Work</li>
          <li>Friends</li>
        </ul>
      </aside>
      <main className={styles.chat}>
        <header className={styles.header}>General Chat</header>
        <div className={styles.messages}>
          <div className={styles.message + " " + styles.mine}>
            Hi there! 👋
          </div>
          <div className={styles.message}>Hello! How’s it going?</div>
        </div>
        <form className={styles.inputArea}>
          <input type="text" placeholder="Type a message..." />
          <button type="submit">Send</button>
        </form>
      </main>
    </div>
  );
}
