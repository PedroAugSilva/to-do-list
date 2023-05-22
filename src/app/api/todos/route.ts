import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ITask {
  title: string;
  active: boolean;
}

export const GET = async () => {
  const tasks = await prisma.toDo.findMany();
  return NextResponse.json(tasks);
};

export const POST = async (req: Request) => {
  const data: ITask = await req.json();

  await prisma.toDo.create({
    data: {
      title: data.title,
      active: false,
    },
  });
  return NextResponse.json({ message: "success" });
};
