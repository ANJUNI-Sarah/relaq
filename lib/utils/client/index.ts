import axios from "axios";

/**
 * BFF的實例
 */
export const client = axios.create({
    baseURL: "/api/bff",
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * 後端api的實例
 */
export const server = axios.create({
    baseURL: "http://localhost:8000/",
    headers: {
        "Content-Type": "application/json",
    },
});
