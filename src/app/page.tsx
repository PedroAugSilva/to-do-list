"use client";
import * as Checkbox from "@radix-ui/react-checkbox";
import { Check, Plus } from "phosphor-react";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface ITaskForm {
  title: string;
}
interface ITask {
  id: string;
  title: string;
  active: boolean;
  created_at: string;
}

export default function Home() {
  const { register, handleSubmit } = useForm<ITaskForm>();
  const [data, setData] = useState<ITask[]>();

  const refresh = async () => {
    const reponse = await fetch("/api/todos", {
      method: "GET",
    });
    const dataResponse = await reponse.json();
    setData(dataResponse);
  };

  const handleCreateTask: SubmitHandler<ITaskForm> = async (data) => {
    await refresh();

    await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(data),
    });
  };

  const handleToggleTask = async (taskId: string) => {
    await refresh();
    await fetch(`/api/todos/${taskId}`, {
      method: "PUT",
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="w-96 h-max bg-zinc-900 rounded p-3 flex flex-col items-center">
      <header className="w-full h-max">
        <h1 className="text-lg">To-Do List</h1>
        <form
          className=" w-full flex flex-row items-center gap-2 mt-2"
          onSubmit={handleSubmit(handleCreateTask)}
        >
          <input
            type="text"
            className="bg-zinc-800 border-2 border-zinc-600 flex-1 h-10 rounded  px-2 outline-none transition-all focus:border-emerald-500  "
            placeholder="Title..."
            {...register("title")}
          />
          <button className=" bg-emerald-500 w-10 h-10  rounded text-3xl grid place-items-center transition-all hover:bg-emerald-600 ">
            <Plus size={24} />
          </button>
        </form>
      </header>
      <section className="w-full h-max mt-5">
        <h1>Tasks</h1>
        <div className="w-full h-96 mt-2 flex flex-col items-center gap-2 overflow-y-auto">
          {data?.map((task, index) => (
            <div
              key={index}
              className="w-full h-14 bg-zinc-800 rounded-lg p-3 flex flex-row items-center gap-2 flex-none"
            >
              <Checkbox.Root
                checked={task.active}
                onCheckedChange={() => handleToggleTask(task.id)}
                className="w-7 h-7 bg-zinc-700 rounded-lg transition-all grid place-content-center data-[state=checked]:bg-emerald-500 group"
              >
                <Checkbox.Indicator>
                  <Check
                    size={20}
                    className="opacity-0 group-data-[state=checked]:opacity-100 transition-all"
                  />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span>{task.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
