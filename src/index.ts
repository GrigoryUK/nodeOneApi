import { App } from './app/app';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ExceptionFilter } from './error/exception.filter';
import { Container, ContainerModule, interfaces } from 'inversify';
import { LoggerProps } from './logger/logger.interface';
import { TYPES } from './types';
import { ExceptionFilterInterfaceProps } from './error/exception.filter.interface';

export interface bootstrapProps {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<LoggerProps>(TYPES.LoggerProps).to(LoggerService);
	bind<ExceptionFilterInterfaceProps>(TYPES.ExceptionFilter).to(ExceptionFilter);
	bind<UserController>(TYPES.UserController).to(UserController);
	bind<App>(TYPES.Application).to(App);
});

function bootstrap(): bootstrapProps {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { appContainer, app };
}

export const { app, appContainer } = bootstrap();
