'use server';

import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { defaultSession, SessionData, sessionOptions } from '@/app/utils/session';
import { GetUser, SaveCheckIn, SaveCheckOut, saveUser } from '@/db/dbActions';
import { redirect } from 'next/navigation';
import { format, formatISO, parseISO } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';



//  get sesion for user
export async function getSession() {
    const session = await getIronSession<SessionData>(cookies(), sessionOptions);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
    }
    return session;
}

//*______****start Register_______

// Register User in DB from Register Form:
//1 get data from form
export const Register = async (prevStat:{err:undefined | string},formData: FormData) => {

    const formUserName = formData.get('username') as string;
    const formUserPassword = formData.get('password') as string;

    const user: User = {
        username: formUserName,
        password: formUserPassword,
        isAdmin: false,
    };
    //2 call saveUser from dbActions.ts to save user in prisma db
    
    const a = await  saveUser(user)
    if(!a){
       return {error:"User Already Have Account"}
    }else{
       return {error:"Account Successfully Created"}
    }
    

    
};

//_____****end Register______

//*______****start login_______

// Register User in DB from Register Form:
//1 get data from form
export const Login = async (formData: FormData) => {
    const session = await getSession();

    const formUserName = formData.get('username') as string;
    const formUserPassword = formData.get('password') as string;

    const user: User = {
        username: formUserName,
        password: formUserPassword,
        isAdmin: false,
    };
    //2 call GetUser from dbActions.ts to get user in prisma db
    const FindUser = await GetUser(user);
    console.log(FindUser);

    if (FindUser) {
        session.username = FindUser.username;
        session.userId = FindUser.id;
        session.isAdmin = FindUser.isAdmin;
        session.isLoggedIn = true;
        await session.save();
        redirect(`/check`);
    } else {
        redirect('/register');
    }
};

//_____****end login______

//*user logout
export const LogOut = async () => {
    const session = await getSession();
    session.destroy();
};

//*_____**** start****
// Get Time Check in from user

type Worklog= {
    checkIn?: Date;
    checkOut?:Date ;
    userId: number;
     reasonLate?: any
     reasonEarly?:any
}

export const saveChIn = async (formData: FormData) => {
    const session = await getSession();
    // make sure user login
    if (!session || !session.isLoggedIn) {
        console.error('User is not logged in.');
        return; // Early return if there's no session or user is not logged in
    }

    // get value from input
    const timeString = formData.get('time');
    const reasonLate= formData.get('reasonLate')
    
    if (typeof timeString !== 'string') {
        console.error('Time data is missing or invalid.');
        return;
    }

    // convert id and time to save it in prisma
    const checkInDate = formatISO(timeString);
    const formatDateTosave = parseISO(checkInDate);
    const idNum = Number(session.userId);

    const worklog: Worklog = {
        checkIn: formatDateTosave,
        checkOut:formatDateTosave,
        userId: idNum,
        reasonLate: reasonLate,
    };

    // save in prisma by SaveCheckIn fun from dbActions file
    try {
        await SaveCheckIn(worklog);
        console.log('Check-in saved successfully.');
    } catch (error) {
        console.error('Error saving check-in:', error);
    }
};

//___***end**



// save Checkout for user 

export const saveChOut = async (formData: FormData) => {
    const session = await getSession();
    // make sure user login
    if (!session || !session.isLoggedIn) {
        console.error('User is not logged in.');
        return; // Early return if there's no session or user is not logged in
    }

    // get value from input
    const timeString = formData.get('time');
    const reasonEarly= formData.get('reasonEarly')
    
    if (typeof timeString !== 'string') {
        console.error('Time data is missing or invalid.');
        return;
    }

    // convert id and time to save it in prisma
    const checkOutDate = formatISO(timeString);
    const formatDateTosave = parseISO(checkOutDate);
    const idNum = Number(session.userId);

    const worklog: Worklog = {
        checkOut: formatDateTosave,
        userId: idNum,
        reasonEarly: reasonEarly,
    };

    // save in prisma by SaveCheckIn fun from dbActions file
    try {
        await SaveCheckOut(worklog);
        console.log('Check-Out saved successfully.');
    } catch (error) {
        console.error('Error saving check-Out:', error);
    }
};





// *** formating dates for user ***_______
// its take date in zural time format the return format user can read
export const FormationDates = async (date: any) => {
    const timeZone = 'Asia/Riyadh';
    const zonedDate = toZonedTime(date, timeZone);
    const pattern = "yyyy-MM-dd'T'HH:mm:ssXXX";
    const output = format(zonedDate, pattern);
    return output;
};
// _______ ***end*** ______

//
