class Serving {

    //setting values per 1g or ml
    constructor(data){
        this.setName(data.name);
        this.setRecommendedServingSize(data.servingSize);
        this.setUnitOfMeasurement(data.unitOfMeasurement);
        this.setEnergy(data.energy);
        this.setProtein(data.protein);
        this.setTotalFat(data.totalFat);
        this.setSaturatedFat(data.saturatedFat);
        this.setCarbohydrates(data.carbohydrates);
        this.setSugars(data.sugars);
        this.setSodium(data.sodium);
    }

    roundTo2Digits(number){
        return Math.round((number + Number.EPSILON) * 100) / 100;    
    }
    
    /**
     * @param {string} name
     */
    setName(name){
        this.name = name;
    }

    /**
     * @param {number} servingSize
     */
    setRecommendedServingSize(servingSize){
        this.recommendedServingSize = Number(servingSize);
    }

    /**
     * @param {string} unitOfMeasurement
     */
    setUnitOfMeasurement(unitOfMeasurement){
        this.unitOfMeasurement = unitOfMeasurement;
    }

    /**
     * @param {number} energy
     */
    setEnergy(energy){
        this.energy = this.roundTo2Digits(Number(energy / this.recommendedServingSize));
    }

    /**
     * @param {number} protein
     */
    setProtein(protein){
        if (protein === null){
            this.protein = null;
        }
        else{
            this.protein = this.roundTo2Digits(Number(protein / this.recommendedServingSize));
        }
    }

    /**
     * @param {number} totalFat
     */
    setTotalFat(totalFat){
        if (totalFat === null){
            this.totalFat = null;
        }
        else{
            this.totalFat = this.roundTo2Digits(Number(totalFat / this.recommendedServingSize));
        }
    }

    /**
     * @param {number} saturatedFat
     */
    setSaturatedFat(saturatedFat){
        if (saturatedFat === null){
            this.saturatedFat = null;
        }
        else{
            this.saturatedFat = this.roundTo2Digits(Number(saturatedFat / this.recommendedServingSize));
        }
    }

    /**
     * @param {number} carbohydrates
     */
    setCarbohydrates(carbohydrates){
        if (carbohydrates === null){
            this.carbohydrates = null;
        }
        else{
            this.carbohydrates = this.roundTo2Digits(Number(carbohydrates / this.recommendedServingSize));
        }
    }

    /**
     * @param {number} sugars
     */
    setSugars(sugars){
        if (sugars === null){
            this.sugars = null;
        }
        else{
            this.sugars = this.roundTo2Digits(Number(sugars / this.recommendedServingSize));
        }
    }

    /**
     * @param {number} sodium
     */
    setSodium(sodium){
        if (sodium === null){
            this.sodium = null;
        }
        else{
            this.sodium = Math.floor(Number(sodium / this.recommendedServingSize));
        }
    }
}

export default Serving;