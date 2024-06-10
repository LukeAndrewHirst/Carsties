'user client'


import React from 'react'
import Heading from '../components/Heading';
import { getSession } from '../actions/authActions';
import AuthTest from './AuthTest';
import { getTokenWorkaround } from '../actions/auctionActions';

export default async function Session() {
    const session = await getSession();
    const token = await getTokenWorkaround();

  return (
    <div>
        <Heading title="Session Dashboard" />
        <div className='bg-blue-200 border-2 border-blue-500'>
            <h3 className='text-lg'>Session Data</h3>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
        <div className='mt-4'><AuthTest /></div>
        <div className='bg-green-200 border-2 border-green-500 mt-4'>
            <h3 className='text-lg'>Token Data</h3>
            <pre className='overflow-auto'>{JSON.stringify(token, null, 2)}</pre>
        </div>
    </div>
  )
}
