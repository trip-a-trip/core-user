export abstract class UserRepository {
  abstract count(): Promise<number>;
}
