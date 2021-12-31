import React, { createContext } from "react"

export const MovieContext = createContext()

export const MovieProvider = props => {

    const truncate = (str, num) => {
        if (str.length > num) {
            return str.slice(0, num) + "...";
        } else {
            return str;
        }
    }

    return (
        <MovieContext.Provider value={{
            truncate
        }}>
            {props.children}
        </MovieContext.Provider>
    );
}