import styles from './Alert.module.scss';

type AlertProps = {
    text: string;
}

function Alert({ text }: AlertProps) {
    return (
        <div className={styles.alert}>
            <p>{text}</p>
        </div>
    )
}

export default Alert;