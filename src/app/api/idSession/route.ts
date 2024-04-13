import { getSession } from '@/actions/actions';
import { getUserCheckInOuts } from '@/db/dbActions';
import { NextResponse } from 'next/server';


// get username from user session then return all history
export async function GET(req: Request, res: Response) {
    const session = await getSession();
    const user: any = session.username;
   
    const data = await getUserCheckInOuts(user);

    return NextResponse.json({
        message: 'Update done',
        status: 200,
        value: data,
    });
}
