import React, { FC } from 'react';
import LogInFormBox from '../../components/LogInFormBox/LogInFormBox';
import styles from './LogIn.module.scss';

interface LogInProps {}

const LogIn: FC<LogInProps> = () => (
  <div className={styles.LogIn}>
    <LogInFormBox />
  </div>
);

export default LogIn;
