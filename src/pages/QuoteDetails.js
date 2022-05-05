import {Link, Route, useLocation, useParams, useRouteMatch} from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

const DUMMY_QUOTES = [
    {id: 1, author: "Illia", text: "Some text"},
    {id: 2, author: "Kirill", text: "Some another text"},
    {id: 3, author: "Katya", text: "Greatest quote"},
]

const QuoteDetails = () => {
    const params = useParams();
    const location = useLocation();
    const match = useRouteMatch();
    const isCommentsShow = location.pathname === `${match.url}/comments`;

    console.log(location)
    console.log(isCommentsShow)
    console.log(match)

    const currentQuote = DUMMY_QUOTES.find(quote => quote.id == params.quoteId);
    if (!currentQuote) {
        return <p>No quotes found!</p>
    }

    return <div>
        <HighlightedQuote text={currentQuote.text} author={currentQuote.author}/>
        <div className="centered">
            <Link className="btn--flat"
                  to={isCommentsShow ? match.url : `${match.url}/comments`}>{isCommentsShow ? "Hide" : "Show"} comments</Link>
        </div>
        <Route path={`${match.url}/comments`}>
            <Comments/>
        </Route>
    </div>
}

export default QuoteDetails;
