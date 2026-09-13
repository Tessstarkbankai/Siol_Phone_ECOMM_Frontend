/**
 * Feature Flags Configuration
 * 
 * To re-enable the multi-vendor marketplace in the future,
 * simply change ENABLE_MULTI_VENDOR to true.
 */
export const FEATURES = {
  // Multi-vendor marketplace (Seller portal, onboarding, vendor storefronts, moderation, payouts)
  // Disabled by code while preserving all code for future re-enablement
  ENABLE_MULTI_VENDOR: false,

  // Official B2B Distributor Program
  ENABLE_DISTRIBUTOR_PROGRAM: true,
} as const;

export const isMultiVendorEnabled = () => FEATURES.ENABLE_MULTI_VENDOR;
export const isDistributorProgramEnabled = () => FEATURES.ENABLE_DISTRIBUTOR_PROGRAM;
