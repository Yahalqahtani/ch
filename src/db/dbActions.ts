import { Login, getSession } from '@/actions/actions';
import { PrismaClient } from '@prisma/client';

import { endOfDay, formatISO,  startOfDay } from 'date-fns';


const prisma = new PrismaClient();

// ****Save user in prisma DB :
export async function saveUser(user: User) {
    
       try {
        const newUser = await prisma.user.create({
            data: user,
        });
        return newUser;
    } catch (error) {
        console.error("user already have account");
       
    }
    
}

// ****Get user by username from prisma DB
export async function GetUser(user: User) {
    const FindUser = await prisma.user.findUnique({
        where: {
            username: user.username,
            password: user.password,
        },
    });

    console.log(FindUser);
    return FindUser;
}

// *****save check in to prisma db
export async function SaveCheckIn(timeIn: Worklog) {
    await prisma.worklog.create({
        data: {
            checkIn: timeIn.checkIn,
            userId: timeIn.userId,
            reasonLate:timeIn.reasonLate
        },
    });
}


// *****save checkout in to prisma db 

export async function SaveCheckOut(timeIn: Worklog) {
    // Normalize checkOut date to remove the time component
    const checkoutDate = new Date(timeIn.checkOut);
    checkoutDate.setHours(0, 0, 0, 0);

    try {
        // Check if there is already a checkout for the same day
        const existingWorklog = await prisma.worklog.findMany({
            where: {
                userId: timeIn.userId,
                AND: [
                    {
                        checkIn: {
                            gte: checkoutDate,
                        },
                    },
                    {
                        checkIn: {
                            lt: new Date(checkoutDate.getTime() + 86400000), 
                        },
                    },
                ],
                checkOut: null,
            },
        });

        // If no checkedout return
        if (existingWorklog.length === 0) {
            console.log("No check-in found to check out for today or already checked out.");
            return; 
        }

        // Proceed to update the first matching worklog 
        const updatedWorklog = await prisma.worklog.update({
            where: {
                id: existingWorklog[0].id, 
            },
            data: {
                checkOut: timeIn.checkOut,
                reasonEarly: timeIn.reasonEarly,
            },
        });

        console.log("Updated worklog:", updatedWorklog);
        return updatedWorklog;
    } catch (error) {
        console.error("Failed to update worklog:", error);
        throw error;
    }
}

// *****search in db for checkin date if there or not :

export async function IsUserCheckIn(date: string) {
    //for date
    const NewDate = formatISO(date);
    const StartDate = startOfDay(NewDate);
   
    const EndDate = endOfDay(NewDate);
    //id user from session
    const session = await getSession();

    //start search in db
    const result = await prisma.worklog.findMany({
        where: {
            userId: session.userId,
            checkIn: {
                gte: StartDate,
                lte: EndDate,
            },
        },
    });
    return result.length > 0;
}



// *****return user checkin
export async function getMyCheckIn() {
    const prisma = new PrismaClient();
    const session = await getSession();
    const getWorklogById = async () => {
        try {
            const worklog = await prisma.worklog.findMany({
                where: {
                    userId: session.userId,
                },
            });

            return worklog;
        } catch (error) {
            console.error('Error retrieving worklog:', error);
            throw error;
        }
    };

    const g = await getWorklogById();
    console.log(g);
}


//Get all users 



export async function getAllUsers() {
    const prisma = new PrismaClient(); // Instantiate outside of the function for reuse
  try {
    const users = await prisma.user.findMany();
    console.log(users)
    
    return users;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error; // Re-throw the error after logging it
  }
}

//**** */ update user when admin edit
export async function UpdateUser(data:any){
 
    
    try{
    const updatedUser = await prisma.user.update({
        where: {
            id:data.id, // Use the ID from the request URL
        },
        data: {
            username: data.username, 
           
            isAdmin: data.isAdmin,
            
        },
    });
    
    
   
} catch (error) {
    console.error('Failed to update user:', error);
   
}

}


//** */ get all my record check in out 
export async function getUserCheckInOuts(username : any) {
   
  try {
    const userCheckInOuts = await prisma.user.findUnique({
      where: {
        username: username,
      },
      include: {
         
        worklogs: true,
      },
    });

    return userCheckInOuts?.worklogs;
  } catch (error) {
    console.error('Error fetching check-ins and check-outs for user:', error);
    throw error;
  }
}

