import { NextRequest } from 'next/server'

const threatLevels = ['Low', 'Medium', 'High', 'Critical'] as const

export async function GET(_req: NextRequest) {
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()

      const interval = setInterval(() => {
        const randomId = Math.floor(Math.random() * 3) + 1 // id 1–3
        const randomLevel =
          threatLevels[Math.floor(Math.random() * threatLevels.length)]

        const data = JSON.stringify({ id: randomId, threatLevel: randomLevel })
        controller.enqueue(encoder.encode(`data: ${data}\n\n`))
      }, 5000)

      const sendPing = setInterval(() => {
        controller.enqueue(encoder.encode(': ping\n\n'))
      }, 15000)

      return () => {
        clearInterval(interval)
        clearInterval(sendPing)
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  })
}