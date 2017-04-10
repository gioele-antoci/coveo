export enum page {
    home,
    foodVsdrink,
    foodType,
    drinkType,
    tastesType,
    results
}

export enum foodDrinkPriority {
    food,
    drink
}

export enum drinkType {
    wine,
    beer,
    whiskey,
    rhum,
    grappa,
    cidre,
    liqueur
}

export interface tasteObservations {
    acidityTaste?: acidite[];
    bodyTaste?: body[];
    tanninTaste?: tannin[];
    textureTaste?: texture[];
}

export enum acidite {
    Rafraîchissante,
    Vive,
    Faible
}

export enum body {
    Moyen,
    Corsé,
    Léger
}

export enum tannin {
    Charnus,
    Souples,
    Fermes,
    Rudes
}

export enum texture {
    Ample,
    Grasse,
    Mince,
    Onctueuse
}
