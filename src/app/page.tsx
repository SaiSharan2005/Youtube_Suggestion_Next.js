"use client"

import { useRouter } from 'next/router';
const handleClick = () => {
  const router = useRouter();
  router.push('/new-page');  
};
export default function Page() {
   
 
  return (
    <button type="button" onClick={ handleClick}>
      Dashboard : {}
    </button>



  )
}