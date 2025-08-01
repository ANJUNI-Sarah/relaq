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
    baseURL: process.env.NEXT_PUBLIC_SERVER_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
});
