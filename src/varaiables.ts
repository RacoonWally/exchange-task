export const percents  = [25, 50, 75, 100];

export enum Currency {
    RUB = 'rub',
    USDT = 'usdt'
}

export const currencies: Currency[] = [Currency.RUB, Currency.USDT];

export const exchangeRates = {
    [Currency.RUB]: 100,
    [Currency.USDT]: 1,
}
