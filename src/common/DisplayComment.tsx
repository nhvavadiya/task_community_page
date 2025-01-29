import {
    Avatar,
    Box,
    Button,
    FormControl,
    OutlinedInput,
    Typography,
} from "@mui/material";
import { getFirstTwoLetters } from "../helper";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { updateValue } from "../postCommentSlice";
import { CommentReduxState, User } from "../interface/common";

interface props {
    author: User;
    commentId: string;
    content: string;
    timestamp: string;
    handleSendReply: () => void;
}
const DisplayComment = ({
    author,
    commentId,
    content,
    timestamp,
    handleSendReply,
}: props) => {
    const dispatch = useDispatch();
    const selectedCommentId = useSelector(
        (state: CommentReduxState) => state.postComment.selectedCommentId
    );
    return (
        <Box sx={{ mt: 0.5 }}>
            <Box sx={{ display: "flex", gap: 1 }}>
                <Avatar sx={{ width: 30, height: 30, bgcolor: '#e91e63' }}>
                    <Typography fontSize={12}>
                        {getFirstTwoLetters(author.username)}</Typography>
                </Avatar>
                <Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                        <Typography fontWeight={800} fontSize={14}>
                            {author.username}
                        </Typography>{" "}
                        <Typography fontSize={12} color="#9e9e9e" alignSelf="center">
                            {dayjs(timestamp).format("MMM D, h:mm A")}
                        </Typography>
                    </Box>
                    <Typography fontSize={13}>{content}</Typography>

                    {selectedCommentId === commentId ? (
                        <Box sx={{ display: "flex" }}>
                            <FormControl
                                sx={{ width: "100%", height: "40px" }}
                                variant="outlined"
                            >
                                <OutlinedInput
                                    id="outlined-adornment-weight"
                                    fullWidth
                                    placeholder="Add Reply"
                                    sx={{
                                        borderRadius: "5px",
                                        height: "25px",
                                        fontSize: 12,
                                        "& ::placeholder": { fontSize: "small" },
                                    }}
                                    aria-describedby="outlined-weight-helper-text"
                                    inputProps={{
                                        "aria-label": "weight",
                                    }}
                                    onChange={(e) => dispatch(
                                        updateValue({
                                            name: "replyInput",
                                            val: e.target.value,
                                        })
                                    )}
                                />
                            </FormControl>{" "}
                            <Button
                                sx={{ height: "25px", padding: 0 }}
                                onClick={() => handleSendReply()}
                            >
                                Reply
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            onClick={() =>
                                dispatch(
                                    updateValue({
                                        name: "selectedCommentId",
                                        val: commentId,
                                    })
                                )
                            }
                            variant='text'
                            size="small"
                            sx={{ padding: 0 }}
                        >
                            reply
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default DisplayComment;
