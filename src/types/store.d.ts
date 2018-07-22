interface Item {
    id: number,
    title: string,
    price: number,
    inventory: number,
}

interface CartItem {
    id: number,
    quantity: number
}

interface ProductsState {
    all: Item[]
}

interface CartState {
    items: CartItem[],
    checkoutStatus: string | null
}
