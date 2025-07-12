import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  LogIn,
  Menu,
  Moon,
  Settings2,
  Sun,
  UserPlus,
  VolumeOff,
} from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

const Settings = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <>
      <Popover>
        <PopoverTrigger asChild>
          <Button size={"icon"} variant={"secondary"}>
            <Menu />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 w-80">
          <h2 className="pt-2 pl-2 text-muted-foreground">
            Settings: <span className="text-white">info@ixtiyor.ai</span>
          </h2>
          <Separator className="my-2" />
          <div className="flex flex-col">
            <div
              className="flex justify-between items-center p-2 hover:bg-secondary cursor-pointer"
              onClick={() => setIsProfileOpen(true)}
            >
              <div className="flex items-center gap-1">
                <Settings2 size={16} />
                <span className="text-sm">Profile</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-2 hover:bg-secondary cursor-pointer">
              <div className="flex items-center gap-1">
                <UserPlus size={16} />
                <span className="text-sm">Create contact</span>
              </div>
            </div>

            <div className="flex justify-between items-center p-2 hover:bg-secondary">
              <div className="flex items-center gap-1">
                <VolumeOff size={16} />
                <span className="text-sm">Mute</span>
              </div>
              <Switch />
            </div>

            <div className="flex justify-between items-center p-2 hover:bg-secondary">
              <div className="flex items-center gap-1">
                {resolvedTheme === "dark" ? (
                  <Sun size={16} />
                ) : (
                  <Moon size={16} />
                )}
                <span className="text-sm">
                  {resolvedTheme === "dark" ? "Light mode" : "Dark mode"}
                </span>
              </div>
              <Switch
                checked={resolvedTheme === "dark" ? true : false}
                onCheckedChange={() =>
                  setTheme(resolvedTheme === "dark" ? "light" : "dark")
                }
              />
            </div>

            <div className="flex justify-between items-center bg-destructive p-2 cursor-pointer">
              <div className="flex items-center gap-1">
                <LogIn size={16} />
                <span className="text-sm">Logout</span>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Settings;
