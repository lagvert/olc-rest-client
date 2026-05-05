import { ConnectServerErrorMessage } from ".";
export type ConnectServerErrorHandler = (notFoundMessage: ConnectServerErrorMessage) => Error | false;
