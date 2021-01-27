import { updateUser } from "../services/users.ts";

export default async ({ params, request, response }: any) => {
  const userId = params.id;
  const body = await request.body()
  if (!userId) {
    response.status = 400;
    response.body = { msg: "Invalid user id" };
    return;
  }

  if (!request.hasBody) {
    response.status = 400;
    response.body = { msg: "Invalid user data" };
    return;
  }
  
  const values = await body.value
  let { name, role, jiraAdmin } = values

  await updateUser(userId, { name, role, jiraAdmin });

  response.body = { msg: "User updated" };
};