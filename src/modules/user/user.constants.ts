export const role = ['user', 'admin'] as const;
export type Role = (typeof role)[number];
