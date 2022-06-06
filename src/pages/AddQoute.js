import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../components/hooks/use-http";
import {addQuote} from "../components/lib/api";
import {useEffect} from "react";
import {useHistory, useNavigate} from "react-router-dom";

const AddQuote = () => {
    //we could extract more data from useHttp (data, error)
    const {sendRequest, status} = useHttp(addQuote);
    // const history = useHistory();
    const navigate = useNavigate();
    useEffect(() => {
        if (status === "completed") {
            // history.push("/quotes");
            navigate("/quotes");
            // navigate("/quotes", {replace: true});
        }
    }, [status, navigate]);


    const addQuoteHandler = (quoteData) => {
        sendRequest(quoteData);
        //we do redirect in useEffect only if our status equal to "completed"
        // history.push("/quotes");
    }

    //we use isLoading prop for rendering loading spinner during our request
    return <QuoteForm isLoading={status === "pending"}  onAddQuote={addQuoteHandler}/>
}

export default AddQuote;
