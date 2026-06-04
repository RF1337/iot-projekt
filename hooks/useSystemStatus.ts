"use client"

import { useApiStatus } from "./useApiStatus"
import { useBrowserStatus } from "./useBrowserStatus"
import { useDeviceStatus } from "./useDeviceStatus"

interface UseSystemStatusOptions {
  deviceLoading: boolean
  hasSensor: boolean
  lastReadingAt: Date | null
  offlineAfterSeconds: number
}

export function useSystemStatus({
  deviceLoading,
  hasSensor,
  lastReadingAt,
  offlineAfterSeconds,
}: UseSystemStatusOptions) {
  const api = useApiStatus()
  const browser = useBrowserStatus()
  const device = useDeviceStatus({
    hasSensor,
    lastReadingAt,
    loading: deviceLoading,
    offlineAfterSeconds,
  })
  const statuses = [api.status, browser.status, device.status]
  const hasFailure = statuses.some((status) => status === "Offline" || status === "No sensor")

  return {
    api,
    browser,
    device,
    hasFailure,
  }
}
