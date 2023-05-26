import type { Pixabay } from './types';

const key = '34222594-84925490250bae9000fad4897';
// const key = 'flCc36_tZ4EN4oHp2irl3rvLkRmb3S0D8JMEoYzcgmk';
// const secret = 'J3rd2izdOxxWjJI2k6zlTZFbPMS9RHUMqUskZ8OPXwo';

const searchImage = async (query: string) => {
  const res = await fetch(`https://pixabay.com/api/?key=${key}&q=${query}`);
  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const { results }: Pixabay.RootObject = await res.json();
  return results;
};

export default searchImage;