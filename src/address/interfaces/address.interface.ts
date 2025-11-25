export interface Address {
  id:         string;
  firstName:  string;
  lastName:   string;
  ci:         string;
  phone:      string;
  address:    string;
  reference:  null;
  isDefault:  boolean;
  userId:     string;
  department: Department;
}

export interface Department {
  id:       string;
  name:     string;
  province: Province;
}

export interface Province {
  id:   string;
  name: string;
  city: City;
}

export interface City {
  id:   string;
  name: string;
}
