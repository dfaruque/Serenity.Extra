declare var jsondiffpatch: any;

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

        ready = () => {

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
            showDiff: (versionInfo: AuditLogRow) => {
                //showing diff visually
                var left = versionInfo.OldEntity;
                var right = versionInfo.NewEntity;
                var delta = jsondiffpatch.diff(left, right);

                // beautiful html diff
                document.getElementById('visualizeDiff').innerHTML = jsondiffpatch.formatters.html.format(delta, left);

            },

            getDiff: (versionInfo: AuditLogRow) => {
                //showing diff visually
                var left = versionInfo.OldEntity;
                var right = versionInfo.NewEntity;
                var delta = jsondiffpatch.diff(left, right);

                // beautiful html diff
                return jsondiffpatch.formatters.html.format(delta);

                //var delta = jsondiffpatch.diff(left, right);

                //// left is optional, if specified unchanged values will be visible too
                //document.getElementBy('the-diff').innerHTML = jsondiffpatch.formatters.html.format(delta, left);


                //// Also you can dinamically show/hide unchanged values
                //jsondiffpatch.formatters.html.showUnchanged();
                //jsondiffpatch.formatters.html.hideUnchanged();
                //// these will also adjust array move arrows (SVG), which is useful if something alters the html layout
            }
        }

        destroyed() {

        }
    }
}