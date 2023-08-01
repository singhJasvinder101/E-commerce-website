import React from 'react';
import { Form } from 'react-bootstrap';

const AttributeFilterComponent = ({ attrFilter, setAttrsFromFilter }) => {
    return (
        <div>
            {attrFilter && attrFilter.length > 0 && attrFilter.map((filter, idx1) => (
                <div key={idx1} className='mb-3'>
                    <Form.Label><b>{filter.key}</b></Form.Label>

                    {filter.value.map((valueForKey, idx2) => (  // Changed 'value' to 'values' to match the variable name
                        <Form.Check
                            key={idx2}
                            type='checkbox'
                            label={valueForKey}
                            onChange={(e) => {
                                setAttrsFromFilter(filters => {
                                    if (filters.length === 0) {
                                        return [{ key: filter.key, values: [valueForKey] }];
                                    }
                                    let index = filters.findIndex(item => item.key === filter.key);

                                    if (index === -1) {
                                        // if clicked key is not in filters (checked)
                                        return [...filters, { key: filter.key, values: [valueForKey] }];
                                    }

                                    // if clicked key is present in filters (checked) already
                                    // but it must check also (to handle uncheck check avoid err )
                                    if (e.target.checked) {
                                        filters[index].values.push(valueForKey);
                                        // if checked after unchecked its value get multiplied to avoid we use
                                        let unique = [...new Set(filters[index].values)]; 
                                        filters[index].values = unique;
                                        return [...filters];
                                    }

                                    // if clicked key inside filters and unchecked
                                    const filtersWithoutUncheckedValues = filters[index].values.filter(
                                        val => val !== valueForKey
                                    );
                                    filters[index].values = filtersWithoutUncheckedValues;
                                    if (filtersWithoutUncheckedValues.length > 0) {
                                        // if values array is not empty at least one attribute value is available then ok
                                        return [...filters];
                                    } else {
                                        // if values array is empty then delete the wholte key also
                                        let filtersWithoutOneKey = filters.filter(
                                            item => item.key !== filter.key
                                        );
                                        return filtersWithoutOneKey;
                                    }
                                });
                            }}
                        />
                    ))}

                </div>
            ))}
        </div>
    );
};

export default AttributeFilterComponent;
