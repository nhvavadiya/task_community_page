import { Avatar, Box, Button, FormControl } from '@mui/material'
import { getFirstTwoLetters } from '../helper'
import DisplayComment from './DisplayComment'
import RecursiveComments from './RecursiveComments'
import { useDispatch, useSelector } from 'react-redux'
import { updateValue } from '../postCommentSlice'
import { CommentReduxState, CommentType, PostType } from '../interface/common'
import CustomInput from './CustomInput'

interface CommnetsPops {
    item: PostType
    handleSendReply: () => void
    handleSendComment: () => void
}

const Comments = ({ item, handleSendReply, handleSendComment }: CommnetsPops) => {
    const dispatch = useDispatch();
    const replyComment = useSelector(
        (state: CommentReduxState) => state.postComment.replyComment
    );

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        dispatch(
            updateValue({
                name: "replyComment",
                val: e.target.value,
            }))
    }
    return (
        <Box >
            <Box sx={{ display: "flex", gap: 1 }}>
                <Avatar sx={{ bgcolor: '#e91e63' }}>{getFirstTwoLetters("John Smith")}</Avatar>
                <FormControl sx={{ width: "100%", height: '40px' }} variant="outlined">
                    <CustomInput
                        value={replyComment}
                        handleChangeInput={handleChangeInput}
                    />
                </FormControl>
                {replyComment.length > 0 && <Button onClick={handleSendComment}>Comment</Button>}
            </Box>

            <Box sx={{ mt: 1.5 }}>
                {item?.comments?.map((com: CommentType, index: number) => {
                    return (
                        <Box key={index}>
                            <DisplayComment author={com.author} commentId={com.commentId} content={com.content} timestamp={com.timestamp} handleSendReply={handleSendReply} />
                            {com.replies.length > 0 && (
                                <Box ml={4}> {/* Indentation for replies */}
                                    {com.replies.map((reply: CommentType, replyIndex: number) => (
                                        <RecursiveComments key={replyIndex} comment={reply} handleSendReply={handleSendReply} />
                                    ))}
                                </Box>
                            )}
                        </Box>)
                })}
            </Box>
        </Box >

    )
}

export default Comments