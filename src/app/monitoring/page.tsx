'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { Yokai } from '@/entities/yokai/model/types'
import { YokaiCard } from '@/entities/yokai/ui/YokaiCard'
import { CaptureButton } from '@/features/yokai/capture/ui/CaptureButton'
import { getAnomalies, captureYokai } from '@/shared/api/anomalies'
import { useThreatStream } from '@/shared/lib/useThreatStream'

export default function MonitoringPage() {
  const queryClient = useQueryClient()
  useThreatStream()

  const { data, isLoading, error } = useQuery({
    queryKey: ['anomalies'],
    queryFn: getAnomalies,
  })

  const captureMutation = useMutation({
    mutationFn: captureYokai,
    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ['anomalies'] })
      const previous = queryClient.getQueryData<Yokai[]>(['anomalies'])

      if (previous) {
        queryClient.setQueryData<Yokai[]>(['anomalies'], prev =>
          prev?.map(y =>
            y.id === id ? { ...y, status: 'Captured' } : y
          ) ?? prev
        )
      }

      return { previous }
    },
    onError: (err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['anomalies'], context.previous)
      }
      toast.error(err instanceof Error ? err.message : 'Capture failed')
    },
    onSuccess: () => {
      toast.success('Yokai captured!')
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['anomalies'] })
    },
  })

  if (isLoading) return <div>Загрузка аномалий...</div>
  if (error) return <div>Ошибка загрузки</div>

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ marginBottom: '2rem' }}>Yokai Monitoring Dashboard</h1>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {data?.map((yokai) => (
          <YokaiCard
            key={yokai.id}
            yokai={yokai}
            actions={
              <CaptureButton
                status={yokai.status}
                disabled={yokai.status === 'Captured'}
                loading={captureMutation.isPending}
                onClick={() => captureMutation.mutate(yokai.id)}
              />
            }
          />
        ))}
      </div>
    </main>
  )
}