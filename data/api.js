export let loadings = true;
// Get Data Hero
export const getAllData = async () => {
  const response = await fetch("https://materi-thrive-demo.vercel.app/api/hero");
  const data = await response.json();
  //   console.log(data);
  return data;
};

// Get Data Skill
export const getSkill = async (characterId) => {
  const response = await fetch(`https://materi-thrive-demo.vercel.app/api/hero/${characterId}`);
  const data = await response.json();
  // console.log(data);
  return data;
};

// Get Data City
export const getCity = async () => {
  const response = await fetch(`https://materi-thrive-demo.vercel.app/api/city`);
  const data = await response.json();
  // console.log(data);
  return data;
};

// Get Data Villain
export const getVillains = async () => {
  const response = await fetch(`https://materi-thrive-demo.vercel.app/api/villain`);
  const data = await response.json();
  // console.log(data);
  return data;
};

// Get Data Selected Villain
export const getSelectedVillain = async (villainId) => {
  const response = await fetch(`https://materi-thrive-demo.vercel.app/api/villain/${villainId}`);
  const data = await response.json();
  // console.log(data);
  return data;
};

// Post Fight Data
export const postFight = async (payload) => {
  const response = await fetch(`https://materi-thrive-demo.vercel.app/api/fight`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  // console.log("HASIL FIGHT :", data);
  return data;
};
