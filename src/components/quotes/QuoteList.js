import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';
import {useHistory, useNavigate, useLocation} from "react-router-dom";

const sortQuotes = (quotes, ascending) => {
    return quotes.sort((quoteA, quoteB) => {
        if (ascending) {
            return quoteA.id > quoteB.id ? 1 : -1;
        } else {
            return quoteA.id < quoteB.id ? 1 : -1;
        }
    })
}

const QuoteList = (props) => {
    // const history = useHistory();
    const navigate = useNavigate();
    const location = useLocation();
    //URlSearchParams translate our query params to JS object. Its build into the browser
    const queryParams = new URLSearchParams(location.search);
    //we should use get method of URLSearchParams object
    const isSortingAscending = queryParams.get("sort") === "asc";

    const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

    const sortClickHandler = () => {
        // history.push(`${location.pathname}?sort=${isSortingAscending ? 'dsc' : "asc"}`);
        //it is the same but more readable approach
        // history.push({
        //     pathname: location.pathname,
        //     search: `?sort=${isSortingAscending ? 'dsc' : "asc"}`
        // })
        navigate(`${location.pathname}?sort=${isSortingAscending ? 'dsc' : "asc"}`);
    }

    return (
        <>
            <div className={classes.sorting}>
                <button onClick={sortClickHandler}>Sort {isSortingAscending ? "Descending" : "Ascending"}</button>
            </div>
            <ul className={classes.list}>
                {sortedQuotes.map((quote) => (
                    <QuoteItem
                        key={quote.id}
                        id={quote.id}
                        author={quote.author}
                        text={quote.text}
                    />
                ))}
            </ul>
        </>

    );
};

export default QuoteList;
