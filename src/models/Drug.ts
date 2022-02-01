interface Drug {
    id: string;
    standard_name: string;
    common_name: string;
    start_update: string;
    end_update?: string;
    previous_version?: string;
    next_version?: string;
    drugset_id: string;
}


export default Drug;