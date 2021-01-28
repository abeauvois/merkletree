## Get started

```typescript
import { MerkleTree } from '../src';

const mt = new MerkleTree(['L1', 'L2']);

// results:

//    expect(mt.root[1][0]).toEqual(SHA256('L1'));
//    expect(mt.root[1][1]).toEqual(SHA256('L2'));
//    expect(mt.root[0][0]).toEqual(SHA256(SHA256('L1').toString() + SHA256('L2').toString()));
```

## How to Use

```bash
npm start # or yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.

To do a one-off build, use `npm run build` or `yarn build`.

To run tests, use `npm test` or `yarn test`.

## Continuous Integration

### GitHub Actions

Two actions are added by default:

- `main` which installs deps w/ cache, lints, tests, and builds on all pushes against a Node and OS matrix
- `size` which comments cost comparison of your library on every pull request using [`size-limit`](https://github.com/ai/size-limit)

