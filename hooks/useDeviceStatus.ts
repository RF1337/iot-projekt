"use client"

import { useEffect, useState } from "react"
import { SystemStatus } from "./useBrowserStatus"

interface UseDeviceStatusOptions {
  hasSensor: boolean
  lastReadingAt: Date | null
  loading: boolean
  offlineAfterSeconds: number
}

function getSecondsSince(date: Date) {
  return Math.floor((Date.now() - date.getTime()) / 1000)
}

function formatRelative(seconds: number | null) {
  if (seconds === null) return "Opdaterer..."
  if (seconds < 60) return `${seconds}s siden`
  return `${Math.floor(seconds / 60)} min siden`
}

function formatTimestamp(date: Date | null) {
  if (!date) return "No reading"

  return date.toLocaleString("da-DK", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function useDeviceStatus({
  hasSensor,
  lastReadingAt,
  loading,
  offlineAfterSeconds,
}: UseDeviceStatusOptions) {
  const [secondsSinceUpdate, setSecondsSinceUpdate] = useState<number | null>(
    lastReadingAt ? getSecondsSince(lastReadingAt) : null
  )

  useEffect(() => {
    setSecondsSinceUpdate(lastReadingAt ? getSecondsSince(lastReadingAt) : null)

    const interval = setInterval(() => {
      setSecondsSinceUpdate(lastReadingAt ? getSecondsSince(lastReadingAt) : null)
    }, 1000)

    return () => clearInterval(interval)
  }, [lastReadingAt])

  const checking = loading && hasSensor && secondsSinceUpdate === null
  const status: SystemStatus = !hasSensor
    ? "No sensor"
    : checking
    ? "Checking"
    : secondsSinceUpdate !== null && secondsSinceUpdate < offlineAfterSeconds
    ? "Online"
    : "Offline"

  return {
    checking,
    lastSentLabel: formatTimestamp(lastReadingAt),
    lastUpdatedLabel: formatRelative(secondsSinceUpdate),
    online: status === "Online",
    secondsSinceUpdate,
    status,
  }
}
