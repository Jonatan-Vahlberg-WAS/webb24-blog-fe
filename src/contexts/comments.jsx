import { createContext, useContext, useEffect, useState } from "react"
import { useUser } from "./user"


const defaultState = {
    comments: [],
    actions: {
        getComments: () => Promise.resolve(),
        createComment: (content, onSuccess = () => {}) => Promise.resolve()
    }
}

const CommentContext = createContext(defaultState)

const CommentProvider = ({postId, children}) => {
    const user = useUser()
    const [comments, setComments] = useState(defaultState.comments)

    useEffect(() => {
        getComments()
    },[])

    const getComments = async () => {
        const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/comments/posts/${postId}/comments/`);
        const response = await fetch(url)
        if(response.ok) {
            const comments = await response.json()
            setComments(comments)
        }
    }

    const createComment = async (content, onSuccess = () => {}) => {
        if(!user.user) {
            return 
        }
        try {

            const url = new URL(`${import.meta.env.VITE_BACKEND_URL}/api/comments/posts/${postId}/comments/`);
            const response = await fetch(url,{
                method: "POST",
                body: JSON.stringify({
                    content,
                    post: postId,
                    user: user.userId
                }),
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": user.actions.getAuthorizationHeader() 
            },
            })
            if(response.ok) {
                getComments()
                onSuccess()
            }
        } catch (error) {
            console.warn("Error in creating comment", error)
        }
    }

    return (
        <CommentContext.Provider value={{
            comments,
            actions: {
                getComments,
                createComment
            }
        }}>
            {children}
        </CommentContext.Provider>
    )
}

const useComments = () => {
    const comments = useContext(CommentContext)
    return comments
}

export {
    CommentProvider,
    useComments
}