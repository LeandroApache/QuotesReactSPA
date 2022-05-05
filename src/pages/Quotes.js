import QuoteList from "../components/quotes/QuoteList";

const DUMMY_QUOTES = [
  {id: 1, author: "Illia", text: "Some text"},
  {id: 2, author: "Kirill", text: "Some another text"},
  {id: 3, author: "Katya", text: "Greatest quote"},
]

const Quotes = () => {
  return <div>
    <QuoteList quotes={DUMMY_QUOTES}/>
  </div>
}

export default Quotes;
