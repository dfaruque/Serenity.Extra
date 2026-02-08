import { GridEditorBase } from "./GridEditorBase"

export class JsonGridEditorBase<TEntity> extends GridEditorBase<TEntity> {

    public override getEditValue(property, target) {
        target[property.name] = JSON.stringify(this.value || []);
    }

    public override setEditValue(source, property) {
        this.value = JSON.parse(source[property.name] || '[]');
    }
}
