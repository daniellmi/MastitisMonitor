    import express, {Request, Response} from "express";
    import type { Application } from "express";
    import Routes from "./controller/routes/Routes.ts";
    import cors from "cors";
    import path, {dirname} from "path";
    import { fileURLToPath } from 'url';
    // @ts-ignore 
    import dbs from './model/Database.js'

    class App { 

    private port: number;        
    private __dirname: string;
    private app: Application;
    private routes: Routes;

    public constructor(port: number) {

    this.port = port;
    this.__dirname = dirname(fileURLToPath(import.meta.url));

    this.routes = new Routes();

    this.app = express();
    this.middleware();
    this.listen();
    this.routes.receiveData();
    this.routes.sendData();
    }

    private listen(): void {

     this.app.listen(this.port,  () => {
        console.log(`app is running on port ${this.port}`);
    });
    }
    private middleware(): void {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use(this.routes.getRouter());
        //this.app.use('/',express.static(path.join(this.__dirname, 'view/frontend/dist')));
      //  this.app.get('/{*any}', (req: Request, res: Response) => {
        //    res.sendFile(path.join(this.__dirname, 'view/frontend/dist', 'index.html'));
//})
    }
    }

const app: App = new App(5000);

 try {
 dbs.connect_database();
 console.log(`opengauss connected succesfully!`);
}

catch(e) {
 console.log(e);
}
