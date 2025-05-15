import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChevronLeft,
  Heart,
  ShoppingCart,
  Plus,
  Minus,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProductImage {
  url: string;
  alt: string;
}

interface RelatedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Mock product data - in a real app, this would be fetched based on the ID
  const product = {
    id: id || "1",
    name: "Advanced Skin Repair Serum",
    price: 49.99,
    discount: 10,
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    description:
      "A powerful serum formulated with hyaluronic acid and vitamin C to repair damaged skin, reduce fine lines, and provide deep hydration for a youthful glow.",
    ingredients:
      "Water, Sodium Hyaluronate (Hyaluronic Acid), Ascorbic Acid (Vitamin C), Glycerin, Niacinamide, Panthenol, Tocopherol (Vitamin E), Retinol, Aloe Barbadensis Leaf Extract, Camellia Sinensis Leaf Extract, Phenoxyethanol, Ethylhexylglycerin.",
    usage:
      "Apply 2-3 drops to clean, dry skin morning and evening. Gently pat into face and neck. Follow with moisturizer. For external use only. Avoid contact with eyes.",
    category: "Skincare",
    subcategory: "Serums",
    tags: ["Anti-aging", "Hydrating", "Vitamin C"],
    images: [
      {
        url: "https://images.unsplash.com/photo-1620916566886-f294b0d8a5a7?w=800&q=80",
        alt: "Advanced Skin Repair Serum bottle",
      },
      {
        url: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&q=80",
        alt: "Serum texture",
      },
      {
        url: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&q=80",
        alt: "Serum application",
      },
      {
        url: "https://images.unsplash.com/photo-1608248543945-c76165e8c170?w=800&q=80",
        alt: "Product packaging",
      },
    ],
  };

  // Mock related products
  const relatedProducts: RelatedProduct[] = [
    {
      id: "2",
      name: "Hydrating Face Moisturizer",
      price: 35.99,
      image:
        "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=400&q=80",
    },
    {
      id: "3",
      name: "Vitamin C Toner",
      price: 28.5,
      image:
        "https://images.unsplash.com/photo-1608248511417-f1e5eb81f1b8?w=400&q=80",
    },
    {
      id: "4",
      name: "Retinol Night Cream",
      price: 42.99,
      image:
        "https://images.unsplash.com/photo-1608248543542-b7fca7a3a059?w=400&q=80",
    },
  ];

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const calculateDiscountedPrice = () => {
    if (product.discount) {
      return (product.price * (1 - product.discount / 100)).toFixed(2);
    }
    return product.price.toFixed(2);
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <Button variant="ghost" className="flex items-center mb-6">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg bg-muted">
              <img
                src={product.images[activeImage].url}
                alt={product.images[activeImage].alt}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex space-x-2 overflow-auto pb-2">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-2 rounded-md overflow-hidden ${activeImage === index ? "border-primary" : "border-transparent"}`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="h-20 w-20 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start">
                <div>
                  <Badge className="mb-2">{product.category}</Badge>
                  <h1 className="text-3xl font-bold">{product.name}</h1>
                </div>
                <Button variant="ghost" size="icon">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              <div className="flex items-center mt-2">
                <div className="text-sm text-muted-foreground">
                  ★★★★★{" "}
                  <span className="ml-1">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              {product.discount ? (
                <>
                  <span className="text-2xl font-bold">
                    ${calculateDiscountedPrice()}
                  </span>
                  <span className="ml-2 text-muted-foreground line-through">
                    ${product.price.toFixed(2)}
                  </span>
                  <Badge variant="destructive" className="ml-2">
                    {product.discount}% OFF
                  </Badge>
                </>
              ) : (
                <span className="text-2xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-muted-foreground">{product.description}</p>

            <div>
              <p className="text-sm font-medium mb-2">Quantity</p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                  disabled={quantity >= product.stock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="text-sm text-muted-foreground ml-2">
                  {product.stock} available
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1" size="lg">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <Button variant="outline" size="lg">
                Buy Now
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="details">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
              <TabsTrigger value="usage">How to Use</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="p-4">
              <p>{product.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Category</h3>
                  <p className="text-muted-foreground">
                    {product.category} / {product.subcategory}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium">Tags</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ingredients" className="p-4">
              <h3 className="font-medium mb-2">Ingredients</h3>
              <p className="text-muted-foreground">{product.ingredients}</p>
            </TabsContent>
            <TabsContent value="usage" className="p-4">
              <h3 className="font-medium mb-2">How to Use</h3>
              <p className="text-muted-foreground">{product.usage}</p>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-medium truncate">{product.name}</h3>
                  <p className="text-muted-foreground">
                    ${product.price.toFixed(2)}
                  </p>
                  <Button variant="outline" className="w-full mt-2" size="sm">
                    View Product
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-24 border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold mb-4">Shop</h3>
              <ul className="space-y-2">
                <li>Pharmaceuticals</li>
                <li>Cosmetics</li>
                <li>Skincare</li>
                <li>Health Products</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Help</h3>
              <ul className="space-y-2">
                <li>FAQs</li>
                <li>Shipping</li>
                <li>Returns</li>
                <li>Contact Us</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">About</h3>
              <ul className="space-y-2">
                <li>Our Story</li>
                <li>Blog</li>
                <li>Press</li>
                <li>Careers</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Connect</h3>
              <p className="text-muted-foreground mb-4">
                Subscribe to our newsletter for updates and promotions.
              </p>
              <div className="flex space-x-4">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  FB
                </div>
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  IG
                </div>
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  TW
                </div>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pharmaceutical & Cosmetics Shop. All
            rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetail;
