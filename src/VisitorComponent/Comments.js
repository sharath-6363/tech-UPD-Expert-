import React, { useState, useEffect, useContext } from 'react';
import { LuSend } from "react-icons/lu";
import { Visitorcontext } from "../Visitorcontext.js";
import axios from 'axios';
import { FaRegComment } from "react-icons/fa6";

export default function Comments(props) {
    const { viconst } = useContext(Visitorcontext);
    const [comments, setComments] = useState([]);
    const [newCommentText, setNewCommentText] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date());
    const [showReplyTextarea, setShowReplyTextarea] = useState({});
    const [viewReplies, setViewReplies] = useState({});
    const [replyText, setReplyText] = useState("");
    const [replies, setReplies] = useState({});
    const [viewcomment, setViewComment] = useState({});

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);

        return () => {
            clearInterval(timerID);
        };
    }, []);

    useEffect(() => {
        fetchComments();
    }, []);

    

    const tick = () => {
        setCurrentTime(new Date().toLocaleTimeString());
    };

    const fetchComments = async () => {
        try {
            const response = await axios.get("http://localhost:8080/getcomments");
            setComments(response.data);
        } catch (error) {
            console.error("Error fetching comments:", error);
        }
    };

    const fetchReplies = async (cid) => {
        try {
            const response = await axios.get(`http://localhost:8080/getreplaycom/${cid}`);
            setReplies({ ...replies, [cid]: response.data });
        } catch (error) {
            console.error("Error fetching replies:", error);
        }
    };

    const handleCommentChange = (e) => {
        setNewCommentText(e.target.value);
    };

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/postcoments", {
                commentText: newCommentText,
                username: viconst.uname,
                profileimage: viconst.image,
                timestamp: currentTime,
                ids: props.rid,
            });
            fetchComments();
            setNewCommentText("");
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleReplySubmit = async (id, replyText) => {
        try {
            const response = await axios.post(
                "http://localhost:8080/replaypost",
                {
                    commenttext: replyText,
                    profileimage: viconst.image,
                    timestamp: currentTime,
                    username: viconst.uname,
                    cid: id
                }
            );

            setReplies({ ...replies, [id]: [...(replies[id] || []), response.data] });
            setShowReplyTextarea({ ...showReplyTextarea, [id]: false });
            setReplyText("");
        } catch (error) {
            console.error("Error posting reply:", error);
        }
    };

    const handleReplyToggle = async (id) => {
        setShowReplyTextarea(prevState => ({ ...prevState, [id]: !prevState[id] }));
        if (!showReplyTextarea[id]) {
            await fetchReplies(id);
        }
    };

    const handleViewReplies = (id) => {
        setViewReplies(prevState => ({ ...prevState, [id]: !prevState[id] }));
        if (!viewReplies[id]) {
            fetchReplies(id);
        }
    };

    const handleViewComment = (id) => {
        setViewComment(prevState => ({ ...prevState, [id]: !prevState[id] }));
        if (!viewcomment[id]) {
            fetchComments(id);
        }
    };

    const handlereplayReject = async (id, username) => {
        try {
            if (viconst.uname === username) {
                const confirmed = window.confirm(
                    "Are you sure you want to delete this comment?"
                );
                if (confirmed) {
                    await axios.delete(`http://localhost:8080/deletreplay/${id}`);
                    alert("Comment Deleted");
                    fetchReplies();
                }
            } else {
                alert("You cannot delete this comment.");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
            alert("delete error")
        }
    }

    const handleReject = async (id, username) => {
        try {
            if (viconst.uname === username) {
                const confirmed = window.confirm(
                    "Are you sure you want to delete this comment?"
                );
                if (confirmed) {
                    await axios.delete(`http://localhost:8080/deletcomment/${id}`);
                    alert("Comment Deleted");
                    fetchComments();
                }
            } else {
                alert("You cannot delete this comment.");
            }
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    }

    return (
        <div>
            <button className='btn btn-primary w-25 text-center ' onClick={() => handleViewComment(comments.id)}>
                <FaRegComment className='fs-3 ' /> Comments</button>
            {viewcomment[comments.id] &&
                <div className="container mt-5 mb-5">
                    <div className="justify-content-center row d-flex card h-25">
                        <div className="d-fgd lex flex-column containers">
                            {comments.map((comment) =>
                                (comment.ids === props.rid) && (
                                    <div key={comment.id} className="commented-section mt-2">
                                        <div className="d-flex flex-row align-items-center commented-user">
                                            <img
                                                className="rounded-circle shadow-4-strong profileimage"
                                                src={comment.profileimage}
                                                alt="profiles"
                                            />
                                            <h5 className="mr-2 m-2">{comment.username}</h5>
                                            <span className="dot mb-1"></span>
                                            <span className="mb-1 ml-2">{comment.timestamp}</span>
                                        </div>
                                        <div className="comment-text-sm px-5">
                                            <span>{comment.commentText}</span>
                                            <div className="reply-section">
                                                <button
                                                    className="bg-white  text-primary border-0"
                                                    onClick={() => handleReplyToggle(comment.id)}
                                                >
                                                    Reply
                                                </button>
                                                {viconst.uname === comment.username && (
                                                    <button className="bg-white  text-danger border-0" onClick={() => handleReject(comment.id, comment.username)}>Delete</button>
                                                )}
                                                {showReplyTextarea[comment.id] && (
                                                    <>
                                                        <div className="d-flex">
                                                            <textarea
                                                                className="form-control w-25"
                                                                value={replyText}
                                                                onChange={(e) => setReplyText(e.target.value)}
                                                            />
                                                            <button
                                                                className="border-0 fs-3 bg-white text-success"
                                                                onClick={() => handleReplySubmit(comment.id, replyText)}
                                                            >
                                                                <LuSend />
                                                            </button>
                                                        </div>
                                                        <hr className="w-25" />
                                                    </>
                                                )}
                                            </div>
                                            <button
                                                className='border-0 bg-white text-primary px-lg-5'
                                                onClick={() => handleViewReplies(comment.id)}
                                            >
                                                --------View Replies---------
                                            </button>
                                            {viewReplies[comment.id] && (
                                                <div>
                                                    {replies[comment.id]?.map((reply) => (
                                                        <div key={reply.id} className="commented-section mt-2 px-lg-5">
                                                            <div className="d-flex flex-row align-items-center commented-user">
                                                                <img
                                                                    className="rounded-circle shadow-4-strong profileimage"
                                                                    src={reply.profileimage}
                                                                    alt="profiles"
                                                                />
                                                                <h5 className="mr-2 m-2">{reply.username}</h5>
                                                                <span className="dot mb-1"></span>
                                                                <span className="mb-1 ml-2">{reply.timestamp}</span>
                                                            </div>
                                                            <div className="comment-text-sm px-5">
                                                                <span>{reply.commenttext}</span>
                                                                <button className="bg-white  text-danger border-0" onClick={() => handlereplayReject(reply.id, reply.username)}>Delete</button>
                                                                <hr className="w-25" />

                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )
                            )}
                            <div className="coment-bottom bg-white p-2 px-4">
                                <form onSubmit={handleCommentSubmit}>
                                    <div className="d-flex flex-row add-comment-section mt-4 mb-4">
                                        <input
                                            type="text"
                                            className="form-control mr-3"
                                            placeholder="Add comment"
                                            value={newCommentText}
                                            onChange={handleCommentChange}
                                        />
                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                        >
                                            Comment
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}
