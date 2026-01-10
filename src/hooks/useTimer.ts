import { useEffect, useState } from "react";

export const useTimer = (expiresAt?: number) => {
    const [timeRemaining, setTimeRemaining] = useState<string>("");
    const [isExpired, setIsExpired] = useState(true);

    useEffect(() => {
        if (!expiresAt) {
            setIsExpired(true);
            setTimeRemaining("");
            return;
        }

        const updateTimer = () => {
            const now = Date.now();
            const diffMs = expiresAt - now;

            // If timer gets to 0 or below, then set timeRemaining to Expired and return. 
            if (diffMs <= 0) {
                setTimeRemaining("Expired");
                setIsExpired(true);
                return;
            }

            setIsExpired(false);

            const minutes = Math.floor(diffMs / 60000);
            const seconds = Math.floor((diffMs % 60000) / 1000);

            setTimeRemaining(`${minutes}m ${seconds}s`);
        };

        // Because update timer has not been called yet, now we are calling it
        updateTimer();

        // Once 1 second passes, update timer function is called again,
        // The updateTimer() call from above is not goint to be called again since
        // we are just calling the function
        const interval = setInterval(updateTimer, 1000);

        // This avoids maintaining the timer once we navigate away or if expiresAt Changes (not the timer set here)
        return () => clearInterval(interval);
    }, [expiresAt]);

    return { timeRemaining, isExpired };
};
