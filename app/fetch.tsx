"use client";

import { client } from "@/lib/utils/client";
import { useEffect, useState, useMemo } from "react";
import bffApi from "@/bff/routes";

export default function Page() {
    const [response, setResponse] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await client.post(bffApi.home.init.path);
            setResponse(result.data);
        };

        fetchData();
    }, []);

    return <>{response}</>;
}
