import React, { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'

interface UserWithAvatar {
    url?: string,
    name: string
}

function Avatar({url, name}:UserWithAvatar) {
    const theme = useContext(ThemeContext)
  return (
    <div className='flex flex-1 justify-center items-center'>
        {
            url ? (
                <div className="avatar online">
                    <div className="w-12 rounded-full">
                        <img src={url} />
                    </div>
                </div>
            ) : (
                <div className="avatar placeholder border rounded-full border-neutral online">
                    <div className={`bg-neutral-focus ${theme.theme == "light" ? "text-neutral": "text-neutral-content"} rounded-full w-12`}>
                        <span>U</span>
                    </div>
                </div> 
            )
        }
        <div className='ml-2'>{name}</div>
    </div>
  )
}

export default Avatar