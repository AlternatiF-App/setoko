'use client'

import CardUser from '@/components/card-user'
import Search from '@/components/search'
import { UserProps } from '@/interface/card.ts'
import axios from 'axios'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { AiOutlineGithub } from 'react-icons/ai'

const Home = () => {
  const [user, setUser] = useState('')
  const [data, setData] = useState<UserProps[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const getUsers = () => {
    setIsLoading(true)
    axios.get(`https://api.github.com/search/users?q=${user}`, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_GIT_TOKEN,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
      .then((results) => {
        setData(results.data.items)
        setInterval(() => {
          setIsLoading(false)
        }, 2000)
      })
      .catch((error) => {
        setData([])
        setIsLoading(false)
        toast.error(error.response.data.message)
      })
  }

  useEffect(() => {
    if (user.length > 0) getUsers()
  }, [user])

  return (
    <main className='container w-full lg:w-8/12 mx-auto py-6 px-4'>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />

      <Search
        user={user}
        setUser={setUser}
        setData={setData}
      />

      <div className='my-6'>
        {
          (data === undefined && !isLoading) && <div className='rounded-md border border-gray-400/50 px-4 py-12 flex flex-col items-center justify-center'>
            <AiOutlineGithub className='w-36 h-36 text-green-700' />
            <h1 className='font-bold'>Search Github User</h1>
          </div>
        }

        {
          (data?.length === 0 && !isLoading) && <div className='rounded-md border border-gray-400/50 px-4 py-12 flex flex-col items-center justify-center'>
            <AiOutlineGithub className='w-36 h-36 text-green-700' />
            <h1 className='font-bold'>Not Found</h1>
          </div>
        }

        <div className='space-y-2'>
          {
            (data?.length !== 0 && isLoading)
              ? <div role='status' className='flex flex-col items-center rounded-md border border-gray-400/50 px-4 py-24'>
                  <svg aria-hidden='true' className='inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-400/50 fill-green-700' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor'/>
                    <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill'/>
                  </svg>
                  <span className='block font-bold mt-2'>Loading...</span>
                </div>
              : data?.map((data: UserProps, index: number) => (
                  <CardUser key={index} data={data} />
                ))
          }
        </div>
      </div>
    </main>
  )
}

export default Home
