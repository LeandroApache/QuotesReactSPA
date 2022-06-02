import {useEffect, useRef} from 'react';

import classes from './NewCommentForm.module.css';
import useHttp from "../hooks/use-http";
import {addComment} from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

const NewCommentForm = ({onAddedComment, quoteId}) => {
    const {sendRequest, status, error} = useHttp(addComment);

    //useEffect for call onAddedComment in parent component and fetch new comments
    useEffect(() => {
        if (status === "completed" && !error) {
            onAddedComment();
        }
    }, [status, onAddedComment, error]);

    const commentTextRef = useRef();

    const submitFormHandler = (event) => {
        event.preventDefault();

        // optional: Could validate here

        sendRequest({commentData: {text: commentTextRef.current.value}, id: quoteId})
    };

    return (
        <form className={classes.form} onSubmit={submitFormHandler}>
            {status === 'pending' && <div className="centered">
                <LoadingSpinner/>
            </div>}
            <div className={classes.control} onSubmit={submitFormHandler}>
                <label htmlFor='comment'>Your Comment</label>
                <textarea id='comment' rows='5' ref={commentTextRef}/>
            </div>
            <div className={classes.actions}>
                <button className='btn'>Add Comment</button>
            </div>
        </form>
    );
};

export default NewCommentForm;
