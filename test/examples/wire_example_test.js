// import FooModule from '../src/wire';
// import {foo, __RewireAPI__ as FooModuleRewireAPI} from '../src/wire';
// import {expect} from 'chai'
//
// describe('module default export test', function () {
//     it('should demonstrate the default exported rewire api', function () {
//         expect(foo()).to.equal('Hello world');
//         FooModule.__Rewire__('message', function () {
//             return 'my message';
//         });
//         expect(foo()).to.equal('my message');
//         FooModule.__ResetDependency__('message');
//     });
//
//     it('should demonstrate the rewire apis named export', function () {
//         expect(foo()).to.equal('Hello world');
//         FooModuleRewireAPI.__Rewire__('message', function () {
//             return 'my message';
//         });
//         expect(foo()).to.equal('my message');
//         FooModuleRewireAPI.__ResetDependency__('message');
//     });
// });
