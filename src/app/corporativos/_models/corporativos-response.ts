export interface CorporativosResponse {
  data: Corporativos[];
}

export interface Corporativos {
  D_FechaIncorporacion: string;
  FK_Asignado_id: number;
  S_Activo: number;
  S_DBName: string;
  S_DBUsuario: string;
  S_LogoURL: string;
  S_NombreCompleto: string;
  S_NombreCorto: string;
  S_SystemUrl: string;
  asignado: Asignado;
  created_at: string;
  id: number;
  tw_users_id: number;
  updated_at: string;
  user_created: User;
}

export interface Asignado {
  S_Activo: number;
  S_Apellidos: string;
  S_FotoPerfilURL: string;
  S_Nombre: string;
  banned: number;
  created_at: string;
  deleted_at: null;
  email: string;
  id: number;
  tw_role_id: number;
  updated_at: string;
  username: string;
  verification_token: string;
  verified: string;
}

export interface User {
  S_Activo: number;
  S_Apellidos: string;
  S_FotoPerfilURL: string;
  S_Nombre: string;
  banned: number;
  created_at: string;
  deleted_at: null;
  email: string;
  id: number;
  tw_role_id: 1;
  updated_at: string;
  username: string;
  verification_token: string;
  verified: string;
}
