import { Request, Response, Router, NextFunction } from 'express';

export interface IRoute {
	path: string;
	method: keyof Pick<Router, 'get' | 'post' | 'put' | 'delete' | 'patch'>;
	func: (req: Request, res: Response, next: NextFunction) => void;
}
