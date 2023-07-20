import {useCallback, useEffect, useState} from "react";
import type {Dispatch, SetStateAction} from "react";
import type {AxiosRequestConfig} from "axios";

export interface CallbackContext<T> {
    setFinished: Dispatch<SetStateAction<boolean>>,
    lastData: T
}

/***
 *
 * @author Farbod Shams
 * @param fetch
 * Since we need data fetching on user scroll, I have implemented this hook. It accepts a callback and handles loading
 * and storing each page's data. It adds a scroll event listener to the document in the DOM and removes it whether all
 * pages are fetched.
 */

function useInfiniteScroll<T = any>(fetch: (ctx: CallbackContext<T>, conf?: AxiosRequestConfig) => Promise<T>) {
    const [loading, setLoading] = useState<boolean>(false);
    const [data, setData] = useState<T[]>([]);
    const [finished, setFinished] = useState<boolean>(false);
    const lastData = data.length > 0 ? data[data.length - 1] : null;

    const fetchOperation = (conf?: AxiosRequestConfig) => {
        setLoading(true)
        fetch({lastData, setFinished}, conf).then(res => {
            setData(prev => ([...prev, res]));
        }).catch(err => {
            console.error(err);
        }).finally(() => setLoading(false));
    };

    const scrollBottom = useCallback(() => {
        if(!finished && !loading && window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            setLoading(true);
            fetchOperation();
        }
    }, [data, finished, loading])

    useEffect(() => {
        document.addEventListener("scroll", scrollBottom);
        return () => {
            document.removeEventListener("scroll", scrollBottom);
        }
    }, [scrollBottom]);
    return {loading, finished, data, setData, fetch: fetchOperation}
}

export default useInfiniteScroll;