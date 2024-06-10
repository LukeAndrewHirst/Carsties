import EmptyFilter from '@/app/components/EmptyFilter'
import React from 'react'

export default function Page({searchParams}: {searchParams: {callbackUrl: string}}) {
  return (
    <EmptyFilter title='You can only view session data when logged in' subtitle='Please click the signin button' showLogin callbackUrl={searchParams.callbackUrl} />
  )
}
