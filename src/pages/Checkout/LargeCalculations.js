// 计算体积重量（材积重量）
export const calculateVolumetricWeight = (length, width, height, volume) => {
    const lengthInMeters = length / 100;
    const widthInMeters = width / 100;
    const heightInMeters = height / 100;

    const volumetricWeight = volume ? volume * 250 : lengthInMeters * widthInMeters * heightInMeters * 250;

    console.log(`[Volumetric Weight] Volume：${volume},  Length: ${lengthInMeters}m, Width: ${widthInMeters}m, Height: ${heightInMeters}m, Result: ${volumetricWeight.toFixed(2)} kg`);
    return volumetricWeight;
};


// 计算总重量   8. 计费重量为材积重与实际重二者取其大值；材积重= L(m)*W(m)*H(m) * 250；
export const calculateWeight = (objectOnlyData) => {
    // Check if objectOnlyData is empty or undefined
    if (!objectOnlyData || objectOnlyData.length === 0) {
        return 0;
    }
    return objectOnlyData.reduce((total, item) => {
        const quantity = item?.qunatity || 1;
        const actualWeight = item.parcel_weight?.parcel_weight * quantity;
        // 材积重
        const volumetricWeight = calculateVolumetricWeight(
            item.parcel_weight?.parcel_length,
            item.parcel_weight?.parcel_width,
            item.parcel_weight?.parcel_height,
            item.parcel_weight?.parcel_volume
        ) * quantity;
        const usedWeight = Math.max(actualWeight, volumetricWeight);

        console.log(`[Item Weight] ${item.product.p_name} - Quantity: ${quantity}, Actual: ${actualWeight} kg, Volumetric: ${volumetricWeight.toFixed(2)} kg, Used: ${usedWeight} kg`);
        return total + usedWeight;
    }, 0);
};

// 计算基础费用, 选择完城市后计算
export const calculateBaseCharge = (baseRate, perKgRate, minCharge, weight) => {
    const baseCharge = Number(baseRate) + Number(perKgRate) * weight;
    const finalCharge = Math.max(baseCharge, Number(minCharge));

    console.log(`[Base Charge Calculation] Base Rate: $${baseRate}, Per Kg Rate: $${perKgRate}, Weight: ${weight} kg, Calculated Charge: $${baseCharge.toFixed(2)}, Final Charge: $${finalCharge.toFixed(2)}`);
    return finalCharge;
};


// 计算附加费用
export const calculateAdditionalCharges = (objectOnlyData) => {
    // Check if objectOnlyData is empty or undefined
    if (!objectOnlyData || objectOnlyData.length === 0) {
        return 0;
    }
    return objectOnlyData.reduce((totalCharge, item, index) => {
        let itemCharge = 0;
        const weight = item.parcel_weight?.parcel_weight || 0;
        const dimensions = [
            item.parcel_weight?.parcel_length || 0,
            item.parcel_weight?.parcel_width || 0,
            item.parcel_weight?.parcel_height || 0
        ];

        // Overweight additional charge
        if (weight >= 30) {
            const overweightCharge = Math.ceil(weight / 30) * 10;
            itemCharge += overweightCharge;
            console.log(`[Item ${index + 1}] Overweight Charge: $${overweightCharge}`);
        }

        // Longest side additional charge
        const longestSide = Math.max(...dimensions);
        if (longestSide >= 150 && longestSide < 200) {
            itemCharge += 9;
        } else if (longestSide >= 200 && longestSide < 300) {
            itemCharge += 20;
        } else if (longestSide >= 300 && longestSide < 400) {
            itemCharge += 40;
        } else if (longestSide >= 400 && longestSide < 500) {
            itemCharge += 100;
        } else if (longestSide >= 500 && longestSide < 600) {
            itemCharge += 250;
        } else if (longestSide >= 600) {
            itemCharge += 500;
        }

        if (itemCharge > 0) {
            console.log(`[Item ${index + 1}] Longest Side: ${longestSide} cm, Additional Charge: $${itemCharge}`);
        }

        return totalCharge + itemCharge;
    }, 0);
};



// 添加燃油附加费和GST计算    总费用
export const calculateFuelSurchargeAndGST = (baseCharge, additionalCharges) => {
    const fuelSurchargeRate = 0.217; // 燃油附加费率为 21.7%
    const gstRate = 0.1; // GST 率为 10%
    const insuranceFee = 9; // 保险费为 9 AUD

    // 3. 实收费用计费方式：实收费用=(基础费用+附加费用) * (1+燃油附加费率) * (1+GST Rate) + 保险费 + 或有服务费用；	
    // 费用计算:baseCharge * fuelSurchargeRate * (1 + gstRate)+ insuranceFee		


    const chargeBeforeGST = (baseCharge + additionalCharges) * (1 + fuelSurchargeRate);
    const finalCharge = chargeBeforeGST * (1 + gstRate) + insuranceFee;

    console.log(`[Fuel Surcharge and GST Calculation] Charge Before GST: $${chargeBeforeGST.toFixed(2)}, GST: $${(chargeBeforeGST * gstRate).toFixed(2)}, Insurance Fee: $${insuranceFee}, Final Charge: $${finalCharge.toFixed(2)}`);
    return finalCharge;
};

// 修改 recalculateCharge 函数以包括燃油附加费、GST和保险费
export const recalculateCharge = (objectOnlyData, map, selectedCity, selectedStateAbbrev, logisticsInfo, setTotalCharge) => {
    // 计算总重量
    const totalWeight = calculateWeight(objectOnlyData);
    // Check if objectOnlyData is empty or undefined
    if (!map || map.length === 0) {
        return 0;
    }

    const cityInfo = map?.find(item => item.城市 === selectedCity && item.州 === selectedStateAbbrev);
    if (cityInfo) {
        const logistics = logisticsInfo?.find(info => info.物流分区 === cityInfo.物流分区);
        if (logistics) {
            const baseCharge = calculateBaseCharge(
                logistics.基础费用,
                logistics.续重费,
                logistics.最低单费,
                totalWeight
            );
            const additionalCharges = calculateAdditionalCharges(objectOnlyData);
            const totalCharges = calculateFuelSurchargeAndGST(baseCharge, additionalCharges);

            console.log(`Total Charge Calculation: Base Charge $${baseCharge}, Additional Charges $${additionalCharges}, Total Charge $${totalCharges}`);
            setTotalCharge(totalCharges);
        }
    }
};
