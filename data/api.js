export let loadingHome = true;

export const getAllData = async () => {
  const response = await fetch("https://materi-thrive-demo.vercel.app/api/hero");
  const data = await response.json();
  //   loading = false;

  return data;
};

export const getSkill = async (characterId) => {
  const response = await fetch(`https://materi-thrive-demo.vercel.app/api/hero/${characterId}`);
  const data = await response.json();
  //   console.log(data);
  return data;
};
