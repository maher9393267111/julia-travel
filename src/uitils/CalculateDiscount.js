export const calculteDiscount = (price, discount) => {
    let result = price / ((100 + discount) / 100);

    const resultafterfixed = result.toFixed();

    return resultafterfixed;
  };
