'use client'

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import type { Yokai } from '@/entities/yokai/model/types'

type EventData = {
  id: number
  threatLevel: Yokai['threatLevel']
}

export function useThreatStream() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const eventSource = new EventSource('/api/sse')

    eventSource.onmessage = (event) => {
      try {
        const data: EventData = JSON.parse(event.data)

        queryClient.setQueryData<Yokai[]>(['anomalies'], (prev) => {
          if (!prev) return prev
          return prev.map((yokai) =>
            yokai.id === data.id
              ? { ...yokai, threatLevel: data.threatLevel }
              : yokai
          )
        })
      } catch {
        // ignore parse errors
      }
    }

    eventSource.onerror = () => {
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [queryClient])
}