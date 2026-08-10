import { CustomerOnboardingCanvas } from './CustomerOnboardingCanvas';

export const CustomerSelector = ({ variant = 'A', basePath = '/demo/customer' }) => <CustomerOnboardingCanvas variant={variant} basePath={basePath} />;