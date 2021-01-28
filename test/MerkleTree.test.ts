import { TErrors } from '../src/types';

import { MerkleTree } from '../src';
import { SHA256 } from 'crypto-js';

describe('MerkleTree', () => {
  it('R0: should throw with invalid parameters', () => {
    const mt = () => new MerkleTree([]);
    expect(mt).toThrow(TErrors.BAD_MERKLETREE_PARAMETERS);
  });

  it('R1: should get height of 1, if only 1 leave', () => {
    const mt = new MerkleTree(['L1']);
    expect(mt.getHeight()).toEqual(0);

    expect(mt.root[0][0]).toEqual(SHA256('L1'));
  });

  it('R2: should get height of 2, if only 2 leaves', () => {
    const mt = new MerkleTree(['L1', 'L2']);
    expect(mt.getHeight()).toEqual(1);

    expect(mt.root[1][0]).toEqual(SHA256('L1'));
    expect(mt.root[1][1]).toEqual(SHA256('L2'));
    expect(mt.root[0][0]).toEqual(
      SHA256(SHA256('L1').toString() + SHA256('L2').toString())
    );
  });

  it('R3: should get height of 1, if only 3 leaves', () => {
    const mt = new MerkleTree(['L1', 'L2', 'L3']);
    expect(mt.getHeight()).toEqual(2);

    expect(mt.root[2][0]).toEqual(SHA256('L1'));
    expect(mt.root[2][1]).toEqual(SHA256('L2'));
    expect(mt.root[1][0]).toEqual(
      SHA256(SHA256('L1').toString() + SHA256('L2').toString())
    );
  });
});
