import {Redirect, Route, Routes, Navigate} from "react-router-dom";
import Quotes from "./pages/Quotes";
import QuoteDetails from "./pages/QuoteDetails";
import AddQuote from "./pages/AddQoute";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import Comments from "./components/comments/Comments";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Navigate to="/quotes"/>}/>
                {/*<Route path="/" exact>*/}
                {/*    /!*<Redirect to="/quotes"/>*!/*/}
                {/*</Route>*/}
                <Route path="/quotes" element={<Quotes/>}/>
                <Route path="/quotes/:quoteId/*" element={<QuoteDetails/>}>
                    <Route path={`comments`} element={<Comments/>}/>
                </Route>
                <Route path="/add-quote" element={<AddQuote/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
