"use client"

import { useEffect, useState } from "react"

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const updateIsMobile = () => {
      setIsMobile(window.innerWidth <= 768) // Adjust width for mobile threshold
    }

    updateIsMobile() // Check on initial load
    window.addEventListener("resize", updateIsMobile)

    return () => window.removeEventListener("resize", updateIsMobile)
  }, [])

  return isMobile
}
