import { useCallback, useState } from 'react';

import styles from './CurrencyCalculator.module.scss';

import { CurrencyProgressBar } from './CurrencyProgressBar/CurrencyProgressBar.tsx';

import { currencies, Currency } from '../../varaiables.ts';
import { exchange } from '../../utils/exchange.ts';


export const CurrencyCalculator = () => {
    const [currencyValues, setCurrencyValues] = useState(new Map(currencies.map((currency) => [currency, 0])));

    const handleInput = useCallback((value: string, currency: Currency): void => {

        const newCurrencyValues = new Map(currencyValues);
        newCurrencyValues.set(currency, Number(value));

        const otherCurrencies = Object.values(Currency).filter(it => it !== currency);

        otherCurrencies.forEach((otherCurrency) => {
            const otherValue = exchange({ from: currency, to: otherCurrency, value: Number(value) });
            newCurrencyValues.set(otherCurrency, otherValue);
        });

        setCurrencyValues(newCurrencyValues);
    }, [currencyValues, setCurrencyValues]);

    return (
        <div className={styles.currencyCalculator}>
            {Array.from(currencyValues.keys()).map((currency) => (
                <CurrencyProgressBar
                    key={currency}
                    currency={currency}
                    data={(currencyValues.get(currency) ?? 0).toString()}
                    onChange={handleInput}
                />
            ))}
        </div>
    )
}