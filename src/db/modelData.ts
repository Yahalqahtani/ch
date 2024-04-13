type User ={
  
  username  :string
  password  :string
  isAdmin   :boolean
  
  }
  
   
  type Worklog = {
   
   checkIn?: any;
   checkOut?: any; 
   reasonLate?: string;
   reasonEarly?: string;
   userId: number;
  
 };
 