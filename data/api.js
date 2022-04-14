export let loadings = true;

export const getAllData = async () => {
  const response = await fetch("https://materi-thrive-demo.vercel.app/api/hero");
  const data = await response.json();
  //   console.log(data);
  return data;
};

export const getSkill = async (characterId) => {
  const response = await fetch(`https://materi-thrive-demo.vercel.app/api/hero/${characterId}`);
  const data = await response.json();
  // console.log(data);
  return data;
};

export const getCity = async () => {
  const response = await fetch(`https://materi-thrive-demo.vercel.app/api/city`);
  const data = await response.json();
  // console.log(data);
  return data;
};

export const getVillains = async () => {
  const response = await fetch(`https://materi-thrive-demo.vercel.app/api/villain`);
  const data = await response.json();
  // console.log(data);
  return data;
};
