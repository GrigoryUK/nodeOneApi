import { UserController } from './users/users.controller';
import express, {Express} from 'express'; 
import { Server } from 'http';
import { LoggerService } from './logger/logger.service';


export class App {
	app: Express; 
	port: number;
	server: Server;
	logger: LoggerService;
	userController: UserController;


	constructor(
		logger: LoggerService, 
		userController: UserController
		) {
		this.app = express(); 
		this.port = 8000;
		this.logger = logger; 
		this.userController = userController

	}



	useRoutes() {
		this.app.use('/users', this.userController.router)
	}

	useExemptionFilters() {

	}

	public async init() {
		this.useRoutes(); 
		this.useExemptionFilters(); 
		this.server = this.app.listen(this.port); 
		this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
	}
}