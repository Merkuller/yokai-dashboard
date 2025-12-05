import { NextRequest } from 'next/server'

type Yokai = {
  id: number
  name: string
  threatLevel: 'Low' | 'Medium' | 'High' | 'Critical'
  location: string
  status: 'Active' | 'Captured'
}

let anomalies: Yokai[] = [
  { id: 1, name: 'Kitsune', threatLevel: 'Medium', location: 'Shibuya', status: 'Active' },
  { id: 2, name: 'Onryo', threatLevel: 'Critical', location: 'Asakusa', status: 'Active' },
  { id: 3, name: 'Tengu', threatLevel: 'Low', location: 'Akihabara', status: 'Captured' },
]

export async function GET() {
  return Response.json(anomalies)
}

export async function POST(req: NextRequest) {
  const { id } = await req.json() as { id: number }

  // 30% шанс ошибки
  if (Math.random() < 0.3) {
    return new Response(JSON.stringify({ message: 'Capture failed' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  anomalies = anomalies.map((y) =>
    y.id === id ? { ...y, status: 'Captured' } : y
  )

  return Response.json({ success: true })
}