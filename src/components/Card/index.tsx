import { PersonIcon } from "@radix-ui/react-icons";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

type TCard = {
  id: number;
  content: string;
};

type TItem = { type: string; id: number; index: number };

export function Card({ card, index }: { card: TCard; index: number }) {
  const liRef = useRef<HTMLLIElement>(null);
  const [{ isDragging }, dragRef] = useDrag({
    type: "CARD",
    item: { id: card.id, index: index + 1, content: card.content },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<TItem>({
    accept: "CARD",
    hover(item, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index + 1;

      if (draggedIndex === targetIndex) {
        return;
      }
      const targetSize = liRef.current?.getBoundingClientRect();
      const draggedOffset = monitor.getClientOffset();

      if (!targetSize || !draggedOffset) {
        return;
      }
      const targetCenter = (targetSize.bottom - targetSize.top) / 2;
      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      console.log(targetSize);
    },
  });

  dragRef(dropRef(liRef));

  return (
    <li
      ref={liRef}
      aria-pressed={isDragging}
      className="flex items-center py-2 px-3 aria-pressed:bg-transparent aria-pressed:hover:scale-100 aria-pressed:border-2 aria-pressed:border-gray-400 aria-pressed:border-dashed cursor-grab hover:scale-110 mx-auto transition duration-300 ease-in-out border-t-[20px] border-t-[rgba(230,236,245,0.4)] bg-white shadow-md rounded-sm"
    >
      <span
        aria-pressed={isDragging}
        className="space-y-4 aria-pressed:invisible "
      >
        <p className="text-base font-medium uppercase leading-none">
          {card.content}
        </p>
        <PersonIcon className="border-2 mt-2 size-6" />
      </span>
    </li>
  );
}
