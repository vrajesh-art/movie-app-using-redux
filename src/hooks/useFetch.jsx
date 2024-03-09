import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";
const useFetch = (url) => {
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        // starting mein loading state ko loading rakha hai jaise hi reposne aayega loading ko false kar denge
        setLoading('loading..');
        setData(null);
        setError(null);

        fetchDataFromApi(url).then((res) => {
            setLoading(false);
            setData(res);
        }).catch((err) => {
            setLoading(false);
            setError(err);
        })
    }, [url])
    // jaise hi url ki value change hoogi useffect waala method waapas se call hoga
    return { data, loading, error }
}

export default useFetch;