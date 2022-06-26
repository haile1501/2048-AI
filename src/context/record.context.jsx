import { useState, createContext } from "react";

export const RecordContext = createContext({
    record: null,
    setRecord: () => null
});

export const RecordProvider = ({ children }) => {
    const [record, setRecord] = useState([]);

    const value = {record, setRecord};

    return (
        <RecordContext.Provider value={value}>
            {children}
        </RecordContext.Provider>
    )
}