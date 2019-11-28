import { context } from './core/context';

context.hi();

function hi(name: string): string {
  return `HELLO, ${name}!`;
}

(async (): Promise<void> => {
  console.log(await context.double(5));
})();

console.log(hi('foway0'));
