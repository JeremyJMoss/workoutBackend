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