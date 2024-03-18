import React from 'react'

import { useUserContext} from '@/context/userData';
function page() {
  const { userId, username } = useUserContext();

  return (
    <div>
 <p>     userid{userId}</p>
 <p>username:{username}</p>
      
    </div>
  )
}

export default page
