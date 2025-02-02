import styles from './CorePage.module.scss';

import { CurrencyCalculator } from '../../components/CurrencyCalculator/CurrencyCalculator.tsx';

export const CorePage = () => {
    return (
        <div className={styles.corePage}>
            <CurrencyCalculator/>
        </div>
    )
}