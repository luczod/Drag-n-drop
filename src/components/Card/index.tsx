import { PersonIcon } from "@radix-ui/react-icons";
import { useDrag } from "react-dnd";

type TCard = { text: string };

export function Card({ text }: TCard) {
  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <li
      ref={dragRef}
      className="flex items-center py-2 px-3 cursor-grab hover:scale-110 mx-auto transition  duration-300 ease-in-out border-t-[20px] border-t-[rgba(230,236,245,0.4)] bg-white shadow-md  rounded-sm"
    >
      <span className="space-y-4">
        <p className="text-base font-medium uppercase leading-none">{text}</p>
        <PersonIcon className="border-2 mt-2 size-6" />
      </span>
    </li>
  );
}
