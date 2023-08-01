export const changeCategory = (e, categories, setAttributesFromDB, setCategoryChoosen) => {
    const highLevelCategory = e.target.value.split("/")[0]
    const highLevelCategoryAllData = categories.find(item => item.name === highLevelCategory)
    if (highLevelCategoryAllData && highLevelCategoryAllData.attrs) {
        setAttributesFromDB(highLevelCategoryAllData.attrs)
    } else {
        setAttributesFromDB([])
    }
    setCategoryChoosen(e.target.value)
}

export const setValuesForAttrFromDBSelectForm = (e, attrsVal, attributesFromDB) => {
    if (e.target.value !== "Choose Attribute") {
        // console.log(attrsKey.current)
        const selectedAttr = attributesFromDB.find(item => item.key === e.target.value)
        let valuesForAttrKeys = attrsVal.current
        if (selectedAttr && selectedAttr.value.length > 0) {
            while (valuesForAttrKeys.length > 0) {
                valuesForAttrKeys.remove(0)  // remove all attributes values for particular key
            }
            valuesForAttrKeys.options.add(new Option("Choose Attribute Value"))
            selectedAttr.value.map(item => (
                valuesForAttrKeys.add(new Option(item))
            ))
        }
    }
};


export const setAttributeTableWrapper = (key, val, setAttributesTable) => {
    // these are the attributes of categories choosen to give new attribute to rpoduct
    setAttributesTable((attr) => {
        // common pattern when updating state that depends on its previous value
        if (attr.length !== 0) {
            var keyExistsInOldTable = false;
            let modifiedTable = attr.map(item => {
                if (item.key === key) {
                    keyExistsInOldTable = true;
                    item.value = val
                    return item
                } else {
                    return item
                }
            })
            if (keyExistsInOldTable) return [...modifiedTable]
            else return [...modifiedTable, { key: key, value: val }]
        } else {
            return [{ key: key, value: val }]
        }
    })
}
