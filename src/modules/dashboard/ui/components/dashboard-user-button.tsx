import { authClient } from "@/lib/auth-client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { ChevronDownIcon, CreditCard, CreditCardIcon, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export const DashboardUserButton = () =>{

    const  {data, isPending} = authClient.useSession();
    const router = useRouter();

    const onLogout = () =>{
        authClient.signOut({
            fetchOptions: {
                onSuccess: () =>{
                    router.push("/sign-in");
                }
            }
        });
    }

    if(isPending || !data?.user){
        return null;
    }

    return(
        <DropdownMenu>
            <DropdownMenuTrigger className="rounded-lg border border-border/10 p-3 w-full flex items-center justify-between bg-white/5 hover:bg-whie/10 overflow-hidden">
                {data.user.image ? (
                    <Avatar>
                        <AvatarImage src={data.user.image}/>
                    </Avatar>
                ) : (
                    <GeneratedAvatar
                        seed={data.user.name}
                        variant="initials"
                        className="size-9 mr-3 "
                    />
                )}

                <div className="flex flex-col gap-0.5 text-left overflow-hidden flex-1 min-w-0">
                    <p className="truncate text-sm w-full">
                        {data.user.name}
                    </p>
                    <p className="truncate text-xs w-full">
                        {data.user.email}
                    </p>
                </div>

            <ChevronDownIcon className="size-4 shrink-0" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="right" className="w-72">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>
                        <div className="flex flex-col gap-1">
                            <span className="font-medium truncate">{data.user.name}</span>
                            <span className="text-sm font-normal text-muted-foreground truncate">{data.user.email}</span>
                        </div>
                    </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator/>
                <DropdownMenuItem className="cursor-pointer flex justify-between items-center">
                    Billing
                    <CreditCardIcon className="size-4"/>
                </DropdownMenuItem>
                <DropdownMenuItem 
                    onClick={onLogout}
                    className="cursor-pointer flex justify-between items-center">
                    Logout
                    <LogOutIcon className="size-4"/>
                </DropdownMenuItem>
            </DropdownMenuContent>
            
        </DropdownMenu>
    )
}