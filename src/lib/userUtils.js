import { getUserById, updateUser } from './airtable/request';

export async function getUser(id) {
  const user = await getUserById(id);
  return user;
}

export default getUser;
