import { sleep } from "../utils/general";

export const processFinanceQuestion = async (question: string): Promise<string> => {
  console.log('Received question:', question);
  await sleep(1000) // to simulate loading

  return 'The answer'
};
