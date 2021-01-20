import { MiddlewareFn } from 'type-graphql';

import { MyContext } from '../types';

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
    if(!context.req.session.uid){
        throw new Error('not authenticated');
    }

    return next();
}