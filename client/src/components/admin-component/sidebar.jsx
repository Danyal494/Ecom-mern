import { AdminSidebarMenuItem } from "@/config/FormControls";
import { ChartNoAxesCombined } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

function MenuItems({setOpen}){
  const navigate = useNavigate()
  return <nav className="mt-8 flex-col flex gap-2">
    {
      AdminSidebarMenuItem.map(menuItem=>   <button
        key={menuItem.id}
        onClick={() => {
          navigate(menuItem.path);
          if (setOpen) setOpen(false); // More explicit condition

        }} className=" flex text-xl cursor-pointer item-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground">
        {menuItem.icons}
        <span>{menuItem.label}</span>
      </button>)
    }
  </nav>
}

const AdminSidebar = ({open,setOpen}) => {
   const navigate = useNavigate()
  return (
    <Fragment>
      <Sheet  open={open} onOpenChange={setOpen}>
<SheetContent side="left" className="w-64 ">
  <div className="flex flex-col h-full">
    <SheetHeader className="border-b">
      <SheetTitle className="flex gap-2 items-center text-2xl font-medium ">
      <ChartNoAxesCombined size={30} /> 
        Admin Panel</SheetTitle>
    </SheetHeader>
    <MenuItems setOpen={setOpen}/>
  </div>
</SheetContent>
      </Sheet>
      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div onClick={()=> navigate("/admin/dashboard")} className="flex items-center cursor-pointer gap-2 ">
            <ChartNoAxesCombined size={30} /> 
          <h1 className="text-2xl font-extrabold ">
            Admin Panel
            {" "}
          </h1>
        </div>
        <MenuItems setOpen={setOpen}/>
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;