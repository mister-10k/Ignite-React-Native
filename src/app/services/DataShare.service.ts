import { BehaviorSubject } from 'rxjs';

const themeSubject = new BehaviorSubject(null);

export const DataShareService = {
    sendTheme: theme => themeSubject.next(theme),
    getTheme: () => themeSubject.asObservable()
};