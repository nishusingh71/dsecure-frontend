/**
 * Polar.sh Payment Integration Client
 * Handles checkout session creation and product ID mapping
 */

// Direct checkout links from Polar.sh dashboard
// NOTE: file-eraser now uses license quantity-based links (see FILE_ERASER_*_LICENSE_LINKS below)
export const POLAR_CHECKOUT_LINKS = {
    'drive-eraser': {
        basic: 'https://buy.polar.sh/polar_cl_WQbCObY9u2MWI6kAylunRCBfuMNr7vZG4c8jz1FgBUv',
        standard: 'https://buy.polar.sh/polar_cl_GAXesITVbsZGmbDkhOQfKMDoZaULx9hrFKnVj1zeJq0',
        cloud: 'https://buy.polar.sh/polar_cl_F9jjrcdXKISekVHEpOAKSBR6apjHSRNpmp9ms3f9CkO',
        network: 'https://buy.polar.sh/polar_cl_X2ugn6MOdhRs0E01WoA7Aum0pP1eZriHNz0842Jltdv',
        pro: 'https://buy.polar.sh/polar_cl_Ij1mUqFOTl9wVoLrMV3DRc9WI5fYwfNFkUImU4d6k60',
        enterprise: 'https://buy.polar.sh/polar_cl_O7WHlpeA2TwvA6cjxQ6Ull6okJLXhyQVi20cW35a9b7',
    },
    // file-eraser uses license quantity-based links - see below
} as const;

// Drive Eraser license quantity-based checkout links
export const DRIVE_ERASER_LICENSE_LINKS: Record<string, string> = {
    '1': 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity=1',
    '10': 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity=10',
    '25': 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity=25',
    '50': 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity=50',
    '100': 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity=100',
    '250': 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity=250',
    '300': 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity=300',
    '500': 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity=500',
    '1000': 'https://checkout.dodopayments.com/buy/pdt_0NVH5wJYMX70syW3ioj9R?quantity=1000',
};

// File Eraser Standard plan license quantity-based checkout links
export const FILE_ERASER_STANDARD_LICENSE_LINKS: Record<string, string> = {
    '1': 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity=1',
    '10': 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity=10',
    '25': 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity=25',
    '50': 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity=50',
    '100': 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity=100',
    '250': 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity=250',
    '300': 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity=300',
    '500': 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity=500',
    '1000': 'https://checkout.dodopayments.com/buy/pdt_0NVHHRwPSypqgPTs3kuSu?quantity=1000',
};

// File Eraser Enterprise plan license quantity-based checkout links
export const FILE_ERASER_ENTERPRISE_LICENSE_LINKS: Record<string, string> = {
    '1': 'https://checkout.dodopayments.com/buy/pdt_0NVHHfU1urP5tbbGof1YH?quantity=1',
    '10': 'https://checkout.dodopayments.com/buy/pdt_0NVHHfU1urP5tbbGof1YH?quantity=10',
    '25': 'https://checkout.dodopayments.com/buy/pdt_0NVHHfU1urP5tbbGof1YH?quantity=25',
    '50': 'https://checkout.dodopayments.com/buy/pdt_0NVHHfU1urP5tbbGof1YH?quantity=50',
    '100': 'https://checkout.dodopayments.com/buy/pdt_0NVHHfU1urP5tbbGof1YH?quantity=100',
    '250': 'https://checkout.dodopayments.com/buy/pdt_0NVHHfU1urP5tbbGof1YH?quantity=250',
    '300': 'https://checkout.dodopayments.com/buy/pdt_0NVHHfU1urP5tbbGof1YH?quantity=300',
    '500': 'https://checkout.dodopayments.com/buy/pdt_0NVHHfU1urP5tbbGof1YH?quantity=500',
    '1000': 'https://checkout.dodopayments.com/buy/pdt_0NVHHfU1urP5tbbGof1YH?quantity=1000',
};

// File Eraser Corporate plan (id='standard') license quantity-based checkout links
export const FILE_ERASER_CORPORATE_LICENSE_LINKS: Record<string, string> = {
    '1': 'https://checkout.dodopayments.com/buy/pdt_0NVHIe90Wf9FcnDqxU6Du?quantity=1',
    '10': 'https://checkout.dodopayments.com/buy/pdt_0NVHIe90Wf9FcnDqxU6Du?quantity=10',
    '25': 'https://checkout.dodopayments.com/buy/pdt_0NVHIe90Wf9FcnDqxU6Du?quantity=25',
    '50': 'https://checkout.dodopayments.com/buy/pdt_0NVHIe90Wf9FcnDqxU6Du?quantity=50',
    '100': 'https://checkout.dodopayments.com/buy/pdt_0NVHIe90Wf9FcnDqxU6Du?quantity=100',
    '250': 'https://checkout.dodopayments.com/buy/pdt_0NVHIe90Wf9FcnDqxU6Du?quantity=250',
    '300': 'https://checkout.dodopayments.com/buy/pdt_0NVHIe90Wf9FcnDqxU6Du?quantity=300',
    '500': 'https://checkout.dodopayments.com/buy/pdt_0NVHIe90Wf9FcnDqxU6Du?quantity=500',
    '1000': 'https://checkout.dodopayments.com/buy/pdt_0NVHIe90Wf9FcnDqxU6Du?quantity=1000',
};

