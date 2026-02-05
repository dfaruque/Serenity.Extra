import { EnumFormatter, EnumTypeRegistry } from "@serenity-is/corelib"

export function getEnumText(enumTypeOrKey, value) {
    let enumKey = enumTypeOrKey.typeInfo?.typeName ? enumTypeOrKey.typeInfo?.typeName :
        enumTypeOrKey.__typeName ? enumTypeOrKey.__typeName : enumTypeOrKey;

    return EnumFormatter.format(EnumTypeRegistry.get(enumKey), value);
}

export function isNumber(value): boolean {
    return !isNaN(Number(value))
}

export function getEnumValues(enumType): number[] {
    let items: number[] = [];
    for (let item in enumType) {
        if (isNumber(item)) {
            items.push(Number(item));
        }
    }

    return items;
}

export function getEnumKeys(enumType): string[] {
    return getEnumValues(enumType).map(m => enumType[m]);
}
