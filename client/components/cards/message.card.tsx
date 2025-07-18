import { useCurrentContact } from "@/hooks/use-current";
import { cn } from "@/lib/utils";
import { IMessage, STATUS } from "@/types";
import { format } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { FC } from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";

interface Props {
  message: IMessage;
}
const MessageCard: FC<Props> = ({ message }) => {
  const { currentContact } = useCurrentContact();

  const reactions = ["👍", "😂", "❤️", "😍", "👎"];

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div
          className={cn(
            "m-2.5 font-medium text-xs flex",
            message.receiver._id === currentContact?._id
              ? "justify-start"
              : "justify-end"
          )}
        >
          <div
            className={cn(
              "relative inline p-2 pl-2.5 pr-12 max-w-full",
              message.receiver._id === currentContact?._id
                ? "bg-primary"
                : "bg-secondary"
            )}
          >
            <p className="text-sm text-white">{message.text}</p>
            <div className="right-1 bottom-0 absolute opacity-60 text-[9px] flex gap-[3px]">
              <p>{format(message.updatedAt, "hh:mm")}</p>
              <div className="self-end">
                {message.receiver._id === currentContact?._id &&
                  (message.status === STATUS.READ ? (
                    <CheckCheck size={12} />
                  ) : (
                    <Check size={12} />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-56 p-0 mb-10">
        <ContextMenuItem className="grid grid-cols-5">
          {reactions.map((reaction) => (
            <div
              key={reaction}
              className={cn(
                "text-xl cursor-pointer p-1 hover:bg-primary/50 transition-all",
                message.reaction === reaction && "bg-primary/50"
              )}
              // onClick={() => onReaction(reaction, message._id)}
            >
              {reaction}
            </div>
          ))}
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default MessageCard;
