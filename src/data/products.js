const domains = [
    { id: 'clothing', label: 'Clothing', items: ['Pastel Hoodie', 'Floral Dress', 'Soft Cardigan', 'Silk Scarf', 'Linen Shirt', 'Pleated Skirt', 'Denim Jacket', 'Chino Shorts', 'Cotton Tee', 'Wool Sweater'] },
    { id: 'accessories', label: 'Accessories', items: ['Gold Necklace', 'Pearl Earrings', 'Charm Bracelet', 'Sun Hat', 'Leather Belt', 'Tote Bag', 'Hair Clips', 'Sunglasses', 'Scarf', 'Watch'] },
    { id: 'footwear', label: 'Footwear', items: ['Canvas Sneakers', 'Leather Loafers', 'Ankle Boots', 'Strappy Sandals', 'Running Shoes', 'Ballet Flats', 'Slippers', 'Platform Heels', 'Rain Boots', 'Hiking Boots'] },
    { id: 'essentials', label: 'Essentials', items: ['Water Bottle', 'Tote Bag', 'Notebook', 'Pen Set', 'Face Mask', 'Hand Sanitizer', 'Travel Mug', 'Umbrella', 'Key Chain', 'Wallet'] },
    { id: 'beauty', label: 'Beauty', items: ['Lip Gloss', 'Face Serum', 'Mascara', 'Blush Palette', 'Foundation', 'Eyeliner', 'Moisturizer', 'Perfume', 'Nail Polish', 'Makeup Brushes'] },
    { id: 'haircare', label: 'Haircare', items: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Mask', 'Dry Shampoo', 'Curling Iron', 'Straightener', 'Hair Brush', 'Scrunchies', 'Hair Spray'] },
    { id: 'electronics', label: 'Electronics', items: ['Headphones', 'Bluetooth Speaker', 'Power Bank', 'Smart Watch', 'Tablet', 'Laptop Sleeve', 'Mouse', 'Keyboard', 'Camera', 'Drone'] },
    { id: 'furniture-and-home', label: 'Furniture', items: ['Accent Chair', 'Coffee Table', 'Table Lamp', 'Throw Pillow', 'Rug', 'Vase', 'Wall Art', 'Bookshelf', 'Plant Pot', 'Mirror'] },
    { id: 'pet-care', label: 'Pet Care', items: ['Pet Bed', 'Dog Leash', 'Cat Toy', 'Pet Food Bowl', 'Dog Collar', 'Cat Scratcher', 'Pet Shampoo', 'Treat Jar', 'Pet Carrier', 'Bird Cage'] },
    { id: 'mobiles', label: 'Mobiles', items: ['Smartphone Pro', 'Smartphone Lite', 'Foldable Phone', 'Gaming Phone', 'Budget Phone', 'Flagship Phone', 'Camera Phone', 'Battery King', 'Slim Phone', 'Mini Phone'] }
];

const generateProducts = () => {
    let allProducts = [];
    let idCounter = 1;

    // Pooled, verified working Unsplash photo IDs for each category
    const idPools = {
        'clothing': [
            '1434389677669-e08b4cac3105', '1520006403915-85f57a90e9cc', '1485230895905-ec40bd36b66f',
            '1483985988355-763728e1935b', '1515886657613-9f3515b0c78f', '1539106397003-513904603954',
            '1475178626620-a4d074967452', '1554520735-0910c213b24f', '1467043237213-65f2da53396f',
            '1562157873-818bc0726f68', '1445206274645-2d23c1fcb497', '1523381235312-3c1a4798bd1c'
        ],
        'accessories': [
            '1599643478518-a784e5dc4c8f', '1535633302703-b070346ca625', '1611591437281-460bfbe1220a',
            '1511499767390-a7335958beba', '1523275335684-37898b6baf30', '1515562141505-7148ef739a88',
            '1576053139778-7e32f2ae3cf4', '1584917865442-de89df76abb3', '1581044777550-4cfa60707c03',
            '1611911813590-fcd7519725ed', '1509319117193-57bab727e09d', '1521335629791-73656dc21384'
        ],
        'footwear': [
            '1542291026-7eec264c27ff', '1614252235316-8c859d3ef6ee', '1542838132-92c53300491e',
            '1560769629-975ec94e6a86', '1525966222319-7128966774f3', '1460353581641-37badd40d991',
            '1512374382149-433a0058525b', '1514989940723-e8e51635b71c', '1515347611634-90d235c59cc4',
            '1595950653106-6c9ebd614d3a', '1539185441765-7b4120c71445', '1560343775-9a4ca40912a1'
        ],
        'essentials': [
            '1584622650111-993a426fbf0a', '1602143393494-1ac2035a0980', '1531346878377-59be220389a1',
            '1511556820780-d912e42b4980', '1586941028593-596567eed162', '1584622781564-1d987f7333c1',
            '1514432324607-3f3024c084d7', '1533051061448-6c84b1d6e3c0', '1582213726054-94426ba8b9c8',
            '1572635193528-799d957d7694', '1492106087820-a15f00e9ec9c', '1526649669527-0bb9a3fa2f4c'
        ],
        'beauty': [
            '1522335789182-0cd666579fc2', '1620916566391-708d9bdec377', '1515688594586-b02447239922',
            '1596704016767-3f3c3743be58', '1526045612213-910fa4b8b3ee', '1556228578-f87c2bf20023',
            '1541643600-40e95ca04f12', '1631722244464-9642514336c2', '1512496011928-c8c40d8350ca',
            '1572635148818-df3515af9c3c', '1596462502238-eb797fac0242', '1611080696913-bfaad1cd0629'
        ],
        'haircare': [
            '1527799822367-a733199c0468', '1526947425920-ff2e59ae4438', '1559599101291-c518b272ecdf',
            '1608577210940-277be0e48ee1', '1522338140290-0e14a20ade8e', '1626084285871-382a98e82b78',
            '1599427303058-24d18c644837', '1519736920235-01e4f3583626', '1617066847113-f47209774d6c',
            '1501740209618-9311059f7df8', '1559599541249-14a2cc428215', '1626105151528-48beae11985a'
        ],
        'electronics': [
            '1505740420928-5e560c06d30e', '1525547710557-7aaec4c61023', '1588872657578-7c1e14938d42',
            '1496181754640-f6572182706e', '1516035069177-09d512a9bb14', '1527866512132-65293e2f33e6',
            '1587825140701-1ef55a13f942', '1473968512445-58440751936b', '1585338103002-7fa7498fe5d7',
            '1561150163-5475459b79bb', '1491933303702-ee4b29314b60', '1522199710-d83e30f14371'
        ],
        'furniture-and-home': [
            '1524758631624-e2822e304c36', '1581539250350-7176226ae7a1', '1530099486323-252bd7f422e1',
            '1567401893414-76b7b1e5a7a5', '1584101826112-7112c4baa8d2', '1534349735994-14f01037707e',
            '1581759020118-281b673e160a', '1579783902142-6e937d377b5a', '1594904351111-a072f80b1f71',
            '1618220048382-f2479e394b8e', '1555041467-33f75ea30593', '1556228578270-50d5a00486c4'
        ],
        'pet-care': [
            '1516734212186-a967f81ad0d7', '1544567611-5a743ee51cae', '1576201836186-4c5b29d96030',
            '1553894022-ed3767ff6f2d', '1514894780628-3d1720b7201c', '1583337130482-7060ec4976c8',
            '1548199973-31be7963030c', '1541599540-34a8dec4ed15', '1494947665602-237309c8577b',
            '1537158550608-2780e99d1ca-4', '1514362545818-f02fe04aa666', '1561037407-527e8a1f5ab6'
        ],
        'mobiles': [
            '1511707171634-5f897ff02aa9', '1523206489240-a0a400c1f44c', '1501644898262-d4c76382101e',
            '1611626233513-f86a2ff3f2dc', '1510557832101-5154ee7004f2', '1580910077003-d92751719827',
            '1598322184443-41ae77215904', '1533228894156-34b07ca60961', '1550020499-4c59a86b971a',
            '1581414452174-8df6f866415f', '1573333235372-ec7f85a8bb3e', '1562975079412-f02796013a77'
        ]
    };

    domains.forEach(domain => {
        domain.items.forEach((itemName, index) => {
            // Pick an ID from the pool based on the index (cycling)
            const pool = idPools[domain.id] || idPools['clothing'];
            const photoId = pool[index % pool.length];

            // Add a unique signature for good measure
            const imageUrl = `https://images.unsplash.com/photo-${photoId}?auto=format&fit=crop&w=600&q=80`;

            allProducts.push({
                id: idCounter++,
                name: itemName,
                domain: domain.id,
                category: domain.id,
                price: Math.floor(Math.random() * 100) + 20,
                rating: (4 + Math.random()).toFixed(1),
                reviewCount: Math.floor(Math.random() * 500) + 50,
                image: imageUrl,
                description: `This premium ${itemName} is a standout in our ${domain.label} collection. Professionally crafted for both style and utility, it features a unique design that makes it a perfect addition to your pastel-themed lifestyle. Highly durable and elegantly detailed.`
            });
        });
    });

    return allProducts;
};

const getRandomColor = () => {
    const colors = ['FADADD', 'F5F5DC', '87CEEB', '90EE90', 'FFB7B2', 'E2F0CB', 'D8BFD8', 'F5DEB3', 'E0FFFF', 'FFDAB9'];
    return colors[Math.floor(Math.random() * colors.length)];
};

export const products = generateProducts();
