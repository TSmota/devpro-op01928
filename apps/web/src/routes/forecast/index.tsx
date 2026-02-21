import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/forecast/')({
  beforeLoad: () => {
    throw redirect({
      to: '/',
    })
  },
})

