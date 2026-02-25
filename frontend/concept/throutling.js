function throttle(func, delay) {
    let lastCall = 0;

    return function (...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;         
            func.apply(this, args);  
        }
    };
}

const sendchatmessage = (query) => {
    console.log("Searching for:", query);
};

const throttledSearch = throttle(sendchatmessage, 100*10);

throttledSearch("h");
throttledSearch("he");
throttledSearch("hel");
throttledSearch("hell");
throttledSearch("hello");
throttledSearch("hello w");
throttledSearch("hello wo");
throttledSearch("hello wor");
throttledSearch("hello worl");
throttledSearch("hello world");