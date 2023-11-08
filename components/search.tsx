'use client'

/* eslint-disable react/no-unescaped-entities */
import { HiXCircle } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { useState } from 'react'

const Search = ({ user, setUser, setData }: {
  user: string, setUser: Function, setData: Function
}) => {
  const [value, setValue] = useState('')

  const handleOnKey = (event:any) => {
    if (event.key === 'Enter' || event.key === 13) {
      setUser(value)
    }
  }

  const handleSearchUser = () => {
    if (value.length > 0) setUser(value)
  }

  return (
    <div className='border-b border-gray-400/50 space-y-2 py-4'>
      <div className='relative'>
        <input
          className='w-full outline-none border border-gray-400 rounded-md px-4 py-2'
          placeholder='Search User...'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleOnKey}
        />
        {
          value?.length > 0 && <HiXCircle
            className='h-5 w-5 text-gray-400 absolute right-2 top-[11px] cursor-pointer'
            onClick={() => {
              setValue('')
              setUser('')
              setData()
            }}
          />
        }
      </div>
      <button
        className='bg-green-700 text-white px-4 py-2 w-full rounded-md flex justify-center items-center focus:outline focus:outline-2 focus:outline-offset-0 focus:outline-gray-200'
        onClick={() => handleSearchUser()}
      >
        Search
        <BiSearch className='h-5 w-5 ml-2' />
      </button>
      {
        user !== '' && <span className='block text-gray-400'>Showing users for "{ user }"</span>
      }
    </div>
  )
}

export default Search
