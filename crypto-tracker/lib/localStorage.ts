// Helper functions to save and load state from localStorage

export const saveState = (key: string, state: any) => {
  try {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state)
      localStorage.setItem(key, serializedState)
    }
  } catch (err) {
    // Ignore write errors
    console.warn("Error saving state to localStorage:", err)
  }
}

export const loadState = (key: string) => {
  try {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      const serializedState = localStorage.getItem(key)
      if (serializedState === null) {
        return undefined
      }
      return JSON.parse(serializedState)
    }
    return undefined
  } catch (err) {
    // If there's an error, return undefined to use default state
    console.warn("Error loading state from localStorage:", err)
    return undefined
  }
}

export const removeState = (key: string) => {
  try {
    // Only run in browser environment
    if (typeof window !== "undefined") {
      localStorage.removeItem(key)
    }
  } catch (err) {
    console.warn("Error removing state from localStorage:", err)
  }
}
