import { useEffect, useState } from "react";
import { useOrderItems } from "vtex.order-items/OrderItems";
import { FormattedPrice } from "vtex.formatted-price";
import { useProductSummary } from "vtex.product-summary-context/ProductSummaryContext";
import styles from './styles.css';

function ListBuyComponent({ children }) {
  const { product } = useProductSummary();
  const { addItems } = useOrderItems();

  const [hasBenefit, setHasBenefit] = useState(false);
  const [unityQuantitySelected, setUnityQuantitySelected] = useState(1);
  const [kitQuantitySelected, setKitQuantitySelected] = useState(1);
  const [quantityOnKit, setQuantityOnKit] = useState(1);
  const [discount, setDiscount] = useState(0);
  const [quantityToGetDiscount, setQuantityToGetDiscount] = useState(0)
  const [highlightName, sethighlightName] = useState("");

  useEffect(() => {

    const { clusterHighlights } = product;

    const hasclusterHighlights =
      clusterHighlights &&
      clusterHighlights.length > 0 &&
      clusterHighlights.filter(
        (clusterHighlight) => clusterHighlight.name.startsWith('kit com')
      );

    if (hasclusterHighlights?.length > 0) {
      const myDiscount = Number(hasclusterHighlights[0].name.split("-")[1].split(" ")[3].replace("%", ""))
      const myQuantityDiscount = Number(hasclusterHighlights[0].name.split("-")[1].split(" ")[1])

      setDiscount(myDiscount)
      setQuantityToGetDiscount(myQuantityDiscount)
      setHasBenefit(true);
      sethighlightName(hasclusterHighlights[0].name.toString().toUpperCase());
      setQuantityOnKit(hasclusterHighlights[0].name.toString().split(" ")[2]);
      setQuantityToGetDiscount(myQuantityDiscount)
    }
  }, [product]);

  function handleAddToCart(option) {
    const { items } = product;
    document.querySelector('.vtex-minicart-2-x-openIconContainer').click()

    if (items && items.length > 0) {
      addItems([
        {
          id: items[0].itemId,
          quantity: option === 'kit' ? quantityOnKit * kitQuantitySelected : unityQuantitySelected,
          seller: items[0].sellers[0].sellerId,
        },
      ]);
    }
  }

  if (!hasBenefit) {
    console.log(product)

    return (
      <>
        {children}
      </>
    );
  }

  return (
    <div className={styles.listBuyComponent}>
      <div className={styles.optionsContainer}>
        <div className={styles.optionItem}>
          <h3 className={styles.optionTitle}>UNIDADE</h3>
          <div className={styles.priceContainer} style={{ justifyContent: 'center' }}>
            <span className={styles.currentPrice}>
              <span className={styles.listItem}>
                <FormattedPrice value={(product.priceRange.listPrice.highPrice)} />
              </span>
              <FormattedPrice value={(product.priceRange.sellingPrice.highPrice)} />
            </span>
          </div>

          <a href="javascript:void(0)" className="product-summary-availability-subscriber-container" onClick={(e) => e.stopPropagation()}>
            <div className={styles.buyButtonCustom}>
              <button
                className={styles.stepperMinus}
                onClick={() => {
                  setUnityQuantitySelected((current) => (current > 1 ? current - 1 : 1))
                }}
              />
              <input
                className={styles.quantityInput}
                type="number"
                value={unityQuantitySelected}
                onChange={(e) => setUnityQuantitySelected(Number(e.target.value))}
              />
              <button
                className={styles.stepperPlus}
                onClick={() => setUnityQuantitySelected((current) => current + 1)}
              />
              <button className={styles.addToCartButton} onClick={() => handleAddToCart('unity')}>
                Comprar
              </button>
            </div>
          </a>
        </div>

        <div className={styles.optionItem}>
          <h3 className={`${styles.optionTitle} ${styles.optionTitleKit}`}>{highlightName.split('-')[0]}</h3>
          <div className={styles.priceContainer}>
            <span className={styles.oldPrice}>
              <FormattedPrice value={(product.priceRange.listPrice.highPrice * quantityOnKit)} />
            </span>
            <span className={styles.currentPrice}>
              <FormattedPrice value={((product.priceRange.listPrice.highPrice * quantityOnKit) - (product.priceRange.listPrice.highPrice * quantityToGetDiscount * (discount / 100)))} />
            </span>
          </div>
          <a href="javascript:void(0)" className="product-summary-availability-subscriber-container" onClick={(e) => e.stopPropagation()}>
            <div className={styles.buyButtonCustom}>
              <button
                className={styles.stepperMinus}
                onClick={() => {
                  setKitQuantitySelected((current) => (current > 1 ? current - 1 : 1))
                }}
              />
              <input
                className={styles.quantityInput}
                type="number"
                value={kitQuantitySelected}
                onChange={(e) => setKitQuantitySelected(Number(e.target.value))}
              />
              <button
                className={styles.stepperPlus}
                onClick={() => setKitQuantitySelected((current) => current + 1)}
              />
              <button className={styles.addToCartButton} onClick={() => handleAddToCart('kit')}>
                Comprar
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ListBuyComponent;
