import Drug from "./Drug";

interface Drugset {
    id: string;
    name: string;
    description?: string;
    created_at: string;
    updated_at?: string;
    drugs?: Drug[];
}


export default Drugset;