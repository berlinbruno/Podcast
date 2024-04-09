import AdminSidebar from "@/components/menu/AdminSidebar";

export default function layout({children}) {
  return (
    <main className=" flex ">
        <AdminSidebar/>
      {children}
    </main>
  )
}
