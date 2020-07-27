import { array, isString } from 'vega-util';
import * as log from '../../log';
import { isLookupData, isLookupSelection } from '../../transform';
import { duplicate, hash, varName } from '../../util';
import { DataFlowNode, OutputNode } from './dataflow';
import { findSource } from './parse';
import { SourceNode } from './source';
import { DataSourceType } from '../../data';
export class LookupNode extends DataFlowNode {
    constructor(parent, transform, secondary) {
        super(parent);
        this.transform = transform;
        this.secondary = secondary;
    }
    clone() {
        return new LookupNode(null, duplicate(this.transform), this.secondary);
    }
    static make(parent, model, transform, counter) {
        const sources = model.component.data.sources;
        const { from } = transform;
        let fromOutputNode = null;
        if (isLookupData(from)) {
            let fromSource = findSource(from.data, sources);
            if (!fromSource) {
                fromSource = new SourceNode(from.data);
                sources.push(fromSource);
            }
            const fromOutputName = model.getName(`lookup_${counter}`);
            fromOutputNode = new OutputNode(fromSource, fromOutputName, DataSourceType.Lookup, model.component.data.outputNodeRefCounts);
            model.component.data.outputNodes[fromOutputName] = fromOutputNode;
        }
        else if (isLookupSelection(from)) {
            const selName = from.selection;
            transform = Object.assign({ as: selName }, transform);
            fromOutputNode = model.getSelectionComponent(varName(selName), selName).materialized;
            if (!fromOutputNode) {
                throw new Error(log.message.noSameUnitLookup(selName));
            }
        }
        return new LookupNode(parent, transform, fromOutputNode.getSource());
    }
    dependentFields() {
        return new Set([this.transform.lookup]);
    }
    producedFields() {
        return new Set(this.transform.as ? array(this.transform.as) : this.transform.from.fields);
    }
    hash() {
        return `Lookup ${hash({ transform: this.transform, secondary: this.secondary })}`;
    }
    assemble() {
        let foreign;
        if (this.transform.from.fields) {
            // lookup a few fields and add create a flat output
            foreign = Object.assign({ values: this.transform.from.fields }, (this.transform.as ? { as: array(this.transform.as) } : {}));
        }
        else {
            // lookup full record and nest it
            let asName = this.transform.as;
            if (!isString(asName)) {
                log.warn(log.message.NO_FIELDS_NEEDS_AS);
                asName = '_lookup';
            }
            foreign = {
                as: [asName]
            };
        }
        return Object.assign(Object.assign({ type: 'lookup', from: this.secondary, key: this.transform.from.key, fields: [this.transform.lookup] }, foreign), (this.transform.default ? { default: this.transform.default } : {}));
    }
}
//# sourceMappingURL=lookup.js.map