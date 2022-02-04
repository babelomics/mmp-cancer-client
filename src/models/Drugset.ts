import Drug from "./drug";

interface Drugset {
    id: string;
    name: string;
    description?: string;
    createdAt: string;
    updatedAt?: string;
    drugs?: Drug[];
}


export default Drugset;