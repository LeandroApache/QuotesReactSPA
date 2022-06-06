import classes from './NoQuotesFound.module.css';
import {Link, useRouteMatch} from "react-router-dom";

const NoQuotesFound = () => {

    // const match = useRouteMatch();
    // console.log(match)

  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <Link to="/add-quote" className='btn'>
        Add a Quote
      </Link>
    </div>
  );
};

export default NoQuotesFound;
