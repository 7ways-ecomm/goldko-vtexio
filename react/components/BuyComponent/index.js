import { useEffect, useState } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";
import { FormattedPrice } from "vtex.formatted-price";
import useProduct from "vtex.product-context/useProduct";
import * as S from "./styles";

function BuyComponent({ children }) {
  const { product } = useProduct();
  const { addItems } = useOrderItems();

  const [quantityOption, setQuantityOption] = useState("unity");
  const [hasBenefit, setHasBenefit] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [kitQuantity, setKitQuantity] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [quantityToGetDiscount, setQuantityToGetDiscount] = useState(0)
  const [highlightName, sethighlightName] = useState("");
  const [installments, setInstallments] = useState(0);

  useEffect(() => {
    const { benefits } = product;
    const { clusterHighlights } = product;

    const hasclusterHighlights =
      clusterHighlights &&
      clusterHighlights.length > 0 &&
      clusterHighlights.filter(
        (clusterHighlight) => clusterHighlight.name.startsWith('kit com')
      );
    console.log("TESTE KITS CONSOLE LOG")
    console.log(hasclusterHighlights);
    console.log(clusterHighlights);
    console.log(product)
    console.log(product.priceRange.sellingPrice.highPrice)

    if (benefits?.length > 0 && hasclusterHighlights?.length > 0) {
      const myDiscount = Number(hasclusterHighlights[0].name.split("-")[1].split(" ")[3].replace("%", ""))
      const myQuantityDiscount = Number(hasclusterHighlights[0].name.split("-")[1].split(" ")[1])
      const installments = product.items[0].sellers[0].commertialOffer.Installments[0].NumberOfInstallments;

      setInstallments(installments)
      setDiscount(myDiscount)
      setQuantityToGetDiscount(myQuantityDiscount)
      setHasBenefit(true);
      sethighlightName(hasclusterHighlights[0].name.toString().toUpperCase());
      setKitQuantity(hasclusterHighlights[0].name.toString().split(" ")[2]);
      setQuantityToGetDiscount(myQuantityDiscount)
    }
  }, [product]);

  function handleAddToCart() {
    const { items } = product;

    if (items && items.length > 0) {
      addItems([
        {
          id: items[0].itemId,
          quantity: kitQuantity * quantity,
          seller: items[0].sellers[0].sellerId,
        },
      ]);
    }
  }

  function formatCurrency(value) {
    const valueFormated = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return valueFormated;
  }

  if (!hasBenefit) {
    console.log(children[1])
    console.log("________TESTE________")
    return (
      <>
        <S.ProductPrice>{children[0]}</S.ProductPrice>
        <S.ShippingContainer>{children[1]}</S.ShippingContainer>
      </>
    );
  }

  return (
    <>
      <S.Container>
        {hasBenefit && quantityOption === "kit" ? (
          <>
            <S.OptionsContainer>
              <S.QuantityButton
                className={`${quantityOption === "unity" && "quantityButtonActive"
                  }`}
                onClick={() => setQuantityOption("unity")}
              >
                UNIDADE
              </S.QuantityButton>
              <S.QuantityButton
                className={`${quantityOption === "kit" && "quantityButtonActive"
                  }`}
                onClick={() => setQuantityOption("kit")}
              >
                {highlightName && highlightName.split('-')[0]}
              </S.QuantityButton>
            </S.OptionsContainer>

            <S.ProductPrice>
              {product && (
                <S.PriceInfo>
                  <S.Discount>
                    <FormattedPrice value={(product.priceRange.listPrice.highPrice * kitQuantity)} />
                  </S.Discount>
                  <S.Price>
                    <FormattedPrice value={((product.priceRange.listPrice.highPrice * kitQuantity) - (product.priceRange.listPrice.highPrice * quantityToGetDiscount * (discount / 100)))} />
                  </S.Price>
                  <S.PricePayment>
                    {`em até ${installments}x de ${formatCurrency((product.priceRange.listPrice.highPrice * kitQuantity - product.priceRange.listPrice.highPrice) / installments)} sem juros`}
                  </S.PricePayment>
                </S.PriceInfo>
              )}

              <S.BuyButtonCustom>
                <S.StepperMinus
                  onClick={() =>
                    setQuantity((current) => (current > 1 ? current - 1 : 1))
                  }
                />
                <S.Input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <S.StepperPlus
                  onClick={() => setQuantity((current) => current + 1)}
                />
                <S.Button onClick={handleAddToCart}>Comprar</S.Button>
              </S.BuyButtonCustom>
            </S.ProductPrice>

            <S.ShippingContainer>{children[1]}</S.ShippingContainer>
          </>
        ) : (
          <>
            <S.OptionsContainer>
              <S.QuantityButton
                className={`${quantityOption === "unity" && "quantityButtonActive"
                  }`}
                onClick={() => setQuantityOption("unity")}
              >
                UNIDADE
              </S.QuantityButton>
              <S.QuantityButton
                className={`${quantityOption === "kit" && "quantityButtonActive"
                  }`}
                onClick={() => setQuantityOption("kit")}
              >
                {highlightName && highlightName.split('-')[0]}
              </S.QuantityButton>
            </S.OptionsContainer>
            <S.ProductPrice>{children[0]}</S.ProductPrice>
            <S.ShippingContainer>{children[1]}</S.ShippingContainer>
          </>
        )}
      </S.Container>
    </>
  );
}

export default BuyComponent;
