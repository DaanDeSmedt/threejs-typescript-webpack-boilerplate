import { App } from './app/app';

class Main {

    private app: App;

    constructor() {
        this.app = new App(document.getElementById('three-canvas') as HTMLCanvasElement, window.innerWidth, window.innerHeight);
        window.addEventListener("resize", this.resize);
    }


    private resize = (): void => {
        this.app.resize(window.innerWidth, window.innerHeight);
    }

}

new Main();