namespace _Ext {
    export class AuditLogViewer {
        el = '.content-wrapper';
        data = {
            entityVersions: []
        };

        entity
        entityId

        constructor(el: string, entityVersions: AuditLogRow[]) {
            this.el = el || this.el;
            this.data.entityVersions = entityVersions;
        }

        mounted = () => {

        }

        computed = {
            test: () => {
                return 'test computed';
            }
        }

        filters = {
            filterByYardId: () => {
                return [];
            }
        }

        methods = {
            getDiff: (versionInfo: AuditLogRow) => {
                return AuditLogDialog.getChangesInHtml(versionInfo.Changes);
            }
        }

        destroyed() {

        }
    }
}