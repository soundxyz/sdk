import { useEffect } from 'react'
import { proxy, subscribe, useSnapshot } from 'valtio'

const isHydratedStore = proxy({
  isHydrated: false,
})

export function useHydration() {
  useEffect(() => {
    if (isHydratedStore.isHydrated) return

    isHydratedStore.isHydrated = true
  }, [])

  return useSnapshot(isHydratedStore).isHydrated
}

export function onHydration(cb: () => void) {
  if (isHydratedStore.isHydrated) return cb()

  const unsub = subscribe(isHydratedStore, () => {
    if (isHydratedStore.isHydrated) {
      cb()
      unsub()
    }
  })

  return unsub
}
