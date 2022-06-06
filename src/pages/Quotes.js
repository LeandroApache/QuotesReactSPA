import QuoteList from "../components/quotes/QuoteList";
import {useEffect} from "react";
import {getAllQuotes} from "../components/lib/api";
import useHttp from "../components/hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import {Route, Routes} from "react-router-dom";
import QuoteDetails from "./QuoteDetails";

// const DUMMY_QUOTES = [
//     {id: 1, author: "Illia", text: "Some text"},
//     {id: 2, author: "Kirill", text: "Some another text"},
//     {id: 3, author: "Katya", text: "Greatest quote"},
// ]

const Quotes = () => {
    //second parameter in useHttp controls controls that we start in loading state (status === "pending") !!!important
    const {sendRequest, data: loadedQuotes, status, error} = useHttp(getAllQuotes, true);
    useEffect(() => {
        sendRequest();
    }, [sendRequest]);

    if (status === "pending") {
        return <div className="centered">
            <LoadingSpinner/>
        </div>
    }
    if (status === "error") {
        return <div className="centered focused">
            {error}
        </div>
    }

    if (status === "completed" && !loadedQuotes || loadedQuotes.length === 0) {
        return <NoQuotesFound/>
    }

    return <div>
        <QuoteList quotes={loadedQuotes}/>
    </div>
}

export default Quotes;
