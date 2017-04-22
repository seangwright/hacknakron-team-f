export interface LucOption {
    id: number;
    description: string;
}

export interface ParcelResponse {
    number: string;
    address: string;
    postal: string;
    areaAcres: number;
    areaSqft: number;
    lucId: number;
    appraisal: number;
    lastSaleDate: Date;
    lastSaleAmount: number;
}

export interface LucCategory {
    code: string;
    name: string;
}
