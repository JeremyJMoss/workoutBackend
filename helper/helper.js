export const kilojoulesToCalories = (kj) => {
    const calories = kj * 0.239006;
    const caloriesRounded = roundTo2Digits(calories); 
    return caloriesRounded;  
}

export const roundTo2Digits = (number) => {
    return Math.round((number + Number.EPSILON) * 100) / 100;
}

export const validateWholeNumber = function(num){
    return /^\d+$/.test(num);
}

export const validateDecimalNumber = function(num){
    return /^\d+$|^\d+\.\d+$/.test(num);
}

export const validateServingSizeUnit = function(unitOfMeasure){
    return ["g", "mL"].includes(unitOfMeasure);
}

export const validateEnergyUnit = function(unitOfMeasure){
    return ["cal", "kj"].includes(unitOfMeasure);
}


export const validateEmail = function(email){
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

export const validateFullName = function(firstName, lastName){
    if (firstName.trim().split(" ").length > 1){
        return false;
    }
    const fullName = `${firstName} ${lastName}`;
    return /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(fullName);
}