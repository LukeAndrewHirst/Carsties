
import React from 'react'
import { Auction, AuctionFinished } from '../types'
import Link from 'next/link'
import Image from 'next/image'
import { numberWithCommas } from '../lib/numberWithComma'

type Props = {
    finishedAuction: AuctionFinished,
    auction: Auction
}

export default function AuctionFinishedToast({auction, finishedAuction}: Props) {
  return (
    <Link href={`/auctions/details/${auction.id}`} className='flex flex-col items-center'>
        <div className='flex flex-row items-center gap-2'>
            <Image src={auction.imageUrl} alt='image' height={80} width={80} className='rounded-lg w-auto h-auto' />
            <div className='flex flex-col'>
                <span> New for {auction.make} {auction.model} has finished</span>
                {finishedAuction.itemSold && finishedAuction.amoount ? (
                    <p>Contratulations {finishedAuction.winner} who has won the auction for $${numberWithCommas(finishedAuction.amoount)}</p>) : (<p>Item went unsold</p>)
                }
            </div>
        </div>
    </Link>
  )
}
