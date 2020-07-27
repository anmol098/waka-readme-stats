import { getVgPositionChannel } from '../../../channel';
import { getMarkPropOrConfig } from '../../common';
const ALIGNED_X_CHANNEL = {
    left: 'x',
    center: 'xc',
    right: 'x2'
};
const BASELINED_Y_CHANNEL = {
    top: 'y',
    middle: 'yc',
    bottom: 'y2'
};
export function vgAlignedPositionChannel(channel, markDef, config, defaultAlign = 'middle') {
    if (channel === 'radius' || channel === 'theta') {
        return getVgPositionChannel(channel);
    }
    const alignChannel = channel === 'x' ? 'align' : 'baseline';
    const align = getMarkPropOrConfig(alignChannel, markDef, config);
    if (channel === 'x') {
        return ALIGNED_X_CHANNEL[align || (defaultAlign === 'top' ? 'left' : 'center')];
    }
    else {
        return BASELINED_Y_CHANNEL[align || defaultAlign];
    }
}
//# sourceMappingURL=position-align.js.map