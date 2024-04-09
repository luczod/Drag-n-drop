import { loadLists } from "../../API";
import { List } from "../List";

const data = loadLists();

export function Board() {
  return (
    <div className="flex divide-x-2 w-full scrollbar flex-row h-[calc(100dvh_-_3rem)]  px-2 py-0">
      {data.map((item) => (
        <List key={item.title} title={item.title} cards={item.cards} />
      ))}
    </div>
  );
}
