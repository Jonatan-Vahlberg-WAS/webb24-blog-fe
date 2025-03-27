import { createContext, useContext } from "react"


const defaultState = {
    comments: [],
    actions: {
        getComments: () => Promise.resolve(),
        createComment: (content, onSuccess = () => {}) => Promise.resolve()
    }
}

const CommentContext = createContext(defaultState)

const CommentProvider = ({postId, children}) => {
    return (
        <CommentContext.Provider value={defaultState}>
            {children}
        </CommentContext.Provider>
    )
}

const useComments = () => {
    const comments = useContext(comments)
    return comments
}

export {
    CommentProvider,
    useComments
}