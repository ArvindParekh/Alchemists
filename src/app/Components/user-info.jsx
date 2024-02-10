import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const UserInfo = () => {
   return (
      <>
         <div className='flex justify-between items-center w-[100%] mx-auto bg-green-800 rounded-bl-xl rounded-br-xl px-2'>
            <div>
               <h1 className='text-5xl font-bold mt-5'>Hello,</h1>
               <h2 className='text-4xl font-bold text-white mb-4'>Arvind</h2>
            </div>
            <Avatar>
               <AvatarImage src='https://avatars.githubusercontent.com/u/124599?v=4' alt='@shadcn' />
               <AvatarFallback>CN</AvatarFallback>
            </Avatar>
         </div>
      </>
   );
};

export default UserInfo;
