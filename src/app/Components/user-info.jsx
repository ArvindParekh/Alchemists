// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserInfo = () => {
  return (
    <>
      <div className="flex justify-between items-center mx-auto">
        <div className="flex justify-start items-end text-3xl">
          <h1 className="">Hello,</h1> &nbsp;
          <h2 className="  text-purple-400 font-bold">Arvind</h2>
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
