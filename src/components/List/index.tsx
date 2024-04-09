import { PlusIcon } from "@radix-ui/react-icons";
import { Card } from "../Card";
type TList = {
  id: number;
  content: string;
};

export function List({ title, cards }: { title: string; cards: TList[] }) {
  return (
    <section
      data-sucess={title === "Concluído"}
      className="w-80 px-2   border-slate-200 data-[sucess=true]:opacity-60"
    >
      <header className="flex justify-between gap-2 items-center h-16 mb-2">
        <h2 className="text-xl">{title}</h2>
        {title === "Tarefas" && (
          <button
            type="button"
            className="bg-purple-200/85 rounded-md shadow-md p-2"
          >
            <PlusIcon className="size-4 text-black" />
          </button>
        )}
      </header>
      <ul className="p-2 w-72 overflow-x-hidden scrollbar space-y-4">
        {cards.map((item, index) => (
          <Card key={item.id} index={index} card={item} />
        ))}
      </ul>
    </section>
  );
}
