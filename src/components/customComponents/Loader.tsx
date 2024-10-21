import styles from './Loader.module.css'

export const Loader = () => {
    return (
        /* From Uiverse.io by reesaldles */
        <div className='w-[100%] h-[100vh] flex items-center justify-center'>
            <div className={styles.spinner}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
