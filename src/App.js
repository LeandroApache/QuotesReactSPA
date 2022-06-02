import {Redirect, Route, Switch} from "react-router-dom";
import Quotes from "./pages/Quotes";
import QuoteDetails from "./pages/QuoteDetails";
import AddQuote from "./pages/AddQoute";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/quotes"/>
                </Route>
                <Route path="/quotes" exact>
                    <Quotes/>
                </Route>
                <Route path="/quotes/:quoteId">
                    <QuoteDetails/>
                </Route>
                <Route path="/add-quote">
                    <AddQuote/>
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </Layout>
    );
}

export default App;
