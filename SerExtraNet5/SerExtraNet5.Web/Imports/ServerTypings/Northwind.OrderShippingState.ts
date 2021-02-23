namespace SerExtraNet5.Northwind {
    export enum OrderShippingState {
        NotShipped = 0,
        Shipped = 1
    }
    Serenity.Decorators.registerEnumType(OrderShippingState, 'SerExtraNet5.Northwind.OrderShippingState', 'Northwind.OrderShippingState');
}
