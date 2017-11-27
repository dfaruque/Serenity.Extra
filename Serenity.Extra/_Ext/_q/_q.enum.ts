
namespace q {

    export function getEnumText(enumKey, value) {
        let title = Serenity.EnumFormatter.format(Serenity.EnumTypeRegistry.get(enumKey), value);
        return title;
    }

}
