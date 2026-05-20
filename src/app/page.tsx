import { HeroCarousel } from "@/components/sections/hero-carousel";
import { CategoryRow } from "@/components/sections/category-row";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { FeatureStory } from "@/components/sections/feature-story";
import { PromoTiles } from "@/components/sections/promo-tiles";
import { ValueProps } from "@/components/sections/value-props";
import { SellerProBanner } from "@/components/sections/seller-pro-banner";

export default function HomePage() {
  return (
    <main>
      <HeroCarousel />
      <SellerProBanner />
      <CategoryRow />
      <ProductCarousel />
      <FeatureStory />
      <PromoTiles />
      <ValueProps />
    </main>
  );
}
