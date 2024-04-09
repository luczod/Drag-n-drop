import { useState } from 'react';
import { loadLists } from '../../API';
import { List } from '../List';
import BoardContext from './context';
import { produce } from 'immer';

const data = loadLists();

export function Board() {
  const [lists, setLists] = useState(data);

  function move(fromList: number, toList: number, from: number, to: number) {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];

        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      }),
    );
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <div className="flex divide-x-2 w-full scrollbar flex-row h-[calc(100dvh_-_3rem)]  px-2 py-0">
        {lists.map((item, index) => (
          <List key={item.title} title={item.title} listIndex={index} cards={item.cards} />
        ))}
      </div>
    </BoardContext.Provider>
  );
}
