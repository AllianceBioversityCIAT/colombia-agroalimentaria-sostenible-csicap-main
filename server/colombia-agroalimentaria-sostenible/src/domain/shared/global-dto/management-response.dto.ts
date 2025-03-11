import { Persona } from '../../complementary-entities/personas/persona.entity';

export class ValidJwtResponse {
  public isValid: boolean;
  public user?: Partial<Persona>;
}
