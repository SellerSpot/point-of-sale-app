import ApiService from './apiService';
import ComputeOps from './computeService';
import KeyCodeService from './keyCodeService';

export default {
    ComputeOps: new ComputeOps(),
    ApiService: new ApiService(),
    KeyCodeService: new KeyCodeService(),
};
