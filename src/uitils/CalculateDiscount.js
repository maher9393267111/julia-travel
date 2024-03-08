export const calculteDiscount = (price, discount) => {
    let result = price - (price * (discount / 100));

    const resultafterfixed = result.toFixed();

    return resultafterfixed;
  };
