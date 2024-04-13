import { FormationDates, getSession } from '@/actions/actions';
import { Prisma, PrismaClient } from '@prisma/client';
import { format, formatISO, isSameDay, isSameISOWeekYear, parseISO } from 'date-fns';
import { NextResponse } from 'next/server';
import {toZonedTime} from 'date-fns-tz';
import { IsUserCheckIn } from '@/db/dbActions';

export async function GET(req: Request, context: any,res:Response) {
    // get data(time user input) convert it to make compare
    const { params } = context;
    const dateFromUser = (params.time) 
    
    const userCkeckinValue = await IsUserCheckIn(dateFromUser);
    console.log(userCkeckinValue)

    
     
    



   //send result to frontend to show checkout that day
    return NextResponse.json({
        message: 'Comparison done', // Fixed typo in "message"
        status: 200,
        value : userCkeckinValue
    });
}
