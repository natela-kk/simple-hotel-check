import React, { FC } from 'react';
import styles from './Header.module.scss';

interface HeaderProps {}

const Header: FC<HeaderProps> = () => (
  <header className={styles.header}>
    <h1 className={styles.headerTitle}>Simple Hotel Check</h1>
    <button
    className={styles.headerLogoutButton}
    type='button'
    >Выйти</button>
  </header>
);

export default Header;
