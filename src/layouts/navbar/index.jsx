import { navItems } from "@/nav-items";
import { Outlet, useNavigate } from "react-router-dom";
import { DesktopNavbar } from "./_components/DesktopNavbar";
import { MobileSheet } from "./_components/MobileSheet";
import { UserMenu } from "./_components/UserMenu";

const Layout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 justify-between">
        <DesktopNavbar navItems={navItems.filter(item => item.to !== '/' && item.to !== '/note/:id')} />
        <MobileSheet navItems={navItems.filter(item => item.to !== '/' && item.to !== '/note/:id')} />
        <UserMenu onLogout={handleLogout} />
      </header>
      <main className="flex-grow overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;