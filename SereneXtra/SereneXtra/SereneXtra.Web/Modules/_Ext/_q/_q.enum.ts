
namespace q {

    export function getEnumText(enumKey, value) {
        let title = Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), value);
        return title;
    }

    export function getEnumValues(enumType): string[] {
        let items: string[] = [];
        for (let item in enumType) {
            if (!isNaN(Number(item))) {
                items.push(enumType[item]);
            }
        }

        return items;
    }

    export function getEnumKeys(enumType): string[] {
        let items: string[] = [];
        for (let item in enumType) {
            if (!isNaN(Number(item))) {
                items.push(item);
            }
        }

        return items;
    }

}
