import { useState, useMemo, useCallback } from 'react';

export const useSearch = (items) => {
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value);
    }, []);

    const filteredItems = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();
        if (!query) return items;

        return items.filter((item) => {
            const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
            const phone = item.phone.toLowerCase();
            return fullName.includes(query) || phone.includes(query);
        });
    }, [items, searchQuery]);

    return {
        searchQuery,
        handleSearchChange,
        filteredItems
    };
};