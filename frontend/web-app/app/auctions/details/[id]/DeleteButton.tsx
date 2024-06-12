'use client'

import { deleteAuction } from '@/app/actions/auctionActions';
import { Button } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
    id: string
}
 
 export default function DeleteButton({id}: Props) {
    const [loading, setloading] = useState(false);
    const router = useRouter();

    function doDelete(){
        setloading(true);
        deleteAuction(id).then(res => {
            if(res.error) throw res.error;
            router.push('/');
        }).catch(error => {
            toast.error(error.status + ' ' + error.message)
        }).finally(() => setloading(false))
    }

   return (
     <Button color='failure' onClick={doDelete} outline isProcessing={loading}>Delete Auction</Button>
   )
 }
 