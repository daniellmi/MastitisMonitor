import express,{Request, Response, Router} from "express";
// @ts-ignore
import dbs from '../../model/Database.js'

class Routes {
    
private router: Router;

public constructor() {
    this.router = express.Router();
}

public getRouter(): Router {
    return this.router;
}

public receiveData(): void {
    this.router.post("/api/temp",  (req: Request, res: Response): void => {

        const {cod, temp, acc} = req.body;

       if(!req.body) 
        res.status(400).json({message: "nothing received"});

    try {
        dbs.findRecord(cod, (exists: boolean) => {                                                                                                                                                                                                                                                                                                                                                 
        
            if(exists) {
            dbs.updateCows(cod, temp, acc);
            res.status(201).json({message: "records updated"});
            }

            else {
            dbs.insertIntoCows(cod, temp, acc);
             res.status(201).json({message: "records inserted"});
            }
       });
    }
     catch (error) {
     console.log(error);
    }
 
    })
}

public sendData(): void {
    this.router.get("/api/data", (req: Request,res: Response): void => {
        dbs.queryAll((result: any) => {
            res.status(200).json(result.rows);
        })
    })
}
}

export default Routes;
