class Context {
  constructor() {
    console.log('this is context');
  }

  hi(): void {
    console.log('HELLO!');
  }

  async double(number: number): Promise<number> {
    return Promise.resolve(number * 2);
  }
}

export const context = new Context();
