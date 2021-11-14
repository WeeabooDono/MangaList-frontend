import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

export const cache = () => <T>(source: Observable<T>) => source.pipe(shareReplay({ bufferSize: 1, refCount: true }));
