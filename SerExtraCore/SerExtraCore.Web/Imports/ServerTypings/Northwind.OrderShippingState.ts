namespace SerExtraCore.Northwind {
    export enum OrderShippingState {
        NotShipped = 0,
        Shipped = 1
    }
    Serenity.Decorators.registerEnumType(OrderShippingState, 'SerExtraCore.Northwind.OrderShippingState', 'Northwind.OrderShippingState');
}
