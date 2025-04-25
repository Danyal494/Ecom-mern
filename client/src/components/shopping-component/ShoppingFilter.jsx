import { filterOptions } from '@/config/FormControls'
import React, { Fragment } from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const ProductFilter = ({filter,handleFilter}) => {
  return (
    <div className='bg-background rounded-lg '>
      <div className='p-4 border-b'>
        <h2 className='text-lg font-bold'>Filters</h2>
      </div>
      <div className='p-4 space-y-4'>
{
  Object.keys(filterOptions).map(KeyItem=> <Fragment key={KeyItem}>
    <div>
      <h3 className='text-base font-semibold'>{KeyItem}</h3>
      <div className='grid gap-2 mt-2'> {
        filterOptions[KeyItem].map(option=> <Label className="flex items-center gap-2 font-normal">
          <Checkbox checked={filter && Object.keys(filter).length > 0 && filter[KeyItem] && filter[KeyItem].indexOf(option.id) > -1 } onCheckedChange={()=>handleFilter(KeyItem,option.id)} />
{option.label}
        </Label>)
        } </div>
    </div>
    {/* <Separator/> */}
  </Fragment>)
}
      </div>
    </div>
  )
}

export default ProductFilter


// 6:20:9