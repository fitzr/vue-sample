/**
 * Mocking client-server processing
 */

export default class Shop {
    private static readonly _products = [
        { id: 1, title: "iPad 4 Mini", price: 500.01, inventory: 2},
        { id: 2, title: "H&M T-Shirt White", price: 10.99, inventory: 10},
        { id: 3, title: "Charli XCX - Sucker CD", price: 19.99, inventory: 5}
    ]

    static fetchProducts (): Promise<Item[]> {
        return new Promise((r) => {
            setTimeout(() => r(this._products), 100)
        })
    }

    static buyProducts (products: Item[]) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // simulate random checkout failure.
                (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
                    ? resolve()
                    : reject()
            }, 100)
        })
    }
}
