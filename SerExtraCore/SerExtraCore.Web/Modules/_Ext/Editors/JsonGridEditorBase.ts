namespace _Ext {
    export class JsonGridEditorBase<TEntity> extends _Ext.GridEditorBase<TEntity> {

        public getEditValue(property, target) {
            target[property.name] = JSON.stringify(this.value || []);
        }

        public setEditValue(source, property) {
            this.value = JSON.parse(source[property.name] || '[]');
        }
    }
}