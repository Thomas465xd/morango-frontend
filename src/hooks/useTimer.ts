import { useEffect, useState } from "react";

export const useTimer = (expiresAt: string) => {
    const [timeRemaining, setTimeRemaining] = useState<string>("");

    useEffect(() => {
        if (!expiresAt) return;

        const updateTimer = () => {
            const now = new Date();
            const expiry = new Date(expiresAt);

            const diffMs = expiry.getTime() - now.getTime();

            // If timer gets to 0 or below, then set timeRemaining to Expired and return. 
            if (diffMs <= 0) {
                setTimeRemaining("Expired");
                return;
            }

            const diffMins = Math.floor(diffMs / 60000);
            const hours = Math.floor(diffMins / 60);
            const minutes = diffMins % 60;
            const seconds = Math.floor((diffMs % 60000) / 1000);

            if (hours > 0) {
                setTimeRemaining(`${hours}h ${minutes}m ${seconds}s`);
            } else {
                setTimeRemaining(`${minutes}m ${seconds}s`);
            }
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

    return timeRemaining;
};
