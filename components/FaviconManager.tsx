"use client"

import { useEffect } from 'react'
import { useTheme } from 'next-themes'

export default function FaviconManager() {
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const updateFavicon = () => {
      const currentTheme = theme === 'system' ? systemTheme : theme
      
      // Get all icon links
      const links = document.querySelectorAll("link[rel*='icon']")
      const appleTouchIcon = document.querySelector("link[rel*='apple-touch-icon']")
      
      // Determine which favicon to use based on theme
      const faviconPath = currentTheme === 'dark' ? '/dark_mode' : '/light_mode'
      
      // Update all icon links
      links.forEach(link => {
        const href = link.getAttribute('href')
        if (href) {
          // Preserve file extension
          const extension = href.split('.').pop()
          const newHref = `${faviconPath}.${extension}`
          link.setAttribute('href', newHref)
        }
      })
      
      // Update apple touch icon
      if (appleTouchIcon) {
        appleTouchIcon.setAttribute('href', `${faviconPath}.png`)
      }

      // Update manifest for PWA
      const manifest = document.querySelector("link[rel='manifest']")
      if (manifest) {
        manifest.setAttribute('href', `/manifest-${currentTheme}.json`)
      }
    }

    updateFavicon()
  }, [theme, systemTheme])

  return null
}