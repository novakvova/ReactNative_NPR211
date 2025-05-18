export interface ICategoryItem {
  'id': number,
  'name': string,
  'image': string,
  'description': string,
  'userId': number
}

export interface ICategoryCreate {
  name: string;
  description?: string;
  image?: File|null;
  token: string | null;
}

export interface ICategoryMutResult {
  id: number;
}