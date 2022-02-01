interface DrugUpdate {
    id: string;
    drug_set_id: string;
    created_at: string;
    description?: string;
    next_update_id?: string;
    previous_update_id?: string;
    user_id?: string;
}


export default DrugUpdate;