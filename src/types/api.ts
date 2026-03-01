export interface AuthRequestBody {
  email: string;
  password: string;
}

export interface RegisterRequestBody extends AuthRequestBody {
  name: string;
}

export interface JobFilters {
  title?: string;
  location?: string;
  category?: string;
}

export interface JobInput {
  title: string;
  companyName: string;
  location: string;
  jobType: string;
  salary?: string;
  category: string;
  logo?: string;
  logoColor?: string;
  tag2?: string;
  description: string;
}

export interface ApplicationInput {
  job: string;
  name: string;
  email: string;
  resumeLink: string;
  coverLetter: string;
}

export interface JwtPayload {
  id: string;
  iat?: number;
  exp?: number;
}

export interface AuthenticatedUser {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}
