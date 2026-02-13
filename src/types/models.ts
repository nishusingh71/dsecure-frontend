export interface ApiResponse<T> {
    success: boolean
    data?: T
    message?: string
    error?: string
}

export interface User {
    user_id: string
    user_email: string
    user_name: string
    role: 'admin' | 'user' | 'manager'
    status?: 'active' | 'inactive' | 'pending' | 'suspended'
    department?: string
    lastLogin?: string
    createdAt?: string
    updatedAt?: string
    payment_details_json?: string
    license_details_json?: string
    phone_number?: string
    timezone?: string
    is_private_cloud?: boolean
    private_api?: boolean
    currentPassword?: string
    newPassword?: string
    user_role?: string
    last_login?: string
    user_group?: string
    licesne_allocation?: string
    is_groups_enabled?: boolean
    is_subusers_enabled?: boolean
    // Subuser-specific fields
    subuser_name?: string
    subuser_phone?: string
    subuser_email?: string
    name?: string
    phone?: string
    email?: string
    activity_status?: string
}

export interface Subuser {
    id: string
    user_email: string
    subuser_email: string
    subuser_name?: string
    superuser_email: string
    created_at?: string
    status?: string
    licenseUsage?: number
    subuser_role?: string
    subuser_phone?: string
    subuser_password?: string
    defaultRole?: string
    role?: string
    department?: string
    last_login?: string
    last_logout?: string
    subuser_group?: string
    license_allocation?: string
    name?: string
    phone?: string
    currentPassword?: string
    newPassword?: string
    activity_status?: string
}

export interface EnhancedSubuser extends Subuser {
    defaultRole?: string
    role?: string
    department?: string
}

// Keeping original naming from enhancedApiClient.ts to avoid breaking changes
export interface license {
    license_id: string
    license_type: string
    license_status: string
    license_validity: string
    license_usage: string
    license_allocation: string
    license_details_json: string
    license_key: string
    hwid: string
    machine_name: string
    mac_address: string
    serial_number: string
    model: string
    manufacturer: string
    os_info: string
    ip_address: string
    cpu_info: string
    ram_gb: number
    storage_gb: number
    cpu_id: string
    os: string
    os_version: string
    status: string
    expiry: string
    edition: string
    id: number
    expiry_days: number
    expiry_date: string
}
