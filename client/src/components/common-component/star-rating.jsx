

import React from 'react'
import { Button } from '../ui/button'
import { StarIcon } from 'lucide-react'

const StarRating= ({rating,handleRatingCahange}) => {
    console.log(rating)
  return (
    [1,2,3,4,5].map(star=> <Button onClick={()=>handleRatingCahange ? handleRatingCahange(star) : null}  className= {`mx-1 transition-colors ${star <= rating ? 'text-yellow-400 hover:bg-black' : 'text-black hover:bg-primary hover:text-primary-foreground' }`} size="icon"  variant="outline" ><StarIcon className={`${star <= rating ? 'fill-yellow-400  ' : 'fill-white ' }`} /></Button>)
  )
}

export default StarRating