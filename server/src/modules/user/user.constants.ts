export const role = ['user', 'manager'] as const;
export type Role = (typeof role)[number];
