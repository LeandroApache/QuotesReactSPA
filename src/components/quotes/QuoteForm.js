import {useRef, useState} from 'react';

import LoadingSpinner from '../UI/LoadingSpinner';
import classes from './QuoteForm.module.css';
import Card from "../UI/Card";
import {Prompt} from "react-router-dom";

const QuoteForm = (props) => {
    const [isEntering, setIsEntering] = useState(false);
    const authorInputRef = useRef();
    const textInputRef = useRef();

    function submitFormHandler(event) {
        event.preventDefault();

        const enteredAuthor = authorInputRef.current.value;
        const enteredText = textInputRef.current.value;

        // optional: Could validate here

        props.onAddQuote({author: enteredAuthor, text: enteredText});
    }

    const finishEnteringHandler = () => {
        setIsEntering(false);
    }

    const focusFormHandler = () => {
        setIsEntering(true);
    }

    return (
        <>
            {/*it is used for prevent leaving of the page by user during text entering*/}
            {/*we should add additional handler for submit form button*/}
            {/*<Prompt when={isEntering} message={(location) => "Are you sure that you want to leave this page?"}/>*/}
            <Card>
                <form onFocus={focusFormHandler} className={classes.form} onSubmit={submitFormHandler}>
                    {props.isLoading && (
                        <div className={classes.loading}>
                            <LoadingSpinner/>
                        </div>
                    )}

                    <div className={classes.control}>
                        <label htmlFor='author'>Author</label>
                        <input type='text' id='author' ref={authorInputRef}/>
                    </div>
                    <div className={classes.control}>
                        <label htmlFor='text'>Text</label>
                        <textarea id='text' rows='5' ref={textInputRef}/>
                    </div>
                    <div className={classes.actions}>
                        <button onClick={finishEnteringHandler} className='btn'>Add Quote</button>
                    </div>
                </form>
            </Card>
        </>

    );
};

export default QuoteForm;
