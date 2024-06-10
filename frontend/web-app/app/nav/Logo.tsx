'use client'

import React from 'react'
import { IoCarSportOutline } from 'react-icons/io5'
import { useParamsStore } from '../hooks/useParamsStore'
import { usePathname, useRouter } from 'next/navigation';

export default function Logo() {
  const router = useRouter();
  const pathname = usePathname();
  const reset = useParamsStore(state => state.reset);

  function doRest() {
    if(pathname !== '/') router.push('/');
    reset();
  }

  return (
    <div onClick={doRest} className='cursor-pointer flex items-center gap-2 text-xl font-semibold text-red-500'>
        <IoCarSportOutline size={34} />
        <div>Carsties Auctions</div>
    </div>
  )
}
