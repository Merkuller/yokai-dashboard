'use client'

import styles from './CaptureButton.module.scss'

type Props = {
  disabled: boolean
  onClick: () => void
  status: 'Active' | 'Captured'
  loading: boolean
}

export function CaptureButton({ disabled, onClick, status, loading }: Props) {
  const isDisabled = disabled || loading

  return (
    <button
      className={`${styles.button} ${isDisabled ? styles.buttonDisabled : ''}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {status === 'Captured' ? 'Captured' : loading ? 'Capturing...' : 'Capture'}
    </button>
  )
}