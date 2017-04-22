export interface LucOption {
    id: number;
    name: string;
}

export interface ParcelResponse {
    number: string;
    address: string;
    postal: string;
    areaAcres: number;
    areaSqft: number;
    lucId: number;
    appraisal: number;
    lastSaleDate: string;
    lastSaleAmount: number;
    pricePerSqft: number;
}

export interface LucCategory {
    code: string;
    name: string;
}
