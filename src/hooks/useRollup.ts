import RollupAbi from "global/contracts/abis/RollUp.json";
import { BigNumber, Contract, utils } from "ethers";
import { Falsy, useCall } from "@usedapp/core";
import { useEffect, useState } from "react";
import { BlockHeader } from "../global/Types";

const rollupAddress = process.env.REACT_APP_ROLLUP_CONTRACT_ADDRESS || "";
const rollupInterface = new utils.Interface(RollupAbi.abi);
const rollup = new Contract(rollupAddress, rollupInterface);

/**
 * Get a last block height
 * @return The most recent block height
 */
export const useLastHeight = () => {
  const [height, setHeight] = useState(Number.NaN);
  const [heightError, setHeightError] = useState(null);

  const res: any = useCall({
    contract: rollup,
    method: "getLastHeight",
    args: [],
  });

  useEffect(() => {
    if (res) {
      const { error, value } = res;
      if (error) {
        setHeightError(error.message);
      } else {
        if (value && value.length) {
          setHeightError(null);
          const h = BigNumber.from(value[0]).toNumber();
          if (h !== height) setHeight(h);
        }
      }
    }
  }, [res]);
  return { height, heightError };
};

/**
 * Get Block Header List
 * @param height height Block height to start getting
 * @param size size The size of the blocks
 * @return Block header list
 */
export const useByFromHeight = (height: number, size: number) => {
  const [blocksHeader, setBlocksHeader] = useState<BlockHeader[]>([]);
  const [blocksHeaderError, setBlocksHeaderError] = useState(null);

  const h = height < size ? 0 : height - size + 1;
  const s = height < size ? height : size;

  const res: any =
    useCall({
      contract: rollup,
      method: "getByFromHeight",
      args: [h, s],
    }) ?? null;

  useEffect(() => {
    if (res) {
      const { error, value } = res;
      if (error) {
        setBlocksHeaderError(error.message);
      } else {
        if (value && value.length) {
          setBlocksHeader(value[0].map((bh) => createTx(bh)));
        }
      }
    }
  }, [res]);

  return { blocksHeader, blocksHeaderError };
};

/**
 * Get a blockheader by block height
 * @param hash Height of the block header
 * @return Block header of the height
 * [
 *   blockHeader.height,
 *   blockHeader.curBlock,
 *   blockHeader.prevBlock,
 *   blockHeader.merkleRoot,
 *   blockHeader.timestamp,
 *   blockHeader.CID
 * ]
 */
export const useByHeight = (height: number | Falsy) => {
  const [blockHeader, setBlockHeader] = useState<BlockHeader>({
    height: undefined,
    curBlock: undefined,
    prevBlock: undefined,
    merkleRoot: undefined,
    timestamp: undefined,
    CID: undefined,
  });
  const [blockHeaderError, setBlockHeaderError] = useState(null);

  const res: any =
    useCall(
      height && {
        contract: rollup,
        method: "getByHeight",
        args: [height],
      }
    ) ?? {};

  useEffect(() => {
    if (res) {
      const { error, value } = res;
      if (error) {
        setBlockHeaderError(error.message);
      } else {
        if (value && value.length) {
          setBlockHeaderError(null);
          if (height !== value[0]) setBlockHeader(createTx(value));
        }
      }
    }
  }, [res]);

  return { blockHeader, blockHeaderError };
};

/**
 * Get a block Header by block hash
 * @param hash Block hash of the block
 * @return Block header of the block hash
 * [
 *   blockHeader.height,
 *   blockHeader.curBlock,
 *   blockHeader.prevBlock,
 *   blockHeader.merkleRoot,
 *   blockHeader.timestamp,
 *   blockHeader.CID
 * ]
 */
export const useByHash = (hash: string) => {
  return useCall({
    contract: rollup,
    method: "getByHash",
    args: [hash],
  });
};

/**
 * Get the block array length
 * @return The block array length
 */
export const useSize = () => {
  return useCall({
    contract: rollup,
    method: "size",
    args: [],
  });
};

export const createTx = (tx: any[]): BlockHeader => {
  const header = new BlockHeader();
  header.height = tx[0];
  header.curBlock = tx[1];
  header.prevBlock = tx[2];
  header.merkleRoot = tx[3];
  header.timestamp = tx[4];
  header.CID = tx[5];
  return header;
};
