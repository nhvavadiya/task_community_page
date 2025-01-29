import {
    Avatar,
    Box,
    Button,
    Divider,
    ImageList,
    ImageListItem,
    Stack,
    Typography,
} from "@mui/material";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";
import { getFirstTwoLetters } from "../helper";
import { CommentReduxState, CommentType, PostType } from "../interface/common";
import Comments from "../common/Comments";
import { useDispatch, useSelector } from "react-redux";
import Profile from "../layout/Profile";
import { updateValue } from "../postCommentSlice";
import Trending from "../layout/Trending";

const Post = () => {
    const [postData, setPostData] = useState<Array<PostType> | null>(null);
    const [postId, setPostId] = useState<string>('');
    const [comment] = useState("");
    const [showComments, setShowComments] = useState(false);

    const selectedCommentId = useSelector(
        (state: CommentReduxState) => state.postComment.selectedCommentId
    );
    const replyInput = useSelector(
        (state: CommentReduxState) => state.postComment.replyInput
    );
    const replyComment = useSelector(
        (state: CommentReduxState) => state.postComment.replyComment
    );
    const dispatch = useDispatch();

    useEffect(() => {
        let temp = localStorage.getItem("posts");
        if (temp) {
            setPostData(JSON.parse(temp));
        } else {
            setPostData([]);
        }
    }, []);

    const handleCommentClick = (postId: string) => {
        setPostId(postId);
        setShowComments((prev) => !prev);
    };

    const generateCommentId = () => {
        return `cmt${Date.now()}`; // Unique ID based on timestamp
    };


    const handleSendReply = () => {
        let tempPostData = [...(postData || [])];

        const updateReplies = (comments: any) => {
            return comments.map((comment: any) => {
                // Check if the current comment is the one we need to update
                if (comment.commentId === selectedCommentId) {
                    return {
                        ...comment,
                        replies: [
                            ...comment.replies,
                            {
                                commentId: `cmt${Date.now()}`, // Generate a new commentId
                                content: replyInput,
                                author: {
                                    userId: "user007",
                                    username: "New User Reply",
                                    avatarUrl: "https://example.com/avatar007.png"
                                },
                                timestamp: new Date().toISOString(),
                                replies: []
                            }
                        ]
                    };
                }

                // Recursively check in replies if the commentId is not found at the top level
                if (comment.replies.length > 0) {
                    return {
                        ...comment,
                        replies: updateReplies(comment.replies)
                    };
                }

                return comment;
            });
        };
        let temp = tempPostData.map((post: PostType) => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: updateReplies(post.comments)
                };
            }
            return post;
        })

        setPostData(temp)

        localStorage.setItem('posts', JSON.stringify(temp))

        dispatch(
            updateValue({
                name: "replyInput",
                val: '',
            })
        )
        dispatch(
            updateValue({
                name: "selectedCommentId",
                val: null,
            })
        )
    };

    const handleSendComment = () => {
        let tempPostData = [...(postData || [])];
        const updatedPost =
            tempPostData.map((post: any) => {
                if (post.id === postId) {
                    return {
                        ...post,
                        comments: [
                            ...post.comments,
                            {
                                commentId: generateCommentId(),
                                content: replyComment,
                                author: {
                                    userId: "user006",
                                    username: "New User",
                                    avatarUrl: "https://example.com/avatar006.png",
                                },
                                timestamp: new Date().toISOString(),
                                replies: [],
                            },
                        ],
                    };
                }
                return comment;

            })

        localStorage.setItem('posts', JSON.stringify(updatedPost))
        setPostData(updatedPost)
        dispatch(
            updateValue({
                name: "replyComment",
                val: '',
            })
        )
        dispatch(
            updateValue({
                name: "selectedCommentId",
                val: null,
            })
        )


    }

    const countTotalComments = (comments: CommentType) => {
        let count = 0;

        const countReplies = (commentList: any) => {
            commentList.forEach((comment: any) => {
                count++; // Count the current comment
                if (comment.replies && comment.replies.length > 0) {
                    countReplies(comment.replies); // Recursively count replies
                }
            });
        };

        countReplies(comments);
        return count;
    };

    return (
        <Box sx={{ display: "flex", height: "100%", gap: 3, pt: 3 }}>
            <Box sx={{ width: "200px", background: "white", borderRadius: 2, display: { xs: 'none', md: 'block' } }}><Profile /></Box>
            <Box sx={{ width: "800px" }}>
                <Box
                    sx={{
                        height: "50px",
                        background: "white",
                        borderRadius: 2,
                        p: 1,
                        py: 2,
                        display: 'flex',
                        alignItems: 'center'
                    }}
                >
                    <CreatePost postData={postData} setPostData={setPostData} />
                </Box>
                <Box>
                    {postData ? postData.map((item: any, index: number) => {
                        return (
                            <Box
                                sx={{ background: "white", borderRadius: 2, mt: 2, p: 1 }}
                                key={index}
                            >
                                <Box display="flex" gap={1}>
                                    <Avatar sx={{ bgcolor: '#e91e63' }}>
                                        {getFirstTwoLetters(item.createdBy)}
                                    </Avatar>{" "}
                                    <Typography alignSelf="center" fontWeight={700}>
                                        {item.createdBy}
                                    </Typography>
                                </Box>
                                <Divider sx={{ my: 1 }} />
                                <Typography>{item.description}</Typography>
                                <ImageList cols={3}>
                                    {JSON.parse(item.images) &&
                                        JSON.parse(item.images).map((item: any) => (
                                            <ImageListItem
                                                key={item.data}
                                                sx={{ border: "1px solid lightgrey" }}
                                            >
                                                <img
                                                    src={`${item.data}`}
                                                    alt={item.title}
                                                    loading="lazy"
                                                />
                                            </ImageListItem>
                                        ))}
                                </ImageList>
                                <Stack flexDirection="row" justifyContent="flex-end">
                                    <Button onClick={() => handleCommentClick(item.id)} sx={{ width: 'fit-content', color: 'GrayText', padding: 0, textTransform: 'none' }}>{countTotalComments(item.comments)} comments</Button>
                                </Stack>
                                <Divider></Divider>
                                <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
                                    <Button>Like</Button>
                                    <Button onClick={() => handleCommentClick(item.id)}>Comment</Button>
                                    <Button>Repost</Button>
                                    <Button>Send</Button>
                                </Box>
                                {showComments && (
                                    <Box>
                                        <Comments
                                            item={item}
                                            handleSendReply={handleSendReply}
                                            handleSendComment={handleSendComment}
                                        />
                                    </Box>
                                )}
                            </Box>
                        )

                    })
                        :
                        "Loading"}
                </Box>
            </Box>
            <Box sx={{ width: "200px", background: "white", borderRadius: 2, display: { xs: 'none', lg: 'block' } }}><Trending /></Box>
        </Box>
    );
};

export default Post;
