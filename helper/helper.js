export const kilojoulesToCalories = (kj) => {
    const calories = Math.ceil(kj * 0.239006);
    return calories;
}