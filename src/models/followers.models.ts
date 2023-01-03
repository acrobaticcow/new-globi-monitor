export type Range = {
    alert: boolean;
    min: number;
    max: number;
};
export type UsernFollowerDetail = {
    user_id: string;
    user_phone: string;
    user_name: string;
    is_disabled: boolean;
    fcm_token: string;
    created_at: number;
    updated_at: number;
    password: string;
    roles: Array<"user" | "admin" | "physician">;
    is_logged_in: boolean;
    last_logged_status_at: number;
    wrong_password_count: number;
    last_password_attempt_at: number;
    image: string;
    updated_by: string;
    created_by: string;
    source: string;
    logo: string;
};
export interface Followers {
    code: number;
    data: {
        request_type: string;
        user_detail: UsernFollowerDetail;
        patient_detail: {
            user_id: string;
            patient_id: string;
            patient_name: string;
            health_insurance_code: string;
            created_at: number;
            updated_at: number;
            is_disabled: boolean;
            dob: string;
            gender: string;
            code: string;
            address: string;
            temp_range: Range;
            hr_range: Range;
            nibp_range: {
                low_pressure: Range;
                high_pressure: Range;
            };
            spo2_range: Range;
            pr_range: Range;
            resp_range: Range;
            alarm_interval: number;
            auto_save: number;
            ethnic: string;
            religion: string;
            relation_with_me: string;
            occupation: string;
            nationality: string;
            phone: number;
            is_default: boolean;
            image: string;
            device_mode: "Baby" | "Children" | "Adult";
            device_mode_value: number;
            followers: [
                {
                    id: string;
                    is_accepted: boolean;
                    created_at: number;
                    updated_at: number;
                    user_id: string;
                    shared_infos: any[];
                    request_type: string;
                }
            ];
            updated_by: string;
            partner: string;
            patient_partner_id: string;
            allergies: string;
            pregnancy_status: boolean;
            special_needs: string;
            patient_state: string;
            patient_age: number;
            patient_weight: number;
            patient_height: number;
            last_record_created_at: number;
        };
        follower_detail: UsernFollowerDetail;
        follow_request: {
            id: string;
            is_accepted: boolean;
            created_at: number;
            updated_at: number;
            user_id: string;
            shared_infos: [];
            request_type: "SHARE_REQUEST";
        };
    }[];
}
