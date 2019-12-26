import { Html2Pug } from "../src/Html2Pug";

//import { Delays, greeter } from '../src/main';
describe('greeter function', () => {
  it('just first test', () => {
    expect('Hello').toBe(`Hello`);
  });
  it('converts simple html', () => {
    let html = `
    <div *ngIf="true" class="ui-g" style="padding-bottom: 10px">   
      <span>Some text</span>
    </div>
    `
    let res = new Html2Pug().convertString(html);
    expect(res.indexOf('div')).toBe(0);
  });
});
// describe('greeter function', () => {
//   // Read more about fake timers: http://facebook.github.io/jest/docs/en/timer-mocks.html#content
//   jest.useFakeTimers();

//   const name: string = 'John';
//   let hello: string;

//   // Act before assertions
//   beforeAll(async () => {
//     const p: Promise<string> = greeter(name);
//     jest.runOnlyPendingTimers();
//     hello = await p;
//   });

//   // Assert if setTimeout was called properly
//   it('delays the greeting by 2 seconds', () => {
//     expect(setTimeout).toHaveBeenCalledTimes(1);
//     expect(setTimeout).toHaveBeenLastCalledWith(
//       expect.any(Function),
//       Delays.Long,
//     );
//   });

//   // Assert greeter result
//   it('greets a user with `Hello, {name}` message', () => {
//     expect(hello).toBe(`Hello, ${name}`);
//   });
// });
