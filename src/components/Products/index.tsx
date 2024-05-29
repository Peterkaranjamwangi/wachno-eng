import React from "react";
import Link from "next/link";
import productData from "./ProductsData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "@/types/products";
import { ChevronDown, ChevronRight } from "lucide-react";

interface ProductsProps {}

const Products: React.FC<ProductsProps> = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex flex-row gap-1 py-2 align-baseline text-dark hover:text-primary dark:text-white/70 dark:hover:text-white">
          Our Products
          <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-50 dark:bg-gray-dark">
        {productData.map((product: Product) => (
          <DropdownMenuLabel key={product.id}>
            <Link
              href={`/products/${product.id}`}
              className="flex flex-row gap-1 text-blue-500 hover:underline"
            >
              {product.name}

              <ChevronRight />
            </Link>
            <DropdownMenuSeparator />
          </DropdownMenuLabel>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Products;
