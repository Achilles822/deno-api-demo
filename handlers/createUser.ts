import { createUser } from '../services/users.ts'

export default async ({ params, request, response }: any) => {
  const body = await request.body()
  if (!request.hasBody) {
    response.status = 400
    response.body = { msg: 'Invalid user data' }
    return
  }
  const values = await body.value
  let { name, role, jiraAdmin } = values
  console.log(name)
  if (!name || !role) {
    response.status = 422
    response.body = { msg: 'Incorrect user data. Name and role are required' }
    return
  }

  const userId = await createUser({ name, role, jiraAdmin })

  response.body = { msg: 'User created', userId }
}
