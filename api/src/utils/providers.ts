import { declareProviders } from '../config/services'
import { NODE_ENV } from './environment'

export function declareProvidersForTestServices() {
    declareProviders(
        NODE_ENV === 'development' || NODE_ENV === 'test_watch'
            ? 'test'
            : 'test_with_real_database'
    )
}
