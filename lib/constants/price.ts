export interface PriceRange {
    value: string;
    label: string;
    min: number;
    max: number;
}

export const priceRanges: PriceRange[] = [
    {
        value: "0-500",
        label: "NT$ 0-500",
        min: 0,
        max: 500,
    },
    {
        value: "501-1000",
        label: "NT$ 501-1000",
        min: 501,
        max: 1000,
    },
    {
        value: "1001-99999",
        label: "NT$ 1001+",
        min: 1001,
        max: 99999,
    },
];
