import { EnumFormatter, EnumTypeRegistry } from "@serenity-is/corelib"

export function getEnumText(enumTypeOrKey, value) {
    let enumKey = enumTypeOrKey.__typeName ? enumTypeOrKey.__typeName : enumTypeOrKey;
    let title = EnumFormatter.format(EnumTypeRegistry.get(enumKey), value);
    return title;
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