// File Eraser Professional plan (id='pro') license quantity-based checkout links
export const FILE_ERASER_PROFESSIONAL_LICENSE_LINKS: Record<string, string> = {
    '1': 'https://checkout.dodopayments.com/buy/pdt_0NVHHr5B5BgO4aKgwRJJF?quantity=1',
    '10': 'https://checkout.dodopayments.com/buy/pdt_0NVHHr5B5BgO4aKgwRJJF?quantity=10',
    '25': 'https://checkout.dodopayments.com/buy/pdt_0NVHHr5B5BgO4aKgwRJJF?quantity=25',
    '50': 'https://checkout.dodopayments.com/buy/pdt_0NVHHr5B5BgO4aKgwRJJF?quantity=50',
    '100': 'https://checkout.dodopayments.com/buy/pdt_0NVHHr5B5BgO4aKgwRJJF?quantity=100',
    '250': 'https://checkout.dodopayments.com/buy/pdt_0NVHHr5B5BgO4aKgwRJJF?quantity=250',
    '300': 'https://checkout.dodopayments.com/buy/pdt_0NVHHr5B5BgO4aKgwRJJF?quantity=300',
    '500': 'https://checkout.dodopayments.com/buy/pdt_0NVHHr5B5BgO4aKgwRJJF?quantity=500',
    '1000': 'https://checkout.dodopayments.com/buy/pdt_0NVHHr5B5BgO4aKgwRJJF?quantity=1000',
};


/**
 * Get Drive Eraser checkout link based on license quantity
 */
export function getDriveEraserCheckoutLink(licenseCount: string): string | null {
    const link = DRIVE_ERASER_LICENSE_LINKS[licenseCount];
    if (!link) {
        console.error(`No checkout link found for ${licenseCount} licenses`);
        return null;
    }
    return link;
}

/**
 * Get File Eraser Standard plan checkout link based on license quantity
 */
export function getFileEraserStandardCheckoutLink(licenseCount: string): string | null {
    const link = FILE_ERASER_STANDARD_LICENSE_LINKS[licenseCount];
    if (!link) {
        console.error(`No File Eraser Standard checkout link found for ${licenseCount} licenses`);
        return null;
    }
    return link;
}

/**
 * Get File Eraser Enterprise plan checkout link based on license quantity
 */
export function getFileEraserEnterpriseCheckoutLink(licenseCount: string): string | null {
    const link = FILE_ERASER_ENTERPRISE_LICENSE_LINKS[licenseCount];
    if (!link) {
        console.error(`No File Eraser Enterprise checkout link found for ${licenseCount} licenses`);
        return null;
    }
    return link;
}

/**
 * Get File Eraser Corporate plan (id='standard') checkout link based on license quantity
 */
export function getFileEraserCorporateCheckoutLink(licenseCount: string): string | null {
    const link = FILE_ERASER_CORPORATE_LICENSE_LINKS[licenseCount];
    if (!link) {
        console.error(`No File Eraser Corporate checkout link found for ${licenseCount} licenses`);
        return null;
    }
    return link;
}

/**
 * Get File Eraser Professional plan (id='pro') checkout link based on license quantity
 */
export function getFileEraserProfessionalCheckoutLink(licenseCount: string): string | null {
    const link = FILE_ERASER_PROFESSIONAL_LICENSE_LINKS[licenseCount];
    if (!link) {
        console.error(`No File Eraser Professional checkout link found for ${licenseCount} licenses`);
        return null;
    }
    return link;
}

