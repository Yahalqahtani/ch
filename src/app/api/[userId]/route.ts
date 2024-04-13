import { UpdateUser } from "@/db/dbActions";
import { NextResponse } from "next/server";

export  async function PUT(req:Request, res:Response) {
  if (req.method === 'PUT') {
    
      
      const data = await req.json(); 

    UpdateUser(data)

      
  }
   return NextResponse.json({
        message: 'Update done', 
        status: 200,
       
    });
  
}

