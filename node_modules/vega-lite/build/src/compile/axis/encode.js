import { getSecondaryRangeChannel } from '../../channel';
import { getFieldOrDatumDef } from '../../channeldef';
import { formatCustomType, isCustomFormatType } from '../format';
export function labels(model, channel, specifiedLabelsSpec) {
    var _a;
    const { encoding, config } = model;
    const fieldOrDatumDef = (_a = getFieldOrDatumDef(encoding[channel])) !== null && _a !== void 0 ? _a : getFieldOrDatumDef(encoding[getSecondaryRangeChannel(channel)]);
    const axis = model.axis(channel) || {};
    const { format, formatType } = axis;
    if (isCustomFormatType(formatType)) {
        return Object.assign({ text: formatCustomType({
                fieldOrDatumDef,
                field: 'datum.value',
                format,
                formatType,
                config
            }) }, specifiedLabelsSpec);
    }
    return specifiedLabelsSpec;
}
//# sourceMappingURL=encode.js.map