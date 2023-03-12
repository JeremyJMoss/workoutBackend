class Serving {

    constructor(data){
        this.setName(data.name);
        this.setServingSize(data.servingSize);
        this.setUnitOfMeasurement(data.unitOfMeasurement);
        this.setEnergy(data.energy);
        this.setProtein(data.protein);
        this.setTotalFat(data.totalFat);
        this.setSaturatedFat(data.saturatedFat);
        this.setCarbohydrates(data.carbohydrates);
        this.setSugars(data.sugars);
        this.setSodium(data.sodium);
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
    setServingSize(servingSize){
        this.servingSize = Number(servingSize);
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
        this.energy = Number(energy);
    }

    /**
     * @param {number} protein
     */
    setProtein(protein){
        if (protein === null){
            this.protein = null;
        }
        else{
            this.protein = Number(protein);
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
            this.totalFat = Number(totalFat);
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
            this.saturatedFat = Number(saturatedFat);
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
            this.carbohydrates = Number(carbohydrates);
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
            this.sugars = Number(sugars);
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
            this.sodium = Number(sodium);
        }
    }
}

export default Serving;