import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUserAddress } from "../../Features/Addresses/UserAddressSlice";

const ViewAddressesHook = () => {
  const dispatch = useDispatch();

  const addresses = useSelector(
    (state) => state.userAddress.allAddresses ?? []
  );
  const loading = useSelector((state) => state.userAddress.loading);
  // console.log(addresses); //[{},{}]
  useEffect(() => {
    dispatch(getAllUserAddress());
  }, [dispatch]);

  return {
    addresses,
    loading,
  };
};

export default ViewAddressesHook;
