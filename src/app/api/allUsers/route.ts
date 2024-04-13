
import {  getAllUsers } from '@/db/dbActions';

import { NextResponse } from 'next/server';

export async function GET(req: Request,res:Response) {
    
   

    const users = await getAllUsers()

    
    return NextResponse.json({
        status: 200,
        value : users
        
    });
}
