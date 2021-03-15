import * as express from "express";
import Database from "./infra/db";
import * as bodyParser from "body-parser";
import NewsController from "./controller/newsController";
import * as cors from 'cors';
import Auth from './infra/auth';
import uploads from './infra/uploads';
import * as compression from 'compression';
import newsRouter from './router/newsRouter';
import * as graphqlHTTP from 'express-graphql';
import schemas from './graphql/schemas';
import resolvers from './graphql/resolvers';
import { graphql } from "graphql";


class StartUp{ 
    public app: express.Application;
    private _db: Database;
    public bodyParser;
    
    constructor() {
        const neatCsv = require('neat-csv');       
        this.app = express(); 
        this._db = new Database(); 
        this._db.createConnection();
        this.middler();
        this.routes();     
    }

    enableCors(){
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,DELETE",
            origin: "*"
        }

        this.app.use(cors(options));
    }

    middler(){ 
        this.enableCors();       
        this.app.use(express.json());
        this.app.use(express.urlencoded());        
    }

    routes(){
        this.app.route("/").get((req,res) => {
            res.send({versao : '0.0.1'})
        })       

        this.app.route("/uploads").post(uploads.single("file"), (req, res) => {
            try{
                res.send("arquivo enviado com sucesso.")
            }catch(error){
                console.log(error);
            }
        })

        this.app.use('/graphql', graphqlHTTP({
            schemas: schemas,
            rootValue: resolvers,
            graphql: true
        }))

        //this.app.use(Auth.validate);

       this.app.use("/", newsRouter);
    }
}

export default new StartUp();
