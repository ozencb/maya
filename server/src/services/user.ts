import { DB } from '../lib';

export const getDetailById = async (id: number) => {
  return DB.userRepository.findOne({ id });
};
