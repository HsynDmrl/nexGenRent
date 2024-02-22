export enum FuelType {
    DIESEL = "DIESEL",
    ELECTRIC = "ELECTRIC",
    HYBRID = "HYBRID",
    GASOLINE = "GASOLINE",
}


export const getFuelTypeLabel = (fuelType: FuelType): string => {
    switch (fuelType) {
        case FuelType.DIESEL:
            return "Dizel";
        case FuelType.ELECTRIC:
            return "Elektrikli";
        case FuelType.HYBRID:
            return "Hibrit";
        case FuelType.GASOLINE:
            return "Benzinli";
        default:
            return "";
    }
};
