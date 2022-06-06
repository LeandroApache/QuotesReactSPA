import {Link, Outlet, Route, Routes, useLocation, useParams, useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../components/hooks/use-http";
import {getSingleQuote} from "../components/lib/api";
import {useEffect} from "react";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

// const DUMMY_QUOTES = [
//     {id: 1, author: "Illia", text: "Some text"},
//     {id: 2, author: "Kirill", text: "Some another text"},
//     {id: 3, author: "Katya", text: "Greatest quote"},
// ]

const QuoteDetails = () => {
    const params = useParams();
    //we destructed params for correct work of dependencies in useEffect
    const {quoteId} = params;
    const location = useLocation();
    //similar to useLocation but with more information about current page and URL
    //it is includes our path which was defined for our routes (like a placeholder) /quotes/:quoteId and url /quotes/1
    // const match = useRouteMatch();
    const {sendRequest, data: loadedQuote, status, error} = useHttp(getSingleQuote, true);
    useEffect(()=>{
        sendRequest(quoteId);
    },[sendRequest, quoteId]);

    const isCommentsShow = location.pathname === `/quotes/${quoteId}/comments`;

    // const currentQuote = DUMMY_QUOTES.find(quote => quote.id == params.quoteId);
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

    if (status === "error" && !loadedQuote.text) {
        return <NoQuotesFound/>
    }


    //when we use match we make our code more flexible because we dont need change all routes in all code. We can change only top level route
    return <div>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
        <div className="centered">
            {/*for link we should use match.url because it is includes exact quoteId (not placeholder for it like match.path)*/}
            <Link className="btn--flat"
                  to={isCommentsShow ? `` : `comments`}>{isCommentsShow ? "Hide" : "Show"} comments</Link>
        </div>
        <Outlet/>
        {/*we can use our placeholder /quotes/:quoteId for our nested route !!!only for routes we can use match.path for DRY*/}
        {/*if we use match.url instead of match.path we cant access params.quoteId in Comment component*/}
        {/*<Routes>*/}
        {/*    <Route path={`comments`} element={<Comments/>}/>*/}
        {/*</Routes>*/}
    </div>
}

export default QuoteDetails;
