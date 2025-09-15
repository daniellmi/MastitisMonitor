//@ts-nocheck
import OpenGauss from 'node-opengauss';

const config = {
    host: '192.168.57.3',
    port: 26000,
    username: 'daniel',
    database: 'cattle',
    password: '1234@qwe'
}

class Database extends OpenGauss {
        
     constructor() {
        super();
     }

    async connect_database() {
        await this.connect(config);
    }

 findRecord(client_cod, callback) {

        this.query(`SELECT cod_cow FROM cows`,  result => {

        const exists = result.rows.some(cod => cod.cod_cow == client_cod);
        callback(exists); // it works with callbacks to return the boolean
    });
    }

    insertIntoCows(cod, temp, acc) {
        this.query(`INSERT INTO cows VALUES (${cod}, ${temp}, ${acc})`, result =>  {
            console.log(result);
        });
    }

    updateCows(client_cod, temp, acc) {
        this.query(`UPDATE cows SET temperature = ${temp}, accelerometer = ${acc}
            WHERE cod_cow = ${client_cod}`, result => {
                console.log(result);
            });
    }

    queryAll(callback) {
        this.query(`SELECT * FROM cows`, result => {
            callback(result);
        })
    }

}

const dbs = new Database();
export default dbs;