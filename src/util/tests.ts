export type MockType<T> = {
  [P in keyof T]: jest.Mock<{}>;
};

export type PartialMockType<T> = Partial<MockType<T>>;

export function createMockFactory<T>(
  functions: Partial<{ [P in keyof T]: jest.Mock<{}> }>,
): () => PartialMockType<T> {
  const factory: () => PartialMockType<T> = jest.fn(() => functions);
  return factory;
}
