# A fullstack project.

Prisma, Nuxt3 were used to create this project.
Plus few modules like TailwindCSS, PrimeVue, etc.

# REST API
Implemented REST API. All requests require admin token (JWT) in DB.
For using API you need to create in DB admin JWT token and pass it in the request body.
Most DB changes like create, update, delete are made with POST method.
Example of POST request:

```javascript
    const jwt = ""; // admin token (JWT)
    const newProduct = {}; // Create product, check in scheme.prisma for properties

    const product = await fetch("https://[current_url]/v1/create/products", {
        method: 'POST',
        body: {
            jwt,
            item: newProduct
        } 
    });
    console.log(product) // Our created product in DB
```
 To get something from DB, you're enough to pass GET method with admin token. If you want to get something specific, pass an ID of the product/post/user inside the params

 ```javascript
    const jwt = ""; // admin token (JWT)

    const products = await fetch(`https://[current_url]/v1/products?jwt=${jwt}`);
    console.log(products) // All products

    const product = await fetch(`https://[current_url]/v1/products?jwt=${jwt}&id=2`);
    console.log(product) // Product with ID=2
 ```

# Init 
```bash
npm install
```

# Run dev server
```bash
npm run dev
```

# Build
```bash
npm run build
```

# Misc

```bash
# Get local display of DB (ENV is needed)
npm run prisma:studio

# Push new scheme to remote DB (resets all data)
npm run prisma:push
