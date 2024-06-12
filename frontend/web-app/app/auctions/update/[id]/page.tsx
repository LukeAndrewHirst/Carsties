import Heading from '@/app/components/Heading'
import React from 'react'
import AuctionForm from '../../AuctionForm'
import { getDetailedView } from '@/app/actions/auctionActions'

export default async function Udate({params}: {params: {id: string}}) {
  const data = await getDetailedView(params.id)
  return (
    <div className='mx-auto max-w-[75%] shadow-lg p-10 bg-white rounded-lg'>
      <Heading title='Update Auction' subtitle='Update details of the car' />
      <AuctionForm auction={data} />
    </div>
  )
}