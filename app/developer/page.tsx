import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import Image from 'next/image'
import React from 'react'
import Image1 from '@/public/images/1710529304549.jpeg.jpg';
import Image2 from "@/public/images/1733070759022.png";
import Image3 from "@/public/images/1735673424888.jpeg.jpg"
import  image4 from "@/public/images/image4 (2).jpg"
import imageicon from "@/public/images/instalogo.png"
import imageicon1 from "@/public/images/icons8-linkedin-48.png"
import imageicon2 from '@/public/images/icons8-github-64.png'
import imageicon3 from "@/public/images/icons8-twitter-30.png"
import Link from 'next/link';
const list = [
  {
    name: 'Bhuvan S A',
    linkedIn: 'https://www.linkedin.com/in/bhuvansa/',
    insta: '',
    twitter: '',
    github: 'https://github.com/BhuvanSA',
    image : Image1,
  },
  {
    name: 'Sohan K E',
    linkedIn: 'https://www.linkedin.com/in/sohan-kalburgi-225881277/',
    insta: '',
    twitter: '',
    github: 'https://github.com/Sohankalburgi',
    image : image4
  },
  {
    name: 'Rahul S Srivastava',
    linkedIn: 'https://www.linkedin.com/in/rahul-s-srivastava2112/',
    insta: '',
    twitter: '',
    github: 'https://github.com/Rahul-Srivastava-21',
    image : Image3
  },
  {
    name: 'Kottapalli Likhith Reddy',
    linkedIn: 'https://www.linkedin.com/in/kottapalli-likhith-reddy-86867922a/',
    insta: '',
    twitter: '',
    github: 'https://github.com/MrLynx8',
    image: Image2
  },
]

const Page = () => {
  return (
    <div className='mt-28 px-6'>
      <Card>
        <CardHeader>
          <h1 className='text-blue-800 text-center text-5xl font-bold'>
            Developer
          </h1>
        </CardHeader>
      </Card>

      <div className='grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3'>
        {list.map((person, index) => (
          <Card key={index} className='p-4 shadow-lg'>
            <CardHeader>
              <h2 className='text-lg font-bold text-center'>{person.name}</h2>
            </CardHeader>
            <CardContent className='flex items-center justify-center'>
                <Image 
                src={person.image}
                alt='image'
                className='rounded-full'
                width={250}
                />
            </CardContent>
            <CardFooter className='flex gap-3 items-center justify-center'>
                <Image
                src={imageicon}
                alt='image'
                width={50}
                />
                <Link href={person.linkedIn}>
                <Image
                src={imageicon1}
                alt='image'
                width={70}
                />
                </Link>
                <Link href={person.github}>
                <Image
                src={imageicon2}
                alt='image'
                width={70}
                />
                </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Page
