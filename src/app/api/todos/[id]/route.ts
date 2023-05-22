import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: {
    id: string;
  };
}

export const PUT = async (req: Request, { params }: Params) => {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ message: "params not found" });
  } else {
    const todo = await prisma.toDo.findFirst({
      where: {
        id,
      },
    });

    await prisma.toDo.update({
      where: {
        id,
      },
      data: {
        active: todo!.active === true ? false : true,
      },
    });
    return NextResponse.json({ message: "success" });
  }
};
