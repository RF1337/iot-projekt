"use client"

import { useEffect, useState } from "react"

export type SystemStatus = "Online" | "Offline" | "Checking" | "No sensor"

export function useBrowserStatus() {
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const updateStatus = () => setOnline(navigator.onLine)
    updateStatus()
    window.addEventListener("online", updateStatus)
    window.addEventListener("offline", updateStatus)

    return () => {
      window.removeEventListener("online", updateStatus)
      window.removeEventListener("offline", updateStatus)
    }
  }, [])

  return {
    online,
    status: (online ? "Online" : "Offline") as SystemStatus,
  }
}