import { createContext, useContext, useState } from "react";

const ContentContext = createContext();

export default function ContentProvider({ children }) {
    const [data, setData] = useState([]);

    const addContent = (content) => {
        setData((prev) => [...prev, { ...content, comments: [] }])
    }

    const editContent = (updatedContent) => {
        setData((prev) =>
            prev.map((item) =>
                item.id === updatedContent.id
                ? { ...updatedContent, comments: item.comments }
                : item
            )
        );
    }

    const deleteContent = (id) => {
        setData((prev) => prev.filter((item) => item.id != id))
    }

    const addComments = (id, comment) => {
        setData((prev) => prev.map((item) =>
            item.id === id ? {...item, comments:[...item.comments, comment]} : item
        ))
    }

    return (
        <ContentContext.Provider value={{ data, addComments, editContent, addContent, deleteContent }}>
            {children}
        </ContentContext.Provider>
    )

}

export const useContent = () => useContext(ContentContext);

/* now by doing this you can directly access useContent everywhere, without importing useContext in each file */

