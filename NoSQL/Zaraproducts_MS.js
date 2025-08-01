// Todos los datos
db.zara_products.find()

// Cantidad de productos en Zara
db.zara_products.find().count()

//Marcas dentro del dataset.
db.zara_products.distinct("brand")

//Idiomas dentro del dataset.
db.zara_products.distinct("language")

//Cambiar espacios vacios en 'availability' a OutofStock
db.zara_products.updateMany(
    {'availability': {$eq: ""}},
    {$set: {'availability': "Out_of_Stock"}});

db.zara_products.find()

//Cuales productos estan disponibles y cuantos. 
db.zara_products.find({'availability': 'InStock'});
const availableCount = db.zara_products.find({'availability':'InStock'}).count();
print('Numero de productos disponibles: ' + availableCount);

//Cuales productos no estan disponibles y cuantos.
db.zara_products.find({'availability': 'Out_of_Stock'});
const outstock = db.zara_products.find({'availability':'Out_of_Stock'}).count();
print('Numero de productos no disponibles:' + outstock);


//Arreglar precios a numeros
db.zara_products.find({}, { name: 1, price: 1 }).limit(10).forEach(printjson);
db.zara_products.updateMany(
    { price: { $type: "string" } },
    [{ $set: { price: { $toDouble: "$price" } } }]);
//Cuales son los productos mas caros y economicos. A que marca y disponibilidad tienen.

//baratos
const baratos = db.zara_products.find().sort({ "price": 1 }).limit(10);
baratos.forEach(function(product) {
    print("Producto más económico:");
    print("Nombre: " + product.name);
    print("Precio: " + product.price);
    print("Disponibilidad: " + product.availability);
    print("Marca: " + product.brand);});

//caros
const caros = db.zara_products.find().sort({ "price": -1 }).limit(10);
caros.forEach(function(product) {
    print("Producto más caro:");
    print("Nombre: " + product.name);
    print("Precio: " + product.price);
    print("Disponibilidad: " + product.availability);
    print("Marca: " + product.brand);});

//Agregamos un nuevo producto.
db.zara_products.insertOne({
    name: "Camisa de Algodón",
    price: 29.99,
    availability: "InStock",
    brand: "Zara",
    size_list: ["S", "M", "L"],
    color: "Blanco",
    images: [""],
    scraped_at: new Date()});

db.zara_products.find({ name: "Camisa de Algodón" });

db.zara_products.updateOne(
    { name: "Camisa de Algodón" },
    { $set: { price: 25 } });

//Eliminar campos(columnas)
db.zara_products.updateMany(
    {},
    {$unset: {url:'', language: '', mpn: '', condition: '', images: ''}});
    
db.zara_products.find()

//Promedio de precios por marca.
db.zara_products.aggregate([
    {$group: {_id: "$brand",averagePrice: { $avg: "$price" }}}]);
    
//Productos menores a 30$ en Zara (no Zara Home)
db.zara_products.find(
    { brand: "Zara", price: { $lt: 30 } },
    { name: 1, price: 1 });