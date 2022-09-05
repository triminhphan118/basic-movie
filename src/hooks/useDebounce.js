import { useEffect, useState } from "react";

export default function useDebounce(initialValue = '', time = 1000) {
    const [debounce, setDebounce] = useState('');

    useEffect(() => {
        let timer = setTimeout(() => {
            setDebounce(initialValue)
        }, time)

        return () => clearTimeout(timer);
    }, [initialValue, time])

    return debounce;
}