export class CreateTenantDto {
  name: string;
  database: string;
  code: string;

  constructor(name: string, database: string, code: string) {
    this.name = name;
    this.database = database;
    this.code = code;
  }
}
