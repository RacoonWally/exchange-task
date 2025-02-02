import { Currency, exchangeRates } from '../varaiables.ts';

export interface ExchangeProps {
    from: Currency;
    to: Currency;
    value: number;
}

export function exchange({from, to, value}: ExchangeProps): number {
    let convertedAmount;

    if (from === to) {
        convertedAmount = value;
    } else {
        const fromRate = exchangeRates[from];
        const toRate = exchangeRates[to];

        convertedAmount = +(value / fromRate * toRate).toFixed(2)
    }

    return +convertedAmount.toFixed(2);

}