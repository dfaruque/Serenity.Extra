using Serenity.Data;
using Serenity.Services;

namespace _Ext
{
    public class MultiScopeBehaviour : IImplicitBehavior, ISaveBehavior, IDeleteBehavior
    {
        public bool ActivateFor(Row row)
        {
            var multiScope = row as IMultiScopeRow;
            if (multiScope == null)
            {
                return false;
            }
            return true;
        }


        public void OnAfterSave(ISaveRequestHandler handler) { }
        public void OnAudit(ISaveRequestHandler handler) { }

        public void OnBeforeSave(ISaveRequestHandler handler) { }
        public void OnPrepareQuery(ISaveRequestHandler handler, SqlQuery query) { }
        public void OnReturn(ISaveRequestHandler handler) { }
        public void OnSetInternalFields(ISaveRequestHandler handler) { }
        public void OnValidateRequest(ISaveRequestHandler handler) { }

        public void OnAfterDelete(IDeleteRequestHandler handler) { }
        public void OnAudit(IDeleteRequestHandler handler) { }
        public void OnBeforeDelete(IDeleteRequestHandler handler) { }
        public void OnPrepareQuery(IDeleteRequestHandler handler, SqlQuery query) { }
        public void OnReturn(IDeleteRequestHandler handler) { }
        public void OnValidateRequest(IDeleteRequestHandler handler) { }

    }

    public interface IMultiScopeRow
    {
    }
}