// Legacy product IDs (kept for reference)
export const POLAR_PRODUCT_IDS = {
    'drive-eraser': {
        basic: '38c20a26-767f-4a33-a437-183609792609',
        standard: 'aeb34637-330b-47b7-b73e-be06ac889aff',
        cloud: 'd14c3fa4-b442-4ffa-8953-5f54568910e1',
        network: '23aafe6d-7830-43ee-8281-2a2c02a267c9',
        pro: '3ac6336c-7deb-472b-922a-edafd1c50408',
        enterprise: '4ce55d03-e08d-430c-b64c-b7ca3777e4f5',
    },
    'file-eraser': {
        basic: '988f1bd4-20dc-45a4-8f8a-0f21a3ab5ec8',
        standard: 'd2550f73-883e-4914-8556-953a63c25db8',
        cloud: 'ba900782-194d-4007-960b-0388ff087f3a',
        network: 'bf71e8cc-c29c-4f69-8941-f0832ecd9116',
        pro: '127c62a3-0b4b-412a-b736-b252ab575464',
        enterprise: '127c62a3-0b4b-412a-b736-b252ab575464',
    },
} as const;

// Type definitions
export type ProductCategory = keyof typeof POLAR_PRODUCT_IDS;
export type PlanId = keyof typeof POLAR_PRODUCT_IDS['drive-eraser'];

export interface CheckoutMetadata {
    category: ProductCategory;
    planId: PlanId;
    planName: string;
    licenses?: number;
    years?: number;
    customerEmail?: string;
}

/**
 * Get Polar.sh Product ID for a specific plan and category
 */
export function getPolarProductId(category: ProductCategory, planId: PlanId): string | null {
    const categoryProducts = POLAR_PRODUCT_IDS[category];
    if (!categoryProducts) {
        console.error(`Invalid category: ${category}`);
        return null;
    }

    const productId = categoryProducts[planId];
    if (!productId) {
        console.error(`Invalid plan: ${planId} for category: ${category}`);
        return null;
    }

    return productId;
}

/**
 * Generate Polar.sh checkout URL
 * Format: https://polar.sh/D-Securetech/checkout?products={productId}
 */
export function getPolarCheckoutUrl(
    productId: string,
    options?: {
        successUrl?: string;
        metadata?: Record<string, string>;
    }
): string {
    // Using org slug format with product ID as query param
    const baseUrl = `https://polar.sh/D-Securetech/checkout`;

    // Add query parameters
    const params = new URLSearchParams();
    params.set('products', productId);

    if (options?.successUrl) {
        params.set('success_url', options.successUrl);
    }

    // Add metadata as query params
    if (options?.metadata) {
        Object.entries(options.metadata).forEach(([key, value]) => {
            params.set(`metadata_${key}`, value);
        });
    }

    return `${baseUrl}?${params.toString()}`;
}

/**
 * Get direct checkout link for a specific plan
 * NOTE: This only works for drive-eraser now. File Eraser uses license-based links.
 */
export function getPolarCheckoutLink(category: ProductCategory, planId: PlanId): string | null {
    // File Eraser now uses license quantity-based links, not plan-based
    if (category === 'file-eraser') {
        console.warn('File Eraser now uses license quantity-based checkout links. Use getFileEraser*CheckoutLink functions instead.');
        return null;
    }

    const categoryLinks = POLAR_CHECKOUT_LINKS[category as 'drive-eraser'];
    if (!categoryLinks) {
        console.error(`Invalid category: ${category}`);
        return null;
    }

    const link = categoryLinks[planId as keyof typeof categoryLinks];
    if (!link) {
        console.error(`Invalid plan: ${planId} for category: ${category}`);
        return null;
    }

    return link;
}

/**
 * Redirect to Polar.sh checkout for a specific plan (using direct links)
 */
export function redirectToPolarCheckout(
    category: ProductCategory,
    planId: PlanId,
    metadata?: CheckoutMetadata
): void {
    // Get direct checkout link from Polar dashboard
    const checkoutUrl = getPolarCheckoutLink(category, planId);

    if (!checkoutUrl) {
        console.error('Failed to get checkout link');
        return;
    }

    // Store metadata for success page
    if (metadata) {
        console.log('📦 Storing order metadata:', metadata);
    }

    console.log('🚀 Redirecting to Polar checkout:', checkoutUrl);

    // Redirect to Polar checkout
    window.location.href = checkoutUrl;
}

/**
 * Open Polar checkout in a new tab (alternative method)
 */
export function openPolarCheckoutInNewTab(
    category: ProductCategory,
    planId: PlanId
): void {
    const productId = getPolarProductId(category, planId);

    if (!productId) {
        console.error('Failed to get product ID for checkout');
        return;
    }

    const checkoutUrl = `https://polar.sh/D-Securetech/checkout?products=${productId}`;
    window.open(checkoutUrl, '_blank');
}

/**
 * Check if a plan requires custom/contact flow (not Polar checkout)
 */
export function isCustomPlan(planId: string): boolean {
    return planId === 'custom';
}

export default {
    POLAR_PRODUCT_IDS,
    getPolarProductId,
    getPolarCheckoutUrl,
    redirectToPolarCheckout,
    openPolarCheckoutInNewTab,
    isCustomPlan,
};
