interface DrugUpdate {
    id: string;
    drugSetId: string;
    createdAt: string;
    description?: string;
    nextUpdateId?: string;
    previousUpdateId?: string;
    userId?: string;
}


export default DrugUpdate;