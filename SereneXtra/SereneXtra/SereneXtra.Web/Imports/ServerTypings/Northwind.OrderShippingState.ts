namespace SereneXtra.Northwind {
    export enum OrderShippingState {
        NotShipped = 0,
        Shipped = 1
    }
    Serenity.Decorators.registerEnumType(OrderShippingState, 'SereneXtra.Northwind.OrderShippingState', 'Northwind.OrderShippingState');
}
