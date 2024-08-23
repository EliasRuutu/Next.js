

export enum Page {
  JustClass = "just-class",
  FullFit = "full-fit",
  Estudiante = "estudiante",
}


export const planes = [
  {
    name: "Just Class",
    price: 549,
    select: 1,
  },
  {
    name: "Just Class",
    price: 549,
    select: 1,
  },
  {
    name: "Full Fit",
    price: 849,
    select: 2,
  },
  {
    name: "Estudiante",
    price: 599,
    select: 3,
  },
];


export const getPlan = (plan: string) => {
  if (plan === "just-class") return planes[1];
  if (plan === "full-fit") return planes[2];
  if (plan === "estudiante") return planes[3];
  return planes[1];

};