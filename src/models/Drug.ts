interface Drug {
    id: string;
    standardName: string;
    commonName: string;
    startUpdate: string;
    endUpdate?: string;
    previousVersion?: string;
    nextVersion?: string;
}


export default Drug;