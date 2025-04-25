import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({ addressInfo, handleDleteAddress, handleEditAddress, isSelected, onSelect }) => {
  return (
    <Card
      onClick={onSelect}
      className={`cursor-pointer ${isSelected ? "border-2 border-blue-500" : ""}`}
    >
      <CardContent className="grid p-4 gap-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pincode: {addressInfo?.pincode}</Label>
        <Label>Phone: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex px-3 items-center justify-start gap-6">
        <Button onClick={() => handleEditAddress(addressInfo)}>Edit</Button>
        <Button onClick={() => handleDleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
    </Card>
  );
};


export default AddressCard