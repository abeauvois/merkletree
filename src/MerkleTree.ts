import { Leave, Hash, TErrors } from './types';
import { SHA256 } from 'crypto-js';

export class MerkleTree {
  root: Hash[];
  leaves: Hash[];
  levelHashes: Hash[][];
  levels: number;

  constructor(blocks: string[]) {
    if (!this.valid(blocks)) throw new Error(TErrors.BAD_MERKLETREE_PARAMETERS);
    this.root = [];
    this.leaves = this.getLeaves(blocks);
    this.root.push(this.leaves);
    this.levelHashes = [];
    this.levels = 0;
    this.buildTree();
  }

  private valid(blocks: Leave[]): boolean {
    return Array.isArray(blocks) && blocks.length > 0;
  }

  getRoot(): Hash[] {
    return this.root;
  }

  getHeight(): number {
    return this.root.length - 1;
  }

  getLevelHashes(index: number): Hash[] {
    return this.root[index];
  }

  getLeaves(blocks: string[]): Hash[] {
    return blocks.map(block => SHA256(block));
  }

  buildTree(): any {
    while (this.root[0].length > 1) {
      let raw = [];

      for (let index = 0; index < this.root[0].length; index += 2) {
        if (index < this.root[0].length - 1 && index % 2 == 0) {
          raw.push(SHA256(this.root[0][index] + this.root[0][index + 1]));
        } else raw.push(this.root[0][index]);
      }

      this.root.unshift(raw);
    }
  }

  static fromLeaves(leaves: Leave[]): MerkleTree {
    return new MerkleTree(leaves);
  }
}
