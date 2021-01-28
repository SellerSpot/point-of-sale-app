import { apiService } from 'services/services';
import { store } from 'store/store';

export const initializeGlobalServices = async (): Promise<void> => {
    const coreState = store.getState().core;
    // socketService.initiateService(coreState.tenant.token);
    apiService.initiateService(coreState.tenant.token);
};

export const updateGlobalServices = async (token: string): Promise<void> => {
    // socketService.initiateService(token);
    apiService.initiateService(token);
};
