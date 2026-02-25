function debounce(func, delay) {
    let timeoutId;
    
    return function (...args) {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    };
}

const search = (query) => {
    console.log("Searching for:", query);
};

// Create debounced version ONCE
const debouncedSearch = debounce(search, 300);

// Call this instead
debouncedSearch("h");
debouncedSearch("he");
debouncedSearch("hel");
debouncedSearch("hell");
debouncedSearch("hello");
debouncedSearch("hello w");
debouncedSearch("hello wo");
debouncedSearch("hello wor");
debouncedSearch("hello worl");
debouncedSearch("hello world");