import {useCallback, useEffect, useState} from 'react';

import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import {useParams} from "react-router-dom";
import useHttp from "../hooks/use-http";
import {getAllComments} from "../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "./CommentsList";


const Comments = () => {
    const {sendRequest, status, data: loadedComments} = useHttp(getAllComments);
    const params = useParams();
    const {quoteId} = params;
    const [isAddingComment, setIsAddingComment] = useState(false);

    useEffect(()=>{
        sendRequest(quoteId)
    }, [quoteId, sendRequest]);

    const addNewCommentHandler = useCallback(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId]);

    const startAddCommentHandler = () => {
        setIsAddingComment(true);
    };

    let comments;

    if (status === "pending") {
        comments = <div className="centered">
            <LoadingSpinner/>
        </div>
    }

    if (status === "completed" && (loadedComments && loadedComments.length > 0)) {
        comments = <CommentsList comments={loadedComments} />
    }
    if (status === "completed" && (!loadedComments || loadedComments.length === 0)) {
        comments = <div className="centered">No comments were added yet!</div>
    }

    return (
        <section className={classes.comments}>
            <h2>User Comments</h2>
            {!isAddingComment && (
                <button className='btn' onClick={startAddCommentHandler}>
                    Add a Comment
                </button>
            )}
            {isAddingComment && <NewCommentForm onAddedComment={addNewCommentHandler} quoteId={quoteId}/>}
            {comments}
        </section>
    );
};

export default Comments;

