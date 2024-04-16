import { useRef, useContext } from 'react';
import { PersonIcon } from '@radix-ui/react-icons';
import { useDrag, useDrop } from 'react-dnd';
import BoardContext from '../Board/context';

type TCard = {
  id: number;
  content: string;
};

type TItem = { id: number; index: number; listIndex: number };

export function Card({
  card,
  index,
  listIndex,
}: {
  card: TCard;
  index: number;
  listIndex: number;
}) {
  const liRef = useRef<HTMLLIElement>(null);
  const ctx = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    type: 'CARD',
    item: { id: card.id, index, listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop<TItem>({
    accept: 'CARD',
    hover(item, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
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

      ctx?.move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(liRef));

  return (
    <li
      ref={liRef}
      aria-pressed={isDragging}
      className="flex items-center py-2 px-3 [&>span]:aria-pressed:invisible aria-pressed:bg-transparent aria-pressed:hover:scale-100 aria-pressed:border-2 aria-pressed:border-gray-400 aria-pressed:border-dashed cursor-grab hover:scale-110 mx-auto transition duration-300 ease-in-out border-t-[20px] border-t-[rgba(230,236,245,0.4)] bg-white shadow-md rounded-sm"
    >
      <span className="space-y-4">
        <p className="text-base font-medium uppercase leading-none">{card.content}</p>
        <PersonIcon className="border-2 mt-2 size-6" />
      </span>
    </li>
  );
}
