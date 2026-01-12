// Hooks Barrel Export
export { useForm, validationRules } from './useForm';
export { useModal, useMultiModal } from './useModal';
export { useSearch, usePagination } from './useSearch';
export { useLocalStorage, useAsync } from './useUtilities';
export { useIsMobile } from './useIsMobile';
export { useToast } from './useToast';
// export { useTheme } from './useTheme';
// export { usePerformance } from './usePerformance';

// Performance Optimization Hooks
export { 
  useDebounce, 
  useDebouncedCallback, 
  useDebounceEffect 
} from './useDebounce';
export { 
  useThrottle, 
  useThrottledCallback, 
  useRAFThrottle, 
  useScrollThrottle 
} from './useThrottle';
export { 
  useFormValidation, 
  validationRules as formValidationRules 
} from './useFormValidation';
export { 
  useAsyncFormSubmit, 
  useFormState 
} from './useAsyncFormSubmit';

// Tablet utilities
export {
  useIsTablet,
  useTabletOrientation,
  useIsTabletPortrait,
  useIsTabletLandscape,
  useTabletGridColumns,
  useTabletLayout,
  useTabletDrawer,
  useTabletSplitView,
  useTabletScroll,
  useTabletValue,
  useIsIPad,
  useIsAndroidTablet,
} from '../utils/tabletUtils';