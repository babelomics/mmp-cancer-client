import DrugName from "./drugName";

interface Drug {
    id: string;
    standardName: string;
    commonName: string;
    startUpdate: string;
    endUpdate?: string;
    previousVersion?: string;
    nextVersion?: string;
    drugNames: DrugName[];
}


export default Drug;