export abstract class UserStorage {
  abstract saveNewUser(id: string): Promise<void>;
}
