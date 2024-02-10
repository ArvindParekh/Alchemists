// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserInfo = () => {
   return (
      <>
         <div className='flex justify-between items-center w-[90%] border mx-auto'>
            <div>
               <h1 className='text-6xl font-bold'>Hello,</h1>
               <h2 className='text-4xl font-bold'>Arvind</h2>
            </div>
            {/* <Avatar>
               <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar> */}
         </div>
      </>
   );
};

export default UserInfo;
