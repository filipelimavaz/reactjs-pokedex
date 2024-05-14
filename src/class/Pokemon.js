class Pokemon {
    constructor(sprite, type1, type2, id, name, weight, height, abilities, stats) {
        this.sprite = sprite;
        this.type1 = type1;
        this.type2 = type2;
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.height = height;
        this.abilities = abilities;
        this.stats = stats;
    }

    getSprite() {
        return this.sprite;
    }

    getType1() {
        return this.type1;
    }

    getType2() {
        return this.type2;
    }

    getId() {
        return this.id;
    }

    getName() {
        return this.name;
    }

    getWeight() {
        return this.weight;
    }

    getHeight() {
        return this.height;
    }

    getAbilities() {
        return this.abilities;
    }

    getStats() {
        return this.stats;
    }
}

export default Pokemon;
