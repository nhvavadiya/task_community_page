import { Box } from '@mui/material'
import DisplayComment from './DisplayComment'
import { CommentType } from '../interface/common'

interface RecursiveCommentsProps {
    comment: CommentType,
    handleSendReply: () => void
}

const RecursiveComments = ({ comment, handleSendReply }: RecursiveCommentsProps) => {
    return (
        <Box>
            <DisplayComment
                author={comment.author}
                commentId={comment.commentId}
                content={comment.content}
                timestamp={comment.timestamp}
                handleSendReply={handleSendReply}
            />
            {comment.replies.length > 0 && (
                <Box ml={4}> {/* Indent each level */}
                    {comment.replies.map((nestedComment: CommentType, index: number) => (
                        <RecursiveComments key={index} comment={nestedComment} handleSendReply={handleSendReply} />
                    ))}
                </Box>
            )}
        </Box>
    )
}

export default RecursiveComments
