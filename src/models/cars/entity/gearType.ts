export enum GearType {
	MANUEL = "MANUEL",
	AUTO = "AUTO"
}

export const getGearTypeLabel = (gearType: GearType): string => {
	switch (gearType) {
		case GearType.MANUEL:
			return "Manuel";
		case GearType.AUTO:
			return "Otomatik";
		default:
			return "";
	}
};
