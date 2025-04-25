import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CommonForm from "../common-component/CommonForm";
import { addressFormControls } from "@/config/FormControls";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewAddress,
  deleteAdress,
  editAdress,
  fetchAllAdress,
} from "@/store/shop-slice/address-slice";
import AddressCard from "./AddressCard";
import { toast } from "sonner";

const initialAddressFormData = {
  address: "",
  city: "",
  pincode: "",
  phone: "",
  notes: "",
};
const ShoppingAddress = ({selectedAddress, setSelectedAddress }) => {
  const [formData, setFormData] = useState(initialAddressFormData);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const [currentEditAddress, setCurrentEditAddress] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { addressList } = useSelector((state) => state.shopAddress);
  // const [selectedAddress, setSelectedAddress] = useState(null);

  const dispatch = useDispatch();

  function handleManageAddress(event) {
    event.preventDefault();

    if (addressList.length >= 3 && currentEditAddress === null) {
      toast.error("you can add max 3 address");
      return;
    }

    currentEditAddress !== null
      ? dispatch(
          editAdress({
            userId: user?.id,
            addressId: currentEditAddress,
            formData,
          })
        ).then((data) => {
          if (data.payload?.success) {
            dispatch(fetchAllAdress(user?.id));
            setFormData(initialAddressFormData);
            setCurrentEditAddress(null);
            toast.success("Update Address successful!");
          }
        })
      : dispatch(
          addNewAddress({
            ...formData,
            userId: user?.id,
          })
        ).then((data) => {
          if (data.payload?.success) {
            dispatch(fetchAllAdress(user?.id));
            setFormData(initialAddressFormData);
            toast.success("Add New Address successful!");
          }
        });
  }

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== "")
      .every((item) => item);
  }

  useEffect(() => {
    dispatch(fetchAllAdress(user?.id));
  }, [dispatch]);

  function handleDleteAddress(getCurrentAddress) {
    dispatch(
      deleteAdress({ userId: user?.id, addressId: getCurrentAddress._id })
    ).then((data) => {
      if (data.payload?.success) {
        dispatch(fetchAllAdress(user?.id));
        toast.success("delete Address successful!");
      }
    });
  }

  function handleEditAddress(getCurrentAddress) {
    setCurrentEditAddress(getCurrentAddress?._id);
    setFormData({
      ...formData,
      address: getCurrentAddress?.address,
      city: getCurrentAddress?.city,
      pincode: getCurrentAddress?.pincode,
      phone: getCurrentAddress?.phone,
      notes: getCurrentAddress?.notes,
    });
  }
  return (
    <Card>
      <div className="mb-5 p-3 grid grid-cols-1 sm:grid-cols-2  gap-2">
        {addressList && addressList.length > 0
          ? addressList.map((singleAdressItem) => (
              <AddressCard
               handleEditAddress={handleEditAddress}
  handleDleteAddress={handleDleteAddress}
  addressInfo={singleAdressItem}
  isSelected={selectedAddress?._id === singleAdressItem._id}
  onSelect={() => setSelectedAddress(singleAdressItem)}
              />
            ))
          : null}
      </div>
      <CardHeader>
        <CardTitle>
          {currentEditAddress !== null ? "Edit Address" : " Add new Address "}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <CommonForm
          formControls={addressFormControls}
          formData={formData}
          setFormData={setFormData}
          buttonText={currentEditAddress !== null ? "Edit" : " Add  "}
          onSubmit={handleManageAddress}
          isBtnDisabled={!isFormValid()}
        />
      </CardContent>
    </Card>
  );
};

export default ShoppingAddress;
