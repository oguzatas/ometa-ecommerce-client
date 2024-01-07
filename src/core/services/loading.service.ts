import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoadingService {
    show() {
        const a = document.getElementById('preloader');
        a.style.display = 'block';
    }

    hide() {
        const a = document.getElementById('preloader');
        a.style.display = 'none';
    }
}