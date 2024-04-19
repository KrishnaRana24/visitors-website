"use client";
import { useEffect, useState } from "react";

type SetValue<T> = T | ((val: T) => T);

function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: SetValue<T>) => void] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window !== "undefined") {
        // Get from local storage by key if running in the browser
        const item = window.localStorage.getItem(key);
        // Parse stored JSON or return initialValue if none
        return item ? JSON.parse(item) : initialValue;
      }
    } catch (error) {
      // Log any errors
      console.error("Error retrieving data from localStorage:", error);
    }
    // Return initialValue as fallback
    return initialValue;
  });

  // useEffect to update local storage when the state changes
  useEffect(() => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore =
        typeof storedValue === "function"
          ? storedValue(storedValue)
          : storedValue;
      if (typeof window !== "undefined") {
        // Save state to local storage if running in the browser
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // Log any errors
      console.error("Error saving data to localStorage:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
