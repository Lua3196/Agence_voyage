import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { toUrl } from '../lib/utils';

export function useCurrentUrl() {
    const location = useLocation();
    const currentUrl = location.pathname;

    const isCurrentUrl = useMemo(() => (urlToCheck: string, startsWith = false): boolean => {
        const path = toUrl(urlToCheck);
        if (startsWith) return currentUrl.startsWith(path);
        return currentUrl === path;
    }, [currentUrl]);

    const isCurrentOrParentUrl = (urlToCheck: string) => isCurrentUrl(urlToCheck, true);

    const whenCurrentUrl = <T, F = null>(urlToCheck: string, ifTrue: T, ifFalse: F = null as F): T | F => {
        return isCurrentUrl(urlToCheck) ? ifTrue : ifFalse;
    };

    return { currentUrl, isCurrentUrl, isCurrentOrParentUrl, whenCurrentUrl };
}
