import { BiChevronDown } from 'react-icons/bi'
import { PiStarLight } from 'react-icons/pi'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

const CardUser = ({ data }: { data: any }) => {
  const [expand, setExpand] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [repos, setRepos] = useState<any>()

  const getRepo = () => {
    axios.get(data.repos_url, {
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: 'Bearer ' + process.env.NEXT_PUBLIC_GIT_TOKEN,
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })
      .then((results) => {
        setRepos(results.data)
        setIsLoading(false)
      })
      .catch((error) => {
        setRepos([])
        toast.error(error.response.data.message)
      })
  }

  useEffect(() => {
    if (expand) getRepo()
  }, [expand])

  return (
    <article>
      <div onClick={() => setExpand(!expand)} className='px-4 py-2 cursor-pointer flex items-center justify-between rounded-md border border-gray-400/50'>
        <div className='flex items-center space-x-2'>
          <Image
            className='h-5 w-5 rounded-full'
            alt={data.login}
            src={data.avatar_url}
            height={20}
            width={20}
          />
          <h1 className='font-bold'>{ data.login }</h1>
        </div>
        <BiChevronDown className={`h-5 w-5 transition-all ease-in-out duration-300 ${(expand && !isLoading) && 'rotate-180'}`} />
      </div>
      {
        (expand && repos?.length > 0 ) && <div className='mt-4 space-y-2'>
          {
            repos.map((repo: any, index: number) => (
              <div key={index} className='ml-4 px-4 py-2 rounded-md border border-gray-400/50'>
                <div className='flex items-center justify-between border-b border-gray-400/50 py-2'>
                  <h1>{ repo.name }</h1>
                  <div className='flex items-center text-sm'>
                    { repo.stargazers_count }
                    <PiStarLight className='h-6 w-6 ml-2' />
                  </div>
                </div>
                <span className='block text-gray-400' >{ repo.description === null ? '-' : repo.description }</span>
              </div>
            ))
          }
        </div>
      }
    </article>
  )
}

export default CardUser
