export type ThreatLevel = 'Low' | 'Medium' | 'High' | 'Critical'
export type YokaiStatus = 'Active' | 'Captured'

export type Yokai = {
  id: number
  name: string
  threatLevel: ThreatLevel
  location: string
  status: YokaiStatus
}