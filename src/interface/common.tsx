
export interface User {
    userId: string;
    username: string;
    avatarUrl: string;
}

export interface Reply {
    commentId: string;
    content: string;
    author: User;
    timestamp: string;
    replies: Reply[];
}

export interface Image {
    name: string;
    data: string;
    title: string;
}
export interface CommentType {
    commentId: string;
    content: string;
    author: User;
    timestamp: string;
    replies: Reply[];
}

export interface PostType {
    id: string,
    description: string,
    images: string | null,
    createdAt: string,
    createdBy: string
    comments: CommentType[]
}

export interface CommentState {
    selectedPostId: string | null;
    selectedCommentId: string | null;
    replyInput: string;
    replyComment: string;
}

export interface CommentReduxState {
    postComment: CommentState
}