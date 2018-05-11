namespace SerExtra.Northwind {
    export enum OrderShippingState {
        NotShipped = 0,
        Shipped = 1
    }
    Serenity.Decorators.registerEnumType(OrderShippingState, 'SerExtra.Northwind.OrderShippingState', 'Northwind.OrderShippingState');
}

