interface dataProps{
    _id: number | string,
    name: string,
    category: string,
    image: string,
    price: number,
    brand: string,
    rating: number,
    numReviews: number,
    countInStock: number
}

export const data: dataProps[] = [
    {
        _id: 1, 
        name: 'Full Jegue Jogging Shirt',
        category: 'Shirt',
        image: './images/product-1.jpg',
        price: 50,
        brand: 'Nike',
        rating: 4.5,
        numReviews: 10,
        countInStock: 6
    },
    {
        _id: 2, 
        name: "Black and Gold Men's African Clothing African Wear",
        category: 'Shirt',
        image: './images/product-2.jpg',
        price: 58.95,
        brand: 'Ramjay Designs',
        rating: 4,
        numReviews: 100,
        countInStock: 50
    },
    {
        _id: 3, 
        name: 'Fieer Mens Long-Sleeve Gold Velvet Fall',
        category: 'Shirt',
        image: './images/product-3.webp',
        price: 12.54,
        brand: 'Muong',
        rating: 4.5,
        numReviews: 10,
        countInStock: 6
    },
    {
        _id: 4, 
        name: 'Summer T-Shirt Man Polo Fashion Cotton T-shirt Lapel Men Shirt Short Sleeve',
        category: 'Shirt',
        image: './images/product-4.jpeg',
        price: 20.50,
        brand: 'Nuera',
        rating: 4.5,
        numReviews: 10,
        countInStock: 6
    },
    {
        _id: 5, 
        name: '2020 New Arrival Luxury Brand Mens Formal Shirts Long Sleeve Floral Men Shirt Tuxdeo Shirt Designer Shirts Plus Size 5XL ',
        category: 'Shirt',
        image: './images/product-5.webp',
        price: 17.24,
        brand: 'BROWON',
        rating: 0.9,
        numReviews: 5,
        countInStock: 20
    }
]