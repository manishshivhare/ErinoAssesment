import { useState, useMemo, useCallback } from 'react';

// Custom hook to handle search functionality
export const useSearch = (items) => {
    // State to store the current search query
    const [searchQuery, setSearchQuery] = useState("");

    // Handler function to update the search query state when the input changes
    const handleSearchChange = useCallback((event) => {
        setSearchQuery(event.target.value); // Updates the search query with the input value
    }, []); // The callback will be memoized, so it won't be recreated on every render

    // Memoized value for filtered items based on the search query
    const filteredItems = useMemo(() => {
        const query = searchQuery.toLowerCase().trim(); // Normalize the query by converting to lowercase and trimming whitespace
        
        // If no search query is entered, return the original list of items
        if (!query) return items;

        // Filter items based on the search query matching the full name or phone number
        return items.filter((item) => {
            // Combine first name and last name to form the full name
            const fullName = `${item.firstName} ${item.lastName}`.toLowerCase();
            // Normalize the phone number for case-insensitive comparison
            const phone = item.phone.toLowerCase();

            // Check if the query matches either the full name or the phone number
            return fullName.includes(query) || phone.includes(query);
        });
    }, [items, searchQuery]); // Recalculate filteredItems when items or searchQuery changes

    // Return the search query, the handler function for search input changes, and the filtered items
    return {
        searchQuery,
        handleSearchChange,
        filteredItems
    };
};
