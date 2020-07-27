import { getOffsetChannel } from '../../../channel';
export function getOffset(channel, markDef) {
    const offsetChannel = getOffsetChannel(channel);
    // TODO: in the future read from encoding channel too
    const markDefOffsetValue = markDef[offsetChannel];
    if (markDefOffsetValue) {
        return markDefOffsetValue;
    }
    return undefined;
}
//# sourceMappingURL=offset.js.map