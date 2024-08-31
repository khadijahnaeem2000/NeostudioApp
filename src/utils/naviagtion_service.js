import { CommonActions, createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef()

export function navigate(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.navigate(name, params);
    }
}
export function replace(name, params) {
    if (navigationRef.isReady()) {
        navigationRef.replace(name, params);
    }
}
export function goBack() {
    if (navigationRef.isReady()) {
        navigationRef.goBack();
    }
}


export const resetNavigationStack = async (screen, params) => {
    if (navigationRef.isReady()) {
        navigationRef.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [{ name: screen, params: params || null }],
            })
        );
    }
};