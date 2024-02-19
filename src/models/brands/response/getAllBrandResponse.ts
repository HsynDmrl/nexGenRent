export interface GetAllBrandResponse {
	map(arg0: (item: any) => any): GetAllBrandResponse[];
	id: number;
	name: string;
	logoPath: string;
	createdDate: Date;
	updatedDate: Date;
  }