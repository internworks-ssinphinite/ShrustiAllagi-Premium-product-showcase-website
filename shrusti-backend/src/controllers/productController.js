import prisma from "../config/prismaClient.js";

export const listProducts = async (req, res) => {
  try {
    const { category } = req.query;
    const products = await prisma.product.findMany({
      where: category ? { category } : {},
      orderBy: { createdAt: "desc" }
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const { title, description, price, images, category, stock } = req.body;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        price: Number(price),
        images,
        category,
        stock: Number(stock || 0)
      }
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
