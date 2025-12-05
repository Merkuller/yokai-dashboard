import { Yokai } from '@/entities/yokai/model/types'

export async function getAnomalies(): Promise<Yokai[]> {
  const res = await fetch('/api/anomalies', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch anomalies')
  return res.json()
}

export async function captureYokai(id: number) {
  const res = await fetch('/api/anomalies', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  })
  if (!res.ok) {
    const data = await res.json().catch(() => ({}))
    throw new Error(data.message || 'Capture failed')
  }
  return res.json()
}