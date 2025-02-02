import React, { useEffect, useRef, useState } from "react";
import classNames from 'classnames';

import styles from "./CurrencyProgressBar.module.scss";

import { percents, Currency } from '../../../varaiables.ts';

interface Props {
    data: string;
    currency: Currency;
    onChange: (value: string, currency: Currency) => void
}

export const CurrencyProgressBar = ({ currency, data, onChange }: Props) => {
    // const [total, setTotal] = useState(value)
    const [percentage, setPercentage] = useState(25);

    const inputRef = useRef<HTMLInputElement>(null);
    const spanRef = useRef<HTMLSpanElement>(null);
    const currencyRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (currencyRef?.current && inputRef?.current && spanRef?.current) {
            inputRef.current.style.marginRight = `${(
                currencyRef.current.clientWidth ? currencyRef!.current!.clientWidth + 8 : 0)}px`;
            spanRef.current.style.maxWidth = `${inputRef.current.offsetWidth}px`
        }
    }, [inputRef, currencyRef, spanRef]);

    useEffect(() => {
        if (spanRef?.current && currencyRef.current) {
            currencyRef.current.style.marginLeft = `${spanRef.current.offsetWidth + 8}px`
        }
    }, [spanRef, currencyRef, data]);

    const handlePercentClick = (value: number): void => {
        setPercentage(value);
    };

    const handleInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
        let value = event.target.value;
        const defaultValue = '0';

        if (value === '') {
            onChange(defaultValue, currency);
        } else {
            if (/e|E/.test(value)) {
                value = value.replace(/[eE]/g, '');
            }

            if (value.startsWith(defaultValue) && value.length > 1) {
                value = value.slice(1);
            }

            if (!isNaN(Number(value))) {
                onChange(value, currency);
            }
        }
    };

    const handleWrapperClick = () => {
        inputRef.current?.focus();
    };

    return (
        <div className={styles.progressBarRoot}>
            <div className={styles.inputWrapper} onClick={handleWrapperClick}>
                <input
                    type={'number'}
                    value={data}
                    onChange={handleInput}
                    ref={inputRef}
                    className={styles.input}
                />
                <span ref={spanRef} className={styles.hiddenSpan}>
                    {data}
                </span>
                <span
                    className={styles.currency}
                    ref={currencyRef}
                >
                        {String(currency).toUpperCase()}
                </span>
            </div>
            <div className={styles.buttons}>
                {percents.map((value) => (
                    <button
                        key={value}
                        className={classNames([styles.button, percentage === value && styles.active])}
                        onClick={() => handlePercentClick(value)}
                    >
                    {value}%
                    </button>
                ))}
            </div>
        </div>
)};

