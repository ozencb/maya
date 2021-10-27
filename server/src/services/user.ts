import { DI } from '../lib';

export const getDetailById = async (id: number) => {
  return DI.userRepository.findOne({ id });
};
