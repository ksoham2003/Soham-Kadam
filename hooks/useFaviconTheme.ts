"use client"

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export function useFaviconTheme() {
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const currentTheme = theme === 'system' ? systemTheme : theme
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement
    const appleTouchIcon = document.querySelector("link[rel*='apple-touch-icon']") as HTMLLinkElement

    if (currentTheme === 'dark') {
      if (favicon) {
        favicon.href = '/dark_mode.ico' // or .png, .svg based on your file
      }
      if (appleTouchIcon) {
        appleTouchIcon.href = '/dark_mode.png'
      }
    } else {
      if (favicon) {
        favicon.href = '/light_mode.ico'
      }
      if (appleTouchIcon) {
        appleTouchIcon.href = '/light_mode.png'
      }
    }
  }, [theme, systemTheme])
}