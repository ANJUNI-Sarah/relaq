import { useState, ChangeEvent } from "react";

export const useSearch = (search: string) => {
    const [searchValue, setSearchValue] = useState(search);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
    };

    return {
        searchValue,
        handleSearchChange,
    };
};
