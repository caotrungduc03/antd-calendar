import { useEffect, useState } from 'react'

export const useEffectAfterMounted = (
  callback: () => void,
  dependencies: any[]
) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!mounted) {
      setMounted(true)
      return
    }
    return callback()
  }, dependencies)
}
