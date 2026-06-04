"use client"

import { useEffect, useState } from "react"
import { SystemStatus } from "./useBrowserStatus"

export function useApiStatus() {
  const [status, setStatus] = useState<SystemStatus>("Checking")

  useEffect(() => {
    async function checkApi() {
      try {
        const res = await fetch("/api/health", {
          cache: "no-store",
        })

        setStatus(res.ok ? "Online" : "Offline")
      } catch {
        setStatus("Offline")
      }
    }

    checkApi()

    const interval = setInterval(checkApi, 30000)

    return () => clearInterval(interval)
  }, [])

  return {
    online: status === "Online",
    status,
  }
}