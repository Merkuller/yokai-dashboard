'use client'

import { Yokai } from '../model/types'
import styles from './YokaiCard.module.scss'

type Props = {
  yokai: Yokai
  actions?: React.ReactNode
}

function getThreatClass(level: Yokai['threatLevel']) {
  switch (level) {
    case 'Low':
      return styles.dotLow
    case 'Medium':
      return styles.dotMedium
    case 'High':
      return styles.dotHigh
    case 'Critical':
      return styles.dotCritical
  }
}

export function YokaiCard({ yokai, actions }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.info}>
        <div className={styles.name}>{yokai.name}</div>
        <div className={styles.threat}>
          <span>Уровень: {yokai.threatLevel}</span>
          <span className={`${styles.dot} ${getThreatClass(yokai.threatLevel)}`} />
        </div>
        <div>Локация: {yokai.location}</div>
        <div>Статус: {yokai.status}</div>
      </div>
      {actions}
    </div>
  )
}