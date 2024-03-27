import React, { useState, useEffect } from "react";
import Select from "react-select";
import toast from "react-hot-toast";
import { stateAbbreviations, map, logisticsInfo } from "./au.js";
import {
  calculateVolumetricWeight,
  calculateWeight,
  calculateBaseCharge,
  calculateAdditionalCharges,
  recalculateCharge,
  calculateFuelSurchargeAndGST,
} from "./LargeCalculations";

const ShippingAddress = ({ objectOnlyData, onTotalChargeChange }) => {
  // 存储可用的州/地区列表
  const [states, setStates] = useState([]);

  // 存储用户选择的州/地区的缩写
  const [selectedStateAbbrev, setSelectedStateAbbrev] = useState("");

  // 存储特定州/地区下可用城市的列表
  const [cities, setCities] = useState([]);

  // 存储用户选择的城市
  const [selectedCity, setSelectedCity] = useState("");

  // 存储所选城市的物流分区信息
  const [logisticsZone, setLogisticsZone] = useState("");
  // 存储计算的总费用
  const [totalCharge, setTotalCharge] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [cityOptions, setCityOptions] = useState([]);

  // 创建一个状态对象来存储表单数据
  const [formData, setFormData] = useState({
    country: "Australia",
    state: "",
    city: "",
    postcode: "",
    firstName: "",
    lastName: "",
    streetAddress: "",
    address: "",
    phone: "",
    email: "",
  });

  // 更新表单数据的函数
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // 在表单数据或 totalCharge 更改时调用此函数
  useEffect(() => {
    onTotalChargeChange(totalCharge, formData);
  }, [totalCharge, formData]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const loadedStates = Array.from(new Set(map.map((item) => item.州)));
    setStates(loadedStates);
    calculateWeight(objectOnlyData ? objectOnlyData : []);
  }, []);
  // 当州selectedStateAbbrev改变时，更新城市列表setCities
  useEffect(() => {
    const loadedCities = map
      .filter((item) => item.州 === selectedStateAbbrev)
      .map((item) => item.城市);
    setCities(loadedCities);
    const cityOptions = loadedCities.map((city) => ({
      value: city,
      label: city,
    }));

    setCityOptions(cityOptions);
  }, [selectedStateAbbrev]);

  // handleStateChange函数
  const handleStateChange = (abbreviation) => {
    console.log("state", abbreviation);
    setSelectedStateAbbrev(abbreviation);
    setSelectedCity("");
    setTotalCharge(0); // 重置费用为0，因为州选择改变了
    onTotalChargeChange(0);

    // 同时更新formData中的state
    setFormData((prevFormData) => ({
      ...prevFormData,
      state: abbreviation,
      city: "", // 重置城市
    }));
  };

  const handleChange = (selectedOption) => {
    console.log(selectedOption);
    setSelectedOption(selectedOption);
    handleCityChange(selectedOption.value);

    // 同时更新formData中的city
    setFormData((prevFormData) => ({
      ...prevFormData,
      city: selectedOption.value,
    }));
  };
  // handleCityChange函数
  const handleCityChange = (city) => {
    setSelectedCity(city);

    if (selectedStateAbbrev && city) {
      const cityInfo = map?.find(
        (item) => item.城市 === city && item.州 === selectedStateAbbrev
      );

      if (cityInfo) {
        console.log("cityInfo", cityInfo);
        const logistics = logisticsInfo?.find(
          (info) => info.物流分区 === cityInfo.物流分区
        );

        if (logistics) {
          const totalWeight = calculateWeight(
            objectOnlyData ? objectOnlyData : []
          ); // 计算总重量
          const baseCharge = calculateBaseCharge(
            logistics.基础费用,
            logistics.续重费,
            logistics.最低单费,
            totalWeight
          );
          const additionalCharges = calculateAdditionalCharges(
            objectOnlyData ? objectOnlyData : []
          ); // 计算附加费用
          const FuelSurchargeAndGST = calculateFuelSurchargeAndGST(
            baseCharge,
            additionalCharges
          ); // 包括燃油附加费、GST和保险费

          console.log("Base Charge: ", baseCharge);
          console.log("Additional Charges: ", additionalCharges);
          console.log("FuelSurchargeAndGST: ", FuelSurchargeAndGST);

          const totalCharges = FuelSurchargeAndGST; // 计算总费用
          setTotalCharge(totalCharges); // 更新总费用状态
          onTotalChargeChange(totalCharge);
        }
      }
    }
  };

  // 当城市selectedCity改变时，更新物流分区setLogisticsZone
  useEffect(() => {
    const cityInfo = map?.find(
      (item) => item.城市 === selectedCity && item.州 === selectedStateAbbrev
    );
    if (cityInfo) {
      const logistics = logisticsInfo?.find(
        (info) => info.物流分区 === cityInfo.物流分区
      );
      if (logistics) {
        setLogisticsZone(logistics.物流分区);
      }
    }
  }, [selectedCity]);
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <select
        className="select select-bordered h-10 focus:outline-none col-span-2 text-sm"
        name="country"
        value={formData.country}
        onChange={handleInputChange}
      >
        <option value="Australia">Australia</option>
      </select>

      <div className="col-span-2 flex flex-col  gap-4 w-full">
        <select
          className="input input-bordered h-10 focus:outline-none w-full text-sm"
          value={selectedStateAbbrev}
          onChange={(e) => handleStateChange(e.target.value)}
          name="state"
          required
        >
          <option value="">Select a state</option>
          {states.map((abbrev, index) => (
            <option key={index} value={abbrev}>
              {stateAbbreviations[abbrev] || abbrev}
            </option>
          ))}
        </select>

        <Select
          value={selectedOption}
          onChange={handleChange}
          options={cityOptions}
          isDisabled={!selectedStateAbbrev}
          styles={{
            control: (base) => ({
              ...base,
              borderRadius: "0.25rem",
            }),
          }}
        />

        <input
          className="input input-bordered h-10 focus:outline-none w-full text-sm"
          type="number"
          placeholder="postcode"
          name="zip"
          value={formData.zip}
          onChange={handleInputChange}
          required
        />
      </div>

      <input
        className="input input-bordered h-10 focus:outline-none col-span-2 w-full text-sm"
        type="text"
        placeholder="First Name"
        name="firstName"
        value={formData.firstName}
        onChange={handleInputChange}
        required
      />

      <input
        className="input input-bordered h-10 focus:outline-none col-span-2 w-full text-sm"
        type="text"
        placeholder="Last Name"
        name="lastName"
        value={formData.lastName}
        onChange={handleInputChange}
        required
      />

      <input
        className="input input-bordered h-10 focus:outline-none w-full col-span-2 text-sm"
        type="text"
        placeholder="Street Address"
        name="address"
        value={formData.address}
        onChange={handleInputChange}
        required
      />

      <input
        className="input input-bordered h-10 focus:outline-none w-full col-span-2 text-sm"
        type="number"
        placeholder="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleInputChange}
        required
      />

      {/* <input
    className="input input-bordered h-10 focus:outline-none w-full"
    type="text"
    placeholder="Email"
    name="email"
    value={formData.email}
    onChange={handleInputChange}
    required
  /> */}
    </div>
  );
};
export default ShippingAddress;
