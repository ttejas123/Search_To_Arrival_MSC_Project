import React from 'react'
import Button from '../../BaseComponent/Button'

interface ProfileUserInfoWithWalletButtonProps {
  logo: string,
  name: string
}

function ProfileUserInfoWithWalletButton({logo, name}:ProfileUserInfoWithWalletButtonProps) {
  return (
    <div className='flex justify-between items-end'>
        <div className='flex'>
            <div className='w-24 h-24 rounded-xl bg-base-300 mb-4 p-1'>
              <img src={`https://static.zollege.in/${logo}`} className='w-full h-full rounded-lg' />
            </div>
            <div className='ml-4 flex flex-col py-3 justify-between'>
                <div className='text-base-bold text-gray-600'>Welcome to</div>
                <div className='text-base-bold font-extrabold'>{name}</div>
            </div>
        </div>
        <div className='py-4'>
            <Button className='px-10' type='warning'>ABCW...ZXYZ</Button>
        </div>
    </div>
  )
}

export default ProfileUserInfoWithWalletButton