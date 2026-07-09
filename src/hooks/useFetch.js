import { useState, useEffect } from "react";

function useFetch(url) {
    const [data, setData] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        if(!url) return

        setIsLoading(true)
        setError(null)

        fetch(url)
            .then(res => {
                if(!res.ok) throw new Error ('errore nella risposta del server')
                return res.json()
            })
            .then(data => {
                setData(data)
                setIsLoading(false)
            })
            .catch(err => {
                setError(err.message)
                setIsLoading(false)
            })
    }, [url])

    return {data, isLoading, error}
}

export default useFetch