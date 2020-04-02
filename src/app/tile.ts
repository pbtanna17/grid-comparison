export class Tile {
    cols: number;
    rows: number;
    name: string;
    id: number;
}

export const tiles: Tile[] = [
    {cols: 3, rows: 1, name: 'One', id: 1},
    {cols: 1, rows: 2, name: 'Two', id: 2},
    {cols: 1, rows: 1, name: 'Three', id: 3},
    {cols: 2, rows: 1, name: 'Four', id: 4}
];